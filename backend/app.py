from flask import Flask, request, jsonify, session, redirect, url_for, render_template
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_cors import CORS
import os
import secrets
from datetime import datetime
import uuid

app = Flask(__name__)
app.config['SECRET_KEY'] = 'your-secret-key-here'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:////app/data/referral_program.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
bcrypt = Bcrypt(app)
CORS(app, origins=['http://localhost:3000', 'http://frontend:3000', 'https://panel.erpelantar.com'], supports_credentials=True)

# Database Models
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(120), nullable=False)
    is_admin = db.Column(db.Boolean, default=False)
    referral_code = db.Column(db.String(20), unique=True, nullable=False)
    referred_by = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    # Relationships
    referrals = db.relationship('User', backref=db.backref('referrer', remote_side=[id]))
    referral_links = db.relationship('ReferralLink', backref='user', lazy=True)

class ReferralLink(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    link_code = db.Column(db.String(50), unique=True, nullable=False)
    clicks = db.Column(db.Integer, default=0)
    conversions = db.Column(db.Integer, default=0)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    is_active = db.Column(db.Boolean, default=True)

class ReferralClick(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    link_id = db.Column(db.Integer, db.ForeignKey('referral_link.id'), nullable=False)
    ip_address = db.Column(db.String(45), nullable=False)
    user_agent = db.Column(db.String(500), nullable=True)
    clicked_at = db.Column(db.DateTime, default=datetime.utcnow)

# Helper functions
def generate_referral_code():
    return secrets.token_urlsafe(8)

def generate_link_code():
    return str(uuid.uuid4())[:8]

# Routes
@app.route('/api/register', methods=['POST'])
def register():
    data = request.get_json()
    
    if not data or not data.get('username') or not data.get('email') or not data.get('password'):
        return jsonify({'error': 'Missing required fields'}), 400
    
    # Check if user already exists
    if User.query.filter_by(username=data['username']).first():
        return jsonify({'error': 'Username already exists'}), 400
    
    if User.query.filter_by(email=data['email']).first():
        return jsonify({'error': 'Email already exists'}), 400
    
    # Handle referral link code if provided
    referred_by_id = None
    if data.get('referralLinkCode'):
        referral_link = ReferralLink.query.filter_by(link_code=data['referralLinkCode'], is_active=True).first()
        if referral_link:
            referred_by_id = referral_link.user_id
            # Track conversion
            referral_link.conversions += 1
    
    # Create new user
    password_hash = bcrypt.generate_password_hash(data['password']).decode('utf-8')
    referral_code = generate_referral_code()
    
    user = User(
        username=data['username'],
        email=data['email'],
        password_hash=password_hash,
        referral_code=referral_code,
        referred_by=referred_by_id
    )
    
    db.session.add(user)
    db.session.commit()
    
    return jsonify({'message': 'User created successfully', 'referral_code': referral_code}), 201

@app.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()
    
    if not data or not data.get('username') or not data.get('password'):
        return jsonify({'error': 'Missing username or password'}), 400
    
    user = User.query.filter_by(username=data['username']).first()
    
    if user and bcrypt.check_password_hash(user.password_hash, data['password']):
        session['user_id'] = user.id
        session['is_admin'] = user.is_admin
        
        return jsonify({
            'message': 'Login successful',
            'user': {
                'id': user.id,
                'username': user.username,
                'email': user.email,
                'is_admin': user.is_admin,
                'referral_code': user.referral_code
            }
        }), 200
    
    return jsonify({'error': 'Invalid credentials'}), 401

@app.route('/api/logout', methods=['POST'])
def logout():
    session.clear()
    return jsonify({'message': 'Logged out successfully'}), 200

@app.route('/api/user/profile', methods=['GET'])
def get_user_profile():
    if 'user_id' not in session:
        return jsonify({'error': 'Not authenticated'}), 401
    
    user = User.query.get(session['user_id'])
    if not user:
        return jsonify({'error': 'User not found'}), 404
    
    return jsonify({
        'id': user.id,
        'username': user.username,
        'email': user.email,
        'is_admin': user.is_admin,
        'referral_code': user.referral_code,
        'referred_by': user.referred_by,
        'referrals_count': len(user.referrals)
    }), 200

@app.route('/api/admin/users', methods=['GET'])
def get_all_users():
    if 'user_id' not in session or not session.get('is_admin'):
        return jsonify({'error': 'Admin access required'}), 403
    
    users = User.query.all()
    users_data = []
    
    for user in users:
        users_data.append({
            'id': user.id,
            'username': user.username,
            'email': user.email,
            'is_admin': user.is_admin,
            'referral_code': user.referral_code,
            'referrals_count': len(user.referrals),
            'created_at': user.created_at.isoformat()
        })
    
    return jsonify(users_data), 200

@app.route('/api/referral-links', methods=['GET'])
def get_referral_links():
    if 'user_id' not in session:
        return jsonify({'error': 'Not authenticated'}), 401
    
    user = User.query.get(session['user_id'])
    links = ReferralLink.query.filter_by(user_id=user.id, is_active=True).all()
    
    links_data = []
    for link in links:
        links_data.append({
            'id': link.id,
            'link_code': link.link_code,
            'clicks': link.clicks,
            'conversions': link.conversions,
            'created_at': link.created_at.isoformat(),
            'url': f"http://localhost:3000/referral/{link.link_code}"
        })
    
    return jsonify(links_data), 200

@app.route('/api/referral-links', methods=['POST'])
def create_referral_link():
    if 'user_id' not in session:
        return jsonify({'error': 'Not authenticated'}), 401
    
    user = User.query.get(session['user_id'])
    link_code = generate_link_code()
    
    referral_link = ReferralLink(
        user_id=user.id,
        link_code=link_code
    )
    
    db.session.add(referral_link)
    db.session.commit()
    
    return jsonify({
        'id': referral_link.id,
        'link_code': link_code,
        'url': f"http://localhost:3000/referral/{link_code}",
        'created_at': referral_link.created_at.isoformat()
    }), 201

@app.route('/api/referral/<link_code>', methods=['GET'])
def track_referral_click(link_code):
    referral_link = ReferralLink.query.filter_by(link_code=link_code, is_active=True).first()
    
    if not referral_link:
        return jsonify({'error': 'Invalid referral link'}), 404
    
    # Track the click
    click = ReferralClick(
        link_id=referral_link.id,
        ip_address=request.remote_addr,
        user_agent=request.headers.get('User-Agent')
    )
    
    db.session.add(click)
    referral_link.clicks += 1
    db.session.commit()
    
    return jsonify({
        'message': 'Referral link tracked',
        'referrer': referral_link.user.username
    }), 200

@app.route('/api/referral/<link_code>/convert', methods=['POST'])
def convert_referral(link_code):
    referral_link = ReferralLink.query.filter_by(link_code=link_code, is_active=True).first()
    
    if not referral_link:
        return jsonify({'error': 'Invalid referral link'}), 404
    
    referral_link.conversions += 1
    db.session.commit()
    
    return jsonify({'message': 'Conversion tracked successfully'}), 200

# Initialize database
with app.app_context():
    db.create_all()
    
    # Create admin user if it doesn't exist
    admin = User.query.filter_by(username='admin').first()
    if not admin:
        admin_password = bcrypt.generate_password_hash('admin123').decode('utf-8')
        admin = User(
            username='admin',
            email='admin@elantar.com',
            password_hash=admin_password,
            is_admin=True,
            referral_code=generate_referral_code()
        )
        db.session.add(admin)
        db.session.commit()
        print("✅ Admin user created successfully!")

# New API endpoints for enhanced functionality
@app.route('/api/network', methods=['GET'])
def get_user_network():
    if 'user_id' not in session:
        return jsonify({'error': 'Not authenticated'}), 401
    
    current_user = User.query.get(session['user_id'])
    if not current_user:
        return jsonify({'error': 'User not found'}), 404
    
    # Get users referred by current user
    referred_users = User.query.filter_by(referred_by=current_user.id).all()
    
    network_data = []
    for user in referred_users:
        # Count how many people this user has referred
        sub_referrals = User.query.filter_by(referred_by=user.id).count()
        
        user_data = {
            'id': user.id,
            'name': user.username,
            'email': user.email,
            'referrals': sub_referrals,
            'joined': user.created_at.isoformat(),
            'status': 'active'
        }
        network_data.append(user_data)
    
    return jsonify(network_data), 200

@app.route('/api/achievements', methods=['GET'])
def get_user_achievements():
    if 'user_id' not in session:
        return jsonify({'error': 'Not authenticated'}), 401
    
    current_user = User.query.get(session['user_id'])
    if not current_user:
        return jsonify({'error': 'User not found'}), 404
    
    # Calculate user stats
    referrals_count = len(current_user.referrals)
    total_links = len(current_user.referral_links)
    total_clicks = sum(link.clicks for link in current_user.referral_links)
    
    # Define achievements with real progress
    achievements = [
        {
            'id': 1,
            'title': 'First Referral',
            'description': 'Made your first successful referral',
            'completed': referrals_count >= 1,
            'icon': '🎯',
            'reward': '$10'
        },
        {
            'id': 2,
            'title': 'Network Builder',
            'description': 'Referred 5 people',
            'completed': referrals_count >= 5,
            'icon': '🏗️',
            'reward': '$50',
            'progress': min(referrals_count, 5)
        },
        {
            'id': 3,
            'title': 'Super Referrer',
            'description': 'Referred 10 people',
            'completed': referrals_count >= 10,
            'icon': '⭐',
            'reward': '$100',
            'progress': min(referrals_count, 10)
        },
        {
            'id': 4,
            'title': 'Elite Member',
            'description': 'Referred 25 people',
            'completed': referrals_count >= 25,
            'icon': '👑',
            'reward': '$250',
            'progress': min(referrals_count, 25)
        },
        {
            'id': 5,
            'title': 'Click Master',
            'description': 'Generated 100 clicks on your links',
            'completed': total_clicks >= 100,
            'icon': '🖱️',
            'reward': '$25',
            'progress': min(total_clicks, 100)
        }
    ]
    
    return jsonify(achievements), 200

@app.route('/api/stats', methods=['GET'])
def get_user_stats():
    if 'user_id' not in session:
        return jsonify({'error': 'Not authenticated'}), 401
    
    current_user = User.query.get(session['user_id'])
    if not current_user:
        return jsonify({'error': 'User not found'}), 404
    
    # Calculate comprehensive stats
    referrals_count = len(current_user.referrals)
    total_links = len(current_user.referral_links)
    total_clicks = sum(link.clicks for link in current_user.referral_links)
    total_conversions = sum(link.conversions for link in current_user.referral_links)
    active_links = len([link for link in current_user.referral_links if link.is_active])
    
    # Calculate earnings (example: $15 per conversion)
    earnings = total_conversions * 15
    
    # Calculate conversion rate
    conversion_rate = (total_conversions / total_clicks * 100) if total_clicks > 0 else 0
    
    # Simulate weekly stats (30% of total for demo)
    weekly_clicks = int(total_clicks * 0.3)
    weekly_growth = 12.5  # Example growth percentage
    
    stats = {
        'totalClicks': total_clicks,
        'totalConversions': total_conversions,
        'conversionRate': round(conversion_rate, 1),
        'activeLinks': active_links,
        'earnings': earnings,
        'weeklyClicks': weekly_clicks,
        'weeklyGrowth': weekly_growth,
        'referralsCount': referrals_count,
        'totalLinks': total_links
    }
    
    return jsonify(stats), 200

@app.route('/api/analytics/trends', methods=['GET'])
def get_analytics_trends():
    if 'user_id' not in session:
        return jsonify({'error': 'Not authenticated'}), 401
    
    current_user = User.query.get(session['user_id'])
    if not current_user:
        return jsonify({'error': 'User not found'}), 404
    
    from datetime import datetime, timedelta
    
    # Get real data from user's referral links
    total_clicks = sum(link.clicks for link in current_user.referral_links)
    total_conversions = sum(link.conversions for link in current_user.referral_links)
    earnings = total_conversions * 15
    
    # Calculate conversion rate
    conversion_rate = (total_conversions / total_clicks * 100) if total_clicks > 0 else 0
    
    # If user has no activity, return zero trends
    if total_clicks == 0 and total_conversions == 0:
        trends = {
            'clicks': {
                'data': [0, 0, 0, 0, 0, 0, 0],
                'period': 'Last 7 days',
                'change': 0,
                'changeType': 'neutral'
            },
            'conversions': {
                'data': [0, 0, 0, 0, 0, 0, 0],
                'period': 'Last 7 days',
                'change': 0,
                'changeType': 'neutral'
            },
            'earnings': {
                'data': [0, 0, 0, 0, 0, 0, 0],
                'period': 'Last 7 days',
                'change': 0,
                'changeType': 'neutral'
            },
            'conversionRate': {
                'data': [0, 0, 0, 0, 0, 0, 0],
                'period': 'Last 7 days',
                'change': 0,
                'changeType': 'neutral'
            }
        }
    else:
        # For users with activity, create simple trend data based on their actual stats
        # Distribute their total activity across 7 days with some variation
        clicks_per_day = total_clicks / 7
        conversions_per_day = total_conversions / 7
        earnings_per_day = earnings / 7
        
        # Create simple trend arrays with minimal variation
        def create_simple_trend(daily_value):
            if daily_value == 0:
                return [0, 0, 0, 0, 0, 0, 0]
            # Create a simple trend with small variations (±20%)
            return [max(0, int(daily_value * (0.8 + (i % 3) * 0.2))) for i in range(7)]
        
        trends = {
            'clicks': {
                'data': create_simple_trend(clicks_per_day),
                'period': 'Last 7 days',
                'change': 0 if total_clicks == 0 else 5.0,  # Small positive change for users with activity
                'changeType': 'positive' if total_clicks > 0 else 'neutral'
            },
            'conversions': {
                'data': create_simple_trend(conversions_per_day),
                'period': 'Last 7 days',
                'change': 0 if total_conversions == 0 else 3.0,
                'changeType': 'positive' if total_conversions > 0 else 'neutral'
            },
            'earnings': {
                'data': create_simple_trend(earnings_per_day),
                'period': 'Last 7 days',
                'change': 0 if earnings == 0 else 8.0,
                'changeType': 'positive' if earnings > 0 else 'neutral'
            },
            'conversionRate': {
                'data': [int(conversion_rate)] * 7,  # Keep conversion rate constant
                'period': 'Last 7 days',
                'change': 0 if conversion_rate == 0 else 2.0,
                'changeType': 'positive' if conversion_rate > 0 else 'neutral'
            }
        }
    
    return jsonify(trends), 200

@app.route('/api/analytics/admin-trends', methods=['GET'])
def get_admin_analytics_trends():
    if 'user_id' not in session or not session.get('is_admin'):
        return jsonify({'error': 'Admin access required'}), 403
    
    # Get real data from database
    total_users = User.query.count()
    total_referrals = ReferralLink.query.count()
    total_clicks = sum(link.clicks for link in ReferralLink.query.all())
    total_revenue = total_clicks * 10  # Example revenue calculation
    
    # Calculate engagement rate (users with at least one referral link)
    active_users = User.query.join(ReferralLink).distinct().count()
    engagement_rate = (active_users / total_users * 100) if total_users > 0 else 0
    
    # If there's no activity, return zero trends
    if total_clicks == 0 and total_referrals == 0:
        trends = {
            'revenue': {
                'data': [0, 0, 0, 0, 0, 0, 0],
                'period': 'Last 7 days',
                'change': 0,
                'changeType': 'neutral'
            },
            'users': {
                'data': [total_users] * 7,  # User count stays constant
                'period': 'Last 7 days',
                'change': 0,
                'changeType': 'neutral'
            },
            'referrals': {
                'data': [0, 0, 0, 0, 0, 0, 0],
                'period': 'Last 7 days',
                'change': 0,
                'changeType': 'neutral'
            },
            'engagement': {
                'data': [int(engagement_rate)] * 7,
                'period': 'Last 7 days',
                'change': 0,
                'changeType': 'neutral'
            }
        }
    else:
        # For systems with activity, create simple trend data
        revenue_per_day = total_revenue / 7
        referrals_per_day = total_referrals / 7
        
        def create_simple_trend(daily_value):
            if daily_value == 0:
                return [0, 0, 0, 0, 0, 0, 0]
            # Create a simple trend with small variations
            return [max(0, int(daily_value * (0.9 + (i % 2) * 0.2))) for i in range(7)]
        
        trends = {
            'revenue': {
                'data': create_simple_trend(revenue_per_day),
                'period': 'Last 7 days',
                'change': 0 if total_revenue == 0 else 5.0,
                'changeType': 'positive' if total_revenue > 0 else 'neutral'
            },
            'users': {
                'data': [total_users] * 7,  # User count stays constant
                'period': 'Last 7 days',
                'change': 0,
                'changeType': 'neutral'
            },
            'referrals': {
                'data': create_simple_trend(referrals_per_day),
                'period': 'Last 7 days',
                'change': 0 if total_referrals == 0 else 8.0,
                'changeType': 'positive' if total_referrals > 0 else 'neutral'
            },
            'engagement': {
                'data': [int(engagement_rate)] * 7,
                'period': 'Last 7 days',
                'change': 0 if engagement_rate == 0 else 2.0,
                'changeType': 'positive' if engagement_rate > 0 else 'neutral'
            }
        }
    
    return jsonify(trends), 200

if __name__ == '__main__':
    app.run(debug=True, port=5000)
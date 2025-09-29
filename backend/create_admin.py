#!/usr/bin/env python3
"""
Script to manually create admin user
"""

from app import app, db, User, bcrypt, generate_referral_code

def create_admin():
    with app.app_context():
        # Check if admin already exists
        admin = User.query.filter_by(username='admin').first()
        
        if admin:
            print("Admin user already exists!")
            print(f"Username: {admin.username}")
            print(f"Email: {admin.email}")
            print(f"Is Admin: {admin.is_admin}")
            return
        
        # Create admin user
        admin_password = bcrypt.generate_password_hash('admin123').decode('utf-8')
        admin = User(
            username='admin',
            email='admin@referral.com',
            password_hash=admin_password,
            is_admin=True,
            referral_code=generate_referral_code()
        )
        
        db.session.add(admin)
        db.session.commit()
        
        print("✅ Admin user created successfully!")
        print(f"Username: admin")
        print(f"Password: admin123")
        print(f"Email: admin@referral.com")
        print(f"Referral Code: {admin.referral_code}")

if __name__ == '__main__':
    create_admin()


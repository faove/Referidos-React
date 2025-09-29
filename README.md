# Elantar Referral Program - ERP

Un sistema desarrollado por Elantar para satisfacer la demanda de software de calidad para gestionar programas de referidos. Built with React + Tailwind CSS frontend and Flask Python backend with SQLite database.

## Features

- **Dual Authentication System**: Separate login for admin and regular users
- **Admin Dashboard**: User management, statistics, and system overview
- **User Dashboard**: Personal referral link generation and tracking
- **Referral Tracking**: Click tracking and conversion monitoring
- **SQLite Database**: No external database setup required

## Technology Stack

- **Frontend**: React 18, Tailwind CSS, React Router
- **Backend**: Flask, SQLAlchemy, Flask-Bcrypt, Flask-CORS
- **Database**: SQLite (included)

## Quick Start

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install Python dependencies:
```bash
pip install -r requirements.txt
```

3. Run the Flask server:
```bash
python app.py
```

The backend will be available at `http://website:5000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install Node.js dependencies:
```bash
npm install
```

3. Start the React development server:
```bash
npm start
```

The frontend will be available at `http://website:3000`

## Default Admin Credentials

- **Username**: admin
- **Password**: admin123

## API Endpoints

### Authentication
- `POST /api/register` - User registration
- `POST /api/login` - User login
- `POST /api/logout` - User logout
- `GET /api/user/profile` - Get user profile

### Admin
- `GET /api/admin/users` - Get all users (admin only)

### Referral System
- `GET /api/referral-links` - Get user's referral links
- `POST /api/referral-links` - Create new referral link
- `GET /api/referral/<link_code>` - Track referral click
- `POST /api/referral/<link_code>/convert` - Track conversion

## Database Models

### User
- id, username, email, password_hash
- is_admin, referral_code, referred_by
- created_at

### ReferralLink
- id, user_id, link_code
- clicks, conversions, created_at, is_active

### ReferralClick
- id, link_id, ip_address, user_agent, clicked_at

## Usage

1. **Admin Access**: Login with admin credentials to access user management
2. **User Registration**: Create new user accounts through the registration form
3. **Referral Links**: Users can generate unique referral links from their dashboard
4. **Link Tracking**: Referral links track clicks and conversions automatically
5. **Referral Page**: Special landing page for referral link visitors

## Features Overview

### Admin Dashboard
- View all registered users
- See user statistics and referral counts
- Monitor system activity

### User Dashboard
- Generate personal referral links
- Track link performance (clicks, conversions)
- View personal referral code
- Copy referral links to clipboard

### Referral System
- Unique referral codes for each user
- Custom referral links with tracking
- Click and conversion analytics
- Referral landing page for visitors

## Development

The application uses:
- **Flask** for the REST API backend
- **SQLAlchemy** for database ORM
- **React** for the frontend SPA
- **Tailwind CSS** for styling
- **Axios** for API communication

All database operations are handled automatically through SQLAlchemy models.


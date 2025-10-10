#!/usr/bin/env python3
"""
Run script for the Flask referral program backend
"""

from app import app

if __name__ == '__main__':
    print("Starting Referral Program Backend...")
    print("Backend will be available at: https://lacasacowork.com/api")
    print("Admin credentials: username=admin, password=admin123")
    app.run(debug=True, host='0.0.0.0', port=5000)


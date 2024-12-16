'use client';

import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

const Footer = () => (
  <footer
    className="bg-light-brown text-dark py-5 mt-auto"
    style={{ height: 'auto', backgroundColor: 'rgb(124, 138, 150)' }}
  >
    <div className="container text-center">
      {/* Key Features Section */}
      <div className="row">
        <div className="col-md-3 mb-3">
          <i className="fas fa-home fa-2x" style={{ color: '#021627' }} />
          <h6 className="mt-2" style={{ color: '#021627' }}>Personalized Home</h6>
          <p className="small text-white">Tailored matches for your preferences. Find your ideal home.</p>
        </div>
        <div className="col-md-3 mb-3">
          <i className="fas fa-list-alt fa-2x" style={{ color: '#021627' }} />
          <h6 className="mt-2" style={{ color: '#021627' }}>Home Listings</h6>
          <p className="small text-white">Browse verified property listings. Sign up to get started.</p>
        </div>
        <div className="col-md-3 mb-3">
          <i className="fas fa-user-shield fa-2x" style={{ color: '#021627' }} />
          <h6 className="mt-2" style={{ color: '#021627' }}>Verified Listings</h6>
          <p className="small text-white">Safe and accurate property data.</p>
        </div>
        <div className="col-md-3 mb-3">
          <i className="fas fa-handshake fa-2x" style={{ color: '#021627' }} />
          <h6 className="mt-2" style={{ color: '#021627' }}>Expert Guidance</h6>
          <p className="small text-white">Support from real estate professionals. Connect and close deals.</p>
        </div>
      </div>
      <div className="mt-3">
        <p className="small" style={{ color: '#021627' }}>&copy; 2024 HouseFinders.inc All rights reserved.</p>
      </div>
    </div>
  </footer>

);

export default Footer;

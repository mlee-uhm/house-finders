'use client';

import React from 'react';
import '../app/globals.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Facebook, Twitter, Reddit, Instagram } from 'react-bootstrap-icons';

import Image from 'next/image';

const Footer2 = () => (
  <footer className="footer text-white" style={{ backgroundColor: '#021627' }}>
    <div className="container">
      <div className="row mb-4">
        <div className="col-12 col-md-8">
          <nav className="footer-nav">
            <button type="button" className="btn btn-link text-white">About</button>
            <button type="button" className="btn btn-link text-white">Support</button>
            <button type="button" className="btn btn-link text-white">Contact Us</button>
            <button type="button" className="btn btn-link text-white">Press</button>
            <button type="button" className="btn btn-link text-white">API</button>
            <button type="button" className="btn btn-link text-white">Site Map</button>
          </nav>
        </div>
        <div className="col-12 col-md-4 text-md-end">
          <select className="language-select text-white" style={{ backgroundColor: '#021627' }}>
            <option className="text-white">English (US)</option>
          </select>
        </div>
      </div>
      <hr className="border-white" />
      <div className="row">
        <div className="col-12 col-md-8">
          <Image src="/HF_logo_dark.png" alt="House Finders" width={80} height={68} className="footer-logo mb-3" />
          <p className="footer-text text-white">© 2024 HouseFinders.inc</p>
          <p className="footer-text text-white">
            All trademarks referenced herein are the properties of their respective owners.
          </p>
          <div className="footer-links mt-3">
            <a href="/privacy" className="text-white">Privacy</a>
            <a href="/legal" className="text-white">Legal</a>
            <a href="/terms" className="text-white">Terms</a>
            <a href="/cookie-policy" className="text-white">Cookie Policy</a>
            <a href="/cookie-settings" className="text-white">Cookie Settings</a>
          </div>
        </div>
        <div className="col-12 col-md-4 text-md-end">
          <div className="social-icons mb-3">
            <a href="https://twitter.com" className="text-white"><Twitter size={20} color="white" /></a>
            <a href="https://www.facebook.com" className="text-white"><Facebook size={20} color="white" /></a>
            <a href="https://www.reddit.com" className="text-white"><Reddit size={20} color="white" /></a>
            <a href="https://www.instagram.com" className="text-white"><Instagram size={20} color="white" /></a>
          </div>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer2;

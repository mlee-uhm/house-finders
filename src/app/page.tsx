/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable max-len */
/* eslint-disable react/jsx-no-comment-textnodes */

'use client';

import { Col, Container, Row } from 'react-bootstrap';
import { ChevronDown } from 'react-bootstrap-icons';
import Image from 'next/image';
import Script from 'next/script';
import { useState } from 'react';

/** The Home page. */
const Home = () => {
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null);

  const toggleDropdown = (index: number) => {
    setActiveDropdown(activeDropdown === index ? null : index);
  };

  const houses = [
    {
      image: '/House1FullView.jpg',
      badge: 'Manoa',
      title: 'Beautiful House 1',
      id: 'house1',
    },
    {
      id: 'house2',
      image: '/House2FullView.jpg',
      badge: 'Manoa',
      title: 'Beautiful House 2',
    },
    {
      id: 'house3',
      image: '/House3FullView.jpg',
      badge: 'Manoa',
      title: 'Beautiful House 3',
    },
  ];

  return (
    <div style={{ fontFamily: 'Merriweather, serif', fontSize: '18px' }}>
      <Container id="landing-page" fluid className="d-flex justify-content-center align-items-center vh-150">
        <Row className="text-center">
          <Col xs={12}>
            <div
              style={{
                padding: '65px',
                color: 'black',
                textShadow: '2px 2px 4px #F0E68C, -2px -2px 4px #F0E68C' }}
            >
              <h1>Welcome to Your House Finding Journey</h1>
              <h5>
                <strong>
                  A housing finder website connects students seeking roommates with
                  each other and trusted landlords who offer student-friendly rentals.
                  Our platform is designed to help students find the perfect place to
                  live.
                </strong>
              </h5>
            </div>
            <div className="container swiper d-flex justify-content-between">
              {houses.map((house, index) => (
                <div key={house.id} className="card-wrapper position-relative">
                  <ul className="card-list swiper-wrapper">
                    <li className="card-item swiper-slide">
                      <a
                        href="#"
                        className="card-link"
                        style={{
                          width: '400px',
                          display: 'block',
                          background: 'white',
                          padding: '18px',
                          borderRadius: '12px',
                          textDecoration: 'none',
                        }}
                      >
                        <Image
                          src={house.image}
                          alt="House"
                          className="card-image"
                          width={500}
                          height={300}
                          style={{
                            width: '100%',
                            aspectRatio: '16/9',
                            height: '200px',
                            objectFit: 'cover',
                            borderRadius: '10px',
                          }}
                        />
                        <p className="badge" style={{ color: 'black' }}>{house.badge}</p>
                        <h2 className="card-title">{house.title}</h2>
                        <button
                          type="button"
                          className="card-button position-relative"
                          style={{
                            backgroundColor: 'transparent',
                            border: 'none',
                            display: 'flex',
                            alignItems: 'center',
                          }}
                          onClick={() => toggleDropdown(index)}
                        >
                          View Details
                          <ChevronDown className="ml-2" style={{ width: '1em', height: '1em' }} />
                        </button>

                        {/* Dropdown Menu */}
                        {activeDropdown === index && (
                        <div
                          className="dropdown-menu"
                          style={{
                            display: 'block',
                            position: 'absolute',
                            top: '100%',
                            left: 0,
                            width: '100%',
                            zIndex: 10,
                            backgroundColor: 'white',
                            boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                            borderRadius: '8px',
                            padding: '10px',
                            marginTop: '10px',
                          }}
                        >
                          <div className="dropdown-section mb-2" />
                          <div className="dropdown-section mb-2">
                            <strong>Price</strong>
                            <p>
                              {index === 0 && '$1700'}
                              {index === 1 && '$2000'}
                              {index === 2 && '$2500'}
                            </p>
                          </div>
                          <div className="dropdown-section mb-2">
                            <strong>Bedrooms</strong>
                            <p>
                              {index === 0 && '2 Bedrooms'}
                              {index === 1 && '3 Bedrooms'}
                              {index === 2 && '3 Bedrooms'}
                            </p>
                          </div>
                          <div className="dropdown-section">
                            <strong>Bathrooms</strong>
                            <p>
                              {index === 0 && '1.5 Bathroom'}
                              {index === 1 && '2.5 Bathrooms'}
                              {index === 2 && '3.5 Bathrooms'}
                            </p>
                          </div>
                        </div>
                        )}
                      </a>
                    </li>
                  </ul>
                </div>
              ))}
              <div className="swiper-pagination" />
              <div className="swiper-button-prev" />
              <div className="swiper-button-next" />
            </div>

            <Script src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js" strategy="afterInteractive" />
            <Script src="./script.js" strategy="afterInteractive" />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Home;

/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable max-len */
/* eslint-disable react/jsx-no-comment-textnodes */
import { Col, Container, Row } from 'react-bootstrap';
import { Property } from '@prisma/client';
import PropertyCard from '@/components/PropertyCard';
import { prisma } from '@/lib/prisma';

/** The Home page. */
const Home = async () => {
  const properties: Property[] = await prisma.property.findMany();

  const shuffledProperties = properties.sort(() => 0.5 - Math.random());
  const threeProps = shuffledProperties.slice(0, 3);

  return (
    <div style={{ fontFamily: 'Merriweather, serif', fontSize: '18px' }}>
      <Container id="landing-page" fluid className="d-flex justify-content-center align-items-center vh-150">
        <Row className="text-center mb-5">
          <Col xs={12}>
            <div
              style={{
                padding: '65px',
                color: 'rgb(141, 164, 184)' }}
            >
              <h1 style={{ color: 'rgb(195, 209, 222)' }}>Welcome to Your House Finding Journey</h1>
              <h5>
                <strong>
                  A housing finder website connects students seeking roommates with
                  each other and trusted landlords who offer student-friendly rentals.
                  Our platform is designed to help students find the perfect place to
                  live.
                </strong>
              </h5>
            </div>
            <div className="container swiper d-flex justify-content-between" style={{ marginBottom: '50px' }}>
              {threeProps.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Home;

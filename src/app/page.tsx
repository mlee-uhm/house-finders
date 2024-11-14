import { Col, Container, Row } from 'react-bootstrap';

/** The Home page. */
const Home = () => (
  <main style={{ fontFamily: 'Merriweather, serif', fontSize: '18px' }}>
    <Container id="landing-page" fluid className="d-flex justify-content-center align-items-center vh-150">
      <Row className="text-center">
        <Col xs={12}>
          <div
            style={{
              padding: '65px',
              color: 'black',
              textShadow: '2px 2px 4px #F0E68C, -2px -2px 4px #F0E68C' }}
          >
            <h1>Welcome to your House Finding Journey</h1>
            <h5>
              <strong>
                A housing finder website connects students seeking roommates with
                each other and trusted landlords who offer student-friendly rentals.
                Our platform is designed to help students find the perfect place to
                live.
              </strong>
            </h5>
          </div>
        </Col>
      </Row>
    </Container>
  </main>
);

export default Home;

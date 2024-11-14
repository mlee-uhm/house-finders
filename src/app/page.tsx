import { Col, Container, Row } from 'react-bootstrap';

/** The Home page. */
const Home = () => (
  <main>
    <Container id="landing-page" fluid className="d-flex justify-content-center align-items-center vh-150">
      <Row className="text-center">
        <Col xs={12}>
          <div style={{ padding: '50px' }}>
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

import { getServerSession } from 'next-auth';
import { Col, Container, Row } from 'react-bootstrap';
import { loggedInProtectedPage } from '@/lib/page-protection';
import authOptions from '@/lib/authOptions';
import { Property } from '@prisma/client';
import PropertyCard from '@/components/PropertyCard';
import { prisma } from '@/lib/prisma';

/** Render a list of stuff for the logged in user. */
const ListProperties = async () => {
  // Protect the page, only logged in users can access it.
  const session = await getServerSession(authOptions);
  loggedInProtectedPage(
    session as {
      user: { email: string; id: string; randomKey: string };
      // eslint-disable-next-line @typescript-eslint/comma-dangle
    } | null,
  );

  const landlord = session?.user!.email ? session.user.email : '';
  const properties: Property[] = await prisma.property.findMany({
    where: {
      landlord,
    },
  });

  return (
    <div>
      <Container id="list" fluid className="py-3">
        <Container>
          <Row>
            <Col>
              <h2
                className="text-center"
                style={{ fontFamily: 'Merriweather, serif',
                  fontSize: '50px',
                  color: 'rgb(31, 72, 155)',
                  textShadow: '0 0 5px rgb(189, 204, 120)',
                }}
              >
                <strong>
                  Your Properties
                </strong>
              </h2>
              <Row xs={1} md={2} lg={3} className="g-4">
                {properties.map((property: Property) => (
                  <Col>
                    <PropertyCard key={property.id} property={property} />
                  </Col>
                ))}
              </Row>
            </Col>
          </Row>
        </Container>
      </Container>
    </div>
  );
};

export default ListProperties;

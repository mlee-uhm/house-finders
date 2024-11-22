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
    <main>
      <Container id="list" fluid className="py-3">
        <Row>
          <Col>
            {properties.map((property: Property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </Col>
        </Row>
      </Container>
    </main>
  );
};

export default ListProperties;

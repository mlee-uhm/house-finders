import { getServerSession } from 'next-auth';
import { notFound } from 'next/navigation';
import { Property } from '@prisma/client';
import authOptions from '@/lib/authOptions';
import { loggedInProtectedPage } from '@/lib/page-protection';
import { prisma } from '@/lib/prisma';
import { Container, Row, Col, Card, Image } from 'react-bootstrap';

type TParam = Promise<{ slug: string[] }>;
export default async function PropertyPage({ params }: { params: TParam }) {
  const session = await getServerSession(authOptions);
  loggedInProtectedPage(
    session as {
      user: { email: string; id: string; randomKey: string };
    } | null,
  );

  console.log(params);
  const { slug } = await params;
  const id = Number(slug);
  const property: Property | null = await prisma.property.findUnique({
    where: { id },
  });
  if (!property) {
    return notFound();
  }
  console.log(slug);
  const landlord = await prisma.user.findUnique({
    where: { email: property.landlord },
  });
  if (!landlord) {
    return notFound();
  }
  console.log(`Landlord ID: ${landlord.id}`);

  return (
    <Container className="py-3">
      <Row className="justify-content-center p-3">
        <Image
          src={property.images}
          alt="Full view of the house"
          width={500}
          height={300}
          style={{ width: '50%', height: 'auto' }}
        />
      </Row>
      <Row className="justify-content-center">
        <Col className="text-center">
          <h2 style={{ color: 'rgb(141, 164, 184)' }}>
            $
            {property.price}
            /month
          </h2>
          <h4 style={{ color: 'white' }}>{property.address}</h4>
        </Col>
        <Col className="text-center">
          <Container>
            <Row>
              <Col>
                <h2><strong style={{ color: 'rgb(141, 164, 184)' }}>{property.bedrooms}</strong></h2>
                <span style={{ color: 'white' }}>beds</span>
              </Col>
              <Col>
                <h2><strong style={{ color: 'rgb(141, 164, 184)' }}>{property.bathrooms}</strong></h2>
                <span style={{ color: 'white' }}>baths</span>
              </Col>
              <Col>
                <h2><strong style={{ color: 'rgb(141, 164, 184)' }}>{property.sqft}</strong></h2>
                <span style={{ color: 'white' }}>sqft</span>
              </Col>
            </Row>
          </Container>
        </Col>
        <Col>
          <Card
            className="p-2 rounded"
            style={{
              width: '50%',
              backgroundColor: 'transparent',
              borderWidth: '2px',
              borderColor: 'rgb(141, 164, 184)',
              textAlign: 'center',
            }}
          >
            <div style={{ backgroundColor: 'rgb(141, 164, 184)',
              color: 'white',
              padding: '10px',
              borderRadius: '5px' }}
            >
              Contact Information:
              {' '}
              {landlord.email}
            </div>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

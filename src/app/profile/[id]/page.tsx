import { getServerSession } from 'next-auth';
import { notFound } from 'next/navigation';
import { Property } from '@prisma/client';
import authOptions from '@/lib/authOptions';
import { loggedInProtectedPage } from '@/lib/page-protection';
import { prisma } from '@/lib/prisma';
// import EditPropertyForm from '@/components/EditPropertyForm';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import Image from 'next/image';
import Link from 'next/link';
// import { errors } from '@playwright/test';
// import { register } from 'module';
// import { classValidatorResolver } from '@hookform/resolvers/class-validator';
// import { Sliders } from 'react-bootstrap-icons';

/*
type TParam = Promise<{ slug: string[] }>;
export default async function EditStuffPage({ params }: { params: TParam }) {
  // Protect the page, only logged in users can access it.
  const session = await getServerSession(authOptions);
  const user = session?.user as { id: string; email?: string | null; name?: string | null; image?: string | null };
  loggedInProtectedPage(
    session as {
      user: { email: string; id: string; randomKey: string };
      // eslint-disable-next-line @typescript-eslint/comma-dangle
    } | null,
  );

  console.log(params);
  const { slug } = await params;
  const id = 6; //Number(slug[1]);
  // const id = Number(Array.isArray(params?.id) ? params?.id[0] : params?.id);

  const property: Property | null = await prisma.property.findUnique({
    where: { id },
  });
  // console.log(stuff);
  if (!property) {
    return notFound();
  }
  console.log(slug);
  return (
    <div>
      <EditPropertyForm property={property} />
    </div>
  );
}

*/

export default async function ProfilePage({ params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  // const user = session?.user as { id: string; email?: string | null; name?: string | null; image?: string | null };
  loggedInProtectedPage(
    session as {
      user: { email: string; id: string; randomKey: string };
      // eslint-disable-next-line @typescript-eslint/comma-dangle
    } | null,
  );

  const awaitedParams = await params;
  console.log('Received params:', awaitedParams); // Add this line to log params
  const id = Number(Array.isArray(awaitedParams?.id) ? awaitedParams?.id[0] : awaitedParams?.id);
  console.log('Parsed id:', id); // Add this line to log the parsed id

  const profile = await prisma.user.findUnique({
    where: { id },
  });
  if (!profile) {
    return notFound();
  }

  return (
    <Container className="py-3">
      <Row className="justify-content-center p-3">
        <Col>
          <Image
            src="/profile-placeholder.jpg"
            alt="Full view of the house"
            width={500}
            height={300}
            style={{ width: '50%', height: 'auto' }}
          />
        </Col>
        <Col>
          <Row>
            <h2 className="text-center">
              Email:
              {' '}
              {profile.email}
            </h2>
          </Row>
          <Row />
        </Col>
      </Row>
      <Row className="justify-content-center">
        {/*  */}
      </Row>
    </Container>
  );
}

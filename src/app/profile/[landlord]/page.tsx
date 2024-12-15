import { getServerSession } from 'next-auth';
import { notFound } from 'next/navigation';
import { User } from '@prisma/client';
import authOptions from '@/lib/authOptions';
import { loggedInProtectedPage } from '@/lib/page-protection';
import { prisma } from '@/lib/prisma';
// import EditPropertyForm from '@/components/EditPropertyForm';
import { Container, Row } from 'react-bootstrap';
import Image from 'next/image';
// import { errors } from '@playwright/test';
// import { register } from 'module';
// import { classValidatorResolver } from '@hookform/resolvers/class-validator';
// import { Sliders } from 'react-bootstrap-icons';

/*
type TParam = Promise<{ slug: string[] }>;
export default async function EditStuffPage({ params }: { params: TParam }) {
  // Protect the page, only logged in users can access it.
  const session = await getServerSession(authOptions);
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

export default async function ProfilePage({ params }: { params: { email: string } }) {
  const session = await getServerSession(authOptions);
  loggedInProtectedPage(
    session as {
      user: { email: string; id: string; randomKey: string };
      // eslint-disable-next-line @typescript-eslint/comma-dangle
    } | null,
  );

  const email = Array.isArray(params?.email) ? params?.email[0] : params?.email;
  if (!email) {
    return notFound();
  }
  const profile: User | null = await prisma.user.findUnique({
    where: { email },
  });
  // console.log(stuff);
  if (!profile) {
    return notFound();
  }
  console.log(email);
  return (
    <Container className="py-3">
      <Row className="justify-content-center p-3">
        <Image
          src="/House1FullView.jpg"
          alt="Full view of the house"
          width={500}
          height={300}
          style={{ width: '50%', height: 'auto' }}
        />
      </Row>
      {/* <Row className="justify-content-center">
      </Row> */}
    </Container>
  );
}

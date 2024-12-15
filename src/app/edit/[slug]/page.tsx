import { getServerSession } from 'next-auth';
import { notFound } from 'next/navigation';
import { Property } from '@prisma/client';
import authOptions from '@/lib/authOptions';
import { loggedInProtectedPage } from '@/lib/page-protection';
import { prisma } from '@/lib/prisma';
import EditPropertyForm from '@/components/EditPropertyForm';
// import { classValidatorResolver } from '@hookform/resolvers/class-validator';
// import { Sliders } from 'react-bootstrap-icons';

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
  const id = Number(slug[0]);
  console.log(id);
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

/*
export default async function EditStuffPage({ params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  loggedInProtectedPage(
    session as {
      user: { email: string; id: string; randomKey: string };
      // eslint-disable-next-line @typescript-eslint/comma-dangle
    } | null,
  );

  const id = Number(Array.isArray(params?.id) ? params?.id[0] : params?.id);
  const property: Property | null = await prisma.property.findUnique({
    where: { id },
  });
  // console.log(stuff);
  if (!property) {
    return notFound();
  }
  console.log(id);
  return (
    <div>
      <EditPropertyForm property={property} />
    </div>
  );
}
*/

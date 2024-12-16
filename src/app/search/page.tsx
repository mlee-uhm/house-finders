import { prisma } from '@/lib/prisma';
import Search from '@/components/searchClient';

export default async function SearchPage() {
  // Fetch properties directly
  const properties = await prisma.property.findMany();

  return (
    <div>
      <Search properties={properties} />
    </div>
  );
}

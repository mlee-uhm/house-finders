'use client';

import { Property } from '@prisma/client';
import Link from 'next/link';
import { Card } from 'react-bootstrap';

/* Renders a single Property. See list/page.tsx. */
const PropertyCard = ({ property }: { property: Property }) => (
  <Card>
    <Card.Body>
      <Card.Title>
        {property.address}
      </Card.Title>
      <Card.Subtitle>
        {property.price}
      </Card.Subtitle>
      <Card.Text>
        {property.bedrooms}
        bedrooms,
        {property.bathrooms}
        bathrooms,
        {property.sqft}
        sqft
      </Card.Text>
      <Card.Footer>
        {property.condition}
        <br />
        {property.landlord}
      </Card.Footer>
      <Link href={`/edit/${property.id}`}>Edit</Link>
    </Card.Body>
  </Card>
);

export default PropertyCard;

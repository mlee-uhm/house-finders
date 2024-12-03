'use client';

import { Property } from '@prisma/client';
import Link from 'next/link';
import { Card, ListGroup } from 'react-bootstrap';
import placeholder from '../../public/placeholder.png';

/* Renders a single Property. See list/page.tsx. */
const PropertyCard = ({ property }: { property: Property }) => (
  <Card border="info" style={{ width: '20rem' }}>
    <Card.Img src={placeholder.src} variant="top" height={180} />
    <Card.Body>
      <Card.Title>{property.address}</Card.Title>
      <Card.Subtitle>
        $&nbsp;
        {property.price}
      </Card.Subtitle>
      <Card.Subtitle>
        {property.id}
      </Card.Subtitle>
      <Card.Text>
        Condition: &nbsp;
        {property.condition}
        <br />
      </Card.Text>
      <ListGroup className="list-group-flush">
        <ListGroup.Item>
          {property.bedrooms}
          &nbsp; bedrooms
        </ListGroup.Item>
        <ListGroup.Item>
          {property.bathrooms}
          &nbsp; bathrooms
        </ListGroup.Item>
        <ListGroup.Item>
          {property.sqft}
          &nbsp; sqft
        </ListGroup.Item>
      </ListGroup>
      <Card.Footer>
        Landlord: &nbsp;
        {property.landlord}
      </Card.Footer>
      <Link href={`/edit/${property.id}`}>Edit</Link>
    </Card.Body>
  </Card>
);

export default PropertyCard;

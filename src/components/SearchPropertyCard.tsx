'use client';

import { Property } from '@prisma/client';
import Link from 'next/link';
import { Card, ListGroup } from 'react-bootstrap';

/* Renders a single Property. See list/page.tsx. */
const SearchPropertyCard = ({ property }: { property: Property }) => {
  const conditionStyle = {
    AVAILABLE: { color: 'green' },
    UNAVAILABLE: { color: 'red' },
    PENDING: { color: '#FE9705' },
  };

  return (
    <Card border="info" style={{ width: '20rem' }}>
      <Card.Img src={property.images} variant="top" height={180} />
      <Card.Body>
        <Card.Title>
          <Link href={`/property/${property.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
            {property.address}
          </Link>
        </Card.Title>
        <Card.Subtitle>
          $&nbsp;
          {property.price}
        </Card.Subtitle>
        <Card.Text style={{ color: 'black' }}>
          Condition: &nbsp;
          <span style={conditionStyle[property.condition]}>{property.condition}</span>
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
        <div className="d-flex justify-content-between align-items-center">
          <Card.Subtitle>{property.id}</Card.Subtitle>
        </div>
      </Card.Body>
    </Card>
  );
};

export default SearchPropertyCard;

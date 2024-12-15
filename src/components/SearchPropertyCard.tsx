'use client';

import { Property } from '@prisma/client';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { Card, ListGroup } from 'react-bootstrap';
import { ArrowRight } from 'react-bootstrap-icons';
// import placeholder from '../../public/placeholder.png';

/* Renders a single Property. See list/page.tsx. */
const SearchPropertyCard = ({ property }: { property: Property }) => {
  const { data: session } = useSession();
  const isOwner = session?.user?.email === property.landlord;

  const conditionStyle = {
    AVAILABLE: { color: 'green' },
    UNAVAILABLE: { color: 'red' },
    PENDING: { color: 'yellow' },
  };

  return (
    <Card border="info" style={{ width: '20rem' }}>
      <Card.Img src={property.images[0]} variant="top" height={180} />
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
        <Card.Text>
          Condition: &nbsp;
          <span style={conditionStyle[property.condition]}>
            {property.condition}
          </span>
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
          <Card.Subtitle>
            {property.id}
          </Card.Subtitle>
          {isOwner && (
            <Link href={`/property/${property.id}`} className="d-flex justify-content-end">
              <button
                type="button"
                className="btn btn-primary btn-sm mt-2"
                style={{ padding: '0.25rem 0.5rem', fontSize: '0.75rem', backgroundColor: 'green' }}
              >
                <ArrowRight color="white" />
                <div>Info</div>
              </button>
            </Link>
          )}
        </div>
      </Card.Body>
    </Card>
  );
};

export default SearchPropertyCard;
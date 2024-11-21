'use client';

import { Card } from 'react-bootstrap';
import { User, Subrole } from '@prisma/client';

/* Renders a single contact. See list/page.tsx. */
interface UserWithSubrole extends User {
  subrole: Subrole;
}

const ContactCardAdmin = ({ user }: { user: UserWithSubrole }) => (
  <Card className="h-100">
    <Card.Header>
      <span>{user.id}</span>
      <Card.Title>
        {user.email}
        {' '}
      </Card.Title>
      <Card.Subtitle>{user.role}</Card.Subtitle>
    </Card.Header>
    <Card.Body>
      <Card.Text>{user.subrole}</Card.Text>
      <p className="blockquote-footer" />
    </Card.Body>

  </Card>
);

export default ContactCardAdmin;

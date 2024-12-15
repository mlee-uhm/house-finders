/* eslint-disable react/jsx-indent, @typescript-eslint/indent */

'use client';

import { useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { BoxArrowRight, Lock, PersonFill, PersonPlusFill, HouseFill, Search } from 'react-bootstrap-icons';
import Image from 'next/image';

const NavBar: React.FC = () => {
  const { data: session } = useSession();
  const currentUser = session?.user?.email;
  const userWithRole = session?.user as { email: string; randomKey: string; subrole: string; };
  const role = userWithRole?.randomKey;
  const subrole = userWithRole?.subrole;
  const pathName = usePathname();
  // console.log('Subrole:', subrole);
  return (
    <Navbar
      bg="light"
      expand="lg"
      style={{ fontFamily: 'Merriweather, serif', display: 'flex', alignItems: 'center', fontSize: '22px' }}
    >
      <Container style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <Navbar.Brand
        className="me-auto justify-content-left"
        href="/"
        style={{ fontFamily: 'Georgia, serif', display: 'flex', alignItems: 'center', fontSize: '28px' }}
      >
        <Image
          src="/HF_logo.png"
          alt="Logo"
          width={80}
          height={68}
          style={{ marginRight: '8px' }}
        />
        House Finders
      </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ms-auto" style={{ marginRight: '28px' }}>
          <Nav.Link id="for-rent-nav" href="/for-rent" key="for-rent" active={pathName === '/for-rent'}>
          <HouseFill className="ml-2" style={{ width: '1em', height: '1em' }} />
            For Rent
          </Nav.Link>
        </Nav>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Nav className="justify-content-center" style={{ marginRight: '30px' }}>
          <Nav.Link id="search-nav" href="/search" key="search" active={pathName === '/search'}>
            <Search className="ml-2" style={{ width: '1em', height: '1em' }} />
            Search
          </Nav.Link>
        </Nav>
            {currentUser && subrole === 'LANDLORD' ? (
              [
                <Nav.Link
                  id="add-stuff-nav"
                  href="/add"
                  key="add"
                  active={pathName === '/add'}
                  style={{ marginRight: '15px' }}
                >
                Add Properties
                </Nav.Link>,
              ]
            ) : ''}
            {currentUser ? (
              [
                <Nav.Link
                  id="list-stuff-nav"
                  href="/list"
                  key="list"
                  active={pathName === '/list'}
                  style={{ marginRight: '15px' }}
                >
                My Properties
                </Nav.Link>,
            ]
          ) : ''}
            {currentUser && role === 'ADMIN' ? (
              <Nav.Link
                id="admin-stuff-nav"
                href="/admin"
                key="admin"
                active={pathName === '/admin'}
                style={{ marginRight: '15px' }}
              >
              Admin
              </Nav.Link>
            ) : (
              ''
            )}

          <Nav>
            {session ? (
              <NavDropdown id="login-dropdown" title={currentUser}>
                <NavDropdown.Item id="login-dropdown-sign-out" href="/api/auth/signout">
                  <BoxArrowRight className="ml-2" style={{ width: '1em', height: '1em' }} />
                  Sign Out
                </NavDropdown.Item>
                <NavDropdown.Item id="login-dropdown-change-password" href="/auth/change-password">
                  <Lock className="ml-2" style={{ width: '1em', height: '1em' }} />
                  Change Password
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <NavDropdown id="login-dropdown" title="Login">
                <NavDropdown.Item id="login-dropdown-sign-in" href="/auth/signin">
                  <PersonFill className="ml-2" style={{ width: '1em', height: '1em' }} />
                  Sign in
                </NavDropdown.Item>
                <NavDropdown.Item id="login-dropdown-sign-up" href="/auth/signup">
                  <PersonPlusFill className="ml-2" style={{ width: '1em', height: '1em' }} />
                  Sign up
                </NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>
      </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;

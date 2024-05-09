// Navb.js
import React from 'react';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { Auth } from 'aws-amplify';
import './Navb.css';

function Navb() {
  const handleLogout = async () => {
    try {
      await Auth.signOut();
      window.location.reload();
    } catch (error) {
      console.log('Error signing out: ', error);
    }
  };

  return (
    <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">Dashboard</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            {/* Links for the left side of the navbar */}
          </Nav>
          <Nav>
            {/* Space between links */}
            <Nav.Link disabled> </Nav.Link>
            {/* User Profile */}
            <a href="/user-profile" className="nav-link">User Profile</a>
            {/* Space between links */}
            <Nav.Link disabled> </Nav.Link>
            {/* Report Dropdown */}
            <NavDropdown title="Report" id="collapsible-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Download Report</NavDropdown.Item>
            </NavDropdown>
            {/* Space between links */}
            <Nav.Link disabled> </Nav.Link>
            {/* Log out */}
            <Nav.Link href="#pricing" onClick={handleLogout}>Log out</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navb;

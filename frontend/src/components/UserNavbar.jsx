import React, { useState } from "react";
import { Link } from "react-router";
import { Bus } from "lucide-react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";

const UserNavbar = () => {
  const [expanded, setExpanded] = useState(false);

  return (
    <Navbar
      expand="md"
      className="bg-white shadow-sm sticky-top"
      expanded={expanded}
      onToggle={() => setExpanded(!expanded)}
    >
      <Container>
        <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
          <Bus size={32} style={{ color: "#364F6B" }} className="me-2" />
          <span
            style={{
              color: "#364F6B",
              fontWeight: "bold",
              fontSize: "1.25rem",
            }}
          >
            BusPro
          </span>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link
              as={Link}
              to="/login"
              style={{ color: "#364F6B" }}
              className="me-3"
            >
              Login
            </Nav.Link>
            <Button
              as={Link}
              to="/signup"
              style={{
                backgroundColor: "#364F6B",
                borderColor: "#364F6B",
              }}
              className="px-4"
            >
              Register
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default UserNavbar;

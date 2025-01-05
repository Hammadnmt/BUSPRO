// /* eslint-disable no-unused-vars */
import { useNavigate } from "react-router";
import { useLogoutUserMutation } from "../features/auth/authSlice";
import { Button, Container, Nav, Navbar } from "react-bootstrap";

import { LinkContainer } from "react-router-bootstrap";

function Navigation() {
  // const navigate = useNavigate();
  // const [logoutUser] = useLogoutUserMutation();

  async function logoutButton() {
    try {
      await logoutUser();
      // navigate("/login");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Container fluid className="py-3 bg-dark">
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container fluid>
          <Navbar.Brand href="/admin/dashboard">Admin Dashboard</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <LinkContainer to="/admin/dashboard">
                <Nav.Link>Dashboard</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/admin/user">
                <Nav.Link>Users</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/admin/bus">
                <Nav.Link>Buses</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/admin/route">
                <Nav.Link>Routes</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/admin/trip">
                <Nav.Link>Trips</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/admin/booking">
                <Nav.Link>Bookings</Nav.Link>
              </LinkContainer>
            </Nav>
            <Button variant="light" onClick={logoutButton}>
              Logout
            </Button>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </Container>
  );
}

export default Navigation;

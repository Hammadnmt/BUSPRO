import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { Bus } from "lucide-react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { useLogoutUserMutation } from "../features/auth/authSlice";

const UserNavbar = () => {
  const navigate = useNavigate();

  const [expanded, setExpanded] = useState(false);
  const [logoutUser, { isSuccess }] = useLogoutUserMutation();
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (isSuccess) {
      navigate("/login");
    }
  }, [isSuccess, navigate]);

  async function logoutButton() {
    try {
      await logoutUser();
    } catch (error) {
      console.log(error);
    }
  }

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
            {user?.accessToken && user?.role === "Admin" ? (
              <>
                <Nav.Link
                  as={Link}
                  to="/admin/dashboard"
                  style={{ color: "#364F6B" }}
                  className="me-3"
                >
                  Admin
                </Nav.Link>
                <Button
                  onClick={logoutButton}
                  style={{
                    backgroundColor: "#364F6B",
                    borderColor: "#364F6B",
                  }}
                  className="px-4"
                >
                  Logout
                </Button>
              </>
            ) : user?.accessToken && user?.role === "User" ? (
              <Button
                onClick={logoutButton}
                style={{
                  backgroundColor: "#364F6B",
                  borderColor: "#364F6B",
                }}
                className="px-4"
              >
                Logout
              </Button>
            ) : (
              <>
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
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default UserNavbar;

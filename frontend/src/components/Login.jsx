import React from "react";
import { useNavigate, Link } from "react-router";
import { useLoginUserMutation } from "../features/auth/authSlice";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Spinner,
} from "react-bootstrap";

const Login = () => {
  const navigate = useNavigate();
  const [loginUser, { isLoading }] = useLoginUserMutation();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  React.useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user?.accessToken) {
      navigate("/admin/dashboard");
    }
  }, [navigate]);

  const onSubmit = async (data, e) => {
    e.preventDefault();
    try {
      await loginUser(data).unwrap();
      navigate("/admin/dashboard");
    } catch (err) {
      console.log(err);
      if (err?.message) {
        toast.error(err?.message);
        reset();
      } else {
        toast.error("An error occurred. Try again later.");
      }
    }
  };

  if (isLoading) {
    return (
      <Container className="min-vh-100 d-flex align-items-center justify-content-center">
        <Spinner animation="border" style={{ color: "#364F6B" }} role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Container>
    );
  }

  return (
    <Container
      fluid
      className="min-vh-100 bg-light d-flex align-items-center justify-content-center p-4"
    >
      <Row className="justify-content-center w-100">
        <Col xs={12} sm={10} md={8} lg={6} xl={5}>
          <Card className="border-0 shadow-lg">
            <div className="py-3 px-4" style={{ backgroundColor: "#364F6B" }}>
              <h2 className="text-white text-center mb-0 fw-bold">
                Welcome to BusPro
              </h2>
            </div>

            <Card.Body className="p-4">
              <h3
                className="text-center mb-4 fw-semibold"
                style={{ color: "#364F6B" }}
              >
                Login to Your Account
              </h3>

              <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Group className="mb-3">
                  <Form.Label style={{ color: "#364F6B" }}>
                    Email Address
                  </Form.Label>
                  <Form.Control
                    type="email"
                    isInvalid={!!errors.email}
                    placeholder="Enter your email"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value:
                          /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                        message: "Invalid email format",
                      },
                    })}
                    style={{
                      borderColor: errors.email ? "#FC5185" : "#364F6B",
                    }}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.email?.message}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label style={{ color: "#364F6B" }}>Password</Form.Label>
                  <Form.Control
                    type="password"
                    isInvalid={!!errors.password}
                    placeholder="Enter your password"
                    {...register("password", {
                      required: "Password is required",
                    })}
                    style={{
                      borderColor: errors.password ? "#FC5185" : "#364F6B",
                    }}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.password?.message}
                  </Form.Control.Feedback>
                </Form.Group>

                <Button
                  type="submit"
                  className="w-100 mb-3"
                  disabled={isLoading}
                  style={{
                    backgroundColor: "#364F6B",
                    borderColor: "#364F6B",
                  }}
                >
                  {isLoading ? "Logging in..." : "Login"}
                </Button>
              </Form>

              <div className="text-center">
                <Link
                  to="/signup"
                  style={{
                    color: "#3FC1C9",
                    textDecoration: "none",
                  }}
                  className="hover-effect"
                >
                  New to BusPro? Register here!
                </Link>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;

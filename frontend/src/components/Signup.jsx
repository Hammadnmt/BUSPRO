import React from "react";
import { useNavigate, Navigate, Link } from "react-router";
import { useForm } from "react-hook-form";
import { useRegisterUserMutation } from "../features/auth/authSlice";
import { ToastContainer, toast } from "react-toastify";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Spinner,
} from "react-bootstrap";
import "react-toastify/dist/ReactToastify.css";

const Signup = () => {
  const navigate = useNavigate();
  const [registerUser, { isLoading, isSuccess }] = useRegisterUserMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (formData) => {
    try {
      await registerUser(formData).unwrap();
      toast.success("Registered");
    } catch (err) {
      console.log(err);
      if (err?.message) {
        toast.error(err?.message);
      } else {
        toast.error("An error occurred. Try again later.");
      }
    }
  };

  React.useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user?.accessToken) {
      // navigate("/admin/dashboard");
      <Navigate to={"/admin/dashboard"} />
    }
    if (isSuccess) navigate("/login");
  }, [isSuccess, navigate]);

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
      <ToastContainer />
      <Row className="justify-content-center w-100">
        <Col xs={12} sm={10} md={8} lg={6}>
          <Card className="border-0 shadow-lg">
            <div className="py-3 px-4" style={{ backgroundColor: "#364F6B" }}>
              <h2 className="text-white text-center mb-0 fw-bold">
                Join BusPro
              </h2>
            </div>

            <Card.Body className="p-4">
              <h3
                className="text-center mb-4 fw-semibold"
                style={{ color: "#364F6B" }}
              >
                Create Your Account
              </h3>

              <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Group className="mb-3">
                  <Form.Label style={{ color: "#364F6B" }}>
                    Full Name
                  </Form.Label>
                  <Form.Control
                    type="text"
                    isInvalid={!!errors.name}
                    placeholder="Enter your name"
                    {...register("name", { required: "Name is required" })}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.name?.message}
                  </Form.Control.Feedback>
                </Form.Group>

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
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.email?.message}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label style={{ color: "#364F6B" }}>Password</Form.Label>
                  <Form.Control
                    type="password"
                    isInvalid={!!errors.password}
                    placeholder="Enter your password"
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 6,
                        message: "Password must be at least 6 characters",
                      },
                    })}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.password?.message}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label style={{ color: "#364F6B" }}>
                    Phone Number
                  </Form.Label>
                  <Form.Control
                    type="text"
                    isInvalid={!!errors.phone_number}
                    placeholder="+92XXXXXXXXXX"
                    {...register("phone_number", {
                      required: "Phone number is required",
                      pattern: {
                        value: /^\+92\d{10}$/,
                        message: "Invalid phone number format (+92XXXXXXXXXX)",
                      },
                    })}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.phone_number?.message}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label style={{ color: "#364F6B" }}>
                    Account Type
                  </Form.Label>
                  <Form.Select
                    isInvalid={!!errors.role}
                    {...register("role", { required: "Role is required" })}
                  >
                    <option value="">Select Role</option>
                    <option value="Admin">Admin</option>
                    <option value="User">User</option>
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    {errors.role?.message}
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
                  {isLoading ? "Creating Account..." : "Create Account"}
                </Button>

                <div className="text-center">
                  <Link
                    to="/login"
                    style={{
                      color: "#3FC1C9",
                      textDecoration: "none",
                    }}
                    className="hover-effect"
                  >
                    Already have an account? Login here!
                  </Link>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Signup;

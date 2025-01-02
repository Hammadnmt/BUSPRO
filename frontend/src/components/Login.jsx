/* eslint-disable no-unused-vars */
import { useNavigate, Link } from "react-router";
import { useLoginUserMutation } from "../features/auth/authSlice";
import { Container, Row, Button, Col, Form, Card } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Loader from "./Loading";
import { useEffect } from "react";

const Login = () => {
  const navigate = useNavigate();
  const [loginUser, { isLoading }] = useLoginUserMutation();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  useEffect(() => {
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

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <Container className="d-flex justify-content-center align-items-center min-vh-100 min-vw-100">
          <Row>
            <Col>
              <Card className="card">
                <Card.Body>
                  <h3 className="text-center mb-4">Login</h3>
                  <Form
                    onSubmit={handleSubmit(onSubmit)}
                    className="d-flex flex-column justify-content-center align-items-center"
                  >
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Control
                        {...register("email", {
                          required: "Email is required",
                          pattern: {
                            value:
                              /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                            message: "Invalid email format",
                          },
                        })}
                        type="email"
                        placeholder="Enter your email"
                        className={errors.name ? "is-invalid" : ""}
                      />
                      {errors.email && (
                        <p className="text-danger">{errors.email.message}</p>
                      )}
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                      <Form.Control
                        {...register("password", {
                          required: "Password is required",
                        })}
                        type="password"
                        placeholder="Enter your password"
                        className={errors.name ? "is-invalid" : ""}
                      />
                      {errors.password && (
                        <p className="text-danger">{errors.password.message}</p>
                      )}
                    </Form.Group>

                    <Button type="submit" variant="primary">
                      Login
                    </Button>
                  </Form>
                  <Link to={"/"}>
                    <p className="text-center mt-3 text-decoration-none">
                      New? Register here!
                    </p>
                  </Link>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      )}
    </>
  );
};

export default Login;

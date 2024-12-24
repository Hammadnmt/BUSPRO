/* eslint-disable no-unused-vars */
import { useEffect } from "react";
import { useNavigate, Link } from "react-router";
import { useRegisterUserMutation } from "../features/auth/authSlice";
import { Container, Row, Button, Col, Form, Card } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import Loader from "./Loading";
import "react-toastify/dist/ReactToastify.css";

const Signup = () => {
  const navigate = useNavigate();
  const [registerUser, { isLoading, isSuccess }] = useRegisterUserMutation();

  const {
    register,
    handleSubmit,
    reset,
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
  const user = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
    if (user?.accessToken) {
      navigate("/admin/dashboard");
    }
    if (isSuccess) navigate("/login");
  }, [isSuccess, navigate]);

  return (
    <>
      <ToastContainer />
      {isLoading ? (
        <Loader />
      ) : (
        <Container className="container d-flex justify-content-center align-items-center min-vh-100 min-vw-100">
          <Row>
            <Col>
              <Card className="card">
                <Card.Body>
                  <h3 className="text-center mb-4">Signup</h3>
                  <Form
                    onSubmit={handleSubmit(onSubmit)}
                    className="d-flex flex-column justify-content-center align-items-center"
                  >
                    <Form.Group className="mb-3 w-100">
                      <Form.Control
                        {...register("name", { required: "Name is required" })}
                        type="text"
                        placeholder="Enter your name"
                        className={errors.name ? "is-invalid" : ""}
                      />
                      {errors.name && (
                        <p className="text-danger">{errors.name.message}</p>
                      )}
                    </Form.Group>

                    <Form.Group className="mb-3 w-100">
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
                    <Form.Group className="mb-3 w-100">
                      <Form.Control
                        {...register("password", {
                          required: "Password is required",
                          minLength: {
                            value: 6,
                            message: "Password must be at least 6 characters",
                          },
                        })}
                        type="password"
                        placeholder="Enter your password"
                        className={errors.name ? "is-invalid" : ""}
                      />
                      {errors.password && (
                        <p className="text-danger">{errors.password.message}</p>
                      )}
                    </Form.Group>
                    <Form.Group className="mb-3 w-100">
                      <Form.Control
                        {...register("phone_number", {
                          required: "Phone number is required",
                          pattern: {
                            value: /^\+92\d{10}$/,
                            message: "Invalid phone number",
                          },
                        })}
                        type="text"
                        placeholder="+92XXXXXXXXX"
                        className={errors.name ? "is-invalid" : ""}
                      />
                      {errors.name && (
                        <p className="text-danger">{errors.name.message}</p>
                      )}
                    </Form.Group>
                    <Form.Group className="mb-3 w-100">
                      <Form.Select
                        {...register("role", { required: "Role is required" })}
                      >
                        <option value="">Select Role</option>
                        <option value="Admin">Admin</option>
                        <option value="User">User</option>
                      </Form.Select>
                      {errors.role && (
                        <p className="text-danger">{errors.role.message}</p>
                      )}
                    </Form.Group>

                    <Button type="submit">Register</Button>
                  </Form>
                  <Link to={"/login"}>
                    <p className="text-center mt-3 text-decoration-none">
                      Already a User? Login here!
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

export default Signup;

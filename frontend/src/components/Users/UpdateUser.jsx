/* eslint-disable no-unused-vars */
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { useForm } from "react-hook-form";
import {
  useUpdateUserMutation,
  useGetUserByIdQuery,
} from "../../features/user/userSlice";
import { Container, Button, Row, Col, Form, Card } from "react-bootstrap";
import Loader from "../Loading";
import { toast } from "react-toastify";

const UpdateUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const { data, isLoading: loading } = useGetUserByIdQuery(id);
  const [updateUser, { isLoading, error, isSuccess }] = useUpdateUserMutation();

  useEffect(() => {
    if (data) {
      setValue("name", data.name);
      setValue("email", data.email);
      setValue("role", data.role);
    }

    if (isSuccess) {
      navigate("/admin/user");
    }
  }, [data, isSuccess, navigate, setValue]);

  const onSubmit = async (formData) => {
    try {
      await updateUser({ id, data: formData }).unwrap();
    } catch (err) {
      if (err?.message) {
        toast.error(err?.message);
      }
    }
  };

  if (loading) {
    return <Loader />;
  }

  if (!data) {
    return <div>No user data found</div>;
  }

  return (
    <Container className="d-flex  justify-content-center  min-vh-100 min-vw-100">
      <Row>
        <Col>
          <Card className="card mt-2">
            <Card.Body>
              <h3 className="text-center mb-4">User Details</h3>
              <Form
                onSubmit={handleSubmit(onSubmit)}
                className="d-flex flex-column justify-content-center align-items-center"
              >
                <Form.Group className="mb-3">
                  <Form.Control
                    type="text"
                    placeholder="Name"
                    {...register("name", {
                      required: "Name is required",
                      pattern: {
                        value: /^[a-zA-Z]+$/,
                        message: "Name only contains Alphabets",
                      },
                    })}
                    className={errors.name ? "is-invalid" : ""}
                  />
                  {errors.name && (
                    <small className="text-danger">{errors.name.message}</small>
                  )}
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Control
                    type="email"
                    placeholder="Email"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[a-zA-Z0-9._-]+@[^\s@]+\.[^\s@]+$/,
                        message: "Invalid email address",
                      },
                    })}
                    className={errors.name ? "is-invalid" : ""}
                  />
                  {errors.email && (
                    <small className="text-danger">
                      {errors.email.message}
                    </small>
                  )}
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Control
                    type="text"
                    placeholder="Role"
                    {...register("role", { required: "Role is required" })}
                    className={errors.name ? "is-invalid" : ""}
                  />
                  {errors.role && (
                    <small className="text-danger">{errors.role.message}</small>
                  )}
                </Form.Group>
                <Button type="submit" variant="success">
                  {isLoading ? "Updating..." : "Update"}
                </Button>
                {error && (
                  <small className="text-danger mt-3 text-center">
                    {error?.data?.message}
                  </small>
                )}
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default UpdateUser;

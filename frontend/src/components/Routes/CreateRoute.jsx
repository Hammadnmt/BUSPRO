/* eslint-disable no-unused-vars */
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useCreateRouteMutation } from "../../features/route/routeSlice";
import Loader from "../Loading";
import { useForm } from "react-hook-form";
import { Container, Row, Button, Col, Form, Card } from "react-bootstrap";

const CreateRoute = () => {
  const navigate = useNavigate();
  const [createRoute, { isLoading, isSuccess, isError, error }] =
    useCreateRouteMutation();

  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (formData) => {
    try {
      await createRoute(formData).unwrap();
      reset();
    } catch (err) {
      console.log(err);
      // if (err?.message) {
      //   // Object.keys(err.data.errors).forEach((key) =>
      //   //   setError(key, { type: "server", message: err.data.errors[key] })
      //   // );
      // }
    }
  };

  useEffect(() => {
    if (isSuccess) {
      navigate("/admin/route");
    }
  }, [isSuccess, navigate]);

  return isLoading ? (
    <Loader />
  ) : (
    <Container className="product-form d-flex justify-content-center min-vh-100 min-vw-100">
      <Row>
        <Col>
          <Card className="product-card mt-2">
            <Card.Body>
              <h3 className="text-center mb-4">Add Bus</h3>
              <Form
                onSubmit={handleSubmit(onSubmit)}
                className="d-flex flex-column justify-content-center align-items-center"
              >
                <Form.Group className="mb-3">
                  <Form.Control
                    type="text"
                    placeholder="Enter Source"
                    {...register("source", {
                      required: "Source is required",
                      pattern: {
                        value: /^[a-zA-Z]+$/,
                        message: "Source only contains Alphabets",
                      },
                    })}
                    className={errors.source ? "is-invalid" : ""}
                  />
                  {errors.source && (
                    <small className="text-danger">
                      {errors.source.message}
                    </small>
                  )}
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Control
                    type="text"
                    placeholder="Enter Destination"
                    {...register("destination", {
                      required: "Destination is required",
                    })}
                    className={errors.destination ? "is-invalid" : ""}
                  />
                  {errors.destination && (
                    <small className="text-danger">
                      {errors.destination.message}
                    </small>
                  )}
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Control
                    type="number"
                    placeholder="Enter Distance"
                    {...register("distance", {
                      required: "Distance is required",
                      pattern: {
                        value: /^[0-9]+$/,
                        message: "Distance only contains numbers",
                      },
                    })}
                    className={errors.distance ? "is-invalid" : ""}
                  />
                  {errors.distance && (
                    <small className="text-danger">
                      {errors.distance.message}
                    </small>
                  )}
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Control
                    type="number"
                    placeholder="Enter Duration"
                    {...register("duration", {
                      required: "Duration is required",
                      pattern: {
                        value: /^[0-9]+$/,
                        message: "Duration only contains numbers",
                      },
                    })}
                    className={errors.duration ? "is-invalid" : ""}
                  />
                  {errors.duration && (
                    <small className="text-danger">
                      {errors.duration.message}
                    </small>
                  )}
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Control
                    type="number"
                    placeholder="Enter Fare: (PKR)"
                    {...register("fare", {
                      required: "fare is required",
                      pattern: {
                        value: /^[0-9]+$/,
                        message: "fare only contains number",
                      },
                    })}
                    className={errors.fare ? "is-invalid" : ""}
                  />
                  {errors.fare && (
                    <small className="text-danger">{errors.fare.message}</small>
                  )}
                </Form.Group>
                <Button type="submit" variant="success">
                  {isLoading ? "Adding..." : "Add"}
                </Button>
                {isError && (
                  <small className="text-danger mt-3">
                    {error?.data?.message || "Failed to create product"}
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

export default CreateRoute;

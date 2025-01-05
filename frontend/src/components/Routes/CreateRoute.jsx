import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useCreateRouteMutation } from "../../features/route/routeSlice";
import Loader from "../Loading";
import { useForm } from "react-hook-form";
import { Container, Row, Col, Form, Card, Button } from "react-bootstrap";

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
      // Handle API errors (refer to previous implementation for guidance)
    }
  };

  useEffect(() => {
    if (isSuccess) {
      navigate("/admin/route");
    }
  }, [isSuccess, navigate]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <Container fluid>
          <div className="d-flex justify-content-center min-vh-100">
            <Row className="w-50">
              <Col>
                <Card className="mt-2 w-100 shadow border-0">
                  <Card.Body>
                    <h3
                      className="text-center mb-4"
                      style={{ color: "#364F6B", fontWeight: "bold" }}
                    >
                      Add Route
                    </h3>
                    <Form onSubmit={handleSubmit(onSubmit)}>
                      <Row>
                        <Col>
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
                              style={{
                                borderColor: "#364F6B",
                                boxShadow: errors.source
                                  ? "0 0 5px 2px rgba(255, 0, 0, 0.5)"
                                  : "none",
                              }}
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
                              style={{
                                borderColor: "#364F6B",
                                boxShadow: errors.destination
                                  ? "0 0 5px 2px rgba(255, 0, 0, 0.5)"
                                  : "none",
                              }}
                            />
                            {errors.destination && (
                              <small className="text-danger">
                                {errors.destination.message}
                              </small>
                            )}
                          </Form.Group>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <Form.Group className="mb-3">
                            <Form.Control
                              type="number"
                              placeholder="Enter Distance (in kilometers)"
                              {...register("distance", {
                                required: "Distance is required",
                                pattern: {
                                  value: /^[0-9]+$/,
                                  message: "Distance only contains numbers",
                                },
                              })}
                              className={errors.distance ? "is-invalid" : ""}
                              style={{
                                borderColor: "#364F6B",
                                boxShadow: errors.distance
                                  ? "0 0 5px 2px rgba(255, 0, 0, 0.5)"
                                  : "none",
                              }}
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
                              placeholder="Enter Duration (in hours)"
                              {...register("duration", {
                                required: "Duration is required",
                                pattern: {
                                  value: /^[0-9]+$/,
                                  message: "Duration only contains numbers",
                                },
                              })}
                              className={errors.duration ? "is-invalid" : ""}
                              style={{
                                borderColor: "#364F6B",
                                boxShadow: errors.duration
                                  ? "0 0 5px 2px rgba(255, 0, 0, 0.5)"
                                  : "none",
                              }}
                            />
                            {errors.duration && (
                              <small className="text-danger">
                                {errors.duration.message}
                              </small>
                            )}
                          </Form.Group>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <Form.Group className="mb-3">
                            <Form.Control
                              type="number"
                              placeholder="Enter Fare (PKR)"
                              {...register("fare", {
                                required: "Fare is required",
                                pattern: {
                                  value: /^[0-9]+$/,
                                  message: "Fare only contains numbers",
                                },
                              })}
                              className={errors.fare ? "is-invalid" : ""}
                              style={{
                                borderColor: "#364F6B",
                                boxShadow: errors.fare
                                  ? "0 0 5px 2px rgba(255, 0, 0, 0.5)"
                                  : "none",
                              }}
                            />
                            {errors.fare && (
                              <small className="text-danger">
                                {errors.fare.message}
                              </small>
                            )}
                          </Form.Group>
                        </Col>
                      </Row>
                      <Row className="w-50 offset-3">
                        <Button
                          type="submit"
                          variant="success"
                          disabled={isLoading}
                          style={{
                            backgroundColor: "#364F6B",
                            borderColor: "#364F6B",
                          }}
                        >
                          {isLoading ? "Adding..." : "Add Route"}
                        </Button>
                        {isError && (
                          <small className="text-danger mt-3">
                            {error?.data?.message || "Failed to create route"}
                          </small>
                        )}
                      </Row>
                    </Form>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </div>
        </Container>
      )}
    </>
  );
};

export default CreateRoute;

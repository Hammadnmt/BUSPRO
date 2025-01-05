import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useCreateBusMutation } from "../../features/bus/busSlice";
import Loader from "../Loading";
import { useForm } from "react-hook-form";
import { Container, Row, Col, Form, Card, Button } from "react-bootstrap";

const CreateBus = () => {
  const navigate = useNavigate();
  const [createBus, { isLoading, isSuccess, isError, error }] =
    useCreateBusMutation();

  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (formData) => {
    try {
      await createBus(formData).unwrap();
      reset();
    } catch (err) {
      console.log(err);
      // Handle API errors (refer to previous implementation for guidance)
    }
  };

  useEffect(() => {
    if (isSuccess) {
      navigate("/admin/bus");
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
                <Card className="mt-2 shadow w-100 border-0">
                  <Card.Body>
                    <h3
                      className="text-center mb-4"
                      style={{ color: "#364F6B", fontWeight: "bold" }}
                    >
                      Add Bus
                    </h3>
                    <Form onSubmit={handleSubmit(onSubmit)}>
                      <Row>
                        <Col>
                          <Form.Group className="mb-3">
                            <Form.Control
                              type="text"
                              placeholder="Enter Bus number"
                              {...register("busNumber", {
                                required: "Bus number is required",
                                pattern: {
                                  value: /^[a-zA-Z0-9]+$/,
                                  message: "Bus number only contains Alphanumeric",
                                },
                              })}
                              className={errors.busNumber ? "is-invalid" : ""}
                              style={{
                                borderColor: "#364F6B",
                                boxShadow: errors.busNumber
                                  ? "0 0 5px 2px rgba(255, 0, 0, 0.5)"
                                  : "none",
                              }}
                            />
                            {errors.busNumber && (
                              <small className="text-danger">
                                {errors.busNumber.message}
                              </small>
                            )}
                          </Form.Group>
                          <Form.Group className="mb-3">
                            <Form.Control
                              type="number"
                              placeholder="Enter Total Seats"
                              {...register("totalSeats", {
                                required: "Total Seats is required",
                                min: { value: 1, message: "Must be at least 1" },
                              })}
                              className={errors.totalSeats ? "is-invalid" : ""}
                              style={{
                                borderColor: "#364F6B",
                                boxShadow: errors.totalSeats
                                  ? "0 0 5px 2px rgba(255, 0, 0, 0.5)"
                                  : "none",
                              }}
                            />
                            {errors.totalSeats && (
                              <small className="text-danger">
                                {errors.totalSeats.message}
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
                          {isLoading ? "Adding..." : "Add"}
                        </Button>
                        {isError && (
                          <small className="text-danger mt-3">
                            {error?.data?.message || "Failed to create bus"}
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

export default CreateBus;

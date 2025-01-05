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
        <Container fluid className="d-flex justify-content-center min-vh-100">
          <Row className="justify-content-center">
            <Col xs={12} md={6} lg={4}>
              <Card className="shadow border-0">
                <Card.Body>
                  <h3 className="text-center mb-4">Add Bus</h3>
                  <Form onSubmit={handleSubmit(onSubmit)}>
                    <Form.Group className="mb-3">
                      <Form.Control
                        type="text"
                        placeholder="Enter Bus number"
                        {...register("busNumber", {
                          required: "Bus number is required",
                          pattern: {
                            value: /^[a-zA-Z0-9]+$/,
                            message: "Bus number only contains Alphnumeric",
                          },
                        })}
                        className={errors.busNumber ? "is-invalid" : ""}
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
                      />
                      {errors.totalSeats && (
                        <small className="text-danger">
                          {errors.totalSeats.message}
                        </small>
                      )}
                    </Form.Group>
                    <Button
                      type="submit"
                      variant="success"
                      disabled={isLoading}
                    >
                      {isLoading ? "Adding..." : "Add"}
                    </Button>
                    {isError && (
                      <small className="text-danger mt-3">
                        {error?.data?.message || "Failed to create bus"}
                      </small>
                    )}
                  </Form>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      )}
    </>
  );
};

export default CreateBus;

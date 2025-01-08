import { useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { useForm } from "react-hook-form";
import {
  useGetBusByIdQuery,
  useUpdateBusMutation,
} from "../../features/bus/busSlice";
import { Container, Row, Col, Form, Card, Button } from "react-bootstrap";
import Loader from "../Loading";
import { toast } from "react-toastify";

const UpdateBus = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const { data, isLoading: loading } = useGetBusByIdQuery(id);
  const [updateBus, { isLoading, error, isSuccess }] = useUpdateBusMutation();

  useEffect(() => {
    if (data) {
      setValue("busNumber", data.bus_no);
      setValue("seats", data.total_seats);
    }

    if (isSuccess) {
      toast.success("Bus updated successfully!");
      navigate("/admin/bus");
    }
  }, [data, isSuccess, navigate, setValue]);

  const onSubmit = async (formData) => {
    try {
      await updateBus({ id, data: formData }).unwrap();
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
    return <div>No Bus found</div>;
  }

  return (
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
                  Update Bus
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
                          {...register("seats", {
                            required: "Total seats is required",
                            pattern: {
                              value: /^[0-9]+$/,
                              message: "Total Seats must be a number",
                            },
                          })}
                          className={errors.seats ? "is-invalid" : ""}
                          style={{
                            borderColor: "#364F6B",
                            boxShadow: errors.seats
                              ? "0 0 5px 2px rgba(255, 0, 0, 0.5)"
                              : "none",
                          }}
                        />
                        {errors.seats && (
                          <small className="text-danger">
                            {errors.seats.message}
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
                      {isLoading ? "Updating..." : "Update"}
                    </Button>
                    {error && (
                      <small className="text-danger mt-3">
                        {error?.data?.message || "Failed to update bus"}
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
  );
};

export default UpdateBus;

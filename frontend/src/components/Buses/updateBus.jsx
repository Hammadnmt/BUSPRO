/* eslint-disable no-unused-vars */
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { useForm } from "react-hook-form";
import {
  useGetBusByIdQuery,
  useUpdateBusMutation,
} from "../../features/bus/busSlice";
import { Container, Button, Row, Col, Form, Card } from "react-bootstrap";
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
      setValue("totalSeats", data.total_seats);
    }

    if (isSuccess) {
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
    <Container className="d-flex  justify-content-center  min-vh-100 min-vw-100">
      <Row>
        <Col>
          <Card className="card mt-2">
            <Card.Body>
              <h3 className="text-center mb-4">Bus Details</h3>
              <Form
                onSubmit={handleSubmit(onSubmit)}
                className="d-flex flex-column justify-content-center align-items-center"
              >
                <Form.Group className="mb-3">
                  <Form.Control
                    type="text"
                    placeholder="Bus number"
                    {...register("busNumber", {
                      required: "Bus Number is required",
                    })}
                    className={errors.busNumber ? "is-invalid" : ""}
                  />
                  {errors.busNumber && (
                    <small className="text-danger">{errors.name.message}</small>
                  )}
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Control
                    type="number"
                    placeholder="Total Seats"
                    {...register("email", {
                      required: "Total seats is required",
                      pattern: {
                        value: /^[0-9]+$/,
                      },
                    })}
                    className={errors.name ? "is-invalid" : ""}
                  />
                  {errors.totalSeats && (
                    <small className="text-danger">
                      {errors.totalSeats.message}
                    </small>
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

export default UpdateBus;

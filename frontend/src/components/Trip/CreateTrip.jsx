import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useCreateTripMutation } from "../../features/trip/tripSlice";
import { useGetBusesQuery } from "../../features/bus/busSlice";
import { useGetAllroutesQuery } from "../../features/route/routeSlice";
import Loader from "../Loading";
import { useForm } from "react-hook-form";
import { Container, Row, Button, Col, Form, Card } from "react-bootstrap";
import { convertTimeToTimestamp } from "../../utils/helpers";

const CreateTrip = () => {
  const navigate = useNavigate();
  const { data: routedata, isLoading: isLoadingRoutes } =
    useGetAllroutesQuery();
  const { data: busdata, isLoading: isLoadingBuses } = useGetBusesQuery();
  const [createTrip, { isLoading, isSuccess, isError, error }] =
    useCreateTripMutation();
  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors },
  } = useForm();

  const [tripDetails, setTripDetails] = useState({
    Bus: "",
    Route: "",
    travel_date: "",
    departure_time: "",
    arrival_time: "",
    description: "",
    status: "Inactive",
  });

  const onSubmit = async (e) => {
    // e.preventDefault();
    try {
      await createTrip(tripDetails).unwrap();
      reset();
    } catch (err) {
      console.log(err);
      if (err?.data?.errors) {
        Object.keys(err.data.errors).forEach((key) =>
          setError(key, { type: "server", message: err.data.errors[key] })
        );
      }
    }
  };

  useEffect(() => {
    if (isSuccess) {
      navigate("/admin/trip");
    }
  }, [isSuccess, navigate]);

  return isLoading || isLoadingRoutes || isLoadingBuses ? (
    <Loader />
  ) : (
    <Container className="trip-form d-flex justify-content-center min-vh-100 min-vw-100">
      <Row>
        <Col>
          <Card className="trip-card mt-2">
            <Card.Body>
              <h3 className="text-center mb-4">Create Trip</h3>
              <Form
                onSubmit={handleSubmit(onSubmit)}
                className="d-flex flex-column justify-content-center align-items-center"
              >
                <Row>
                  <Col sm={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Bus Number</Form.Label>
                      <Form.Select
                        {...register("Bus", {
                          required: "Bus number is required",
                        })}
                        onChange={(e) =>
                          setTripDetails((prev) => ({
                            ...prev,
                            Bus: e.target.value,
                          }))
                        }
                        className={errors.Bus ? "is-invalid" : ""}
                      >
                        <option value="">Select Bus Number</option>
                        {busdata &&
                          busdata.map((bus) => (
                            <option key={bus._id} value={bus._id}>
                              {bus.bus_no}
                            </option>
                          ))}
                      </Form.Select>
                      {errors.Bus && (
                        <small className="text-danger">
                          {errors.Bus.message}
                        </small>
                      )}
                    </Form.Group>
                  </Col>
                  <Col sm={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Route</Form.Label>
                      <Form.Select
                        {...register("Route", {
                          required: "Route is required",
                        })}
                        onChange={(e) =>
                          setTripDetails((prev) => ({
                            ...prev,
                            Route: e.target.value,
                          }))
                        }
                        className={errors.Route ? "is-invalid" : ""}
                      >
                        <option value="">Select Route</option>
                        {routedata &&
                          routedata.map((route) => (
                            <option key={route._id} value={route._id}>
                              {route.source} to {route.destination}
                            </option>
                          ))}
                      </Form.Select>
                      {errors.Route && (
                        <small className="text-danger">
                          {errors.Route.message}
                        </small>
                      )}
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col sm={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Travel Date</Form.Label>
                      <Form.Control
                        type="date"
                        {...register("travel_date", {
                          required: "Travel date is required",
                        })}
                        onChange={(e) =>
                          setTripDetails((prev) => ({
                            ...prev,
                            travel_date: new Date(e.target.value).getTime(),
                          }))
                        }
                        className={errors.travel_date ? "is-invalid" : ""}
                      />
                      {errors.travel_date && (
                        <small className="text-danger">
                          {errors.travel_date.message}
                        </small>
                      )}
                    </Form.Group>
                  </Col>
                  <Col sm={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Arrival Time</Form.Label>
                      <Form.Control
                        type="time"
                        {...register("arrival_time", {
                          required: "Arrival time is required",
                        })}
                        onChange={(e) => {
                          setTripDetails((prev) => ({
                            ...prev,
                            arrival_time: convertTimeToTimestamp(
                              e.target.value
                            ),
                          }));
                        }}
                        className={errors.arrival_time ? "is-invalid" : ""}
                      />
                      {errors.arrival_time && (
                        <small className="text-danger">
                          {errors.arrival_time.message}
                        </small>
                      )}
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col sm={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Departure Time</Form.Label>
                      <Form.Control
                        type="time"
                        {...register("departure_time", {
                          required: "Departure time is required",
                        })}
                        onChange={(e) => {
                          setTripDetails((prev) => ({
                            ...prev,
                            departure_time: convertTimeToTimestamp(
                              e.target.value
                            ),
                          }));
                        }}
                        className={errors.departure_time ? "is-invalid" : ""}
                      />
                      {errors.departure_time && (
                        <small className="text-danger">
                          {errors.departure_time.message}
                        </small>
                      )}
                    </Form.Group>
                  </Col>
                  <Col sm={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Description</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={3}
                        {...register("description", {
                          required: "Description is required",
                        })}
                        onChange={(e) =>
                          setTripDetails((prev) => ({
                            ...prev,
                            description: e.target.value,
                          }))
                        }
                        className={errors.description ? "is-invalid" : ""}
                      />
                      {errors.description && (
                        <small className="text-danger">
                          {errors.description.message}
                        </small>
                      )}
                    </Form.Group>
                  </Col>
                </Row>
                <Button type="submit" variant="success">
                  {isLoading ? "Creating..." : "Create Trip"}
                </Button>
                {isError && (
                  <small className="text-danger mt-3">
                    {error?.message || "Failed to create trip"}
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

export default CreateTrip;

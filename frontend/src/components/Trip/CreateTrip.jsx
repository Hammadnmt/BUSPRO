import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useCreateTripMutation } from "../../features/trip/tripSlice";
import { useGetBusesQuery } from "../../features/bus/busSlice";
import { useGetAllroutesQuery } from "../../features/route/routeSlice";
import { useForm } from "react-hook-form";
import {
  Container,
  Row,
  Col,
  Form,
  Card,
  Button,
  Toast,
} from "react-bootstrap";
import { getCurrentDate } from "../../utils/getCurrenDate";
import { toISO, getTime } from "../../utils/dateTimeHelpers";
import { toast } from "react-toastify";
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

  const onSubmit = async (data) => {
    const tripData = {
      Bus: data.Bus,
      Route: data.Route,
      travel_date: toISO(data.travel_date),
      description: data.description,
      departure_time: getTime(data.travel_date, data.departure_time),
      arrival_time: getTime(data.travel_date, data.arrival_time),
    };
    try {
      await createTrip(tripData).unwrap();
      reset();
    } catch (err) {
      console.log(err);
      if (error?.message) {
        toast.error(error.message);
      }
    }
  };

  useEffect(() => {
    if (isSuccess) {
      navigate("/admin/trip");
    }
  }, [isSuccess, navigate]);

  return (
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
                  Create Trip
                </h3>
                <Form onSubmit={handleSubmit(onSubmit)}>
                  <Row>
                    <Col>
                      <Form.Group className="mb-3">
                        <Form.Label>Bus Number</Form.Label>
                        <Form.Select
                          {...register("Bus", {
                            required: "Bus number is required",
                          })}
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
                    <Col>
                      <Form.Group className="mb-3">
                        <Form.Label>Route</Form.Label>
                        <Form.Select
                          {...register("Route", {
                            required: "Route is required",
                          })}
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
                    <Col>
                      <Form.Group className="mb-3">
                        <Form.Label>Travel Date</Form.Label>
                        <Form.Control
                          type="date"
                          min={getCurrentDate()}
                          {...register("travel_date", {
                            required: "Travel date is required",
                          })}
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
                        <Form.Label>Departure Time</Form.Label>
                        <Form.Control
                          type="time"
                          {...register("departure_time", {
                            required: "Departure time is required",
                          })}
                          className={errors.departure_time ? "is-invalid" : ""}
                        />
                        {errors.departure_time && (
                          <small className="text-danger">
                            {errors.departure_time.message}
                          </small>
                        )}
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col sm={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Arrival Time</Form.Label>
                        <Form.Control
                          type="time"
                          {...register("arrival_time", {
                            required: "Arrival time is required",
                          })}
                          className={errors.arrival_time ? "is-invalid" : ""}
                        />
                        {errors.arrival_time && (
                          <small className="text-danger">
                            {errors.arrival_time.message}
                          </small>
                        )}
                      </Form.Group>
                    </Col>
                    <Col sm={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                          as="textarea"
                          rows={1}
                          {...register("description", {
                            required: "Description is required",
                          })}
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
                      {isLoading ? "Creating..." : "Create Trip"}
                    </Button>
                    {isError && (
                      <small className="text-danger mt-3">
                        {error?.message || "Failed to create trip"}
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

export default CreateTrip;

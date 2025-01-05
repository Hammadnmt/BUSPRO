import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import {
  useGetTripByIdQuery,
  useUpdateTripMutation,
} from "../../features/trip/tripSlice";
import { useGetBusesQuery } from "../../features/bus/busSlice";
import { useGetAllroutesQuery } from "../../features/route/routeSlice";
import { useForm } from "react-hook-form";
import { Container, Row, Button, Col, Form, Card } from "react-bootstrap";
import Loader from "../Loading";
import { getCurrentDate } from "../../utils/getCurrenDate";

const UpdateTrip = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: routedata, isLoading: isLoadingRoutes } =
    useGetAllroutesQuery();
  const { data: busdata, isLoading: isLoadingBuses } = useGetBusesQuery();
  const { data: tripData, isError, error } = useGetTripByIdQuery(id);
  const [updateTrip, { isLoading, isSuccess }] = useUpdateTripMutation();
  const {
    register,
    handleSubmit,
    setError,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  const [tripDetails, setTripDetails] = useState({
    Bus: "",
    Route: "",
    travel_date: "",
    departure_time: "",
    arrival_time: "",
    description: "",
    status: "",
  });

  const onSubmit = async () => {
    try {
      await updateTrip({ id, data: tripDetails }).unwrap();
      reset();
    } catch (err) {
      if (err?.data?.errors) {
        Object.keys(err.data.errors).forEach((key) =>
          setError(key, { type: "server", message: err.data.errors[key] })
        );
      }
    }
  };

  useEffect(() => {
    if (tripData) {
      setValue("Bus", tripData?.Bus?._id);
      setValue("Route", tripData?.Route?._id);
      setValue("status", tripData.status);
      setValue("travel_date", tripData?.travel_date);
      setValue("description", tripData?.description);
      setValue("arrival_time", tripData?.Route?.arrival_time);
      setValue("departure_time", tripData?.Route?.departure_time);
    }
    if (isSuccess) {
      navigate("/admin/trip");
    }
  }, [isSuccess, navigate, setValue, tripData]);

  return isLoading || isLoadingRoutes || isLoadingBuses ? (
    <Loader />
  ) : (
    <Container className="py-5 min-vh-100 d-flex justify-content-center align-items-center bg-light">
      <Row className="w-100">
        <Col md={10} lg={8} className="mx-auto">
          <Card className="shadow-lg border-0">
            <Card.Body className="p-5">
              <h3 className="text-center mb-4 text-success">Update Trip</h3>
              <Form onSubmit={handleSubmit(onSubmit)}>
                <Row className="mb-3">
                  <Col sm={12} md={6}>
                    <Form.Group>
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
                  <Col sm={12} md={6}>
                    <Form.Group>
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
                <Row className="mb-3">
                  <Col sm={12} md={6}>
                    <Form.Group>
                      <Form.Label>Travel Date</Form.Label>
                      <Form.Control
                        type="date"
                        min={getCurrentDate()}
                        {...register("travel_date", {
                          required: "Travel date is required",
                        })}
                        onChange={(e) =>
                          setTripDetails((prev) => ({
                            ...prev,
                            travel_date: e.target.value,
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
                  <Col sm={12} md={6}>
                    <Form.Group>
                      <Form.Label>Arrival Time</Form.Label>
                      <Form.Control
                        type="time"
                        {...register("arrival_time", {
                          required: "Arrival time is required",
                        })}
                        onChange={(e) =>
                          setTripDetails((prev) => ({
                            ...prev,
                            arrival_time: e.target.value,
                          }))
                        }
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
                <Row className="mb-3">
                  <Col sm={12} md={6}>
                    <Form.Group>
                      <Form.Label>Departure Time</Form.Label>
                      <Form.Control
                        type="time"
                        {...register("departure_time", {
                          required: "Departure time is required",
                        })}
                        onChange={(e) =>
                          setTripDetails((prev) => ({
                            ...prev,
                            departure_time: e.target.value,
                          }))
                        }
                        className={errors.departure_time ? "is-invalid" : ""}
                      />
                      {errors.departure_time && (
                        <small className="text-danger">
                          {errors.departure_time.message}
                        </small>
                      )}
                    </Form.Group>
                  </Col>
                  <Col sm={12} md={6}>
                    <Form.Group>
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
                <div className="d-flex justify-content-center mt-4">
                  <Button type="submit" variant="success" className="px-5">
                    {isLoading ? "Updating..." : "Update Trip"}
                  </Button>
                </div>
                {isError && (
                  <div className="text-danger text-center mt-3">
                    {error?.data?.message || "Failed to update trip"}
                  </div>
                )}
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default UpdateTrip;

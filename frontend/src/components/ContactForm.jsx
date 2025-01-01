import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { Form, Row, Col, Container, Card, Button } from "react-bootstrap";
import { useParams, useLocation } from "react-router";
import { useGetUserByIdQuery } from "../features/user/userSlice";
import { useCreateBookingMutation } from "../features/booking/bookingSlice";
import { getUser } from "../utils/getUser";

const ContactForm = () => {
  const { data: userdata } = useGetUserByIdQuery(getUser());
  const [createBooking, { isLoading, isSuccess, error }] =
    useCreateBookingMutation();
  const { id } = useParams();
  const state = useLocation();
  const bookedInfo = state.state;
  console.log(bookedInfo);

  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      phone_number: "",
      email: "",
      fullname: "",
      lastName: "",
      agree: false,
    },
  });

  const onSubmit = async () => {
    const bookingDetails = {
      user: userdata?._id,
      trip: id,
      booked_seats: [
        {
          seat_no: bookedInfo.map((item) => item.seatNumber),
          gender: bookedInfo.map((item) => item.gender),
        },
      ],
      travel_date: "2025-01-02T00:00:00.000+00:00",
    };
    try {
      console.log("Booking Details: ", bookingDetails);
      await createBooking(bookingDetails).unwrap();
    } catch (err) {
      console.error("Failed to create booking: ", err);
    }
    // console.log("Form Submitted: ", userdata);
  };

  useEffect(() => {
    if (userdata) {
      setValue("phone_number", userdata?.phone_number || "");
      setValue("email", userdata?.email || "");
      setValue("fullname", userdata?.name || "");
    }
  }, [userdata, setValue]);

  return (
    <Container className="mt-4">
      <Card>
        <Card.Body>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <h4 className="mb-4">Passenger Details</h4>

            <Row className="mb-4">
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Mobile Number</Form.Label>
                  <Controller
                    name="phone_number"
                    control={control}
                    rules={{ required: "Mobile number is required" }}
                    render={({ field }) => (
                      <Form.Control
                        {...field}
                        type="text"
                        placeholder="+9203XXXXXXXX"
                      />
                    )}
                  />
                  {errors.phone_number && (
                    <Form.Text className="text-danger">
                      {errors.phone_number.message}
                    </Form.Text>
                  )}
                  <Form.Text className="text-muted">
                    e.g. +920332023455
                  </Form.Text>
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group>
                  <Form.Label>
                    Email{" "}
                    <i className="text-muted">
                      (your ticket will be emailed here)
                    </i>
                  </Form.Label>
                  <Controller
                    name="email"
                    control={control}
                    rules={{
                      required: "Email is required",
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "Enter a valid email",
                      },
                    }}
                    render={({ field }) => (
                      <Form.Control
                        {...field}
                        type="email"
                        placeholder="e.g. name@outlook.com"
                      />
                    )}
                  />
                  {errors.email && (
                    <Form.Text className="text-danger">
                      {errors.email.message}
                    </Form.Text>
                  )}
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-4">
              <Controller
                name="agree"
                control={control}
                rules={{ required: "You must agree to proceed" }}
                render={({ field }) => (
                  <Form.Check
                    {...field}
                    type="checkbox"
                    label="I agree to receive travel related information and deals"
                  />
                )}
              />
              {errors.agree && (
                <Form.Text className="text-danger">
                  {errors.agree.message}
                </Form.Text>
              )}
            </Form.Group>

            <Row className="mb-4">
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Full name</Form.Label>
                  <Controller
                    name="fullname"
                    control={control}
                    rules={{ required: "Full name is required" }}
                    render={({ field }) => (
                      <Form.Control {...field} type="text" />
                    )}
                  />
                  {errors.fullname && (
                    <Form.Text className="text-danger">
                      {errors.fullname.message}
                    </Form.Text>
                  )}
                  <Form.Text className="text-muted">
                    Please ensure your name is as it appears on your CNIC
                  </Form.Text>
                </Form.Group>
              </Col>
            </Row>

            <div className="d-flex justify-content-end">
              <Button type="submit" variant="primary" size="lg">
                Book Now
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default ContactForm;

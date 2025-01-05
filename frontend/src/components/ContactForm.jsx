import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { Form, Row, Col, Container, Card, Button } from "react-bootstrap";
import { useLocation } from "react-router";
import { useGetUserByIdQuery } from "../features/user/userSlice";
import { useGetTripByIdQuery } from "../features/trip/tripSlice";
import { useCreateBookingMutation } from "../features/booking/bookingSlice";
import { getUser } from "../utils/getUser";

const ContactForm = () => {
  const state = useLocation();
  const { data: userdata } = useGetUserByIdQuery(getUser());
  const [createBooking, { isLoading, isSuccess, error }] =
    useCreateBookingMutation();
  const { bookedInfo, tripId, totalFare } = state.state;
  const { data: tripData } = useGetTripByIdQuery(tripId);
  const {
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      phone_number: "",
      email: "",
      fullname: "",
      lastName: "",
      agree: false,
      amount_to_pay: totalFare || "",
      payment_method: "",
    },
  });

  const selectedPaymentMethod = watch("payment_method");

  const onSubmit = async (data) => {
    const bookingDetails = {
      user: userdata?._id,
      trip: tripId,
      booked_seats: [
        {
          seat_no: bookedInfo.map((item) => item.seatNumber),
          gender: bookedInfo.map((item) => item.gender),
        },
      ],
      travel_date: tripData?.travel_date,
      amount: data.amount_to_pay,
      payment_method: data.payment_method,
    };
    console.log(bookingDetails);
    try {
      await createBooking(bookingDetails).unwrap();
    } catch (err) {
      console.error("Failed to create booking: ", err);
    }
  };

  useEffect(() => {
    if (userdata) {
      setValue("phone_number", userdata?.phone_number || "");
      setValue("email", userdata?.email || "");
      setValue("fullname", userdata?.name || "");
      setValue("amount_to_pay", totalFare || "");
    }
  }, [userdata, setValue, totalFare]);

  return (
    <Container className="mt-4">
      <Card border="primary">
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
          </Form>
        </Card.Body>
      </Card>

      <Container className="mt-4">
        <Card border="primary">
          <Card.Body>
            <h4>Booking Summary</h4>
            <div className="table-responsive mb-4">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>Seat Number</th>
                    <th>Gender</th>
                  </tr>
                </thead>
                <tbody>
                  {bookedInfo.map((item, index) => (
                    <tr key={index}>
                      <td>{item.seatNumber}</td>
                      <td>{item.gender}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Second Form */}
            <Form onSubmit={handleSubmit(onSubmit)}>
              <Row className="mb-4">
                <Col md={6}>
                  <Form.Group>
                    <Form.Label>Amount to Pay (Rs.)</Form.Label>
                    <Controller
                      name="amount_to_pay"
                      control={control}
                      rules={{
                        required: "Amount is required",
                        min: {
                          value: totalFare,
                          message: `Amount must be at least ${totalFare} Rs.`,
                        },
                      }}
                      render={({ field }) => (
                        <Form.Control {...field} type="number" readOnly />
                      )}
                    />
                    {errors.amount_to_pay && (
                      <Form.Text className="text-danger">
                        {errors.amount_to_pay.message}
                      </Form.Text>
                    )}
                  </Form.Group>
                </Col>

                <Col md={6}>
                  <Form.Group>
                    <Form.Label>Payment Method</Form.Label>
                    <Controller
                      name="payment_method"
                      control={control}
                      rules={{ required: "Please select a payment method" }}
                      render={({ field }) => (
                        <Form.Select {...field}>
                          <option value="">Select payment method</option>
                          <option value="debit card">Debit Card</option>
                          <option value="jazzcash">JazzCash</option>
                        </Form.Select>
                      )}
                    />
                    {errors.payment_method && (
                      <Form.Text className="text-danger">
                        {errors.payment_method.message}
                      </Form.Text>
                    )}
                  </Form.Group>
                </Col>
              </Row>

              <div className="d-flex justify-content-end">
                <Button
                  variant="primary" // Using the primary color from the palette
                  size="lg"
                  type="submit"
                  disabled={!selectedPaymentMethod}
                >
                  Book
                </Button>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </Container>
  );
};

export default ContactForm;

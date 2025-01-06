import React from "react";
import { useForm, Controller } from "react-hook-form";
import { Form, Row, Col, Container, Card, Button } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router";
import { useGetUserByIdQuery } from "../features/user/userSlice";
import { useGetTripByIdQuery } from "../features/trip/tripSlice";
import { useCreateBookingMutation } from "../features/booking/bookingSlice";
import { useLazyGetPromoQuery } from "../features/promo/promoSlice";
import { getUser } from "../utils/getUser";
import { toast } from "react-toastify";
import {
  User,
  Mail,
  Phone,
  CreditCard,
  Tag,
  Users,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

const ContactForm = () => {
  const state = useLocation();
  const navigate = useNavigate();
  const { data: userdata } = useGetUserByIdQuery(getUser());
  const [createBooking, { isLoading, isSuccess, error }] =
    useCreateBookingMutation();
  const { bookedInfo, tripId, totalFare } = state.state;
  const { data: tripData } = useGetTripByIdQuery(tripId);
  const [triggerQuery, { data: promoData, error: promoError }] =
    useLazyGetPromoQuery();

  const {
    handleSubmit,
    control,
    setValue,
    reset,
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
  const selectedPromoCode = watch("promoCode")?.length > 7;

  const applyPromo = async () => {
    const code = watch("promoCode");
    try {
      await triggerQuery(code).unwrap();
    } catch (err) {
      promoError?.message
        ? toast.error(promoError.message)
        : toast.error("Error in Coupon");
    }
  };

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
    try {
      await createBooking(bookingDetails).unwrap();
    } catch (err) {
      console.error("Failed to create booking: ", err);
    }
  };

  React.useEffect(() => {
    if (userdata) {
      setValue("phone_number", userdata?.phone_number || "");
      setValue("email", userdata?.email || "");
      setValue("fullname", userdata?.name || "");
      setValue("amount_to_pay", totalFare || "");
    }
    if (promoData?.status) {
      toast.success("Happy discount! 🎉");
      setValue("amount_to_pay", totalFare - 400);
    }
    if (isSuccess) {
      navigate("/confirm");
    }
  }, [userdata, setValue, totalFare, promoData, reset, isSuccess, navigate]);

  return (
    <Container className="py-5">
      <div className="mb-4">
        <h2 className="text-primary mb-2">Complete Your Booking</h2>
        <p className="text-muted">
          Please fill in the details to confirm your reservation
        </p>
      </div>

      <Row className="g-4">
        <Col lg={8}>
          <Card className="shadow-sm mb-4">
            <Card.Header className="bg-white py-3">
              <h4 className="mb-0 d-flex align-items-center gap-2">
                <User size={20} className="text-primary" />
                Passenger Details
              </h4>
            </Card.Header>
            <Card.Body>
              <Form onSubmit={handleSubmit(onSubmit)}>
                <Row className="g-3">
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label className="d-flex align-items-center gap-2">
                        <Phone size={16} className="text-muted" />
                        Mobile Number
                      </Form.Label>
                      <Controller
                        name="phone_number"
                        control={control}
                        rules={{ required: "Mobile number is required" }}
                        render={({ field }) => (
                          <Form.Control
                            {...field}
                            type="text"
                            placeholder="+9203XXXXXXXX"
                            className={
                              errors.phone_number ? "border-danger" : ""
                            }
                          />
                        )}
                      />
                      {errors.phone_number && (
                        <Form.Text className="text-danger d-flex align-items-center gap-1">
                          <AlertCircle size={14} />
                          {errors.phone_number.message}
                        </Form.Text>
                      )}
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group>
                      <Form.Label className="d-flex align-items-center gap-2">
                        <Mail size={16} className="text-muted" />
                        Email
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
                            placeholder="name@example.com"
                            className={errors.email ? "border-danger" : ""}
                          />
                        )}
                      />
                      {errors.email && (
                        <Form.Text className="text-danger d-flex align-items-center gap-1">
                          <AlertCircle size={14} />
                          {errors.email.message}
                        </Form.Text>
                      )}
                      <Form.Text className="text-muted">
                        Your ticket will be sent to this email
                      </Form.Text>
                    </Form.Group>
                  </Col>

                  <Col md={12}>
                    <Form.Group>
                      <Form.Label className="d-flex align-items-center gap-2">
                        <User size={16} className="text-muted" />
                        Full Name
                      </Form.Label>
                      <Controller
                        name="fullname"
                        control={control}
                        rules={{ required: "Full name is required" }}
                        render={({ field }) => (
                          <Form.Control
                            {...field}
                            type="text"
                            placeholder="Enter your full name"
                            className={errors.fullname ? "border-danger" : ""}
                          />
                        )}
                      />
                      {errors.fullname && (
                        <Form.Text className="text-danger d-flex align-items-center gap-1">
                          <AlertCircle size={14} />
                          {errors.fullname.message}
                        </Form.Text>
                      )}
                      <Form.Text className="text-muted">
                        As it appears on your CNIC
                      </Form.Text>
                    </Form.Group>
                  </Col>

                  <Col md={12}>
                    <Form.Group className="mb-0">
                      <Controller
                        name="agree"
                        control={control}
                        rules={{ required: "You must agree to proceed" }}
                        render={({ field }) => (
                          <Form.Check
                            {...field}
                            type="checkbox"
                            label="I agree to receive travel related information and deals"
                            className="user-select-none"
                          />
                        )}
                      />
                      {errors.agree && (
                        <Form.Text className="text-danger d-flex align-items-center gap-1">
                          <AlertCircle size={14} />
                          {errors.agree.message}
                        </Form.Text>
                      )}
                    </Form.Group>
                  </Col>
                </Row>
              </Form>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={4}>
          <Card className="shadow-sm">
            <Card.Header className="bg-white py-3">
              <h4 className="mb-0 d-flex align-items-center gap-2">
                <Users size={20} className="text-primary" />
                Booking Summary
              </h4>
            </Card.Header>
            <Card.Body>
              <div className="mb-4">
                <h6 className="text-muted mb-3">Selected Seats</h6>
                <div className="table-responsive">
                  <table className="table table-sm">
                    <thead className="table-light">
                      <tr>
                        <th>Seat</th>
                        <th>Gender</th>
                      </tr>
                    </thead>
                    <tbody>
                      {bookedInfo.map((item, index) => (
                        <tr key={index}>
                          <td>
                            <span className="badge bg-primary">
                              {item.seatNumber}
                            </span>
                          </td>
                          <td className="text-capitalize">{item.gender}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <Form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-4">
                  <Form.Group className="mb-3">
                    <Form.Label className="d-flex align-items-center gap-2">
                      <Tag size={16} className="text-muted" />
                      Promo Code
                    </Form.Label>
                    <div className="d-flex gap-2">
                      <Controller
                        name="promoCode"
                        control={control}
                        render={({ field }) => (
                          <Form.Control
                            {...field}
                            placeholder="Enter promo code"
                            type="text"
                          />
                        )}
                      />
                      <Button
                        onClick={applyPromo}
                        disabled={!selectedPromoCode}
                        variant="outline-primary"
                        className="flex-shrink-0"
                      >
                        Apply
                      </Button>
                    </div>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label className="d-flex align-items-center gap-2">
                      <CreditCard size={16} className="text-muted" />
                      Payment Method
                    </Form.Label>
                    <Controller
                      name="payment_method"
                      control={control}
                      rules={{ required: "Please select a payment method" }}
                      render={({ field }) => (
                        <Form.Select
                          {...field}
                          className={
                            errors.payment_method ? "border-danger" : ""
                          }
                        >
                          <option value="">Select payment method</option>
                          <option value="debit card">Debit Card</option>
                          <option value="jazzcash">JazzCash</option>
                        </Form.Select>
                      )}
                    />
                    {errors.payment_method && (
                      <Form.Text className="text-danger d-flex align-items-center gap-1">
                        <AlertCircle size={14} />
                        {errors.payment_method.message}
                      </Form.Text>
                    )}
                  </Form.Group>

                  <Form.Group>
                    <Form.Label className="d-flex align-items-center gap-2">
                      <CheckCircle2 size={16} className="text-muted" />
                      Total Amount
                    </Form.Label>
                    <Controller
                      name="amount_to_pay"
                      control={control}
                      rules={{
                        required: "Amount is required",
                        min: {
                          value: promoData?.status
                            ? totalFare - 400
                            : totalFare,
                          message: `Amount must be at least ${
                            promoData?.status ? totalFare - 400 : totalFare
                          } Rs.`,
                        },
                      }}
                      render={({ field }) => (
                        <Form.Control
                          {...field}
                          type="number"
                          readOnly
                          className="form-control-lg fw-bold"
                        />
                      )}
                    />
                  </Form.Group>
                </div>

                <Button
                  variant="primary"
                  size="lg"
                  type="submit"
                  disabled={!selectedPaymentMethod || isLoading}
                  className="w-100"
                >
                  {isLoading ? "Processing..." : "Confirm Booking"}
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ContactForm;

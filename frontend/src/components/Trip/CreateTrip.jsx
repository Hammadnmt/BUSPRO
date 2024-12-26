/* eslint-disable no-unused-vars */
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useCreateBusMutation } from "../../features/bus/busSlice";
import Loader from "../Loading";
import { useForm } from "react-hook-form";
import { Container, Row, Button, Col, Form, Card } from "react-bootstrap";

const CreateTrip = () => {
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
            // if (err?.message) {
            //   // Object.keys(err.data.errors).forEach((key) =>
            //   //   setError(key, { type: "server", message: err.data.errors[key] })
            //   // );
            // }
        }
    };

    useEffect(() => {
        if (isSuccess) {
            navigate("/admin/bus");
        }
    }, [isSuccess, navigate]);

    return isLoading ? (
        <Loader />
    ) : (
        <Container className="product-form d-flex justify-content-center min-vh-100 min-vw-100">
            <Row>
                <Col>
                    <Card className="product-card mt-2">
                        <Card.Body>
                            <h3 className="text-center mb-4">Add Bus</h3>
                            <Form
                                onSubmit={handleSubmit(onSubmit)}
                                className="d-flex flex-column justify-content-center align-items-center"
                            >
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
                                        className={errors.name ? "is-invalid" : ""}
                                    />
                                    {errors.name && (
                                        <small className="text-danger">{errors.name.message}</small>
                                    )}
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Control
                                        type="totalSeats"
                                        placeholder="Enter Total Seats"
                                        {...register("totalSeats", {
                                            required: "totalSeats is required",
                                            min: { value: 1, message: "Must be at least 1" },
                                        })}
                                        className={errors.totalSeats ? "is-invalid" : ""}
                                    />
                                    {errors.quantity && (
                                        <small className="text-danger">
                                            {errors.quantity.message}
                                        </small>
                                    )}
                                </Form.Group>
                                <Button type="submit" variant="success">
                                    {isLoading ? "Adding..." : "Add"}
                                </Button>
                                {isError && (
                                    <small className="text-danger mt-3">
                                        {error?.data?.message || "Failed to create product"}
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

export default CreateBus;
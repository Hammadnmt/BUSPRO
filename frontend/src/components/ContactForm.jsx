import React, { useState, useEffect } from "react";
import { Form, Row, Col, Container, Card, Button } from "react-bootstrap";
import { getUser } from "../utils/getUser";
import { useGetUserByIdQuery } from "../features/user/userSlice";

const ContactForm = () => {
  const { data } = useGetUserByIdQuery(getUser());
  console.log(data);

  const [formData, setFormData] = useState({
    mobileNumber: "",
    email: "",
    title: "",
    fullname: "",
    lastName: "",
    dateOfBirth: {
      date: "",
      month: "",
      year: "",
    },
    cnicNumber: "",
  });
  useEffect(() => {
    if (data) {
      setFormData({
        mobileNumber: data?.phone_number || "",
        email: data?.email || "",
        title: data?.title || "",
        fullname: data?.name || "",
      });
    }
  }, [data]);

  return (
    <Container className="mt-4">
      <Card>
        <Card.Body>
          <Form>
            <h4 className="mb-4">Contact Details</h4>

            <Row className="mb-4">
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Mobile Number</Form.Label>
                  <div className="d-flex">
                    <Form.Control
                      type="text"
                      placeholder="+9203XXXXXXXX"
                      value={formData.mobileNumber}
                    />
                  </div>
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
                  <Form.Control
                    value={formData.email}
                    type="email"
                    placeholder="e.g. name@outlook.com"
                  />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-4">
              <Form.Check
                type="checkbox"
                label="I agree to receive travel related information and deals"
              />
            </Form.Group>
            <Row className="mb-4">
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Full name</Form.Label>
                  <Form.Control type="text" value={formData.fullname} />
                  <Form.Text className="text-muted">
                    Please ensure your name is as it appears on your CNIC
                  </Form.Text>
                </Form.Group>
              </Col>
            </Row>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default ContactForm;

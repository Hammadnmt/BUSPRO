import React from "react";
import { Row, Col, Card } from "react-bootstrap";
import { Mail, Phone, User } from "lucide-react";
import { useGetUserByIdQuery } from "../features/user/userSlice";
import { getUser } from "../utils/getUser";

export default function UserProfile() {
  const { data: userData } = useGetUserByIdQuery(getUser());

  return (
    <Row className="justify-content-center">
      <Col xs={12} lg={10}>
        <Card className="border-0 shadow-sm">
          <Card.Body className="p-4">
            <div className="text-center mb-4">
              <div className="d-inline-flex justify-content-center align-items-center bg-primary bg-opacity-10 rounded-circle p-3 mb-3">
                <User size={40} className="text-primary" />
              </div>
              <h2 className="mb-0">Profile Information</h2>
            </div>

            <Row className="g-4">
              <Col xs={12}>
                <Card className="border-0 bg-light">
                  <Card.Body>
                    <div className="d-flex align-items-center gap-3">
                      <div className="d-flex justify-content-center align-items-center bg-white rounded-circle p-2">
                        <User size={24} className="text-primary" />
                      </div>
                      <div>
                        <p className="text-muted small mb-0">Full Name</p>
                        <h5 className="mb-0">
                          {userData?.name || "Loading..."}
                        </h5>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </Col>

              <Col xs={12} md={6}>
                <Card className="border-0 bg-light h-100">
                  <Card.Body>
                    <div className="d-flex align-items-center gap-3">
                      <div className="d-flex justify-content-center align-items-center bg-white rounded-circle p-2">
                        <Mail size={24} className="text-primary" />
                      </div>
                      <div>
                        <p className="text-muted small mb-0">Email Address</p>
                        <h5 className="mb-0">
                          {userData?.email || "Loading..."}
                        </h5>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </Col>

              <Col xs={12} md={6}>
                <Card className="border-0 bg-light h-100">
                  <Card.Body>
                    <div className="d-flex align-items-center gap-3">
                      <div className="d-flex justify-content-center align-items-center bg-white rounded-circle p-2">
                        <Phone size={24} className="text-primary" />
                      </div>
                      <div>
                        <p className="text-muted small mb-0">Phone Number</p>
                        <h5 className="mb-0">
                          {userData?.phone_number || "Loading..."}
                        </h5>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
}

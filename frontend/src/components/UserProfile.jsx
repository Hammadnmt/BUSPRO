import { Mail, Phone, User } from "lucide-react";
import React from "react";
import { Row, Form, Card, Col } from "react-bootstrap";
import { Controller } from "react-hook-form";
import {getUser} from "../utils/getUser";
import { useGetUserByIdQuery } from "../features/user/userSlice";

export default function UserProfile() {
  const { data: useraData } = useGetUserByIdQuery(getUser());

  return (
    <div className="container">
      <div className="">
        <Row>
          <Col>
            <Card className="mt-4">
              <Card.Body
                className="text-white"
                style={{ backgroundColor: "#364F6B" }}
              >
                <div className="d-flex">
                  <div>
                    <h3>{useraData?.name}</h3>
                    <h3>{useraData?.email}</h3>
                    <h3>{useraData?.phone_number}</h3>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
}

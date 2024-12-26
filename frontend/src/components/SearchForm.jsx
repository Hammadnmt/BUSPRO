/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { Row, Button, Col, Form, Card, ListGroup } from "react-bootstrap";
import { ExpandMore } from "@mui/icons-material";
import { useLazyGetTripByRouteQuery } from "../features/trip/tripSlice";
import { useGetAllroutesQuery } from "../features/route/routeSlice";
import { getCurrentDate } from "../utils/getCurrenDate";
import { validateForm } from "../utils/validateSearchForm";

// This functionality is working as Desired
const TravelSearchForm = () => {
  const [formData, setFormData] = useState({
    from: "",
    to: "",
    date: getCurrentDate(),
  });
  const { data: routeData } = useGetAllroutesQuery();
  const [triggerQuery, { data, isLoading, isSuccess, isError }] =
    useLazyGetTripByRouteQuery();

  const [suggestions, setSuggestions] = useState({
    from: [],
    to: [],
  });

  const [showSuggestions, setShowSuggestions] = useState({
    from: false,
    to: false,
  });

  // Get unique source cities
  const getSourceCities = () => {
    if (!routeData) return [];
    return [...new Set(routeData.map((route) => route.source))];
  };

  // Get destinations for selected source
  const getDestinations = (source) => {
    if (!routeData) return [];
    return routeData
      .filter((route) => route.source === source)
      .map((route) => route.destination);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "from") {
      const sourceSuggestions = getSourceCities().filter((city) =>
        city.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions((prev) => ({
        ...prev,
        from: sourceSuggestions,
      }));
      setShowSuggestions((prev) => ({
        ...prev,
        from: true,
      }));
    } else if (name === "to" && formData.from) {
      const destSuggestions = getDestinations(formData.from).filter((city) =>
        city.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions((prev) => ({
        ...prev,
        to: destSuggestions,
      }));
      setShowSuggestions((prev) => ({
        ...prev,
        to: true,
      }));
    }
  };

  const handleChevronClick = (field) => {
    if (field === "from") {
      setSuggestions((prev) => ({
        ...prev,
        from: getSourceCities(),
      }));
    } else if (field === "to" && formData.from) {
      setSuggestions((prev) => ({
        ...prev,
        to: getDestinations(formData.from),
      }));
    }
    setShowSuggestions((prev) => ({
      ...prev,
      [field]: true,
    }));
  };

  const handleSuggestionClick = (value, field) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    setShowSuggestions((prev) => ({
      ...prev,
      [field]: false,
    }));

    // Clear destination if source changes
    if (field === "from") {
      setFormData((prev) => ({
        ...prev,
        to: "",
      }));
    }
  };

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".input-group")) {
        setShowSuggestions({
          from: false,
          to: false,
        });
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();
    if (validateForm) {
      triggerQuery({
        to: formData.to,
        from: formData.from,
        date: formData.date,
      });
      console.log(data);
    }
  };

  const dropdownStyles = {
    maxHeight: "200px",
    overflowY: "auto",
    border: "1px solid rgba(0,0,0,.125)",
    borderRadius: "0.375rem",
    boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
    backgroundColor: "white",
  };

  return (
    <Row>
      <Col>
        <Card>
          <Card.Body>
            <h3 className="text-center mb-4">Book Your Ticket Here</h3>
            <Form
              onSubmit={onSubmit}
              className="d-flex flex-column flex-md-row justify-content-center align-items-center gap-3"
            >
              <div className="position-relative w-100 w-md-auto">
                <Form.Group className="mb-3 w-100">
                  <div className="input-group">
                    <Form.Control
                      type="text"
                      name="from"
                      value={formData.from}
                      placeholder="From (City)"
                      onChange={handleChange}
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowSuggestions((prev) => ({
                          ...prev,
                          from: true,
                        }));
                      }}
                    />
                    <Button
                      variant="outline-secondary"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleChevronClick("from");
                      }}
                    >
                      <ExpandMore className="h-4 w-4" />
                    </Button>
                  </div>
                </Form.Group>
                {showSuggestions.from && suggestions.from.length > 0 && (
                  <div
                    style={dropdownStyles}
                    className="position-absolute w-100 z-50"
                  >
                    <ListGroup variant="flush">
                      {suggestions.from.map((city, index) => (
                        <ListGroup.Item
                          key={index}
                          action
                          onClick={() => handleSuggestionClick(city, "from")}
                          className="cursor-pointer"
                        >
                          {city}
                        </ListGroup.Item>
                      ))}
                    </ListGroup>
                  </div>
                )}
              </div>

              <div className="position-relative w-100 w-md-auto">
                <Form.Group className="mb-3 w-100">
                  <div className="input-group">
                    <Form.Control
                      type="text"
                      name="to"
                      placeholder="To (City)"
                      value={formData.to}
                      onChange={handleChange}
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowSuggestions((prev) => ({
                          ...prev,
                          to: true,
                        }));
                      }}
                    />
                    <Button
                      variant="outline-secondary"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleChevronClick("to");
                      }}
                    >
                      <ExpandMore className="h-4 w-4" />
                    </Button>
                  </div>
                </Form.Group>
                {showSuggestions.to && suggestions.to.length > 0 && (
                  <div
                    style={dropdownStyles}
                    className="position-absolute w-100 z-50"
                  >
                    <ListGroup variant="flush">
                      {suggestions.to.map((city, index) => (
                        <ListGroup.Item
                          key={index}
                          action
                          onClick={() => handleSuggestionClick(city, "to")}
                          className="cursor-pointer"
                        >
                          {city}
                        </ListGroup.Item>
                      ))}
                    </ListGroup>
                  </div>
                )}
              </div>

              <Form.Group className="mb-3 w-100 w-md-auto">
                <Form.Control
                  name="date"
                  type="date"
                  onChange={handleChange}
                  value={formData.date}
                />
              </Form.Group>

              <Button
                className="mb-3 w-100 w-md-auto"
                type="submit"
                variant="success"
              >
                Search
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default TravelSearchForm;

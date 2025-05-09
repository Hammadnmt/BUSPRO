import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { toast } from "react-toastify";
import { ChevronDown, Search } from "lucide-react";
import { Container, Card, Form, Button, Row, Col, Dropdown } from "react-bootstrap";
import { useLazyGetTripByRouteQuery } from "../features/trip/tripSlice";
import { useGetAllroutesQuery } from "../features/route/routeSlice";
import Trip from "./Trip";
import { getCurrentDate } from "../utils/getCurrenDate";

const TravelSearchForm = () => {
  const { data: routeData } = useGetAllroutesQuery();
  const [triggerQuery, { data: tripData, isLoading }] = useLazyGetTripByRouteQuery();
  const [suggestions, setSuggestions] = useState({ from: [], to: [] });
  const [showSuggestions, setShowSuggestions] = useState({
    from: false,
    to: false,
  });

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      from: "",
      to: "",
      date: getCurrentDate(),
    },
  });

  const watchFrom = watch("from");

  const getSourceCities = () => {
    if (!routeData) return [];
    return [...new Set(routeData.map((route) => route.source))];
  };

  const getDestinations = (source) => {
    if (!routeData) return [];
    return routeData.filter((route) => route.source === source).map((route) => route.destination);
  };

  const handleInputChange = (field, value) => {
    setValue(field, value);

    if (field === "from") {
      const sourceSuggestions = getSourceCities().filter((city) =>
        city.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions((prev) => ({ ...prev, from: sourceSuggestions }));
      setShowSuggestions((prev) => ({ ...prev, from: true }));
    } else if (field === "to" && watchFrom) {
      const destSuggestions = getDestinations(watchFrom).filter((city) =>
        city.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions((prev) => ({ ...prev, to: destSuggestions }));
      setShowSuggestions((prev) => ({ ...prev, to: true }));
    }
  };

  const handleSuggestionClick = (value, field) => {
    setValue(field, value);
    setShowSuggestions((prev) => ({ ...prev, [field]: false }));
    if (field === "from") setValue("to", "");
  };

  const onSubmit = async (formData) => {
    try {
      const result = await triggerQuery({
        to: formData.to,
        from: formData.from,
        date: formData.date,
      }).unwrap();

      if (result.length === 0) {
        toast.error("No trips found for this date.");
      } else {
        toast.success("Trips fetched successfully!");
      }
    } catch (err) {
      toast.error(err.message || "An error occurred.");
    }
  };

  return (
    <Container className="py-4">
      <Card className="border-0 shadow">
        <div className="py-3 px-4" style={{ backgroundColor: "#364F6B" }}>
          <h2 className="text-white text-center mb-0 fw-bold">Find Your Perfect Journey</h2>
        </div>

        <Card.Body className="p-4">
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Row className="g-3">
              {/* From City */}
              <Col md={4}>
                <Form.Group>
                  <Form.Label style={{ color: "#364F6B" }}>From City</Form.Label>
                  <div className="position-relative">
                    <Controller
                      name="from"
                      control={control}
                      rules={{ required: "Departure city is required" }}
                      render={({ field }) => (
                        <Form.Control
                          {...field}
                          type="text"
                          isInvalid={!!errors.from}
                          placeholder="Select departure city"
                          onChange={(e) => handleInputChange("from", e.target.value)}
                        />
                      )}
                    />
                    <Dropdown show={showSuggestions.from && suggestions.from.length > 0}>
                      <Dropdown.Menu
                        style={{
                          width: "100%",
                          maxHeight: "200px",
                          overflowY: "auto",
                        }}
                      >
                        {suggestions.from.map((city, index) => (
                          <Dropdown.Item key={index} onClick={() => handleSuggestionClick(city, "from")}>
                            {city}
                          </Dropdown.Item>
                        ))}
                      </Dropdown.Menu>
                    </Dropdown>
                    <Form.Control.Feedback type="invalid">{errors.from?.message}</Form.Control.Feedback>
                  </div>
                </Form.Group>
              </Col>

              {/* To City */}
              <Col md={4}>
                <Form.Group>
                  <Form.Label style={{ color: "#364F6B" }}>To City</Form.Label>
                  <div className="position-relative">
                    <Controller
                      name="to"
                      control={control}
                      rules={{ required: "Destination city is required" }}
                      render={({ field }) => (
                        <Form.Control
                          {...field}
                          type="text"
                          isInvalid={!!errors.to}
                          placeholder="Select destination city"
                          onChange={(e) => handleInputChange("to", e.target.value)}
                        />
                      )}
                    />
                    <Dropdown show={showSuggestions.to && suggestions.to.length > 0}>
                      <Dropdown.Menu
                        style={{
                          width: "100%",
                          maxHeight: "200px",
                          overflowY: "auto",
                        }}
                      >
                        {suggestions.to.map((city, index) => (
                          <Dropdown.Item key={index} onClick={() => handleSuggestionClick(city, "to")}>
                            {city}
                          </Dropdown.Item>
                        ))}
                      </Dropdown.Menu>
                    </Dropdown>
                    <Form.Control.Feedback type="invalid">{errors.to?.message}</Form.Control.Feedback>
                  </div>
                </Form.Group>
              </Col>

              {/* Date Selection */}
              <Col md={4}>
                <Form.Group>
                  <Form.Label style={{ color: "#364F6B" }}>Travel Date</Form.Label>
                  <Controller
                    name="date"
                    control={control}
                    rules={{ required: "Travel date is required" }}
                    render={({ field }) => (
                      <Form.Control {...field} type="date" min={getCurrentDate()} isInvalid={!!errors.date} />
                    )}
                  />
                  <Form.Control.Feedback type="invalid">{errors.date?.message}</Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>

            <div className="text-center mt-4">
              <Button
                type="submit"
                disabled={isLoading}
                style={{
                  backgroundColor: "#364F6B",
                  borderColor: "#364F6B",
                }}
                className="px-4 py-2"
              >
                <Search size={20} className="me-2" />
                {isLoading ? "Searching..." : "Search Trips"}
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>

      {/* Trip Results */}
      {tripData && (
        <div className="mt-4">
          {tripData.map((trip) => (
            <Trip key={trip._id} data={trip} />
          ))}
        </div>
      )}
    </Container>
  );
};

export default TravelSearchForm;

/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { Row, Button, Col, Card, ListGroup } from "react-bootstrap";
import { ExpandMore } from "@mui/icons-material";
import { useLazyGetTripByRouteQuery } from "../features/trip/tripSlice";
import { useGetAllroutesQuery } from "../features/route/routeSlice";
import Trip from "./Trip";
import { getCurrentDate } from "../utils/getCurrenDate";
import { useForm, Controller } from "react-hook-form";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const TravelSearchForm = () => {
  const { data: routeData } = useGetAllroutesQuery();
  const [triggerQuery, { data, isLoading, isError, error }] =
    useLazyGetTripByRouteQuery();
  console.log(error)
  const {
    register,
    handleSubmit,
    setValue,
    control,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      from: "",
      to: "",
      date: getCurrentDate(),
    },
  });

  const [suggestions, setSuggestions] = useState({
    from: [],
    to: [],
  });

  const [showSuggestions, setShowSuggestions] = useState({
    from: false,
    to: false,
  });

  const watchFrom = watch("from");

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

  const handleInputChange = (field, value) => {
    setValue(field, value);

    if (field === "from") {
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
    } else if (field === "to" && watchFrom) {
      const destSuggestions = getDestinations(watchFrom).filter((city) =>
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
    } else if (field === "to" && watchFrom) {
      setSuggestions((prev) => ({
        ...prev,
        to: getDestinations(watchFrom),
      }));
    }
    setShowSuggestions((prev) => ({
      ...prev,
      [field]: true,
    }));
  };

  const handleSuggestionClick = (value, field) => {
    setValue(field, value);
    setShowSuggestions((prev) => ({
      ...prev,
      [field]: false,
    }));

    if (field === "from") {
      setValue("to", "");
    }
  };

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

  const onSubmit = (formData) => {
    triggerQuery({
      to: formData.to,
      from: formData.from,
      date: new Date(formData.date).toISOString(),
    })
      .unwrap()
      .then(() => {
        toast.success("Trips fetched successfully!");
      })
      .catch((err) => {
        toast.error(error.message || "An error occurred.");
      });
  };

  const dropdownStyles = {
    maxHeight: "200px",
    overflowY: "auto",
    border: "1px solid rgba(0,0,0,.125)",
    borderRadius: "0.375rem",
    boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
    backgroundColor: "white",
    zIndex: "999999",
  };

  return (
    <>
      <div>
        <Row>
          <Col>
            <Card>
              <Card.Body>
                <h3 className="text-center mb-4">Book Your Ticket Here</h3>
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="d-flex flex-column flex-md-row justify-content-center align-items-center gap-3"
                >
                  <div className="position-relative w-100 w-md-auto">
                    <div className="input-group">
                      <Controller
                        name="from"
                        control={control}
                        rules={{ required: "From city is required." }}
                        render={({ field }) => (
                          <input
                            {...field}
                            type="text"
                            className={`form-control ${errors.from ? "is-invalid" : ""}`}
                            placeholder="From (City)"
                            onChange={(e) => handleInputChange("from", e.target.value)}
                            onClick={(e) => {
                              e.stopPropagation();
                              setShowSuggestions((prev) => ({
                                ...prev,
                                from: true,
                              }));
                            }}
                          />
                        )}
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
                    {errors.from && <div className="invalid-feedback">{errors.from.message}</div>}
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
                    <div className="input-group">
                      <Controller
                        name="to"
                        control={control}
                        rules={{ required: "To city is required." }}
                        render={({ field }) => (
                          <input
                            {...field}
                            type="text"
                            className={`form-control ${errors.to ? "is-invalid" : ""}`}
                            placeholder="To (City)"
                            onChange={(e) => handleInputChange("to", e.target.value)}
                            onClick={(e) => {
                              e.stopPropagation();
                              setShowSuggestions((prev) => ({
                                ...prev,
                                to: true,
                              }));
                            }}
                          />
                        )}
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
                    {errors.to && <div className="invalid-feedback">{errors.to.message}</div>}
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

                  <Controller
                    name="date"
                    control={control}
                    rules={{ required: "Date is required." }}
                    render={({ field }) => (
                      <input
                        {...field}
                        type="date"
                        className={`form-control ${errors.date ? "is-invalid" : ""}`}
                      />
                    )}
                  />
                  {errors.date && <div className="invalid-feedback">{errors.date.message}</div>}

                  <Button
                    className="mb-3 w-100 w-md-auto"
                    type="submit"
                    variant="success"
                  >
                    Search
                  </Button>
                </form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <div className="d-flex flex-column justify-content-center align-items-center p-4">
          {data?.map((trip) => (
            <Trip data={trip} key={trip._id} />
          ))}
        </div>
      </div>
    </>
  );
};

export default TravelSearchForm;

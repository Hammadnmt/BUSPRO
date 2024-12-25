import React from 'react';
import { Link } from "react-router"
import { Container, Row, Button, Col, Form, Card } from "react-bootstrap";
const TravelSearchForm = () => {
    const handleSubmit = () => { };
    const onSubmit = () => { }
    const register = () => { }
    const errors = () => { }
    return (
        // <Container className="d-flex justify-content-center align-items-center min-vh-100 min-vw-100">
        <Row>
            <Col>
                <Card className="card">
                    <Card.Body>
                        <h3 className="text-center mb-4">Book You Ticket Here</h3>
                        <Form
                            onSubmit={handleSubmit(onSubmit)}
                            className="d-flex justify-content-center align-items-center gap-3 min-vw-100"
                        >
                            <Form.Group className="mb-3 " >
                                <Form.Control
                                    type="text"
                                    name="From"
                                    placeholder="From (City)"
                                // className={errors.name ? "is-invalid" : ""}
                                />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Control
                                    type="text"
                                    placeholder="To (City)"
                                // className={errors.name ? "is-invalid" : ""}
                                />
                                {/* {errors.password && (
                                    <p className="text-danger">{errors.password.message}</p>
                                )} */}
                            </Form.Group>
                            <Form.Group className="mb-3 " >
                                <Form.Control
                                    type="date"
                                    name="From"
                                    placeholder="From (City)"
                                // className={errors.name ? "is-invalid" : ""}
                                />
                            </Form.Group>
                            <Button className="mb-3" type="submit" variant="success">
                                Search
                            </Button>
                        </Form>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
        // </Container>
        // <Card className="w-full max-w-4xl bg-white">
        //     <CardBody className="p-6">
        //         {/* Navigation Tabs */}
        //         <div className="flex gap-4 mb-6">
        //             <Button
        //                 variant="ghost"
        //                 className="flex items-center gap-2 hover:bg-blue-50"
        //             >

        //                 <span className="text-[#0051a0]">Flights</span>
        //             </Button>

        //             <Button
        //                 variant="ghost"
        //                 className="flex items-center gap-2 bg-[#0051a0] hover:bg-[#004590]"
        //             >

        //                 <span className="text-white">Buses</span>
        //             </Button>

        //             <Button
        //                 variant="ghost"
        //                 className="flex items-center gap-2 hover:bg-blue-50"
        //             >

        //                 <span className="text-[#0051a0]">Visas</span>
        //             </Button>

        //             <Button
        //                 variant="ghost"
        //                 className="flex items-center gap-2 hover:bg-blue-50"
        //             >

        //                 <span className="text-[#0051a0]">Packages</span>
        //             </Button>
        //         </div>

        //         {/* Search Form */}
        //         <div className="grid grid-cols-1 md:grid-cols-8 gap-4 items-center">
        //             {/* Leaving From */}
        //             <div className="relative md:col-span-3">

        //                 <Input
        //                     type="text"
        //                     placeholder="Leaving From"
        //                     className="pl-10 border-gray-200"
        //                 />
        //             </div>

        //             {/* Swap Button */}
        //             <div className="flex justify-center md:col-span-1">
        //                 <Button
        //                     variant="ghost"
        //                     size="icon"
        //                     className="rounded-full hover:bg-gray-100"
        //                 >

        //                 </Button>
        //             </div>

        //             {/* Going To */}
        //             <div className="relative md:col-span-3">

        //                 <Input
        //                     type="text"
        //                     placeholder="Going To"
        //                     className="pl-10 border-gray-200"
        //                 />
        //             </div>

        //             {/* Date */}
        //             <div className="relative md:col-span-1">

        //                 <Input
        //                     type="text"
        //                     placeholder="25 Dec, 2024"
        //                     className="pl-10 border-gray-200"
        //                 />
        //             </div>
        //         </div>
        //         <Button
        //             className="w-full mt-4 bg-[#0051a0] hover:bg-[#004590] text-white"
        //         >
        //             Search Buses
        //         </Button>
        //     </CardBody>
        // </Card>
    );
};

export default TravelSearchForm;
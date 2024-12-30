import React from 'react'

export default function UserProfile() {
    return (
        <>

            <main>
                <div className="container py-4 px-3">
                    <h2 className='h2 font-weight-600 mb-4'>Account</h2>
                    <div className="row g-3">
                        <div className="col-md-6">

                            <div className="card account-card p-3 border rounded-sm">
                                <div className="d-flex align-items-center">
                                    <div className="card-content">
                                        <p className="text-grey-700 mb-0">Profile Information</p>
                                        <p className="font-weight-400 mb-0">View and Edits</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">

                            <div className="card account-card p-3 border rounded-sm">
                                <div className="d-flex align-items-center">
                                    <div className="card-content">
                                        <p className="text-grey-700 mb-0">My Bookings</p>
                                        <p className="font-weight-400 mb-0">View and Edits</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <section className=' bg-dark py-4 px-3'>
                <div className='container py-4 px-3'>
                    <div className="row my-1">
                        <div className="col-lg-7">
                            <p className="h2 font-weight-600 mb-3 text-white">Subscribe to our newsletter</p>
                            <p className="lead h5 font-weight-400 text-white">Stay up to date with the latest news, announcements and articles.</p></div>
                        <div className="col-lg-5">
                            <form action="#">
                                <div className="row g-2 gy-3">
                                    <div className="col-md-9">
                                        <input type="email" className="form-control" placeholder="Enter your email" required="" />
                                    </div>
                                    <div className="col-md-3">
                                        <button type="submit" className="btn btn-primary">Subscribe</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
            <section className="footer-section bg-gray-800" id="footer">
                <div className="container py-5 py-lg-5 px-3 px-md-4 px-lg-5">
                    <div className="row g-3 my-2">
                        <div className="col-lg-2 col-md-6 col-6">
                            <h6 className="font-weight-600 small text-gray-400 mb-3">Services</h6>
                            <ul className="nav flex-column">
                                <li className="nav-item">
                                    <a href="/buy-bus-tickets-online" className="nav-link text-white px-0" >Bus Booking</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

        </>
    )
}

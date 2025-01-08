import React, { Suspense } from "react";
import { useNavigate } from "react-router";
import { MoveRight, Bus } from "lucide-react";
import { useGetUserByIdQuery } from "../features/user/userSlice";
import { useGetBookingByUserIdQuery } from "../features/booking/bookingSlice";

import { getUser } from "../utils/getUser";
import { Capitalize, extractTime12HourFormat } from "../utils/helpers";
export default function BookingConfirm() {
  const navigate = useNavigate();
  const { data: userdata } = useGetUserByIdQuery(getUser());
  const { data: bookingData, isLoading } = useGetBookingByUserIdQuery(
    getUser()
  );
  setTimeout(() => {
    navigate("/");
  }, 6000);
  if (isLoading) {
    return <p>....loading</p>;
  }
  return (
    <>
      <div className="container p-0  shadow-lg mt-3 border border-2 rounded-3 w-50">
        <div className="d-flex justify-content-between">
          <h2 className="text-center py-4 ">Booking Confirmation</h2>
          <div className="w-50">
            <div className="mt-3 px-2 py-2">
              <p>
                <b>{Capitalize(userdata?.name)}</b> your booking has been{" "}
                <b>CONFIRMED!</b>
              </p>
              <p className="mb-0">
                {bookingData
                  ? Capitalize(bookingData?.trip?.Route?.source)
                  : " "}
                <MoveRight />{" "}
                {Capitalize(bookingData?.trip?.Route?.destination)}
              </p>
              <p className="mb-0">
                {extractTime12HourFormat(bookingData?.trip?.departure_time)}{" "}
                <MoveRight />
                {extractTime12HourFormat(bookingData?.trip?.arrival_time)}
              </p>
            </div>
          </div>
          <div className="w-50 mt-3 d-flex justify-content-center align-items-center">
            <svg
              fill="#000000"
              height="100px"
              width="100px"
              version="1.1"
              id="Layer_1"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              viewBox="0 0 455 455"
              xml:space="preserve"
            >
              <g>
                <polygon points="197.891,234.97 213.011,234.97 205.541,212.38" />
                <path d="M156.042,210.58c-0.661-0.72-1.41-1.245-2.25-1.575c-0.841-0.329-1.68-0.495-2.52-0.495h-11.52v17.46h12.06c1.74,0,3.24-0.75,4.5-2.25c1.26-1.499,1.89-3.69,1.89-6.57c0-1.499-0.195-2.79-0.585-3.87C157.226,212.2,156.701,211.3,156.042,210.58z" />
                <path d="M314.079,213.73c-1.439-1.679-3.21-2.97-5.31-3.87c-2.101-0.9-4.471-1.35-7.11-1.35h-9.09v37.98h9.09c2.7,0,5.1-0.479,7.2-1.44c2.1-0.959,3.854-2.295,5.265-4.005c1.409-1.71,2.489-3.72,3.24-6.03c0.75-2.309,1.125-4.844,1.125-7.605c0-2.819-0.375-5.384-1.125-7.695C316.613,217.406,315.52,215.41,314.079,213.73z" />
                <path d="M0,113.06V341.94h455V113.06H0z M171.657,225.25c-0.99,2.581-2.371,4.891-4.14,6.93c-1.771,2.041-3.915,3.661-6.435,4.86c-2.52,1.201-5.31,1.8-8.37,1.8h-12.96v20.61h-14.76v-63.9h27.27c3.06,0,5.864,0.63,8.415,1.89c2.549,1.26,4.739,2.911,6.57,4.95c1.83,2.041,3.27,4.351,4.32,6.93c1.049,2.581,1.575,5.19,1.575,7.83C173.142,219.971,172.646,222.671,171.657,225.25z M220.391,259.45l-4.95-14.31h-19.89l-4.86,14.31h-15.12l23.31-63.9h13.32l23.31,63.9H220.391z M261.07,259.45h-14.76v-63.9h14.76V259.45z M331.27,240.595c-1.501,3.931-3.646,7.29-6.436,10.08c-2.789,2.79-6.15,4.95-10.079,6.48c-3.931,1.53-8.296,2.295-13.096,2.295h-23.85v-63.9h23.85c5.279,0,9.9,0.841,13.86,2.52c3.96,1.68,7.274,3.96,9.945,6.84c2.669,2.88,4.68,6.255,6.029,10.125c1.351,3.87,2.025,7.996,2.025,12.375C333.52,232.27,332.769,236.666,331.27,240.595z" />
              </g>
            </svg>
          </div>
        </div>
        <div className=" d-flex justify-content-start">
          <div className="w-25 px-3 py-2 ">
            <div className="d-flex">
              <Bus size={32} style={{ color: "#364F6B" }} className="me-2" />
              <h3>BusPRO</h3>
            </div>
            <p className="mt-3">Where comfort thrives</p>
          </div>
          <div className="w-75 px-5 mt-3">
            An Email has been sent to your email
            <p className="">
              <b>{userdata?.email}</b>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

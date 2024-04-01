import React, { useEffect, useState } from "react";
import Layout from "../Component/Layout";
import { DatePicker, TimePicker, message } from "antd";
import axios from "axios";
import { useParams } from "react-router-dom";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { showLoading, hideLoading } from "../redux/alertSlice";
const BookAppointment = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const [time, setTime] = useState([]);
  const [date, setDate] = useState("");
  const params = useParams();
  const [doctor, setDoctor] = useState([]); // Change doctors to doctor
  const [isAvailable, setIsAvailable] = useState(false);
  const getDoctorInfoById = async () => {
    try {
     
      // console.log("booking id"+params?.id)
      const res = await axios.post(
        "/api/v1/doctor/getDoctorById",
        { doctorId: params?.id },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      if (res?.data?.success) {
  
        setDoctor(res.data.data);
      }
    } catch (error) {
     
      console.log(error);
    }
  };
  const checkavailibility = async () => {
    try {
      dispatch(showLoading());
      const res = await axios.post(
        "/api/v1/user/checkavailibility",
        {
          doctorId: params?.id,
          date,
          time,
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      if (res.data.success) {
        dispatch(hideLoading());
        setIsAvailable(true);
        console.log(setIsAvailable());
        message.success(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      message.error(error);
    }
  };
  const handleBooking = async () => {
    try {
      setIsAvailable(true)
      dispatch(showLoading());
      const res = await axios.post(
        "/api/v1/user/book-appointment",
        {
          doctorId: params.id,
          userId: user._id,
          doctorInfo: doctor,
          userInfo: user,
          date,
          time,
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      if (res.data.success) {
        dispatch(hideLoading());
        message.success(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      message.error(error);
    }
  };
  useEffect(() => {
    getDoctorInfoById();
   
  }, []);

  return (
    <Layout>
      <h1>Book Appointment</h1>
      <div className="container m-2">
        {doctor && ( // Change doctors to doctor
          <div>
            <h4>
              Dr.{doctor.firstName} {doctor.lastName}
            </h4>
            <h4>Fees : {doctor?.feesPerCunsaltation}</h4>{" "}
            {/* Corrected spelling */}
            <h4>
              Timings : {doctor.timings && doctor.timings[0]} -{" "}
              {doctor.timings && doctor.timings[1]}{" "}
            </h4>
            <div className="d-flex flex-column w-50">
              <DatePicker
                className="m-2"
                format="DD-MM-YYYY"
                onChange={(value) =>
                  setDate(moment(value).format("DD-MM-YYYY"))
                }
              />
              <TimePicker
                format="HH:mm"
                className="m-2"
                onChange={(value) => {
                  setTime(moment(value).format("HH:mm"));
                }}
              />
              <button
                className="btn btn-primary mt-2"
                onClick={checkavailibility}
              >
                Check Availability
              </button>
              <button className="btn btn-dark mt-2" onClick={handleBooking}>
                Book Now
              </button>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default BookAppointment;

// import React, { useEffect, useState } from "react";
// import Layout from "../Component/Layout";
// import { DatePicker, TimePicker } from "antd";
// import axios from "axios";
// import { useParams } from "react-router-dom";

// const BookAppointment = () => {
//   const params = useParams();
//   const [doctor, setDoctor] = useState([]); // Change doctors to doctor
  
//   const getDoctorInfoById = async () => {
//     try {
//       console.log("booking id"+params.id)
//       const res = 
//       await axios.post(
//         "/api/v1/doctor/getDoctorById",
//         { doctorId: params.id },
//         {
//           headers: {
//             Authorization: "Bearer " + localStorage.getItem("token"),
//           },
//         }
//       );
//       if (res.data.success) {
//         setDoctor(res.data.data);
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   const handleBooking = () => {
//     // Implement booking logic here
//   };

//   useEffect(() => {
//     getDoctorInfoById();
//   }, [getDoctorInfoById()]);

//   return (
//     <Layout>
//       <h1>Book Appointment</h1>
//       <div className="container m-2">
//         {doctor && ( // Change doctors to doctor
//           <div>
//             <h4>
//               Dr.{doctor.firstName} {doctor.lastName}
//             </h4>
//             <h4>Fees : {doctor.feesPerConsultation}</h4> {/* Corrected spelling */}
//             <h4>
//               Timings : {doctor.timings && doctor.timings[0]} -{" "}
//               {doctor.timings && doctor.timings[1]}{" "}
//             </h4>
//             <div className="d-flex flex-column w-50">
//               <DatePicker
//                 className="m-2"
//                 format="DD-MM-YYYY"
//                 // onChange={(value) =>
//                 //   setDate(moment(value).format("DD-MM-YYYY"))
//                 // }
//               />
//               <TimePicker
//                 format="HH:mm"
//                 className="m-2"
//                 // onChange={(value) => {
//                 //   setTime(moment(value).format("HH:mm"));
//                 // }}
//               />
//               <button className="btn btn-primary mt-2">
//                 Check Availability
//               </button>
//               <button className="btn btn-dark mt-2" onClick={handleBooking}>
//                 Book Now
//               </button>
//             </div>
//           </div>
//         )}
//       </div>
//     </Layout>
//   );
// };

// export default BookAppointment;


import React, { useEffect, useState } from "react";
import Layout from "../Component/Layout";
import { DatePicker, TimePicker } from "antd";
import axios from "axios";
import { useLocation } from "react-router-dom";

const BookAppointment = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const doctorId = searchParams.get('id');

  const [doctor, setDoctor] = useState(null);

  const getDoctorInfoById = async () => {
    try {
      console.log("location.search:", location.search);
      const res = await axios.post(
        "/api/v1/doctor/getDoctorById",
        { doctorId: doctorId },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      if (res.data.success) {
        setDoctor(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDoctorInfoById();
  }, [doctorId]);

  const handleBooking = () => {
    // Implement booking logic here
  };

  return (
    <Layout>
      <h1>Book Appointment</h1>
      <div className="container m-2">
        {doctor && (
          <div>
            <h4>
              Dr.{doctor.firstName} {doctor.lastName}
            </h4>
            <h4>Fees : {doctor.feesPerConsultation}</h4>
            <h4>
              Timings : {doctor.timings && doctor.timings[0]} -{" "}
              {doctor.timings && doctor.timings[1]}{" "}
            </h4>
            <div className="d-flex flex-column w-50">
              <DatePicker
                className="m-2"
                format="DD-MM-YYYY"
              />
              <TimePicker
                format="HH:mm"
                className="m-2"
              />
              <button className="btn btn-primary mt-2">
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

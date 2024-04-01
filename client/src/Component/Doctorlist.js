import React from 'react'

import { Link, useNavigate } from 'react-router-dom'
const Doctorlist = ({doctor}) => {
  const navigate=useNavigate()
  console.log("docgtor list"+doctor._id)
  return (
    <>
   <Link to={`/doctor/bookAppointment?id=${doctor._id}`}>
    <div
    className="card m-2"
    style={{ cursor: "pointer" }}
    // onClick={() => navigate(`/doctor/bookAppointment/${doctor._id}`)}
  >
    <div className="card-header">
      Dr. {doctor.firstName} {doctor.lastName}
    </div>
    <div className="card-body">
      <p>
        <b>Specialization</b> {doctor.specialization}
      </p>
      <p>
        <b>Experience</b> {doctor.experience}
      </p>
      <p>
        <b>Fees Per Cunsaltation</b> {doctor.feesPerCunsaltation}
      </p>
      <p>
        <b>Timings</b> {doctor.timings[0]} - {doctor.timings[1]}
      </p>
    </div>
  </div>
    </Link>
    
    
    
    </>
   
    
  )
}

export default Doctorlist

import { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../Component/Layout";
import { Row } from "antd";
import Doctorlist from "../Component/Doctorlist";
// import { useSelector } from "react-redux";
const Homepages = () => {
  //const token  = localStorage.getItem('token');
  //console.log(token);
  const [doctorlist, setDoctorList] = useState([]);
 
  const getUserData = async () => {
    try {
      const res = await axios.post(
        "/api/v1/user/getUserData",
        {},
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      // console.log("User data:", res);
    } catch (error) {
      console.log(error);
    }
  };
  const DoctorList = async () => {
    try {
      const res = await axios.get(
        "/api/v1/user/doctorList",

        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      if (res.data.success) {
        setDoctorList(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserData();
    DoctorList();
  }, []);
  return (
    <div>
      <Layout>
        <h1>Homepages </h1>
        <Row>
          {doctorlist &&
            doctorlist.map((doctor) => <Doctorlist doctor={doctor} />)}
        </Row>
      </Layout>
    </div>
  );
};

export default Homepages;

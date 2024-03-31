import React, { useState, useEffect } from "react";
import Layout from "../../Component/Layout";
import { Table } from "antd";
import axios from "axios";
function DoctorList() {
  const [doctors, setDoctors] = useState([]);
  const getUsers = async () => {
    try {
      const res = await axios.post(
        "/api/v1/admin/getdoctors",{},

        {
          headers: {
            Authorization:`Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.data.success) {
        setDoctors(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const columns = [
    {
      title: "Name",
      dataIndex: "firstName",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Doctor",
      dataIndex: "isDoctor",
      render: (text, record) => <span>{record.isDoctor ? "Yes" : "No"}</span>,
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (text, record) => (
        <div className="d-flex">
          <button className="btn btn-danger">Block</button>
        </div>
      ),
    },
  ];
  useEffect(() => {
    getUsers();
  }, []);
  return (
    <div>
      <Layout>
        <h1 className="text-center m-2">Doctor List</h1>
        <Table columns={columns} dataSource={doctors} />
      </Layout>
    </div>
  );
}

export default DoctorList;

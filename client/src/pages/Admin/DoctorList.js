import React, { useState, useEffect } from "react";
import Layout from "../../Component/Layout";
import { Table, message } from "antd";
import axios from "axios";
function DoctorList() {
  const [doctors, setDoctors] = useState([]);
  const getUsers = async () => {
    try {
      const res = await axios.post(
        "/api/v1/admin/getdoctors",
        {},

        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
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
  const handleAccountStatus = async (record, status) => {
    try {
      const res = await axios.post(
        "/api/v1/admin/doctor-change-status",
        {
          doctorId: record._id,
          // userId: record.user.id,
          status: status,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.data.success) {
        window.location.reload();
        message.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const columns = [
    {
      title: "firstName",
      dataIndex: "name",
      render: (text, record) => (
        <span>
          {record.firstName} {record.lastName}
        </span>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
    },
    {
      title: "phone",
      dataIndex: "phone",
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (text, record) => (
        <div className="d-flex">
          {record.status === "pending" ? (
            <button
              className="btn btn-success"
              onClick={()=>handleAccountStatus(record,"approved")}
            >
              Approve
            </button>
          ) : (
            <button className="btn btn-danger">Reject</button>
          )}
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

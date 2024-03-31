import React, { useState, useEffect } from "react";
import Layout from "../../Component/Layout";
import axios from "axios";
import { Table } from "antd";

const UserList = () => {
  const [users, setUsers] = useState([]);

  const getUser = async () => {
    try {
      const res = await axios.post(
        '/api/v1/admin/getusers',
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.data.success) {
        setUsers(res.data.data);
      }
    } catch (error) {
      console.log(error);
      //message.error()
    }
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
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
    getUser();
  }, []);

  return (
    <Layout>
      <h1 className="text-center m-2">Users List</h1>
      <Table columns={columns} dataSource={users} />
    </Layout>
  );
};

export default UserList;

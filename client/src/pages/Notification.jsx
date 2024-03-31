import React from "react";
import Layout from "../Component/Layout";
import { Tabs, message } from "antd";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../redux/alertSlice";
import axios from "axios";
const Notification = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const handleMarkAllRead = async () => {
    try {
      dispatch(showLoading());
      const res = await axios.post(
        "/api/v1/user/get-notification",
        {
          userId: user._id,
        },
        {
          headers: {
            Authorization: `Bear ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      window.location.reload();
      if (res.data.success) {
        message.success(res.data.success);
      } else {
        message.error(res.data.success);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      message.error("something went wrong");
    }
  };
  const handleDeleteAllRead = async() => {
    try {
      const res = await axios.post(
        "/api/v1/user/delete-notification",
        { userId: user._id },
        {
          headers: {
            Authorization:`Bearer ${localStorage.getItem("token")}`,
          },
        },
      );
      if (res.data.success) {
        window.location.reload();
        message.success(res.data.success);
      } else {
        message.error(res.data.success);
      }
    } catch (error) {
      console.log(error);
      message.error("something went wrong");
    }
  };
  return (
    <Layout>
      <h4 className="p-3 text-center">Notification Page</h4>
      <Tabs>
        <Tabs.TabPane tab="unRead" key={0}>
          <div className="d-flex justify-content-end">
            <h4 className="p-2" onClick={handleMarkAllRead}>
              Mark All Read
            </h4>
          </div>
          {user?.notification.map((notificationMgs) => (
            <div className="card" style={{ cursor: "pointer" }}>
              <div
                className="card-text"
                onClick={() => navigate(notificationMgs.onClickPath)}
              >
                {notificationMgs.message}
              </div>
            </div>
          ))}
        </Tabs.TabPane>
        <Tabs.TabPane tab="Read" key={1}>
          <div className="d-flex justify-content-end">
            <h4 className="p-2" onClick={handleDeleteAllRead}>
              Delete All Read
            </h4>
          </div>
          {user?.seennotification.map((notificationMgs) => (
            <div className="card" style={{ cursor: "pointer" }}>
              <div
                className="card-text"
                onClick={() => navigate(notificationMgs.onClickPath)}
              >
                {notificationMgs.message}
              </div>
            </div>
          ))}
        </Tabs.TabPane>
      </Tabs>
    </Layout>
  );
};

export default Notification;

import React, { useState } from "react";
import Layout from "../Component/Layout";
import { Col, Form, Input, Row, TimePicker, message } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../redux/alertSlice";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import axios from "axios";
const ApplyDoctor = () => {
  const [firstName, SetName] = useState("");
  const [phone, SetPhone] = useState("");
  const [email, SetEmail] = useState("");
  const [website, SetWebsite] = useState("");
  const [address, SetAddress] = useState("");
  const [specialization, SetSpecialization] = useState();
  const [experience, SetExperience] = useState("");
  const [feesPerCunsaltation, SetFeesPerCunsaltation] = useState("");
  const [timings, SetTiming] = useState("");
  const [lastName, SetLastname] = useState();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);

  const submit = async (e) => {
    e.preventDefault();
    console.log(
      firstName,
      lastName,
      email,
      phone,
      address,
      website,
      specialization,
      experience,
      feesPerCunsaltation,
      timings
    );

    try {
      dispatch(showLoading());
      const res = await axios.post(
        "/api/v1/user/apply-doctor",
        {
          firstName,
          lastName,
          phone,
          email,
          website,
          address,
          specialization,
          experience,
          feesPerCunsaltation,
          timings,
          userId: user._id,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (res.data.success) {
        message.success(res.data.success);
        navigate("/");
      } else {
        message.error(res.data.success);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
    }
  };
  // const timsn00gs:{
  //   [
  //     moment(doctor.timings[0], "HH:mm"),
  //     moment(doctor.timings[1], "HH:mm"),
  //   ],

  // } 
  // const timing([
  //   moment(doctor.SetTiming[0], "HH:mm"),
  //     moment(doctor.SetTiming[1], "HH:mm"),
    
  // ])
  return (
    <Layout>
      <h1 className="text-center">Apply Doctor</h1>
      <Form Layout="vertical" className="m-3">
        <h4 className="">personal Details:</h4>
        <Row gutter={20}>
          <Col xs={24} md={24} lg={8}>
            <Form.Item
              label="First Name"
              name="firstname"
              required
              rules={[{ required: true }]}
            >
              <Input
                type="text"
                value={firstName}
                onChange={(e) => SetName(e.target.value)}
                placeholder=" you first name"
              />
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8}>
            <Form.Item
              label="Last Name"
              name="lastName"
              required
              rules={[{ required: true }]}
            >
              <Input
                type="text"
                value={lastName}
                onChange={(e) => SetLastname(e.target.value)}
                placeholder="your last name"
              />
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8}>
            <Form.Item label="Phone No" name="phone" required>
              <Input
                type="text"
                placeholder="your contact no"
                value={phone}
                onChange={(e) => SetPhone(e.target.value)}
                rules={[{ required: true }]}
              />
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8}>
            <Form.Item
              label="Email"
              name="email"
              required
              rules={[{ required: true }]}
              value={email}
              onChange={(e) => SetEmail(e.target.value)}
            >
              <Input
                type="email"
                placeholder="your email address"
                value={email}
                onChange={(e) => SetEmail(e.target.value)}
              />
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8}>
            <Form.Item label="website" name="website">
              <Input
                type="text"
                placeholder="your website"
                value={website}
                onChange={(e) => SetWebsite(e.target.value)}
              />
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8}>
            <Form.Item
              label="Address"
              name="address"
              required
              rules={[{ required: true }]}
              value={address}
              onChange={(e) => SetAddress(e.target.value)}
            >
              <Input
                type="text"
                placeholder="your clinic address"
                value={address}
                onChange={(e) => SetAddress(e.target.value)}
              />
            </Form.Item>
          </Col>
        </Row>
        <h4>Professional Details :</h4>
        <Row gutter={20}>
          <Col xs={24} md={24} lg={8}>
            <Form.Item
              label="Specialization"
              name="specialization"
              required
              rules={[{ required: true }]}
              value={specialization}
              onChange={(e) => SetSpecialization(e.target.value)}
            >
              <Input
                type="text"
                placeholder="your specialization"
                value={specialization}
                onChange={(e) => SetSpecialization(e.target.value)}
              />
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8}>
            <Form.Item
              label="Experience"
              name="experience"
              required
              rules={[{ required: true }]}
            >
              <Input
                type="text"
                placeholder="your experience"
                value={experience}
                onChange={(e) => SetExperience(e.target.value)}
              />
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8}>
            <Form.Item
              label="Fees Per Cunsaltation"
              name="feesPerCunsaltation"
              required
              rules={[{ required: true }]}
            >
              <Input
                type="text"
                placeholder="your contact no"
                value={feesPerCunsaltation}
                onChange={(e) => SetFeesPerCunsaltation(e.target.value)}
              />
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8}>
            <Form.Item label="Timings" name="timings" required>
              <TimePicker.RangePicker
                format="HH:mm"
                value={timings}
                onChange={(value) => SetTiming(value).format("HH:mm")}
              />
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8}></Col>
          <Col xs={24} md={24} lg={8}>
            <button
              className="btn btn-primary form-btn"
              onClick={submit}
              type="submit"
            >
              Submit
            </button>
          </Col>
        </Row>
      </Form>
    </Layout>
  );
};

export default ApplyDoctor;

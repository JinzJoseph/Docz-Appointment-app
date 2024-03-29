import React, { useState } from "react";
import "../styles/RegisterStyles.css";
import { Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const [email, SetEmail] = useState("");
  const [password, setPassword] = useState("");
  //form handler
  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/v1/user/login", { email, password });
      if (res.data.success) {
        localStorage.setItem("token", res.data.token);
        message.success("Login successfull");
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      message.error("something went wrong");
    }
  };
  return (
    <div className="form-container ">
      <Form layout="vertical" className="register-form card p-2 m-5">
        <h3 className="text-center">Login From</h3>

        <Form.Item label="Email" name="email">
          <Input
            type="email"
            value={email}
            onChange={(e) => SetEmail(e.target.value)}
            required
          />
        </Form.Item>
        <Form.Item label="Password" name="password">
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Item>
        <Link to="/register" className="m-2">
          Not a user Register here
        </Link>
        <button className="btn btn-primary" type="submit" onClick={submit}>
          Login
        </button>
      </Form>
    </div>
  );
};

export default Login;

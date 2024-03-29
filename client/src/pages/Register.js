import React, { useState } from "react";
import { Form, Input, message } from "antd";
import '../styles/RegisterStyles.css'
import { Link,useNavigate  } from "react-router-dom";
import axios from "axios";
const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const submit = async(e) => {
        e.preventDefault();
        // Handle form submission here
        // console.log("User:", user);
        // console.log("Email:", email);
        // console.log("Password:", password);\
        try {
            const res=await axios.post("/api/v1/user/register",{name,email,password});
            if(res.data.success){
                message.success("registered successfull")
                navigate("/login")
            }
            else{
                message.error(res.data.message)
            }
            
        } catch (error) {
           console.log(error);
           message.error("something went wrong") 
        }
    }

    return (
        <div className="form-container">
            <Form layout="vertical"  className="card p-2 m-5">
                <h1>Registration</h1>
                <Form.Item label="Name" name="name1">
                    <Input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </Form.Item>
                <Form.Item label="Email" name="email">
                    <Input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
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
                <button className="btn btn-success" type="submit" onClick={submit}>Submit</button>
                <Link to='/login'>Already a user? Log in here</Link>
            </Form>
        </div>
    );
};

export default Register;

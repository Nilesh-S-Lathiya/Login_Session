import axios from "axios";
import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const CustomerRegistation = () => {
  const [inputs, setinputs] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    isAdmin: false,
  });
  const [err, setErr] = useState(null);
  const [registerdata, setRegisterdata] = useState(null);
  const handleChange = (e) => {
    setinputs((Prev) => ({ ...Prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();


    try {
     
      const { data } = await axios.post(
        `http://localhost:5000/api/auth/customerregister`,
        inputs,
        );
        setRegisterdata(data)
     
    } catch (err) {
        setErr(err.response.data);
    }
    // console.log(registerdata);
  };
useEffect(()=>{
  if (registerdata) {
    alert(registerdata)
    setRegisterdata(null)
  }
},[registerdata])
  useEffect(()=>{
    if (err) {
      alert(err)
      setErr(null)
    }
    
  },[err])
  return (
    <div>
      <div className="text-center">
        <h1>Customer Registration</h1>
      </div>
      <Container>
        <Form onSubmit={handleClick}>
          <Form.Group className="mb-3" controlId="formBasicfname">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your First Name"
              name="firstname"
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasiclname">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your Last Name"
              name="lastname"
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter your Email"
              name="email"
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Container>
    </div>
  );
};

export default CustomerRegistation;

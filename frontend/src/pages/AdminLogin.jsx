import axios from "axios";
import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const AdminLogin = () => {
  const [err, setErr] = useState(null);
  const [data, setData] = useState(null);

  const [inputs, setinputs] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    setinputs((Prev) => ({ ...Prev, [e.target.name]: e.target.value }));
  };
  const handleClick = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(
        `http://localhost:5000/api/auth/login`,
        inputs
      );

      setData(data);
    } catch (err) {
      setErr(err.response.data);
    }
    // console.log(registerdata);
  };
  // console.log(data? data.id:"")
  useEffect(() => {
    if (data) {
      if (data.id) {
        alert("Login Successfully");
        setData(null);
      } else {
        alert(data);
        setData(null);
      }
    }
  }, [data]);
  return (
    <div>
      <div className="text-center">
        <h1>Admin Login</h1>
      </div>
      <Container>
        <Form onSubmit={handleClick}>
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

export default AdminLogin;

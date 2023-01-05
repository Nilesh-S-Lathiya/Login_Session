import React from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

const Home = () => {

    
  return (
    <div>
      <Container className="mt-5">

        <Row>
          <Col>
            <Link to="/adminlogin">
              <Button>Admin Login</Button>
            </Link>
          </Col>
          <Col>
            <Link to="/adminregistation">
              <Button>Admin Registration</Button>
            </Link>
          </Col>
          <Col>
            <Link to="/customerregistation">
              <Button>Customer Registration</Button>
            </Link>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Home;

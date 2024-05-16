import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import StockApp from "./StockApp";
import UserApp from "./UserApp";

export default function Root() {
  return (
    <Container fluid>
      <Row>
        <Col xs={12} sm={6}>
          <UserApp />
        </Col>
        <Col xs={12} sm={6}>
          <StockApp />
        </Col>
      </Row>
    </Container>
  );
}

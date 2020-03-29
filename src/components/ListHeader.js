import React from "react";
import { Card, Row, Col, CardBody, CardFooter } from "reactstrap";
import "../pages/ProductList.scss";

const ListHeader = () => {
  return (
    <Card className="rounded-0 mx-3">
      <CardBody className="listcard__tilte py-0">
        <Row className="text-left align-self-center">
          <Col xs="3" className="py-2 card-text__tabletitle">
            Selected Products
          </Col>
          <Col xs="5" className="py-2 card-text__tabletitle2">
            Product
          </Col>
          <Col xs="1" className="py-2 card-text__tabletitle3">
            Price
          </Col>
          <Col xs="1" className="py-2 card-text__tabletitle3">
            Vends
          </Col>
          <Col xs="1" className="py-2 card-text__tabletitle3">
            Revenue
          </Col>
          <Col xs="1" className="py-2 card-text__tabletitle3">
            Net Gain
          </Col>
        </Row>
      </CardBody>
    </Card>
  );
};

export default ListHeader;

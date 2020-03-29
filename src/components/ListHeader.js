import React from "react";
import { Card, Row, Col, CardBody } from "reactstrap";
import "../pages/ProductList.scss";

const ListHeader = () => {
  return (
    <Card className="rounded-0 mx-3">
      <CardBody className="listcard__tilte py-0">
        <Row className="text-left align-self-center">
          <Col xs="3" className="py-2 card-text__tabletitle">
            Selected Products
          </Col>
          <Col xs="9">
            <Row xs="2">
              <Col className="py-2 card-text__tabletitle2">Product</Col>
              <Col>
                <Row xs="4" className="py-2 card-text__tabletitle3">
                  <Col>Price</Col>
                  <Col>Vends</Col>
                  <Col>Revenue</Col>
                  <Col>Net Gain</Col>
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>
      </CardBody>
    </Card>
  );
};

export default ListHeader;

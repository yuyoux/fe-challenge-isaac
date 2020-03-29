import React from "react";
import { Card, Row, Col, CardBody } from "reactstrap";
import "./SelectedProduct.scss";
import { Images_Address } from "../common/config";

const SelectedProduct = ({ item, selectProduct }) => {
  return (
    <Card
      className="rounded-0 card-body__content"
      onClick={() => {
        selectProduct(item);
      }}
    >
      <CardBody>
        <Row>
          <Col xs="4" className="text-left px-0">
            <img
              src={Images_Address + item.product_code + ".png"}
              alt="logo"
              className="listcard__image"
            />
          </Col>
          <Col xs="8" className="text-left px-0 ">
            <Row>
              <Col>{item.product_name}</Col>
            </Row>
            <Row>
              <Col className="listcard__subtitle">{item.product_code}</Col>
            </Row>
            <Row className="mt-2">
              <Col xs="7">Price: </Col>
              <Col xs="5" className="listcard__figure">
                {"$" + parseFloat(item.price) / 100}
              </Col>
            </Row>
            <Row>
              <Col xs="7">Vends: </Col>
              <Col xs="5" className="listcard__figure">
                7.68
              </Col>
            </Row>
            <Row>
              <Col xs="7">Revenue: </Col>
              <Col xs="5" className="listcard__figure">
                {"$" +
                  (
                    parseFloat(item.average_sales) *
                    (parseFloat(item.price) / 100)
                  ).toFixed(2)}
              </Col>
            </Row>
            <Row>
              <Col xs="7">Cols: </Col>
              <Col xs="5" className="listcard__figure">
                8/10
              </Col>
            </Row>
          </Col>
        </Row>
      </CardBody>
    </Card>
  );
};

export default SelectedProduct;

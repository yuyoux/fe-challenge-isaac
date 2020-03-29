import React from "react";
import {
  Card,
  Row,
  Col,
  CardBody,
  UncontrolledPopover,
  PopoverBody
} from "reactstrap";
import "./ProductListItem.scss";
import { Images_Address } from "../common/config";
import stock from "../assets/stock.png";

const formatValue = num => {
  let sign = "+";
  if (num < 0) {
    sign = "-";
    num = num.toString().substr(1);
  }
  return sign + "$" + num;
};

const ProductListItem = ({
  item,
  capacity,
  selectedProductRevenue,
  selectChangeProduct,
  selectedChangeProduct
}) => {
  return (
    <Card
      className="rounded-0 card-text__producttabletitle"
      onClick={() => {
        selectChangeProduct(item);
      }}
    >
      <CardBody
        className={
          item.product_code === selectedChangeProduct && item.cannibalised
            ? "py-2 card-body--selected"
            : "py-2"
        }
      >
        <Row xs="2">
          <Col>
            <Row>
              <Col xs="2" className="text-left">
                <img
                  src={Images_Address + item.product_code + ".png"}
                  alt="logo"
                  className="listcard__image"
                />
              </Col>
              <Col xs="8" className="text-left pl-0 align-self-center">
                <Row>
                  <Col className="pl-0">{item.product_name}</Col>
                </Row>
                <Row>
                  <Col className="listcard__subtitle pl-0">
                    {item.product_code}
                  </Col>
                </Row>
              </Col>
              <Col xs="2" className="text-left align-self-center">
                {item.product_code in capacity ? (
                  <>
                    <img
                      src={stock}
                      id="UncontrolledPopover"
                      alt="logo"
                      className="stock__image"
                    />
                    <UncontrolledPopover
                      trigger="click"
                      placement="bottom"
                      target="UncontrolledPopover"
                    >
                      <PopoverBody>Currently Stocked</PopoverBody>
                    </UncontrolledPopover>
                  </>
                ) : null}
              </Col>
            </Row>
          </Col>
          <Col className="align-self-center">
            <Row xs="4" className="text-left">
              <Col className="pl-0">
                {"$" + (parseFloat(item.price) / 100).toFixed(2)}
              </Col>
              <Col>7.68</Col>
              <Col>
                {"$" +
                  (
                    parseFloat(item.average_sales) *
                    (parseFloat(item.price) / 100)
                  ).toFixed(2)}
              </Col>
              <Col
                className={
                  item.cannibalised
                    ? selectedProductRevenue -
                        parseFloat(item.average_sales) *
                          (parseFloat(item.price) / 100) -
                        item.cannibalised.products.reduce(
                          (a, b) => a + b.revenue,
                          0
                        ) >
                      0
                      ? "netgain--positive"
                      : "netgain--negative"
                    : selectedProductRevenue -
                        parseFloat(item.average_sales) *
                          (parseFloat(item.price) / 100) >
                      0
                    ? "netgain--positive"
                    : "netgain--negative"
                }
              >
                {item.cannibalised
                  ? formatValue(
                      (
                        selectedProductRevenue -
                        parseFloat(item.average_sales) *
                          (parseFloat(item.price) / 100) -
                        item.cannibalised.products.reduce(
                          (a, b) => a + b.revenue,
                          0
                        )
                      ).toFixed(2)
                    )
                  : formatValue(
                      (
                        selectedProductRevenue -
                        parseFloat(item.average_sales) *
                          (parseFloat(item.price) / 100)
                      ).toFixed(2)
                    )}
              </Col>
            </Row>
          </Col>
        </Row>
      </CardBody>
      {item.product_code === selectedChangeProduct && item.cannibalised ? (
        <Row className="px-5">{item.product_code}</Row>
      ) : null}
    </Card>
  );
};

export default ProductListItem;

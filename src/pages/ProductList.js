import React, { useState, useEffect } from "react";
import "./ProductList.scss";
import {
  currentProducts,
  productCapacity,
  productUpdateData
} from "../common/data";
import {
  Row,
  Col,
  Card,
  CardBody,
  CardFooter,
  Form,
  Input,
  Badge
} from "reactstrap";
import SelectedProduct from "../components/SelectedProduct";
import ListHeader from "../components/ListHeader";

const ProductList = props => {
  const [selectedProducts, setSelectedProducts] = useState(currentProducts);
  const [capacity, setCapacity] = useState(productCapacity);
  const [productChangeData, setProductChangeData] = useState(productUpdateData);

  const selectProduct = item => {
    console.log(item.product_code);
  };

  return (
    <React.Fragment>
      <ListHeader />
      <Card className="rounded-0 mx-3">
        <CardBody className="listcard__content py-0">
          <Row>
            <Col
              xs="3"
              className="text-left align-self-center card-text__tabletitle pl-0"
            >
              {selectedProducts.map((product, index) => (
                <SelectedProduct
                  key={product.product_code}
                  item={product}
                  selectProduct={selectProduct}
                ></SelectedProduct>
              ))}
            </Col>
            <Col xs="9" className="text-left pl-0"></Col>
          </Row>
        </CardBody>
      </Card>
    </React.Fragment>
  );
};

export default ProductList;

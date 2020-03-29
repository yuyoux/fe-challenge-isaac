import React, { useState, useEffect } from "react";
import "./ProductList.scss";
import {
  currentProducts,
  productCapacity,
  productUpdateData
} from "../common/data";
import { Row, Col, Card, CardBody, Spinner } from "reactstrap";
import SelectedProduct from "../components/SelectedProduct";
import ListHeader from "../components/ListHeader";
import ListFooter from "../components/ListFooter";
import ProductListItem from "../components/ProductListItem";
import InfiniteScroll from "react-infinite-scroll-component";

const ProductList = props => {
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(7);
  const [selectedProducts, setSelectedProducts] = useState(currentProducts);
  const [capacity, setCapacity] = useState(productCapacity);
  const [productChangeData, setProductChangeData] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState("133129");
  const [selectedProductRevenue, setSelectedProductRevenue] = useState(3.42);
  const [selectedChangeProduct, setSelectedChangeProduct] = useState("");
  const [disable, setDisable] = useState("true");

  useEffect(() => {
    setProductChangeData(productUpdateData.slice(startIndex, endIndex));
  }, [startIndex, endIndex]);

  const selectProduct = item => {
    setSelectedProduct(item.product_code);
    setSelectedProductRevenue(
      (parseFloat(item.average_sales) * (parseFloat(item.price) / 100)).toFixed(
        2
      )
    );
  };

  const selectChangeProduct = item => {
    setDisable("true");
    if (selectedChangeProduct === item.product_code) {
      setSelectedChangeProduct("");
    } else {
      setSelectedChangeProduct(item.product_code);
    }
  };

  //infinite loading of products
  const onLoad = () => {
    setTimeout(() => {
      setEndIndex(endIndex + 8);
    }, 1000);
  };

  return (
    <React.Fragment>
      <ListHeader />
      <Card className="rounded-0 mx-3">
        <CardBody className="py-0">
          <Row>
            <Col xs="3" className="text-left card-text__tabletitle pl-0">
              {selectedProducts.map((product, index) => (
                <SelectedProduct
                  key={product.product_code}
                  item={product}
                  selectProduct={selectProduct}
                ></SelectedProduct>
              ))}
            </Col>
            <Col xs="9" className="text-left px-0">
              <InfiniteScroll
                dataLength={productChangeData.length}
                next={onLoad}
                hasMore={productChangeData.length < productUpdateData.length}
                loader={
                  <Col className="text-center py-2 align-self-center">
                    <Spinner color="secondary"></Spinner>
                  </Col>
                }
                height={550}
              >
                {productChangeData.map((product, index) =>
                  selectedProduct !== product.product_code ? (
                    <ProductListItem
                      key={product.product_code}
                      item={product}
                      capacity={capacity}
                      selectedProductRevenue={selectedProductRevenue}
                      selectChangeProduct={selectChangeProduct}
                      selectedChangeProduct={selectedChangeProduct}
                    ></ProductListItem>
                  ) : null
                )}
              </InfiniteScroll>
            </Col>
          </Row>
        </CardBody>
      </Card>
      <ListFooter disable={disable} />
    </React.Fragment>
  );
};

export default ProductList;

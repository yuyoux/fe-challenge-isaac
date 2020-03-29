import React from "react";
import "../App.scss";
import {
  Row,
  Col,
  Card,
  CardBody,
  CardFooter,
  Form,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Badge
} from "reactstrap";
import question from "../assets/question.png";

function Header(props) {
  return (
    <Card className="rounded-0 mx-3 mt-3">
      <CardBody>
        <Row>
          <Col xs="12" className="text-left">
            <h4 className="mb-0" style={{ cursor: "pointer" }}>
              Change Flavour
            </h4>
          </Col>
        </Row>
      </CardBody>
      <CardFooter>
        <Row>
          <Col xs="3" className="text-left align-self-center pr-0">
            <Form>
              <InputGroup>
                <Input
                  type="search"
                  name="search"
                  id="exampleSearch"
                  placeholder="Search"
                  style={{ borderRight: "none" }}
                ></Input>
                <InputGroupAddon addonType="append">
                  <InputGroupText
                    style={{ padding: 0, backgroundColor: "white" }}
                  >
                    <img
                      src={question}
                      alt="logo"
                      className="question__image"
                    />
                  </InputGroupText>
                </InputGroupAddon>
              </InputGroup>
            </Form>
          </Col>
          <Col xs="2"></Col>
          <Col
            xs="3"
            className="text-center align-self-center card-text__bartitle"
          >
            <Badge style={{ backgroundColor: "#94c945" }}> </Badge> Recommended
            Flavours
          </Col>
          <Col
            xs="2"
            className="text-left align-self-center card-text__bartitle"
          >
            <Badge style={{ backgroundColor: "#f5b340" }}> </Badge> Other
            Flavours
          </Col>
          <Col
            xs="2"
            className="text-left align-self-center card-text__bartitle"
          >
            <Badge style={{ backgroundColor: "#e5664a" }}> </Badge> Caution
            Flavours
          </Col>
        </Row>
      </CardFooter>
    </Card>
  );
}

export default Header;

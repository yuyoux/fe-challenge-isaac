import React from "react";
import { Card, Row, Col, CardBody, Button } from "reactstrap";
import "../App.scss";

const ListFooter = disable => {
  return (
    <Card className="rounded-0 mx-3 mb-3 card-footer__buttons">
      <CardBody>
        <Row>
          <Col xs="10" className="text-right"></Col>
          <Col xs="2">
            <Row xs="2">
              <Col className="pl-0">
                <Button className="Button__Cancel" outline>
                  Cancel
                </Button>
              </Col>
              <Col className="pr-0">
                <Button
                  color="primary"
                  className="Button__Save"
                  disabled={disable === "true"}
                >
                  Save
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </CardBody>
    </Card>
  );
};

export default ListFooter;

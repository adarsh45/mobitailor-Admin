import { Typography } from "@material-ui/core";
import React from "react";
import { Col, Label, Row } from "reactstrap";
import { FaCheckCircle } from "react-icons/fa";

const ShopCard = ({ shopObj, index }) => {
  return (
    <div>
      <Row>
        {/* index */}
        <Col lg={1} style={{ margin: "auto" }}>
          <Typography>{index + 1}</Typography>
        </Col>
        <Col lg={9}>
          <Row>
            {/* shop name */}
            <Col lg={12}>
              <Typography
                style={{
                  fontSize: "1.2em",
                  fontWeight: "bold",
                }}
              >
                {shopObj.Profile?.shopName}
              </Typography>
            </Col>
          </Row>
          <Row>
            {/* owner name */}
            <Col lg={6}>
              <Typography
                style={{
                  fontSize: "0.9em",
                  fontWeight: "normal",
                  color: "grey",
                }}
              >
                {shopObj.Profile?.ownerName}
              </Typography>
            </Col>
            {/* owner mobile number */}
            <Col lg={6}>
              <Typography
                style={{
                  fontSize: "0.9em",
                  fontWeight: "normal",
                  color: "grey",
                }}
              >
                {shopObj.Profile?.ownerMobile}
              </Typography>
            </Col>
          </Row>
        </Col>
        {/* checkmark if paid member */}
        <Col
          lg={2}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          {shopObj.PaymentDetails.paidMember && (
            <>
              <FaCheckCircle style={{ color: "#142222", fontSize: "1.6em" }} />
              <Label
                style={{
                  fontSize: "0.8em",
                  marginBottom: "0px",
                  paddingTop: "0.4em",
                }}
              >
                Paid Member
              </Label>
            </>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default ShopCard;

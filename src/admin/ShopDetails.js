import React, { useState, useEffect, useContext } from "react";
import { Row, Card, Col, Label, Button, Input } from "reactstrap";
import { BsPencilSquare } from "react-icons/bs";
import firebase from "firebase/app";
import "firebase/database";
import { GlobalContext } from "../context/GlobalContext";

const ShopDetails = () => {
  const { selectedShop } = useContext(GlobalContext);

  console.log(selectedShop);

  const [editShop, setEditShop] = useState(false);
  const [editPayment, setEditPayment] = useState(false);

  const [shopName, setShopName] = useState();
  const [ownerName, setOwnerName] = useState();
  const [ownerMobile, setOwnerMobile] = useState();

  const [limit, setLimit] = useState();
  const [isPaidMember, setIsPaidMember] = useState(false);
  const [regDate, setRegDate] = useState();

  const profileRef = firebase
    .database()
    .ref(`Users/${selectedShop.shopId}/Profile`);

  useEffect(() => {
    initialStates();
  }, [selectedShop]);

  const initialStates = () => {
    setShopName(selectedShop.Profile?.shopName);
    setOwnerName(selectedShop.Profile?.ownerName);
    setOwnerMobile(selectedShop.Profile?.ownerMobile);

    setLimit(selectedShop.PaymentDetails?.limit);
    setIsPaidMember(selectedShop.PaymentDetails?.paidMember);
    setRegDate(selectedShop.PaymentDetails?.registrationDate);
  };
  const saveToDatabase = () => {
    selectedShop.Profile = {
      shopName,
      ownerName,
      ownerMobile,
    };
    profileRef
      .set(selectedShop.Profile)
      .then(() => {
        console.log("database");
      })
      .catch((err) => console.log(err));
  };

  return selectedShop ? (
    <>
      <Card style={{ padding: "0.8em", margin: "0.4em" }}>
        <Row>
          <Label
            style={{
              fontWeight: "bold",
              textAlign: "center",
              margin: "auto",
              paddingBottom: "0.6em",
              fontSize: "1.1em",
            }}
          >
            Basic Details
          </Label>
        </Row>
        <Row>
          <Col lg={11}>
            <Row>
              <Col lg={4}>
                <Label>Shop Name:</Label>
              </Col>
              <Col lg={8}>
                {editShop ? (
                  <Input
                    type="text"
                    onChange={(e) => {
                      e.preventDefault();
                      setShopName(e.target.value);
                    }}
                    defaultValue={shopName}
                    value={shopName}
                  />
                ) : shopName ? (
                  <Label>{shopName}</Label>
                ) : (
                  <Label>{shopName}</Label>
                )}
              </Col>
            </Row>
            <Row>
              <Col lg={4}>
                <Label>Owner Name:</Label>
              </Col>
              <Col lg={8}>
                {editShop ? (
                  <Input
                    type="text"
                    onChange={(e) => {
                      e.preventDefault();
                      setOwnerName(e.target.value);
                    }}
                    defaultValue={ownerName}
                    value={ownerName}
                  />
                ) : ownerName ? (
                  <Label>{ownerName}</Label>
                ) : (
                  <Label>{ownerName}</Label>
                )}
              </Col>
            </Row>
            <Row>
              <Col lg={4}>
                <Label>Contact:</Label>
              </Col>
              <Col lg={8}>
                {editShop ? (
                  <Input
                    type="text"
                    onChange={(e) => {
                      e.preventDefault();
                      setOwnerMobile(e.target.value);
                    }}
                    defaultValue={ownerMobile}
                    value={ownerMobile}
                  />
                ) : ownerName ? (
                  <Label>{ownerMobile}</Label>
                ) : (
                  <Label>{ownerMobile}</Label>
                )}
              </Col>
            </Row>
            {editShop && (
              <Row style={{ display: "flex", justifyContent: "space-around" }}>
                <Button
                  color="primary"
                  onClick={() => {
                    setEditShop(false);
                    saveToDatabase();
                  }}
                >
                  Edit
                </Button>
                <Button
                  color="secondary"
                  onClick={() => {
                    setEditShop(false);
                    initialStates();
                  }}
                >
                  Cancel
                </Button>
              </Row>
            )}
          </Col>
          <Col lg={1}>
            <div
              style={{
                borderRadius: "5px",
                textAlign: "center",
                margin: "auto",
              }}
            >
              <BsPencilSquare
                onClick={() => {
                  setEditShop(true);
                }}
              />
            </div>
          </Col>
        </Row>
      </Card>

      <Card style={{ padding: "0.8em", margin: "0.4em" }}>
        <Row>
          <Label
            style={{
              fontWeight: "bold",
              textAlign: "center",
              margin: "auto",
              paddingBottom: "0.6em",
              fontSize: "1.1em",
            }}
          >
            Payment & Registration
          </Label>
        </Row>
        <Row>
          <Col lg={4}>
            <Label>Limit:</Label>
          </Col>
          <Col lg={8}>
            <Input
              type="number"
              // defaultValue={limit}
              value={limit}
              onChange={(e) => {
                setLimit(e.target.value);
              }}
            />
          </Col>
        </Row>
        <Row>
          <Col lg={4}>
            <Label style={{ margin: "0px auto" }}>Is Paid Member:</Label>
          </Col>
          <Col lg={8}>
            {isPaidMember ? (
              <Label style={{ color: "green" }}>Paid Member</Label>
            ) : (
              <Label style={{ color: "red" }}>Trial Member</Label>
            )}
            <Button
              style={{ margin: "0.4em" }}
              onClick={() => {
                setIsPaidMember(!isPaidMember);
              }}
            >
              {isPaidMember
                ? "Change to Trial Member"
                : "Change to Paid Member"}
            </Button>
          </Col>
        </Row>
        <Row>
          <Col lg={4}>
            <Label>Registration Date:</Label>
          </Col>
          <Col lg={8}>
            <Label>{selectedShop.PaymentDetails?.registrationDate}</Label>
          </Col>
        </Row>
      </Card>

      <Card style={{ padding: "0.8em", margin: "0.4em" }}>
        <Row>
          <Label
            style={{
              fontWeight: "bold",
              textAlign: "center",
              margin: "auto",
              paddingBottom: "0.6em",
              fontSize: "1.1em",
            }}
          >
            Customers & Measurements
          </Label>
        </Row>
        <Row>
          <Col lg={4}>
            <Label>Customers Count:&nbsp;</Label>
          </Col>
          <Col lg={8}>
            {console.log("SHOP: ", selectedShop)}
            {selectedShop.Customers
              ? Object.entries(selectedShop.Customers).length
              : 0}
          </Col>
        </Row>
        <Row>
          <Col lg={4}>
            <Label>Measurements Count:&nbsp;</Label>
          </Col>
          <Col lg={8}>
            {console.log("SHOP: ", selectedShop)}
            {selectedShop.Measurements
              ? Object.entries(selectedShop.Measurements).length
              : 0}
          </Col>
        </Row>
      </Card>
    </>
  ) : (
    <>Click on Shop to see the details</>
  );
};

export default ShopDetails;

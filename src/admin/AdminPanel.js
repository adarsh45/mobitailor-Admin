import React, { useState, useEffect } from "react";
import firebase from "firebase/app";
import "firebase/database";
import {
  Button,
  Col,
  Form,
  Input,
  InputGroup,
  InputGroupAddon,
  Label,
  ListGroup,
  ListGroupItem,
  Row,
  Spinner,
} from "reactstrap";
import ShopDetails from "./ShopDetails";
import { useHistory } from "react-router";
import ShopCard from "./ShopCard";
import { BsSearch } from "react-icons/bs";
import { AiFillCloseCircle } from "react-icons/ai";
import { GlobalContext } from "../context/GlobalContext";

function Adminpanel() {
  const history = useHistory();
  const [shops, setShops] = useState([]);
  const [filteredShops, setFilteredShops] = useState([]);
  const [isSearch, setIsSearch] = useState(false);
  const [searchText, setSearchText] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState();
  const [isBuffering, setIsBuffering] = useState(true);
  const usersRef = firebase.database().ref("Users");

  const [selectedShop, setSelectedShop] = useState(null);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        history.push("/login");
      } else {
        getAllShopsData();
      }
    });
  }, []);

  const getAllShopsData = () => {
    usersRef
      .once("value")
      .then((snapshot) => {
        if (snapshot.exists()) {
          let data = snapshot.val();
          console.log(data);
          let shopData = [];
          for (const [shopId, shopObj] of Object.entries(data)) {
            shopData.push({
              shopId,
              Profile: {
                shopName: shopObj.Profile?.shopName
                  ? shopObj.Profile?.shopName
                  : "unknown",
                ownerName: shopObj.Profile?.ownerName
                  ? shopObj.Profile?.ownerName
                  : "unknown",
                ownerMobile: shopObj.Profile?.ownerMobile
                  ? shopObj.Profile?.ownerMobile
                  : "unknown",
              },
              PaymentDetails: {
                limit: shopObj.PaymentDetails?.limit
                  ? shopObj.PaymentDetails?.limit
                  : "unknown",
                paidMember: shopObj.PaymentDetails?.paidMember
                  ? shopObj.PaymentDetails?.paidMember
                  : false,
                registrationDate: shopObj.PaymentDetails?.registrationDate
                  ? shopObj.PaymentDetails?.registrationDate
                  : "unknown",
              },
              Customers: shopObj.Customers,
              Measurements: shopObj.Measurements,
            });
          }
          console.log(shopData);
          setShops(shopData);
        } else {
          console.error("Data not found in database!");
        }
      })
      .catch((err) => {
        console.error(err.message);
      });
    setIsBuffering(false);
  };

  const handleSearch = (searchText) => {
    if (searchText) {
      const filteredShopsArr = shops.filter((shop) => {
        let bool =
          shop.Profile.shopName
            .toLowerCase()
            .includes(searchText.toLowerCase()) ||
          shop.Profile.ownerName
            .toLowerCase()
            .includes(searchText.toLowerCase()) ||
          shop.Profile.ownerMobile
            .toLowerCase()
            .includes(searchText.toLowerCase());
        return bool;
      });
      setFilteredShops(filteredShopsArr);
      setIsSearch(true);
    } else {
      setFilteredShops([]);
      setIsSearch(false);
    }
  };

  const getPaidShopsCount = () => {
    let paidShops = shops.filter(
      (shopObj) => shopObj.PaymentDetails.paidMember
    );
    return paidShops.length;
  };

  return (
    <GlobalContext.Provider value={{ selectedShop, setSelectedShop }}>
      <div>
        <Row
          style={{
            backgroundColor: "#142222",
            color: "#fff",
            padding: "0.4em 0px",
          }}
        >
          <Col style={{ display: "flex", alignItems: "center" }}>
            <h1
              style={{
                fontSize: "1.8em",
                padding: "0px 1em",
                margin: "auto 0px",
              }}
            >
              Admin Panel
            </h1>
          </Col>
          <Col
            style={{
              display: "flex",
              alignItems: "flex-start",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <Label style={{ margin: "0px" }}>Total Shops: {shops.length}</Label>
            <Label style={{ margin: "0px" }}>
              Paid Shops: {getPaidShopsCount()}
            </Label>
          </Col>
        </Row>
        <Row>
          <Col>
            {!isBuffering ? (
              <>
                <Row>
                  <Form
                    style={{
                      width: "100%",
                      padding: "0px 1em",
                      margin: "0.2em 0px",
                    }}
                    onSubmit={(e) => e.preventDefault()}
                  >
                    <InputGroup>
                      <InputGroupAddon addonType="prepend">
                        <div
                          style={{
                            backgroundColor: "#fff",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            margin: "0.2em 0px",
                            padding: "0.4em",
                          }}
                        >
                          <BsSearch style={{ color: "#192222" }} />
                        </div>
                      </InputGroupAddon>
                      <Input
                        style={{
                          margin: "0.2em 0px",
                          border: "none",
                        }}
                        type="text"
                        defaultValue={searchText}
                        onChange={(e) => {
                          if (e.target.value) {
                            handleSearch(e.target.value);
                          } else {
                            setIsSearch(false);
                          }
                        }}
                        placeholder="Search by shop name, owner name or mobile number"
                      />
                      <InputGroupAddon addonType="append">
                        <div
                          style={{
                            backgroundColor: "#fff",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            margin: "0.2em 0px",
                            padding: "0.4em",
                          }}
                        >
                          <AiFillCloseCircle style={{ color: "#192222" }} />
                        </div>
                      </InputGroupAddon>
                    </InputGroup>
                  </Form>
                </Row>
                <ListGroup className="shops-list">
                  {isSearch ? (
                    // show filtered shops list if search is true
                    filteredShops.length !== 0 ? (
                      filteredShops.map((shopObj, index) => (
                        <ListGroupItem
                          key={index}
                          onClick={() => {
                            setSelectedShop(shopObj);
                          }}
                          style={{ margin: "4px", borderRadius: "4px" }}
                        >
                          <ShopCard shopObj={shopObj} index={index} />
                        </ListGroupItem>
                      ))
                    ) : (
                      <Label style={{ textAlign: "center" }}>
                        No Results Found
                      </Label>
                    )
                  ) : // show original shops list if search is false
                  shops.length !== 0 ? (
                    shops.map((shopObj, index) => (
                      <ListGroupItem
                        key={index}
                        onClick={() => {
                          setSelectedShop(shopObj);
                        }}
                        style={{ margin: "4px", borderRadius: "4px" }}
                      >
                        <ShopCard shopObj={shopObj} index={index} />
                      </ListGroupItem>
                    ))
                  ) : (
                    <Label style={{ textAlign: "center" }}>
                      No Results Found
                    </Label>
                  )}
                </ListGroup>
              </>
            ) : (
              <Spinner color="primary" />
            )}
          </Col>
          <Col>{selectedShop ? <ShopDetails /> : ""}</Col>
        </Row>
      </div>
    </GlobalContext.Provider>
  );
}

export default Adminpanel;

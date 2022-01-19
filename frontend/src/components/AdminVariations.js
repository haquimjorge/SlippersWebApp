import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Tooltip from "react-bootstrap/Tooltip";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Pencil from "../assets/pencil.png";
import Card from "react-bootstrap/Card";
import { React, useEffect, useState } from "react";
import { connect } from "react-redux";
import shoeActions from "../redux/actions/shoeActions";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import FormR from "react-bootstrap/Form";
import AdminUploadShoe from "./AdminUploadShoe";
import CenterModalShoe from "./CenterModalShoe";
import DATA from "../utilities/hardData";
import categoryActionsRedux from "../redux/actions/categoryActionsRedux";
import _ from "lodash";
import AdminSingleShoe from "./AdminSingleShoe";
import CenterModalVariation from "../components/CenterModalVariation";

function AdminVariations(props) {
  const [modalShow, setModalShow] = useState(false);
  console.log(props.shoes);

  function handleAddVariation(id) {
    setModalShow(!modalShow);
    props.sendIdtoEdit(id);
  }
  return (
    <>
      <CenterModalVariation
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
      <Container fluid className="">
        <p>
          Here you can upload new variations for each product and check how many
          of them have. Simply hover your mouse on any box to see details (press
          on mobile).
        </p>
        {props.shoes &&
          props.shoes.map((shoe) => (
            <Row className="pt-2 pb-2 admin-variaton-shoe-container">
              <Col
                xs={3}
                className="d-flex flex-column align-items-center justify-content-center"
              >
                <div
                  className="admin-variation-shoe-image"
                  style={{ backgroundImage: `url(${shoe.image})` }}
                ></div>
                <p>{shoe.name}</p>
                <button
                  className="sign-button text-shadow-slipper"
                  onClick={(e) => handleAddVariation(shoe._id)}
                >
                  Add Variation
                </button>

                <p className="p-0 m-0 fw-bold">General Stock:</p>
                <p className="display-6">{shoe.generalStock}</p>
              </Col>
              <Col className=" d-flex flex-column align-items-center">
                <h3 className="text-center">Colors</h3>
                <div className="d-flex flex-wrap">
                  {DATA.colors.map((e) => (
                    <OverlayTrigger
                      placement="top"
                      overlay={
                        <Tooltip>
                          <div className="d-flex flex-column justify-content-center align-items-center">
                            {shoe.variations.filter((v) => v.color === e)
                              .length ? (
                              shoe.variations
                                .filter((v) => v.color === e)
                                .map((e) => (
                                  <p className="p-0 m-0 w-100 text-start">
                                    {" "}
                                    <strong>SIZE:</strong> {e.size} ({e.stock}{" "}
                                    items)
                                  </p>
                                ))
                            ) : (
                              <span>No items</span>
                            )}
                          </div>
                        </Tooltip>
                      }
                    >
                      <div className="d-flex justify-content-center flex-column align-items-center p-1 admin-variaton-color-box">
                        <p className="p-0 m-0">
                          <strong>{e}</strong>
                        </p>
                        <p className="p-0 m-0">
                          {shoe.variations.filter((v) => v.color === e).length}
                        </p>
                      </div>
                    </OverlayTrigger>
                  ))}
                </div>
              </Col>
              <Col className="text-center d-flex flex-column align-items-center justify-content-center">
                <h3>Sizes</h3>
                <div className="d-flex flex-wrap">
                  {DATA.sizes.map((e) => (
                    <OverlayTrigger
                      placement="top"
                      overlay={
                        <Tooltip>
                          <div className="d-flex flex-column justify-content-center align-items-center">
                            {shoe.variations.filter(
                              (v) => v.size === e.toString()
                            ).length ? (
                              shoe.variations
                                .filter((v) => v.size === e.toString())
                                .map((e) => (
                                  <p className="p-0 m-0 w-100 text-start">
                                    {" "}
                                    <strong>{e.color}</strong> ({e.stock} items)
                                  </p>
                                ))
                            ) : (
                              <span>No items</span>
                            )}
                          </div>
                        </Tooltip>
                      }
                    >
                      <div className="d-flex justify-content-center flex-column align-items-center p-1 admin-variaton-color-box">
                        <p className="p-0 m-0">
                          {" "}
                          <strong>{e}</strong>
                        </p>
                        <p className="p-0 m-0">
                          {
                            shoe.variations.filter(
                              (v) => v.size === e.toString()
                            ).length
                          }
                        </p>
                      </div>
                    </OverlayTrigger>
                  ))}
                </div>
              </Col>
            </Row>
          ))}
      </Container>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    shoes: state.shoeReducer.shoes,
  };
};

const mapDispatchToProps = {
  editShoe: shoeActions.sendIdtoDeleteShoe,
  sendIdtoEdit: shoeActions.sendIdtoEdit,
};
export default connect(mapStateToProps, mapDispatchToProps)(AdminVariations);

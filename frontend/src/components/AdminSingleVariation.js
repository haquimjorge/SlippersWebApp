import Card from "react-bootstrap/Card";
import { React, useEffect, useState } from "react";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Tooltip from "react-bootstrap/Tooltip";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import DATA from "../utilities/hardData";
import shoeActions from "../redux/actions/shoeActions";
import { connect } from "react-redux";
import CenterModalVariation from "../components/CenterModalVariation";

function AdminSingleVariation(props){

    const [modalShow, setModalShow] = useState(false);
  console.log(props.shoes);

  function handleAddVariation(id) {
    setModalShow(!modalShow);
    props.sendIdtoEdit(id);
  }
    return(
      <Row className="pt-2 pb-2 admin-variaton-shoe-container">
          <CenterModalVariation
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
      <Col
        xs={3}
        className="d-flex flex-column align-items-center justify-content-center"
      >
        <div
          className="admin-variation-shoe-image"
          style={{ backgroundImage: `url(${props.shoe.image})` }}
        ></div>
        <p>{props.shoe.name}</p>
        <button
          className="sign-button text-shadow-slipper"
          onClick={(e) => handleAddVariation(props.shoe._id)}
        >
          Add Variation
        </button>

        <p className="p-0 m-0 fw-bold">General Stock:</p>
        <p className="display-6">{props.shoe.generalStock}</p>
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
                    {props.shoe.variations.filter((v) => v.color === e)
                      .length ? (
                          props.shoe.variations
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
                  {props.shoe.variations.filter((v) => v.color === e).length}
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
                    {props.shoe.variations.filter(
                      (v) => v.size === e.toString()
                    ).length ? (
                      props.shoe.variations
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
                    props.shoe.variations.filter(
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

    )
}

const mapStateToProps = (state) => {
    return {

    };
  };
  
  const mapDispatchToProps = {
    sendIdtoEdit: shoeActions.sendIdtoEdit,
  };
  export default connect(mapStateToProps, mapDispatchToProps)(AdminSingleVariation);
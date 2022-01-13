import Footer from "../../../components/Footer";
import Menu from "../../../components/Menu";
import { React, useEffect, useState, useRef } from "react";
import Container from "react-bootstrap/Container";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { connect } from "react-redux";
import * as Yup from "yup";
import { Formik, Form, useField } from "formik";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import FormR from "react-bootstrap/Form";
import Pencil from "../../../assets/pencil.png";
import Delete from "../../../assets/deletecross.png";
import Tooltip from "react-bootstrap/Tooltip";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import ListGroup from "react-bootstrap/ListGroup";
import Collapse from "react-bootstrap/Collapse";
import Button from "react-bootstrap/Button";
import categoryActionsRedux from "../../../redux/actions/categoryActionsRedux";
import CenterModal from "../../../components/CenterModal";

function AdminCategories(props) {
  const [open, setOpen] = useState(false);
  const { getSubCategoriesByParentId, category, subCategories } = props;
  const [modalShow, setModalShow] = useState(false);

  function handleCategoryClick() {
    setOpen(!open);
    getSubCategoriesByParentId(category._id);
  }


  
 

const PencilIcon =(props)=>{
    const renderEdit = (props) => (
        <Tooltip id="button-tooltip" {...props}>
          Edit
        </Tooltip>
      );
    return(
<OverlayTrigger
placement="top"
delay={{ show: 25, hide: 25 }}
overlay={renderEdit}
{...props}
>
<img onClick={()=>console.log("click a lapiz")} src={Pencil} alt='pencil' className="admin-interaction-icon"/>
</OverlayTrigger>
    )   
}
function handleDelete(slug){
    console.log(slug)
    setModalShow(true)
      props.sendDeleteSlug(slug)
}

const DeleteIcon =(props)=>{
    const renderEdit = (props) => (
        <Tooltip id="button-tooltip" {...props}>
          Delete
        </Tooltip>
      );
      return(
        <OverlayTrigger
        placement="top"
        delay={{ show: 25, hide: 25 }}
        overlay={renderEdit}
        {...props}
        >
        <img onClick={()=>handleDelete(props.slug)} src={Delete} alt='delete' className="admin-interaction-icon ms-2 me-2"/>
        </OverlayTrigger>
            )  
}

  let properSubcategories = subCategories.filter(
    (sub) => sub.parent === category._id
  );

  return (
    <>
      <ListGroup.Item
        aria-controls="example-collapse-text"
        aria-expanded={open}
        className="admin-category-container"
      >
        <div className="d-flex justify-content-between align-items-center admin-category-subcontainer">
          <div className="w-100 rounded" onClick={() => handleCategoryClick()}>
            <p className="m-0 p-2 text-light fw-bold text-shadow-slipper">
              {category.name}
            </p>
          </div>

          <div className="m-0 p-0 d-flex align-items-center">
            <PencilIcon/>
            <DeleteIcon slug={category.slug}/>
          </div>
        </div>
      </ListGroup.Item>
      <CenterModal show={modalShow} onHide={() => setModalShow(false)} />
      

      <Collapse in={open}>
        <ListGroup className="ps-2 pe-2">
          {properSubcategories.length ? (
            properSubcategories.map((sub) => (
              <ListGroup.Item
                key={sub._id}
                className="admin-subcategory-container text-light">

                <div className="d-flex justify-content-between align-items-center">
                  <p className="m-0 p-0 ">{sub.name}</p>
                  <div className="m-0 p-0 d-flex align-items-center">
                    <PencilIcon/>
                    <DeleteIcon/>
                  </div>
                </div>
              </ListGroup.Item>
            ))
          ) : (
            <ListGroup.Item className="admin-subcategory-container text-light">
              No subcategories yet
            </ListGroup.Item>
          )}
        </ListGroup>
      </Collapse>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    subCategories: state.shoeReducer.subCategories,
  };
};

const mapDispatchToProps = {
  getSubCategoriesByParentId: categoryActionsRedux.getSubCategoriesByParentId,
  sendDeleteSlug : categoryActionsRedux.sendDeleteSlug
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminCategories);

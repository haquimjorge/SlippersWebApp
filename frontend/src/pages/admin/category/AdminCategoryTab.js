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
import Tooltip from "react-bootstrap/Tooltip";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import ListGroup from "react-bootstrap/ListGroup";
import Collapse from "react-bootstrap/Collapse";
import Button from "react-bootstrap/Button";
import AdminCategories from "./AdminCategories";
import categoryActionsRedux from "../../../redux/actions/categoryActionsRedux";
import {toastr} from 'react-redux-toastr'

function AdminCategoryTab(props) {
  const MyTextInput = ({ label, ...props }) => {
    const [field, meta] = useField(props);
    return (
      <div className="text-center text-light display-6">
        <label  htmlFor={props.id || props.name}>{label}</label>
        <input className="text-input w-100 mt-2" {...field} {...props} />
        {meta.touched && meta.error ? (
          <p className="text-danger text-center">{meta.error}</p>
        ) : <p className="invisible">mock</p>}
      </div>
    );
  };

  
  const {getAllCategories, uploadCategory} = props
  useEffect(()=>{
      getAllCategories()
  },[getAllCategories])

  console.log('category tab')
  return (
    <>
      <Container fluid>
        <h3>Categories</h3>
        <p>Here you can edit, upload and delete categories and sub categories.</p>
        <Formik 
          initialValues={{
            category: "",
          }}
          validationSchema={Yup.object({
            category: Yup.string()
            .min(3, "Must be 3 characters or more")
              .max(30, "Must be 30 characters or less")
              .required("Required")
          })}
          onSubmit={(values, actions) => {
            actions.resetForm()
            uploadCategory(values.category.toString())
            toastr.success('Category Uploaded!', values.category)
          }}
        >
          <Form className="p-2 admin-newcategory-container">
            <MyTextInput
              label="New Category"
              name="category"
              type="text"
            />
            <div className="bg-dark d-flex justify-content-center">

            <button className="w-100 sign-button"  type="submit">Save</button>
            </div>
          </Form>
        </Formik>
<Container className="mt-4">


<h4 className="text-center fw-bold">Current categories</h4>
<p className="text-center">Click on a category to see their sub categories</p>
        {props.categories.map((category,i) => (
            <div key={i}>
                <AdminCategories category={category}/>
            </div>
        ))}
        </Container>
      </Container>
    </>
  );
}

const mapStateToProps = (state) => {
    return {
        categories: state.shoeReducer.categories
    
    };
  };
  
  const mapDispatchToProps = {
      getAllCategories : categoryActionsRedux.getAllCategories,
      uploadCategory : categoryActionsRedux.uploadCategory
    
  };

export default connect(mapStateToProps, mapDispatchToProps)(AdminCategoryTab) ;

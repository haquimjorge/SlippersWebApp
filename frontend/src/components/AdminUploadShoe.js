import { React, useEffect, useState, useRef } from "react";
import { connect } from "react-redux";
import shoeActions from "../redux/actions/shoeActions";
import Logo from "../assets/logo2.png";
import * as Yup from "yup";
import { Formik, Form, useField, Field } from "formik";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import FormR from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Tooltip from "react-bootstrap/Tooltip";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import { getCategories } from "../redux/actions/categoryActions";
import subCategoryActions from "../redux/actions/subCategoryActions";

const StringInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <div className={props.className}>
      <FloatingLabel label={label} className="mb-2 text-dark">
        {props.tooltip ? (
          <OverlayTrigger
            key="1"
            placement="top"
            overlay={<Tooltip id="key">{props.tooltip}</Tooltip>}
          >
            <FormR.Control className="text-input" {...field} {...props} />
          </OverlayTrigger>
        ) : (
          <FormR.Control className="text-input" {...field} {...props} />
        )}
      </FloatingLabel>

      {meta.touched && meta.error ? (
        <p className="text-danger mb-1">{meta.error}</p>
      ) : <p className="invisible mb-1">mock</p>}
    </div>
  );
};

const SelectInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div className="mb-3 d-flex justify-content-center w-100">
      <label className="text-light text-center pe-2" htmlFor={props.id || props.name}>
        {label}
      </label>
      <div className="mb-3 d-flex justify-content-center flex-column w-100">
        <select {...field} {...props} className="" />
        {meta.touched && meta.error ? (
          <div className="error text-danger text-start">{meta.error}</div>
        ) : <p className="invisible p-0 m-0">mock</p>}
      </div>
    </div>
  );
};
const RadioInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div className="d-flex flex-column w-100 justify-content-center">
      <div className=" d-flex justify-content-around align-items-center  signup-radio-container">
        <h4 className="ps-3 m-0 w-100 text-light ">Shipping</h4>
        <div className="d-flex justify-content-around w-100 me-2">
          <label className=" text-center p-2 border text-light mb-3 d-flex flex-column w-100">
            <Field type="radio" name="shipping" value="Yes" />
            Yes
          </label>
          <label className=" text-center p-2 border mb-3 text-light d-flex flex-column w-100">
            <Field type="radio" name="shipping" value="No" />
            No
          </label>
        </div>
      </div>
      {meta.touched && meta.error ? (
        <div className="error text-danger text-start">{meta.error}</div>
      ) : (
        <p className="text-danger mb-1 invisible">a</p>
      )}
    </div>
  );
};

function AdminUploadShoe(props) {
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const [subCategories, setSubCategories] = useState([]);

  console.log(props.categories);
  useEffect(() => {
      if(selectedCategoryId){

          loadSubcategories();
      }
  }, [selectedCategoryId]);

  const loadSubcategories = () =>
    subCategoryActions
      .getSubcategoriesByParentId(selectedCategoryId)
      .then((category) => setSubCategories(category.data));

      

  return (
    <>
      <Container>
        <Row>
          <Col
            sm={4}
            className="bg-warning admin-upload-shoe-img"
            style={{ backgroundImage: `url(${Logo})` }}
          >
            upload image
          </Col>
          <Col sm={8} className="admin-uploadshoe-container p-3">
            {props.categories.length ? (
              <h2 className="text-light text-center mb-5">Upload Shoe</h2>
            ) : (
              <p>No categories yet. Please upload at least one</p>
            )}
            <Formik
              initialValues={{
                name: "",
                description: "",
                image: "",
                price: 0,
                lastPrice: 0,
                category: "",
                subCategory: "",
                shipping: "",
                season: "",
              }}
              validationSchema={Yup.object({
                name: Yup.string()
                  .max(50, "Can not exceed 50 characters")
                  .trim()
                  .required("Required"),
                description: Yup.string()
                  .max(200, "Can not exceed 200 characters")
                  .trim()
                  .required("Required"),
                image: Yup.string().required("Required"),
                price: Yup.number()
                  .min(1, "Can not be zero")
                  .max(1000000, "Can not exceed 1000000")
                  .required("Must be a number"),
                lastPrice: Yup.number()
                  .min(1, "Can not be zero")
                  .max(1000000, "Can not exceed 1000000")
                  .required("Must be a number"),
                category: Yup.string()
                  .notOneOf(
                    ["Select Category", "select category", ""],
                    "Invalid category"
                  )
                  .required("Required"),
                subCategory: Yup.string().notOneOf(
                  [
                    "Select subCategory",
                    "select subcategory",
                    "Select Sub Category",
                    "Select Category",
                    "select category",
                    "",
                  ],
                  "Invalid category"
                ),
                shipping: Yup.string()
                  .oneOf(["Yes", "No"], "Invalid shipping")
                  .required("Required"),
                season: Yup.string()
                  .oneOf(
                    ["Winter", "Spring", "Summer", "Autumn"],
                    "Invalid Season"
                  )
                  .required("Required"),
              })}
              onSubmit={(values, { setSubmitting }) => {
                props.uploadShoe(values);
                console.log(values);
              }}
            >
              <Form>
                <StringInput
                  label="Shoe Name"
                  name="name"
                  type="text"
                  placeholder="kevin"
                  className="w-100"
                />
                <StringInput
                  label="Description"
                  name="description"
                  type="textarea"
                  as="textarea"
                  placeholder="kevin"
                  className="w-100"
                />
                <StringInput
                  label="Image URL"
                  name="image"
                  type="text"
                  placeholder="kevin"
                />
                <div className="d-flex">
                <StringInput
                  label="Price"
                  name="price"
                  type="number"
                  placeholder="kevin"
                  className="w-100"
                />
                <StringInput
                  label="Last Price"
                  name="lastPrice"
                  type="number"
                  placeholder="kevin"
                  className="w-100 ps-2"
                />
                </div>
                <div className="d-flex  align-items-center">
                <SelectInput label="Category" name="category">
                  <option value="Select Category">Select Category</option>
                  {props.categories.length !== 0 &&
                    props.categories.map((category) => (
                        
                      <option
                        key={category.slug}
                        onClick={(e) => setSelectedCategoryId(category._id)}
                        value={category._id}
                      >
                        {category.name}
                      </option>
                    ))}
                </SelectInput>

                <SelectInput label="Sub Category" name="subCategory">
                  <option value="Select Sub Category">
                    Select Sub Category
                  </option>
                  {subCategories.length !== 0 &&
                    subCategories.map((subCategory) => (
                      <option key={subCategory.slug} value={subCategory._id}>
                        {subCategory.name}
                      </option>
                    ))}
                </SelectInput>
                </div>
                
                <RadioInput name="shipping" />

                <SelectInput label="Season" name="season">
                  <option value="Select Season">Select Season</option>
                  <option value="Winter">Winter</option>
                  <option value="Spring">Spring</option>
                  <option value="Summer">Summer</option>
                  <option value="Autumn">Autumn</option>
                </SelectInput>

                <div className="d-flex justify-content-center">
                  <button className="w-100 sign-button" type="submit">
                    Upload
                  </button>
                </div>
              </Form>
            </Formik>
          </Col>
        </Row>
      </Container>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    categories: state.shoeReducer.categories,
    subCategories: state.shoeReducer.subCategories,
  };
};

const mapDispatchToProps = {
  uploadShoe: shoeActions.uploadShoe,
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminUploadShoe);

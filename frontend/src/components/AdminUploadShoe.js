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
import { toastr } from "react-redux-toastr";
import categoryActionsRedux from "../redux/actions/categoryActionsRedux";
import DATA from "../utilities/hardData";

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
      ) : (
        <p className="invisible mb-1">mock</p>
      )}
    </div>
  );
};

const FileInput = ({label, ...props})=>{
    const [field, meta] = useField(props);
    return(
        <div className="d-flex flex-column">
        <input {...field} {...props} type="file"
                                
                                id="icon-button-file"
                                style={{ display: 'none', }}
                                className="bg-info"
                                multiple
                            />
                            <label htmlFor="icon-button-file" className="text-light">
                                {label}
                            </label>
                            {meta.touched && meta.error ? (
        <p className="text-danger mb-1">{meta.error}</p>
      ) : (
        <p className="invisible mb-1">mock</p>
      )}
                            </div>
    )
}

const SelectInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div className="mb-3 d-flex flex-column justify-content-center w-100">
      {/* <label className="text-light text-center pe-2" htmlFor={props.id || props.name}>
        {label}
      </label> */}
      <div className="mb-3 d-flex justify-content-center flex-column w-100">
        <FloatingLabel label={label}>
          <FormR.Select {...field} {...props} size="sm" />
        </FloatingLabel>
        {/* <select {...field} {...props}  /> */}
        {meta.touched && meta.error ? (
          <div className="error text-danger text-start">{meta.error}</div>
        ) : (
          <p className="invisible p-0 m-0">mock</p>
        )}
      </div>
    </div>
  );
};
const RadioInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div className="d-flex flex-column w-100 justify-content-center">
      <div className=" d-flex flex-column justify-content-around align-items-center  signup-radio-container">
        <h4 className="m-0 w-100 text-light text-center mb-1">Shipping</h4>
        <div className="d-flex justify-content-around w-100 pe-2 m-0">
          <label className="admin-radioinput-yes text-center p-2 border text-light mb-3 d-flex flex-column align-items-center w-100">
            <Field type="radio" name="shipping" value="Yes" />
            Yes
          </label>
          <label className=" text-center p-2 border mb-3 text-light d-flex flex-column align-items-center w-100">
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

const UploadSchema = Yup.object({
  name: Yup.string()
    .max(50, "Can not exceed 50 characters")
    .trim()
    .required("Required"),
  description: Yup.string()
    .max(350, "Can not exceed 350 characters")
    .trim()
    .required("Required"),
//   image: Yup.string().required("Required"),
  price: Yup.number()
    .min(1, "Can not be zero")
    .max(1000000, "Can not exceed 1000000")
    .required("Must be a number"),
  color: Yup.string().required("Required"),
  size: Yup.number().required("Required"),
  stock: Yup.number()
    .min(1, "Can not be zero or less")
    .max(10000, "Can not exceed 10000")
    .required("Required"),
  lastPrice: Yup.number()
    .min(1, "Can not be zero")
    .max(1000000, "Can not exceed 1000000")
    .required("Must be a number"),
  category: Yup.string()
    .notOneOf(["Select Category", "select category", ""], "Invalid category")
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
  gender: Yup.string()
    .oneOf(["Male", "Female", "Unisex"], "Invalid gender")
    .required("Required"),
  shipping: Yup.string()
    .oneOf(["Yes", "No"], "Invalid shipping")
    .required("Required"),
  season: Yup.string()
    .oneOf(
      ["Winter/Autumn", "Spring/Summer", "Summer", "Autumn"],
      "Invalid Season"
    )
    .required("Required"),
});

function AdminUploadShoe(props) {
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const [image,setImage] = useState('')

  const { getAllSubCategories } = props;
  useEffect(() => {
    getAllSubCategories();
  }, []);

  let properSubcategories = [];
  console.log(props.allSubCategories);
  if (props.allSubCategories.length !== 0) {
    properSubcategories = props.allSubCategories.filter(
      (sub) => sub.parent === selectedCategoryId
    );
  }

  const subCategorias = (e) => {
    setSelectedCategoryId(e.target.value);
  };

  return (
    <>
      <Container>
        <Row>
          <Col
            sm={4}
            className="bg-warning admin-upload-shoe-img"
            style={{ backgroundImage: `url(${image})` }}
          >
          <FloatingLabel label="Image URL" className="mb-2 text-dark">
       
          
            <FormR.Control className="text-input" onChange={(e)=> setImage(e.target.value)} value={image} />
         
        
      </FloatingLabel>
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
                // image: "",
                price: "",
                lastPrice: "",
                category: "",
                subCategory: "",
                shipping: "",
                gender: "",
                season: "",
                color: "",
                size: "",
                stock: "",
              }}
              validationSchema={UploadSchema}
              onSubmit={(values, { resetForm }) => {
                if(!image){
                    toastr.error("Image URL required")
                }else{
                    values.image=image
                    props.uploadShoe(values);
                    resetForm({ values: "" });
                    setImage("")
                    toastr.success("Shoe Uploaded!", values.name);
                }
              }}
            >
              {({ handleChange, values }) =>  (                
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
                    className="w-100 admin-textarea-input"
                  />
              

                   {/* <StringInput
                    label="Image URL"
                    name="image"
                    type="text"
                    placeholder="kevin" 
                  /> */}
                  {/* <FileInput label="Upload Image" name="localImage" onChange={(e)=> console.log(e.target.value)} /> */}
                  
               
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
                    <SelectInput
                      label="Category"
                      name="category"
                      onChange={handleChange("category")}
                      onClick={() => setSelectedCategoryId(values.category)}
                      className="admin-select-category"
                      value={values.category}
                    >
                      <option value="Select Category">Select Category</option>
                      {props.categories.length !== 0 &&
                        props.categories.map((category) => (
                          <option key={category.slug} value={category._id}>
                            {category.name}
                          </option>
                        ))}
                    </SelectInput>

                    <SelectInput label="Sub Category" name="subCategory"  className="admin-select-subcategory">
                      <option value="Select Sub Category">
                        Select Sub Category
                      </option>
                      {properSubcategories.length !== 0 &&
                        properSubcategories.map((subCategory) => (
                          <option
                            key={subCategory.slug}
                            value={subCategory._id}
                          >
                            {subCategory.name}
                          </option>
                        ))}
                    </SelectInput>
                  </div>
                  <div className="d-flex ">
                    <SelectInput label="Gender" name="gender"  className="admin-select-gender">
                      <option value="">Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Unisex">Unisex</option>
                    </SelectInput>

                    <SelectInput label="Season" name="season"  className="admin-select-season">
                      <option value="">Select Season</option>
                      <option value="Winter/Autumn">Winter/Autumn</option>
                      <option value="Spring/Summer">Spring/Summer</option>
                    </SelectInput>
                  </div>

                  <div className="d-flex">
                    <SelectInput label="Color" name="color"  className="admin-select-color">
                      <option value="">Select Color</option>
                      {DATA.colors.map((color) => (
                        <option key={color} value={color}>
                          {color}
                        </option>
                      ))}
                    </SelectInput>
                    <SelectInput label="Size (USA)" name="size"  className="admin-select-size">
                      <option value="">Select Size</option>
                      {DATA.sizes.map((size) => (
                        <option key={size} value={size}>
                          {size}
                        </option>
                      ))}
                    </SelectInput>
                  </div>
                  <div className="d-flex align-items-center">
                    <RadioInput name="shipping" />
                    <StringInput
                      label="Stock"
                      name="stock"
                      type="number"
                      placeholder="kevin"
                      className="mt-3 admin-select-stock"
                    />
                  </div>

                  <div className="d-flex justify-content-center">
                    <button className="w-100 sign-button" type="submit">
                      Upload
                    </button>
                  </div>
                </Form>
              )}
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
    allSubCategories: state.shoeReducer.allSubCategories,
  };
};

const mapDispatchToProps = {
  uploadShoe: shoeActions.uploadShoe,
  getAllSubCategories: categoryActionsRedux.getAllSubCategories,
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminUploadShoe);

import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import {React, useState} from 'react'
import {connect} from 'react-redux'
import categoryActionsRedux from '../redux/actions/categoryActionsRedux'
import {toastr} from 'react-redux-toastr'
import DATA from '../utilities/hardData'
import RowInputSelect from './RowInputSelect'
import Card from "react-bootstrap/Card";
import shoeActions from "../redux/actions/shoeActions";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import FormR from "react-bootstrap/Form";
import { Formik, Form, useField, Field } from "formik";
import Tooltip from "react-bootstrap/Tooltip";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import * as Yup from "yup";


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
      <div className="mb-3 d-flex flex-column justify-content-center w-100">

        <div className="mb-3 d-flex justify-content-center flex-column w-100">
        <FloatingLabel label={label}>
        <FormR.Select {...field} {...props} size="sm" />
        </FloatingLabel>
          {meta.touched && meta.error ? (
            <div className="error text-danger text-start">{meta.error}</div>
          ) : <p className="invisible p-0 m-0">mock</p>}
        </div>
      </div>
    );
  };

  const uploadSchema = Yup.object({
    color: Yup.string().required("Required"),
    size: Yup.number().required("Required"),
    stock: Yup.number().min(1, "Can not be zero or less").max(10000, "Can not exceed 10000").required("Required"),
  })


function CenterModalVariation(props) {

    let shoe =props.shoes && props.shoes.find(shoe=> shoe._id === props.id)
    console.log(shoe)

    function handleEdit(values){
        var data={
            id:shoe._id,
            variation: {
                color:values.color,
                size:values.size,
                stock:values.stock
            }
        }
        let variation ={
            color:values.color,
                size:values.size,
                stock:values.stock
        }
        let generalStock = shoe.generalStock
        let stockAdd = values.stock
        let newStock = generalStock + stockAdd
        console.log(`se suma ${generalStock} con ${stockAdd}:` + newStock)
        props.editVariation(shoe._id,variation, newStock,false)
        console.log(data)
    }


    return (
      <Modal
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={props.show}
        onHide={props.onHide}
        
      >
          

          
        <Modal.Header closeButton className="d-flex admin-modal-header">
          <Modal.Title id="contained-modal-title-vcenter" className="text-dark">
              Add Variation to  <strong>{shoe && shoe.name}</strong> 
            
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="admin-modal-variation-body text-dark">
            {/* <RowInputSelect label="Color" value={color} onChange={(e)=> setColor(e.target.value)} >
            {DATA.colors.map(e=><option value={e}>{e}</option> )}

            </RowInputSelect>
            <RowInputSelect label="Size" value={size} onChange={(e)=> setSize(e.target.value)}>
                {DATA.sizes.map(e=><option value={e}>{e}</option> )}
            </RowInputSelect> */}
            <Formik
              initialValues={{
                color:'',
                size:'',
                stock:''
              }}
              validationSchema={uploadSchema}
              onSubmit={(values, {resetForm}) => {
                handleEdit(values)
                resetForm({values:''})
                toastr.success(`Variation Uploaded for ${shoe.name} !`, `(Color: ${values.color}, Size: ${values.size}, Stock:${values.stock})`)  
              }}
            >
 {({handleChange,values,}) =>(
              <Form>
                
                <div className="d-flex">

                
                <SelectInput label="Color" name="color">
                  <option value="">Select Color</option>
                    {DATA.colors.map(color=> <option key={color} value={color}>{color}</option> )}
                </SelectInput>
                <SelectInput label="Size (USA)" name="size">
                  <option value="">Select Size</option>
                  {DATA.sizes.map(size=>  <option key={size} value={size}>{size}</option>)}
                </SelectInput>
                </div>
                <StringInput
                  label="Stock"
                  name="stock"
                  type="number"
                  placeholder="kevin"
                  className="mt-3"
                />
     
                

                <div className="d-flex justify-content-center">
                  <button className="w-100 sign-button" type="submit">
                    Upload
                  </button>
                </div>
              </Form>
 )}
            </Formik>
            aca va un dropdown con color y size y stock
          
        </Modal.Body>
      </Modal>
    );
  }

  const mapStateToProps = (state) => {
    return {
        id : state.shoeReducer.id,
        shoes: state.shoeReducer.shoes
    };
  };
  
  const mapDispatchToProps = {
   editVariation: shoeActions.editVariation

  };
  export default connect(mapStateToProps, mapDispatchToProps)(CenterModalVariation);
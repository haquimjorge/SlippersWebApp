import TabPane from 'react-bootstrap/TabPane'
import TabContainer from 'react-bootstrap/TabContainer'
import Tab from 'react-bootstrap/Tab'
import Nav from 'react-bootstrap/Nav'
import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Tooltip from "react-bootstrap/Tooltip";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Pencil from '../assets/pencil.png'
import Card from 'react-bootstrap/Card'
import {React, useEffect, useState, useRef} from "react";
import {connect} from 'react-redux'
import shoeActions from "../redux/actions/shoeActions"
import Logo from "../assets/logo2.png"
import * as Yup from "yup";
import { Formik, Form, useField, Field } from "formik";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import FormR from "react-bootstrap/Form";
import AdminUploadShoe from './AdminUploadShoe'

function AdminShoes(props) {

    const [edit, setEdit]= useState(false)
    const [selectedId, setSelectedId] = useState('')
    const [editType, setEditType] = useState("");
    const [editInput, setEditInput] = useState('')
    const [modalShow, setModalShow] = useState(false);
    const {getShoes } = props
    useEffect(()=>{
        getShoes()
    },[getShoes])
    console.log(props.shoes)

    const StringInput = ({ label, ...props }) => {
        const [field, meta] = useField(props);
    
        
      
        return (
          <div className={props.className}>
            <FloatingLabel label={label} className="mb-3 text-dark">
                {props.tooltip? <OverlayTrigger
                                  key="1"
                                  placement="top"
                                  overlay={
                                    <Tooltip id="key">{props.tooltip}</Tooltip>
                                  }
                                >
              <FormR.Control className="text-input" {...field} {...props} /></OverlayTrigger> : <FormR.Control className="text-input" {...field} {...props} />}
            </FloatingLabel>
      
            {meta.touched && meta.error ? (
              <p className="text-danger mb-1">{meta.error}</p>
            ) : null}
          </div>
        );
      };
    
      const SelectInput = ({ label, ...props }) => {
    
        const [field, meta] = useField(props);
        return (
          <div className="mb-3 d-flex justify-content-center">
            <label className="text-dark" htmlFor={props.id || props.name}>{label}</label>
            <div className="mb-3 d-flex justify-content-center flex-column">
    
            <select {...field} {...props} />
            {meta.touched && meta.error ? (
                <div className="error text-danger text-end">{meta.error}</div>
                ) : null}
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
                  <Field type="radio" name="gender" value="Yes" />
                  Yes
                </label>
                <label className=" text-center p-2 border mb-3 text-light d-flex flex-column w-100">
                  <Field type="radio" name="gender" value="No" />
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

    function handleEdit(id, input, type){
        switch(type){
          case "name":
              setEditType(type)
              setEditInput(input)
              if(selectedId === id && editType === type){
                  setSelectedId('')
    
              }else if(selectedId === "" ){
                  setSelectedId(id)
    
              }else if(selectedId !== "" && selectedId !==id){
                setSelectedId(id)
    
    
              }
              break
          case 'description':
    
              setEditType(type)
              setEditInput(input)
              if(selectedId === id && editType === type){
                  setSelectedId('')
              }else if(selectedId === "" ){
                  setSelectedId(id)
                  
              }else if(selectedId !== "" && selectedId !==id){
                setSelectedId(id)
    
              }
              break
          
          case 'price':
              setEditType(type)
              setEditInput(input)
              if(selectedId === id && editType === type){
                  setSelectedId('')
              }else if(selectedId === "" ){
                  setSelectedId(id)
              }else if(selectedId !== "" && selectedId !==id){
                setSelectedId(id)
              }
              break
          default:
              return{
    
                    }
        }
    
        
      //  aqui capturo el id de la comida y si es precio o no
    }
    const renderEdit = (props) => (
        <Tooltip id="button-tooltip" {...props}>
          Editar
        </Tooltip>
      );
      let editPencil=() => <OverlayTrigger
    placement="top"
    delay={{ show: 25, hide: 25 }}
    overlay={renderEdit}
  >
    <img onClick={()=>console.log("click a lapiz")} src={Pencil} alt='pencil' className="admin-edit-icon"/>
</OverlayTrigger>

    return (
        <Tab.Container id="left-tabs-example" defaultActiveKey="all">
        <Row>
          <Col sm={3}>
            <Nav variant="pills" className="flex-column">
              <Nav.Item>
                <Nav.Link eventKey="all">All Shoes</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="Male">Male</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="Female">Female</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="Kids">Kids</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="upload">Upload Shoe</Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
          <Col sm={9}>
            <Tab.Content>
              <Tab.Pane eventKey="all">
                <p>All Shoes</p>
                <div className="d-flex flex-wrap">
                    {props.shoes && props.shoes.map(shoe=>(
                <Card key={shoe._id} className="col-12 col-md-6 col-xxl-4 col-xl-4 col-lg-6 col-sm-12 col-xs-12">
           <Card.Img className="card-admin-items" variant="top" style={{backgroundImage:`url(${shoe.image})`}} />
           <Card.Body className="admin-card-body d-flex flex-column align-items-around justify-content-between">
               <Row>
                   <Col xs={1} sm={1} lg={1} md={1}  className="p-0">{editPencil()}</Col>
                   <Col xs={11} sm={11} lg={11} md={11} className="p-0">{edit?  <OverlayTrigger
                              key="1"
                              placement="top"
                              overlay={
                                <Tooltip id="key">Presiona enter para editar</Tooltip>
                              }
                            ><input onKeyPress={(e)=> console.log('keypress')} value={editInput} onChange={(e) => setEditInput(e.target.value)} /></OverlayTrigger> : <Card.Text className="text-dark">{shoe.name}</Card.Text>}</Col>
               </Row> 
               <Row>
                   <Col xs={1} sm={1} lg={1} md={1}  className="p-0">{editPencil()}</Col>
                   <Col xs={11} sm={11} lg={11} md={11} className="p-0">{edit?  <OverlayTrigger
                              key="1"
                              placement="top"
                              overlay={
                                <Tooltip id="key">Presiona enter para editar</Tooltip>
                              }
                            ><input onKeyPress={(e)=> console.log('keypress')} value={editInput} onChange={(e) => setEditInput(e.target.value)} /></OverlayTrigger> : <Card.Text className="text-dark">{shoe.category && shoe.category.name}</Card.Text>}</Col>
               </Row>
               <Row>
                   <Col xs={1} sm={1} lg={1} md={1}  className="p-0">{editPencil()}</Col>
                   <Col xs={11} sm={11} lg={11} md={11} className="p-0">{edit?  <OverlayTrigger
                              key="1"
                              placement="top"
                              overlay={
                                <Tooltip id="key">Presiona enter para editar</Tooltip>
                              }
                            ><input onKeyPress={(e)=> console.log('keypress')} value={editInput} onChange={(e) => setEditInput(e.target.value)} /></OverlayTrigger> : <Card.Text className="text-dark">{shoe.gender}</Card.Text>}</Col>
               </Row>
               <Row>
                   <Col xs={1} sm={1} lg={1} md={1}  className="p-0">{editPencil()}</Col>
                   <Col xs={11} sm={11} lg={11} md={11} className="p-0">{edit?  <OverlayTrigger
                              key="1"
                              placement="top"
                              overlay={
                                <Tooltip id="key">Presiona enter para editar</Tooltip>
                              }
                            ><input onKeyPress={(e)=> console.log('keypress')} value={editInput} onChange={(e) => setEditInput(e.target.value)} /></OverlayTrigger> : <Card.Text className="text-dark">{shoe.price}</Card.Text>}</Col>
               </Row>
               <Row>
                   <Col xs={1} sm={1} lg={1} md={1}  className="p-0">{editPencil()}</Col>
                   <Col xs={11} sm={11} lg={11} md={11} className="p-0">{edit?  <OverlayTrigger
                              key="1"
                              placement="top"
                              overlay={
                                <Tooltip id="key">Presiona enter para editar</Tooltip>
                              }
                            ><input onKeyPress={(e)=> console.log('keypress')} value={editInput} onChange={(e) => setEditInput(e.target.value)} /></OverlayTrigger> : <Card.Text className="text-dark">{shoe.lastPrice}</Card.Text>}</Col>
               </Row>
               <Row>
                   <Col xs={1} sm={1} lg={1} md={1}  className="p-0">{editPencil()}</Col>
                   <Col xs={11} sm={11} lg={11} md={11} className="p-0">{edit?  <OverlayTrigger
                              key="1"
                              placement="top"
                              overlay={
                                <Tooltip id="key">Presiona enter para editar</Tooltip>
                              }
                            ><input onKeyPress={(e)=> console.log('keypress')} value={editInput} onChange={(e) => setEditInput(e.target.value)} /></OverlayTrigger> : <Card.Text className="text-dark">{shoe.season}</Card.Text>}</Col>
               </Row>
               <Row>
                   <Col xs={1} sm={1} lg={1} md={1}  className="p-0">{editPencil()}</Col>
                   <Col xs={11} sm={11} lg={11} md={11} className="p-0">{edit?  <OverlayTrigger
                              key="1"
                              placement="top"
                              overlay={
                                <Tooltip id="key">Presiona enter para editar</Tooltip>
                              }
                            ><input onKeyPress={(e)=> console.log('keypress')} value={editInput} onChange={(e) => setEditInput(e.target.value)} /></OverlayTrigger> : <Card.Text className="text-dark">{shoe.subcategory && shoe.subcategory.map((subcategory)=>subcategory.name)}</Card.Text>}</Col>
               </Row>
           </Card.Body>
           <Card.Footer className="admin-shoes-card-footer">
             <button onClick={()=>console.log('se borra')} className="d-flex justify-content-center admin-delete-shoe-button w-100">Delete</button>
           </Card.Footer>
           
         </Card> 
         ))}

                </div>
              </Tab.Pane>
              <Tab.Pane eventKey="Male">
              <p>Male</p>
              </Tab.Pane>
              <Tab.Pane eventKey="Female">
              <p>Female</p>
              </Tab.Pane>
              <Tab.Pane eventKey="Kids">
              <p>Kids</p>
              </Tab.Pane>
              <Tab.Pane eventKey="upload">
              <p>Upload Shoe</p>
              <AdminUploadShoe />
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    );
  }
  
const mapStateToProps = (state) => {
    return {
        shoes : state.shoeReducer.shoes
    };
  };
  
  const mapDispatchToProps = {
    // sacar actions para modificar, eliminar y subir comida
    getShoes : shoeActions.getShoes,
  };
  export default connect(mapStateToProps, mapDispatchToProps)(AdminShoes);
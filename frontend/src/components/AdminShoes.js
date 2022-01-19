import Tab from 'react-bootstrap/Tab'
import Nav from 'react-bootstrap/Nav'
import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Tooltip from "react-bootstrap/Tooltip";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Pencil from '../assets/pencil.png'
import Card from 'react-bootstrap/Card'
import {React, useEffect, useState} from "react";
import {connect} from 'react-redux'
import shoeActions from "../redux/actions/shoeActions"
import FloatingLabel from "react-bootstrap/FloatingLabel";
import FormR from "react-bootstrap/Form";
import AdminUploadShoe from './AdminUploadShoe'
import CenterModalShoe from './CenterModalShoe'
import DATA from '../utilities/hardData'
import categoryActionsRedux from '../redux/actions/categoryActionsRedux'
import _ from 'lodash';
import AdminSingleShoe from './AdminSingleShoe'
import AdminVariations from './AdminVariations'

function AdminShoes(props) {

    const {getShoes, getAllSubCategories } = props
    useEffect(()=>{
        getShoes()
        getAllSubCategories()

    },[getShoes])
    console.log(props.shoes)



    return (
        <Tab.Container id="left-tabs-example" defaultActiveKey="all">
            
        <Row>
          <Col sm={3}>
            <Nav className="admin-shoe-side-navtab flex-column" variant="pills" >
              <Nav.Item>
                <Nav.Link eventKey="all">All Shoes</Nav.Link>
              </Nav.Item>
              <div className='ps-3'>
              <Nav.Item>
                <Nav.Link eventKey="Male">Male</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="Female">Female</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="Unisex">Unisex</Nav.Link>
              </Nav.Item>
              </div>
              
              <Nav.Item>
                <Nav.Link eventKey="upload">Upload Shoe</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="variation">Variations</Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
          <Col sm={9}>
            <Tab.Content>
              <Tab.Pane eventKey="all">
                <p>All Shoes</p>
                
                <div className="d-flex flex-wrap">

                    {props.shoes && props.shoes.map(shoe=>(
                    <AdminSingleShoe key={shoe._id} shoe={shoe} />    
         ))}

                </div>
              </Tab.Pane>
              <Tab.Pane eventKey="Male">
              <p>Male</p>
              <div className="d-flex flex-wrap">

                    {props.shoes && props.shoes.filter(shoe=> shoe.gender === "Male").map(shoe=>(
                    <AdminSingleShoe key={shoe._id} shoe={shoe} />    
         ))}

                </div>
              </Tab.Pane>
              <Tab.Pane eventKey="Female">
              <p>Female</p>
              <div className="d-flex flex-wrap">

                    {props.shoes && props.shoes.filter(shoe=> shoe.gender === "Female").map(shoe=>(
                    <AdminSingleShoe key={shoe._id} shoe={shoe} />    
         ))}

                </div>
              </Tab.Pane>
              <Tab.Pane eventKey="Unisex">
              <p>Unisex</p>
              <div className="d-flex flex-wrap">

                    {props.shoes && props.shoes.filter(shoe=> shoe.gender === "Unisex").map(shoe=>(
                    <AdminSingleShoe key={shoe._id} shoe={shoe} />    
         ))}

                </div>
              </Tab.Pane>
              <Tab.Pane eventKey="upload">
              <p>Upload Shoe</p>
              <AdminUploadShoe />
              </Tab.Pane>
              <Tab.Pane eventKey="variation">
              <p>Variations</p>
              <AdminVariations />

              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    );
  }
  
const mapStateToProps = (state) => {
    return {
        shoes : state.shoeReducer.shoes,
    };
  };
  
  const mapDispatchToProps = {
    getShoes : shoeActions.getShoes,
    modifyShoe: shoeActions.modifyShoe,
    sendIdtoDeleteShoe: shoeActions.sendIdtoDeleteShoe,
    getAllSubCategories: categoryActionsRedux.getAllSubCategories,
    

  };
  export default connect(mapStateToProps, mapDispatchToProps)(AdminShoes);
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
import CenterModalVariation from "../components/CenterModalVariation"



function AdminVariations(props){

    const [modalShow, setModalShow] = useState(false);
    console.log(props.shoes)


    function handleAddVariation(id){
        setModalShow(!modalShow)
        props.editShoe(id)
    }
    return(
        <>
        <CenterModalVariation show={modalShow} onHide={() => setModalShow(false)}  />
        <Container fluid className="bg-info">
            <p>variatoon</p>
            {props.shoes && props.shoes.map(shoe=> 
                <Row>
                <Col xs={3} className="bg-danger">
                    <div className="admin-variation-shoe-image" style={{ backgroundImage: `url(${shoe.image})` }} ></div>
                    <p>{shoe.name}</p>
                    <button onClick={(e)=> handleAddVariation(shoe._id)} >Add Variation</button>



                </Col>
                <Col  className="bg-warning">
                    <h3>colors</h3>
                    <div className="d-flex flex-wrap" >
                    {DATA.colors.map(e=>

                    <div className="d-flex justify-content-center flex-column align-items-center p-1 border admin-variaton-color-box">
                        
                        <p className="p-0 m-0">{e}</p>
                        <p className="p-0 m-0">{shoe.variations.filter(v=> v.color === e).length}</p>
                    
                    </div>
                    
                    
                    )}
                    </div>



                </Col>
                <Col  className="bg-success">
                <h3>sizes</h3>
                    <div className="d-flex flex-wrap" >
                    {DATA.sizes.map(e=>

                    <div className="d-flex justify-content-center flex-column align-items-center p-1 border admin-variaton-color-box">
                        
                        <p className="p-0 m-0">{e}</p>
                        <p className="p-0 m-0">{shoe.variations.filter(v=> v.size === e.toString()).length}</p>
                    
                    </div>
                    
                    
                    )}
                    </div>

                    



                </Col>
              </Row>
                
                )}
            
        </Container>    
        </>
    )

}

const mapStateToProps = (state) => {
    return {
        shoes : state.shoeReducer.shoes,
    };
  };
  
  const mapDispatchToProps = {
      editShoe: shoeActions.sendIdtoDeleteShoe
  
    

  };
  export default connect(mapStateToProps, mapDispatchToProps)(AdminVariations);
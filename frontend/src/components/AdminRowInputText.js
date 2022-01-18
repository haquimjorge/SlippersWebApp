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

function AdminRowInputText(props){
    const [edit, setEdit]=useState(false)
    const [inputText, setInputText] = useState('')


    const renderEdit = (props) => (
        <Tooltip id="button-tooltip" {...props}>
          Edit
        </Tooltip>
      );


    let editPencil=() => <OverlayTrigger
    placement="top"
    delay={{ show: 25, hide: 25 }}
    overlay={renderEdit}
  >
    <img onClick={()=>handlePencilEdit()} src={Pencil} alt='pencil' className="admin-whites-interaction-icon"/>
</OverlayTrigger>

function handlePencilEdit(){
    if(props.input !== inputText){
        setInputText(props.input)
    }
    setEdit(!edit)
}

function handleKeyEdit(e,message,editedMessage,shoeId){
if(e.charCode ===13){
    if(message !== editedMessage){
      let data = {
          id: shoeId,
          [props.identifier]: editedMessage,
        };
        props.modifyShoe(data)
  }
  setEdit(!edit)
}
}

useEffect(()=>{
    setInputText(props.input)
},[props.input])
    return(
        <Row>
               <Col xs={1} sm={1} lg={1} md={1}  className="p-0">{editPencil()}</Col>
               <Col xs={11} sm={11} lg={11} md={11} className="pe-1 ps-0 ">
                   <div className="d-flex flex-column">
                       <p className="shadow text-light text-shadow-slipper p-1 mb-1 mt-0 ms-0 me-0 fw-bold admin-shoes-card-footer rounded">{props.identifier}</p>

                  
                   
                   {edit
               ? props.identifier === 'description'
               ? (<OverlayTrigger key="1" placement="top" overlay={ <Tooltip id="key">Hit enter to edit</Tooltip>}>
               <textarea className="mb-1 bg-light text-dark" onKeyPress={(e)=> handleKeyEdit(e,props.name,inputText,props.id)} value={inputText} onChange={(e) => setInputText(e.target.value)} />
             </OverlayTrigger>) :
               
               (<OverlayTrigger key="1" placement="top" overlay={ <Tooltip id="key">Hit enter to edit</Tooltip>}>
                    <input className="mb-1 bg-light text-dark" onKeyPress={(e)=> handleKeyEdit(e,props.name,inputText,props.id)} value={inputText} onChange={(e) => setInputText(e.target.value)} />
                  </OverlayTrigger>) 
                : <Card.Text  className="text-dark">{props.input}</Card.Text>}
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
       modifyShoe: shoeActions.modifyShoe,
 

  };
  export default connect(mapStateToProps, mapDispatchToProps)(AdminRowInputText);
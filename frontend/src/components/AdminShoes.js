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
        <Tab.Container id="left-tabs-example" defaultActiveKey="first">
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
                            ><input onKeyPress={(e)=> console.log('keypress')} value={editInput} onChange={(e) => setEditInput(e.target.value)} /></OverlayTrigger> : <Card.Text className="text-dark">{shoe.color}</Card.Text>}</Col>
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
                            ><input onKeyPress={(e)=> console.log('keypress')} value={editInput} onChange={(e) => setEditInput(e.target.value)} /></OverlayTrigger> : <Card.Text className="text-dark">{shoe.size}</Card.Text>}</Col>
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
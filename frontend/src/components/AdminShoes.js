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

function AdminShoes(props) {

    const [modalShow, setModalShow] = useState(false);
    const {getShoes, getAllSubCategories } = props
    const [needSave, setNeedSave] = useState(false)
    useEffect(()=>{
        getShoes()
        getAllSubCategories()

    },[getShoes,getAllSubCategories])
    console.log(props.shoes)

    function handleIdToDelete(id){
        setModalShow(true)
        props.sendIdtoDeleteShoe(id)

    }
    function handleModify(input,attribute,shoe){
        let data ={
            id:shoe._id,
            [attribute]: input
        }
        showSaveButton(shoe,attribute,input)
        // console.log(data)
    }

    function handleModifyCategory(input,attribute,shoe){
        let data ={
            id:shoe._id,
            [attribute]: input
        }
        console.log(data)
    }

    function exceptInput(input, array, flag){
        if(flag){
            return array.filter(e=> e.name !== input)
        }else{
            return array.filter(e=> e !== input)

        }
    }
    let modifiedStash = {}
    function showSaveButton(dbShoe, attribute,input){   
        if( dbShoe.subcategory[0] && dbShoe.subcategory[0]._id.toString() === input){
            delete modifiedStash[attribute]
        }else if(dbShoe[attribute] === input){
            delete modifiedStash[attribute]
        }else if (dbShoe[attribute] !== input){
            let aux = {[attribute]:input}
            modifiedStash = {...modifiedStash,...aux }
        }
        let booleanSave = Object.keys(modifiedStash).length === 0? false: true
        setNeedSave(booleanSave)
    }

  


    function RowInputText(props){
        const [edit, setEdit]=useState(false)
        const [inputText, setInputText] = useState('')
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
            console.log(data)
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

    function RowInputSelect({label, ...props}){
        return (
            <FloatingLabel  label={label}>
            <FormR.Select {...props} size='sm'/>
            </FloatingLabel>
        )
    }

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
    <img onClick={()=>console.log("click a lapiz")} src={Pencil} alt='pencil' className="admin-whites-interaction-icon"/>
</OverlayTrigger>

    return (
        <Tab.Container id="left-tabs-example" defaultActiveKey="all">
            
        <Row>
          <Col sm={3}>
            <Nav className="admin-shoe-side-navtab flex-column" variant="pills" >
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
                <Nav.Link eventKey="Unisex">Unisex</Nav.Link>
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
                <CenterModalShoe type="shoe" show={modalShow} onHide={() => setModalShow(false)} />

                    {props.shoes && props.shoes.map(shoe=>(
                <Card key={shoe._id} className="col-12 col-md-6 col-xxl-4 col-xl-4 col-lg-6 col-sm-12 col-xs-12">
           <Card.Img className="card-admin-items" variant="top" style={{backgroundImage:`url(${shoe.image})`}} />
           <Card.Body className="admin-card-body d-flex flex-column align-items-around justify-content-between">
               <RowInputText input={shoe.name} id={shoe._id} identifier={'name'} />
               <RowInputText input={shoe.price} id={shoe._id} identifier={'price'} />
               <RowInputText input={shoe.lastPrice} id={shoe._id} identifier={'lastPrice'} />
               <RowInputText input={shoe.description} id={shoe._id} identifier={'description'} />
               {/* https://d3ugyf2ht6aenh.cloudfront.net/stores/090/848/products/d3e818fa-a0bb-4a82-a140-8c94511add5a-140d647c17846e264816343175673058-320-0.jpg */}
               <RowInputText input={shoe.image} id={shoe._id} identifier={'image'} />
               
               <RowInputSelect label="Shipping" onChange={(e)=>handleModify(e.target.value,'shipping',shoe)}>
               <option value={shoe.shipping}>{shoe.shipping}</option>
                   {exceptInput(shoe.shipping,DATA.shipping).map(e=> <option value={e}>{e}</option> )}
               </RowInputSelect>

               <RowInputSelect label="Gender" onChange={(e)=>handleModify(e.target.value,'gender',shoe)} >
               <option value={shoe.gender}>{shoe.gender}</option>
                   {exceptInput(shoe.gender,DATA.gender).map(e=><option value={e}>{e}</option>)}
               </RowInputSelect>

<RowInputSelect label="Season" onChange={(e)=>handleModify(e.target.value,'season',shoe)} >
<option value={shoe.season}>{shoe.season}</option>
{exceptInput(shoe.season,DATA.seasons).map(e=><option value={e}>{e}</option>)}
</RowInputSelect>

<RowInputSelect label="Category" onChange={(e)=>handleModifyCategory(e.target.value,'category',shoe)}>
<option value={shoe.category && shoe.category._id}>{shoe.category && shoe.category.name}</option>
{exceptInput(shoe.category && shoe.category.name,props.categories,true).map(e=><option value={e._id}>{e.name}</option> )}

</RowInputSelect>

<RowInputSelect label="Sub Category" onChange={(e)=>handleModify(e.target.value,'subcategory',shoe)} >
<option value={shoe.subcategory && shoe.subcategory[0] && shoe.subcategory[0]._id}>{shoe.subcategory && shoe.subcategory[0] && shoe.subcategory[0].name}</option>
{shoe.category && exceptInput(shoe.subcategory && shoe.subcategory[0] && shoe.subcategory[0].name,props.allSubCategories.filter(sub=> sub.parent === shoe.category._id),true).map(e=><option value={e._id}>{e.name}</option> )}
</RowInputSelect>

               
               
               
              
               {/* <Row>
                   <Col xs={1} sm={1} lg={1} md={1}  className="p-0">{editPencil()}</Col>
                   <Col xs={11} sm={11} lg={11} md={11} className="p-0">{edit?  <OverlayTrigger
                              key="1"
                              placement="top"
                              overlay={
                                <Tooltip id="key">Presiona enter para editar</Tooltip>
                              }
                            ><input onKeyPress={(e)=> console.log('keypress')} value={editInput} onChange={(e) => setEditInput(e.target.value)} /></OverlayTrigger> : <Card.Text className="text-dark">{shoe.subcategory && shoe.subcategory.map((subcategory)=>subcategory.name)}</Card.Text>}</Col>
               </Row> */}
           </Card.Body>
           {needSave && <button className="admin-shoes-save-button" >Save</button>}
           
           <Card.Footer className="admin-shoes-card-footer">
             <button onClick={()=>handleIdToDelete(shoe._id)} className="d-flex justify-content-center admin-delete-shoe-button w-100">Delete</button>
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
              <Tab.Pane eventKey="Unisex">
              <p>Unisex</p>
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
        shoes : state.shoeReducer.shoes,
        categories: state.shoeReducer.categories,
        allSubCategories:state.shoeReducer.allSubCategories,
    };
  };
  
  const mapDispatchToProps = {
    // sacar actions para modificar, eliminar y subir comida
    getShoes : shoeActions.getShoes,
    modifyShoe: shoeActions.modifyShoe,
    sendIdtoDeleteShoe: shoeActions.sendIdtoDeleteShoe,
    getAllSubCategories: categoryActionsRedux.getAllSubCategories

  };
  export default connect(mapStateToProps, mapDispatchToProps)(AdminShoes);
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



function AdminSingleShoe (props){
    const [modalShow, setModalShow] = useState(false);
    const [needSave, setNeedSave] = useState(false)
    const [selectedCategory, setSelectedCategory] = useState("")
    const [season, setSeason] = useState('')
    const [gender,setGender] = useState('')
    const [shipping,setShipping] = useState('')
    const [category,setCategory] = useState('')
    const [subcategory, setSubcategory] = useState('')
    const [stash, setStash] = useState({})


//   console.log(props.shoe)

    useEffect(()=>{
        // setCategory(props.shoe.category?.name)
    },[])
    console.log(category)

    function handleIdToDelete(id){
        setModalShow(true)
        props.sendIdtoDeleteShoe(id)

    }
    function handleModify(input,attribute,shoe){
        let data ={
            id:shoe._id,
            [attribute]: input
        }
        if(attribute === 'season'){
            setSeason(input)
        }else if(attribute === 'gender'){
            setGender(input)
        }else if(attribute === 'shipping'){
            setShipping(input)
        }else if(attribute === 'subcategory'){
            setSubcategory(input)
        }
        showSaveButton(shoe,attribute,input)
        // console.log(data)
    }

    function handleModifyCategory(input,attribute,shoe){
        let data ={
            id:shoe._id,
            [attribute]: input
        }
        setCategory(input)
        setSelectedCategory(input)
        showSaveButton(shoe,attribute,input)
        console.log(input)
    }

    function exceptInput(input, array, flag){
        if(flag){
            return array.filter(e=> e.name !== input)
        }else{
            return array.filter(e=> e !== input)

        }
    }
    
    let getSubcategoriesForSelect = props.allSubCategories.filter(sub=> sub.parent === props.shoe.category?._id)

    function gestSubcategoriesForSelect(){
        return props.allSubCategories.filter(sub=> sub.parent === props.shoe.category?._id)
    }



    
    function showSaveButton(dbShoe, attribute,input){   
        const deleteAttribute = () =>{
            let currentStash = stash
            delete currentStash[attribute]
            setStash(currentStash)
        }

        if(dbShoe.category && dbShoe.category._id === input){
            let currentStash = stash
            delete currentStash[attribute]
            delete currentStash.subcategory
            setStash(currentStash)
        }else if( (dbShoe.subcategory[0] && dbShoe.subcategory[0]._id.toString() === input) || (dbShoe[attribute] === input)){
            deleteAttribute()
        }else if (dbShoe[attribute] !== input){
            let aux = {[attribute]:input}
            let currentStash = stash
            currentStash = {...currentStash, ...aux}
            setStash(currentStash)
        }

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
    return(
        <>

        <CenterModalShoe type="shoe" show={modalShow} onHide={() => setModalShow(false)} />
        <Card key={props.shoe._id} className="col-12 col-md-6 col-xxl-4 col-xl-4 col-lg-6 col-sm-12 col-xs-12">
           <Card.Img className="card-admin-items" variant="top" style={{backgroundImage:`url(${props.shoe.image})`}} />
           <Card.Body className="admin-card-body d-flex flex-column align-items-around justify-content-between">
               <RowInputText input={props.shoe.name} id={props.shoe._id} identifier={'name'} />
               <RowInputText input={props.shoe.price} id={props.shoe._id} identifier={'price'} />
               <RowInputText input={props.shoe.lastPrice} id={props.shoe._id} identifier={'lastPrice'} />
               <RowInputText input={props.shoe.description} id={props.shoe._id} identifier={'description'} />
               <RowInputText input={props.shoe.image} id={props.shoe._id} identifier={'image'} />
               
               <RowInputSelect value={shipping !=="" ? shipping : props.shoe.shipping} label="Shipping" onChange={(e)=>handleModify(e.target.value,'shipping',props.shoe)}>
               {/* {shipping === "" ? <option value={props.shoe.shipping}>{props.shoe.shipping}</option> :<option value={shipping}>{shipping}</option> } */}
               {DATA.shipping.map(e=><option key={e} value={e}>{e}</option>)}
 
 {/* {shipping ===""?  exceptInput(props.shoe.shipping,DATA.shipping).map(e=><option key={e} value={e}>{e}</option>) : exceptInput(shipping,DATA.shipping).map(e=><option key={e} value={e}>{e}</option>)}  */}
               </RowInputSelect>

               <RowInputSelect value={gender !=="" ? gender : props.shoe.gender} label="Gender" onChange={(e)=>handleModify(e.target.value,'gender',props.shoe)} >
               {DATA.gender.map(e=><option key={e} value={e}>{e}</option>)}
               {/* {gender === "" ? <option value={props.shoe.gender}>{props.shoe.gender}</option> :<option value={gender}>{gender}</option> }
 
{gender ===""?  exceptInput(props.shoe.gender,DATA.gender).map(e=><option key={e} value={e}>{e}</option>) : exceptInput(gender,DATA.gender).map(e=><option key={e} value={e}>{e}</option>)}  */}
               </RowInputSelect>

<RowInputSelect value={season !=="" ? season : props.shoe.season} label="Season" onChange={(e)=>handleModify(e.target.value,'season',props.shoe)} >
{DATA.seasons.map(e=><option key={e} value={e}>{e}</option>)}
    {/* {season === "" ? <option value={props.shoe.season}>{props.shoe.season}</option> :<option value={season}>{season}</option> }
 
{season ===""?  exceptInput(props.shoe.season,DATA.seasons).map(e=><option key={e} value={e}>{e}</option>) : exceptInput(season,DATA.seasons).map(e=><option key={e} value={e}>{e}</option>)}  */}


</RowInputSelect>

<RowInputSelect  value={category !=="" ? category : props.shoe.shipping}  label="Category" onChange={(e)=>handleModifyCategory(e.target.value,'category',props.shoe)}>
    <option value={props.shoe.category?._id}>{props.shoe.category?.name}</option>
{props.categories.filter(cat=> cat._id !== props.shoe.category?._id).map(cat=> <option value={cat._id} >{cat.name}</option>)}
    {/* {selectedCategory === "" ?<option value={props.shoe.category && props.shoe.category._id}>{props.shoe.category && props.shoe.category.name}</option> : props.categories.filter(cat=> cat._id === selectedCategory).map(e=> <option key={e._id} value={e._id} >{e.name}</option>)  } */}
{/* {category === "" && exceptInput(props.shoe.category && props.shoe.category.name,props.categories,true).map(e=><option key={e._id} value={e._id}>{e.name}</option> )} */}


</RowInputSelect>

<RowInputSelect value={subcategory !== "" ? subcategory : props.shoe.subcategory[0] && props.shoe.subcategory[0].name  } label="Sub Category" onChange={(e)=>handleModify(e.target.value,'subcategory',props.shoe)} >
{category === ""&& <option value={props.shoe.subcategory[0]?._id} >{props.shoe.subcategory[0]?.name}</option> }
{category !== props.shoe.category?._id ? "" : <option value={props.shoe.subcategory[0]?._id} >{props.shoe.subcategory[0]?.name}</option>}  
{category === props.shoe.category?._id ? props.allSubCategories.filter(sub=> sub._id !== props.shoe.subcategory[0]?._id).filter(sub=> sub.parent === props.shoe.category?._id ).map(e=> <option value={e._id} >{e.name}</option>) : props.allSubCategories.filter(sub=> sub.parent === category ).length ?  props.allSubCategories.filter(sub=> sub.parent === category ).map(e=> <option value={e._id} >{e.name}</option>) : category ===""? props.allSubCategories.filter(sub=> sub._id !==props.shoe.subcategory[0]?._id).filter(sub=> sub.parent === props.shoe.category?._id).map(sub=> <option value={sub._id} >{sub.name}</option>) : <option value="">No sub categories yet</option>}

</RowInputSelect>

               
           </Card.Body>
           {Object.keys(stash).length !== 0 ? <button className="admin-shoes-save-button w-50 align-self-center" >Save</button> : <button className="admin-shoes-save-button invisible w-50 align-self-center" >Save</button>}
           
           <Card.Footer className="admin-shoes-card-footer">
             <button onClick={()=>handleIdToDelete(props.shoe._id)} className="d-flex justify-content-center admin-delete-shoe-button w-100">Delete</button>
           </Card.Footer>
          
         </Card> 
         </>
    )

}

const mapStateToProps = (state) => {
    return {
        categories: state.shoeReducer.categories,
        allSubCategories:state.shoeReducer.allSubCategories,
        // stash: state.shoeReducer.stash
    };
  };
  
  const mapDispatchToProps = {
    // sacar actions para modificar, eliminar y subir comida

    modifyShoe: shoeActions.modifyShoe,
    sendIdtoDeleteShoe: shoeActions.sendIdtoDeleteShoe,

  };
  export default connect(mapStateToProps, mapDispatchToProps)(AdminSingleShoe);

import categoryActionsRedux from "../../../redux/actions/categoryActionsRedux";
import CenterModal from "../../../components/CenterModal";
import Pencil from "../../../assets/pencil.png";
import Delete from "../../../assets/deletecross.png";
import Tooltip from "react-bootstrap/Tooltip";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import ListGroup from "react-bootstrap/ListGroup";
import { React, useEffect, useState, useRef } from "react";
import { connect } from "react-redux";



function SubCategoryItem(props){

    const [open, setOpen] = useState(false);
    const [modalShow, setModalShow] = useState(false);
  const [edit, setEdit] = useState(false)
  const [editInput, setEditInput] = useState("")

  function handleEditClick(name){
    setEdit(!edit)
    setEditInput(name)
  }

  function handleDelete(slug){
    console.log(slug)
    props.sendDeleteSlug(slug)
    setModalShow(true)
}

function handleOnKeyPressEdit(editedMessage, message,event, categoryId){
    if(event.charCode ===13){
        if(message !== editedMessage){
          let data = {
              id: categoryId,
              name: editedMessage,
            };
            props.modifySubCategory(data)
      }
      setEdit(!edit)
    }
}

    const PencilIcon =(props)=>{
        const renderEdit = (props) => (
            <Tooltip id="button-tooltip">
              Edit
            </Tooltip>
          );
        return(
    <OverlayTrigger
    placement="top"
    delay={{ show: 25, hide: 25 }}
    overlay={renderEdit}
    >
    <img onClick={()=>handleEditClick(props.name)} src={Pencil} alt='pencil' className="admin-interaction-icon"/>
    </OverlayTrigger>
        )   
    }
    
    const DeleteIcon =(props)=>{
        const renderEdit = (props) => (
            <Tooltip id="button-tooltip">
              Delete
            </Tooltip>
          );
          return(
            <OverlayTrigger
            placement="top"
            delay={{ show: 25, hide: 25 }}
            overlay={renderEdit}
            >
            <img onClick={()=>handleDelete(props.slug)} src={Delete} alt='delete' className="admin-interaction-icon ms-2 me-2"/>
            </OverlayTrigger>
                )  
    }


    return(
        <ListGroup.Item
                key={props.subcategory._id}
                className="admin-subcategory-container text-light">

                <div className="d-flex justify-content-between align-items-center">
                    {edit? <input className="admin-subcategory-input" value={editInput} onKeyPress={(e)=> handleOnKeyPressEdit(e.target.value,props.subcategory.name,e, props.subcategory._id)} onChange={(e)=> setEditInput(e.target.value)}/> : <p className="m-0 p-1 ">{props.subcategory.name}</p>}
                    
                  
                  <div className="m-0 p-0 d-flex align-items-center">
                    <PencilIcon slug={props.subcategory.slug} name={props.subcategory.name} />
                    <DeleteIcon slug={props.subcategory.slug}  />
                  </div>
                </div>
                <CenterModal type="sub" show={modalShow} onHide={() => setModalShow(false)} />
              </ListGroup.Item>
    )

}

const mapStateToProps = (state) => {
    return {
    };
  };
  
  const mapDispatchToProps = {
    sendDeleteSlug : categoryActionsRedux.sendSubSlug,
    modifySubCategory: categoryActionsRedux.modifySubCategory,
    
    
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(SubCategoryItem);
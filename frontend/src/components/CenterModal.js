import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import {React} from 'react'
import {connect} from 'react-redux'
import categoryActionsRedux from '../redux/actions/categoryActionsRedux'
import {toastr} from 'react-redux-toastr'




function CenterModal(props) {

    let category = props.category ? props.category : {name:'',slug:'',createdAt:1,updatedAt:1,_id:1}

    function handleDelete(slug,name){
        if(props.type){
            props.deleteSubCategory(slug)
            toastr.error('Sub Category Deleted!', name)  
        }else{
            props.deletecategory(slug)
            toastr.error('Category Deleted!', name)  
        }
        props.onHide()
    }
    return (
      <Modal
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={props.show}
        onHide={props.onHide}
        
      >
          

          
        <Modal.Header closeButton className="d-flex admin-modal-header">
          <Modal.Title id="contained-modal-title-vcenter" className="text-dark">
              {props.type ? "¿Are you sure you want to delete this sub category?": "¿Are you sure you want to delete this category and all its sub categories?"}
            
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="admin-modal-body text-dark">
            <div className="d-flex">
            <div className="col-6 d-flex justify-content-center align-items-center flex-column">
            <h2 className="fw-bold">{category.name}</h2>
            
        
            </div>
            <div className="col-6 d-flex justify-content-start align-items-start flex-column">
            <p><strong>Slug:</strong> {category.slug}</p>
            <p><strong>Created at:</strong> {category.createdAt}</p>
            <p><strong>Updated at:</strong> {category.updatedAt}</p>
            </div>
            </div>
          
        </Modal.Body>
        <Modal.Footer className="admin-modal-footer bg-dark">
          <button className="sign-button" onClick={()=> handleDelete(category._id, category.name)}>Delete</button>
        </Modal.Footer>
      </Modal>
    );
  }

  const mapStateToProps = (state) => {
    return {
        category : state.shoeReducer.category
    };
  };
  
  const mapDispatchToProps = {
      deletecategory : categoryActionsRedux.deleteCategory,
      deleteSubCategory : categoryActionsRedux.deleteSubCategory
  };
  export default connect(mapStateToProps, mapDispatchToProps)(CenterModal);
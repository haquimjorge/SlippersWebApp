import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import {React} from 'react'
import {connect} from 'react-redux'
import shoeActions from '../redux/actions/shoeActions'
import {toastr} from 'react-redux-toastr'




function CenterModalShoe(props) {


    function handleDelete(id){
        props.deleteShoe(id)
        props.onHide()
        toastr.error("Deleted Shoe!", props.shoe.name)
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
            ¿Are you sure you want to <strong className="text-danger">delete this shoe and all its variations</strong> ?  
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="admin-modal-body text-dark">
            <div className="d-flex">
            <div className="col-6 d-flex justify-content-center align-items-center flex-column">
            <h2 className="fw-bold">{props.shoe.name}</h2>
            <div className="admin-modal-image" style={{ backgroundImage: `url(${props.shoe && props.shoe.image})` }} ></div>
            
        
            </div>
            <div className="col-6 d-flex justify-content-start align-items-start flex-column">
            <p><strong>Category:</strong> {props.shoe.category && props.shoe.category.name }</p>
            <p><strong>Sub Category:</strong> {props.shoe.subcategory && props.shoe.subcategory[0] && props.shoe.subcategory[0].name && props.shoe.subcategory[0].name.toString()}</p>
            <p><strong>Number of Variations:</strong> {props.shoe.variations && props.shoe.variations.length}</p> 
            </div>


            </div>
          
        </Modal.Body>
        <Modal.Footer className="admin-modal-footer bg-dark">
          <button className="sign-button" onClick={()=> handleDelete(props.shoe._id)}>Delete</button>
        </Modal.Footer>
      </Modal>
    );
  }

  const mapStateToProps = (state) => {
    return {
        shoe : state.shoeReducer.shoeToDelete
    };
  };
  
  const mapDispatchToProps = {
    deleteShoe : shoeActions.deleteShoe,
  };

  export default connect(mapStateToProps, mapDispatchToProps)(CenterModalShoe);
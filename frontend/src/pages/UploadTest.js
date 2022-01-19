import Card from "react-bootstrap/Card";
import { React, useEffect, useState } from "react";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import FormR from "react-bootstrap/Form";
import { connect } from "react-redux";
import filesActions from "../redux/actions/filesActions";

function UploadTest(props){
    const upload = async (e) =>{
        e.preventDefault()
        let file = await e.target.files[0]
        console.log(file)

        const formData = new FormData()
        formData.append('file', file)
        props.uploadUserImage(formData)
    }
    return(
        <Container fluid className="bg-success">
<div className="d-flex justify-content-center">
             <FormR.Label className="d-flex registrate p-2">hola</FormR.Label>
            

            
    <FormR.Control type="file" onChange={upload}/>
    </div>
        </Container>
    )

}

const mapDispatchToProps = {
    uploadUserImage: filesActions.uploadUserImage,
  };
  const mapStateToProps = (state) => {
    return {

    };
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(UploadTest);
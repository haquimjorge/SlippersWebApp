import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useState } from "react";

function MainContacts() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [mensaje, setMensaje] = useState("");
  const vaciarNombre = (e) => {
    e.preventDefault();
    setNombre("");
    setEmail("");
    setMensaje("");
  };

  function handleContactMock(e){
      if(nombre !== "" && email !== "" && mensaje !== ""){
          vaciarNombre(e)
          setShow(true);

      }
  }

  return (
    <>
      <div className="contenedor-contacts">
        <h1>Contact us or come and meet us </h1>
        <div className="contenedor-contacts-activo">
          <h2>New orleans</h2>
          <h3>Garden districts - United States</h3>
          <h4>Opening hours:</h4>
          <h4>From 12:00 a.m. to 20:30 p.m.</h4>
          <h5>From monday to sunday</h5>
          <p>Phone - (54 11) 4831 7264</p>
          <form onSubmit={(e) => handleContactMock(e)}>
            <div className="formulario-contacts">
              <p>Full Name: </p>
              <input
                type="text"
                name="nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
              ></input>
              <p>Email:</p>
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                type="email"
                name="email"
              ></input>
            </div>
            <div className="formulario-contacts">
              <p>Message:</p>
              <input
                value={mensaje}
                onChange={(e) => setMensaje(e.target.value)}
                className="mensaje"
                type="text"
                name="mensaje"
              ></input>
            </div>

            <Button
              type="submit"
              className="button-sendform"
            >
              Send
            </Button>
          </form>

          <Modal
            className="contenedor-modal"
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
          >
            <Modal.Header className="modal-header text-center" closeButton>
              <Modal.Title>Thanks for your message!</Modal.Title>
            </Modal.Header>
            <Modal.Body className="modal-body">
              We will answer it shortly
            </Modal.Body>
            <Modal.Footer className="modal-footer">
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    </>
  );
}

export default MainContacts;

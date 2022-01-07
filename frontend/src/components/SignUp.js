import { React, useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import FormR from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import { connect } from "react-redux";

import { Navigate } from "react-router-dom";
import {GoogleLogin} from 'react-google-login'
import * as Yup from "yup";
import YupPassword from "yup-password";
import { Formik, Form, useField } from "formik";
import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'

import { useFormik } from 'formik';

import { Link } from "react-router-dom";


const StringInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <div className={props.className}>
      <FloatingLabel label={label} className="mb-3 text-dark">
        <FormR.Control className="text-input" {...field} {...props} />
      </FloatingLabel>

      {meta.touched && meta.error ? (
        <p className="text-danger mb-1">{meta.error}</p>
      ) : null}
    </div>
  );
};
const CheckboxInput = ({ children, ...props }) => {
 
    const [field, meta] = useField({ ...props, type: 'checkbox' });
    return (
      <div>
        <label className="checkbox-input">
          <input type="checkbox" {...field} {...props} />
          {children}
        </label>
        {meta.touched && meta.error ? (
          <div className="error">{meta.error}</div>
        ) : null}
      </div>
    );
  };

const SignUp = (props) => {

  YupPassword(Yup);
  const [showPass, setShowPass] = useState(false);
  const togglePassword = (e) => {
    const checked = e.target.checked;
    if (checked) {
      setShowPass(true);
    } else {
      setShowPass(false);
    }
  };

    

  

  const responseGoogle = (response) => {
    const { givenName, familyName, email, googleId, imageUrl } =
    response.profileObj;
    const googlePassword = googleId + "F1#";
    let googleUser = {
      name: givenName,
      lastName: familyName,
      email: email,
      password: googlePassword,
      image: imageUrl,
      googleUser: true,
    };
    props.saveUser(googleUser)
  }

  if (props.user) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <NavBar />
      <Container className=" signin-container col-7 ">
       
        

        {props.message? (
        
        <div className="d-flex justify-content center flex-column align-items-center">
            <p className="display-6 text-center">Gracias por registrarte con nosotros, por favor verifica tu bandeja de entrada.</p>
            
     
        </div>
        
        
        
        ): (<>
            <h2 className="registrate">
            Registrate{" "}
          </h2>
        <Formik
          initialValues={{
            name: "",
            lastName: "",
            email: "",
            password: "",
            image: "",
            gender:""
          }}
          validationSchema={Yup.object({
            name: Yup.string()
              .max(15, "Debe tener 15 caracteres maximo")
              .trim()
              .required("Este campo es obligatorio"),
            lastName: Yup.string()
              .max(20, "Debe tener 20 caracteres maximo")
              .trim()
              .required("Este campo es obligatorio"),
            email: Yup.string()
              .email("Email invalido")
              .trim()
              .required("Este campo es obligatorio"),
            password: Yup.string()
              .min(7, "Debe tener minimo 7 caracteres")
              .max(30, "No debe exceder los 30 caracteres")
              .minLowercase(3, "Al menos 3 minúsculas")
              .minUppercase(1, "Al menos 1 mayúscula")
              .minNumbers(1, "Al menos 1 número")
              .minSymbols(1, "Al menos 1 símbolo")
              .required("Este campo es obligatorio"),
            image: Yup.string().required("Este campo es obligatorio"),
          })}
          onSubmit={(values, { setSubmitting}) => {
            props.signUp(values);
            setSubmitting(false);
          }}
        >
          <Form>
            <div className="d-flex gap-2">
              <StringInput
                label="Nombre"
                name="name"
                type="text"
                placeholder="kevin"
                className="w-100"
              />
              <StringInput
                label="Apellido"
                name="lastName"
                type="text"
                placeholder="kevin"
                className="w-100"
              />
            </div>

            <StringInput
              label="Correo Electrónico"
              name="email"
              type="email"
              placeholder="kevin"
            />
            <div>
              <div>
                <input
                  onClick={(e) => {
                    togglePassword(e);
                  }}
                  className="form-check-input"
                  type="checkbox"
                  value=""
                  id="flexCheckDefault"
                />
                <label className="form-check-label text-white ms-1">
                  Show Password
                </label>
              </div>

              <StringInput
                label="Contraseña"
                name="password"
                type={showPass ? "text" : "password"}
                placeholder="kevin"
              />
            </div>
            <StringInput
              label="URL de Imagen"
              name="image"
              type="text"
              placeholder="kevin"
            />
            <div className="btn-container">
               
             <button className="text-light p-2 m-2 btn-sign" type="submit">
                Registrate
              </button> 
              
  
            </div>
            {props.error ? (
              <div className="text-danger text-center">{props.error[0].message}</div>
            ) : (
              ""
            )}
            <div className="d-flex justify-content-center flex-column align-items-center">

            <p className="text-center disabled text-shadow">Ya tienes cuenta? Ingresa <Link className="text-danger " to="/ingresar"> <strong className="signAqui">aqui</strong></Link> </p>
<p className="text-white text-shadow google-text">o registrate con Google</p>
      <GoogleLogin
        className="googleLogin"
        clientId="205491317030-kvfnncacikijvdksu4984jfjhr586hbf.apps.googleusercontent.com"
        buttonText="Registrate con Google"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={"single_host_origin"}
      />
</div>
          </Form>
        </Formik></>)}
        
      </Container>
      <Footer />
    </>
  );
};


export default SignUp;

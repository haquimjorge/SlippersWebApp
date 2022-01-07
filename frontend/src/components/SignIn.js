import { React, useState } from "react";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";
import {GoogleLogin} from 'react-google-login'

import * as Yup from "yup";
import { Formik, Form, useField } from "formik";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import FormR from "react-bootstrap/Form";

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

const SignIn = (props) => {
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
    console.log(googleUser)
  }

  if (props.user) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <Container className=" signin-container col-7 ">
          <p className="text-center p-5 bg-success">logo</p>

        <h2 className="registrate">Ingresar</h2>
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validationSchema={Yup.object({
            email: Yup.string()
              .email("Email invalido")
              .trim()
              .required("Este campo es obligatorio"),
            password: Yup.string()
              .min(7, "Debe tener minimo 7 caracteres")
              .max(30, "No debe exceder los 30 caracteres")
              .required("Este campo es obligatorio"),
          })}
          onSubmit={(values, { setSubmitting }) => {
            console.log(values)
            setSubmitting(false);
          }}
        >
          <Form>
            <StringInput
              label="Correo Electrónico"
              name="email"
              type="email"
              placeholder="kevinasda"
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
                  Mostrar Contraseña
                </label>
              </div>

              <StringInput
                label="Contraseña"
                name="password"
                type={showPass ? "text" : "password"}
                placeholder="kevin"
              />
            </div>
            <div className="btn-container">
              <button className="text-light p-2 m-2 bg-dark" type="submit">
                Ingresar
              </button>
            </div>
            {props.error ? (
              <div className="text-danger text-center">{props.error}</div>
            ) : (
              ""
            )}
            
                <p className="text-center disabled text-shadow">No tienes cuenta? Registrate <Link className="text-danger " to="/registrarse"><strong className="signAqui">aqui</strong></Link> </p>
            
            <div className="d-flex justify-content-center flex-column align-items-center">

            {/* <p className="text-white text-shadow google-text">o ingresa con Google</p> */}
            <p className="text-white text-shadow google-text">o ingresa con Google</p>
                  <GoogleLogin
                  className="googleLogin"
                    clientId="205491317030-kvfnncacikijvdksu4984jfjhr586hbf.apps.googleusercontent.com"
                    buttonText="Ingresa con Google"
                    onSuccess={responseGoogle}
                    onFailure={responseGoogle}
                    cookiePolicy={"single_host_origin"}
                  />
            </div>
          </Form>
        </Formik>
      </Container>
    </>
  );
};

export default SignIn;

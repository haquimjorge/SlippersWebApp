import { React, useState, useEffect } from "react";

import Footer from "../components/Footer";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import FormR from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import { connect } from "react-redux";

import { Navigate } from "react-router-dom";
import { GoogleLogin } from "react-google-login";
import * as Yup from "yup";
import YupPassword from "yup-password";
import { Formik, Form, useField } from "formik";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";

import { useFormik, Field } from "formik";

import { Link } from "react-router-dom";
import SignInPic from "../assets/sign-in.jpg"
import userActions from "../redux/actions/userActions";

const StringInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <div className={props.className}>
      <FloatingLabel label={label} className="mb-3 text-dark">
        <FormR.Control className="text-input" {...field} {...props} />
      </FloatingLabel>

      {meta.touched && meta.error ? (
        <p className="text-danger mb-1">{meta.error}</p>
      ) : <p className="text-danger mb-1 invisible">a</p>}
    </div>
  );
};

const RadioInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div className="d-flex flex-column w-100 justify-content-center">
      <div className=" d-flex justify-content-around align-items-center">
        <h4 className="ps-3 m-0 w-100 text-light ">Gender</h4>
        <div className="d-flex justify-content-around w-100 me-2">
          <label className=" text-center p-2 border text-light mb-3 d-flex flex-column w-100">
            <Field type="radio" name="gender" value="Male" />
            Male
          </label>
          <label className=" text-center p-2 border mb-3 text-light d-flex flex-column w-100">
            <Field type="radio" name="gender" value="Female" />
            Female
          </label>
        </div>
      </div>
      {meta.touched && meta.error ? (
        <div className="error text-danger text-start">{meta.error}</div>
      ) : <p className="text-danger mb-1 invisible">a</p>}
    </div>
  );
};


const SignUp = (props) => {
    console.log(props.error)
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
    props.googleLogin(googleUser);
  };

  if (props.user) {
    return <Navigate to="/" />;
  }

  return (
    <>

    <Container fluid className="d-flex p-0">
    

    
      <Container fluid className=" signin-container col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 col-xxl-4 ">
          <>
          <div className="d-flex justify-content-center">

<img className="sign-logo" src="./assets/logo3.png" alt="Logo Slippers" />
    </div>
    {props.message?(
          <div className="d-flex justify-content center flex-column align-items-center sign-verify-message">
            <p className="display-6 text-center text-light">
              Verification link sent. Please check your email.
            </p>
            <p className="display-6 text-center text-light">Thanks for registering with us.</p>
          </div>
        ) 
        :<> 
        <h2 className="registrate text-light">Register Here </h2>
        <Formik
          initialValues={{
            name: "",
            lastName: "",
            email: "",
            password: "",
            image: "",
            gender: "",
          }}
          validationSchema={Yup.object({
            name: Yup.string()
              .max(30, "Can not exceed 15 characters")
              .trim()
              .matches(/^[aA-zZ\s]+$/, "Alphabet only")
              .required("Required"),
            lastName: Yup.string()
              .max(35, "Can not exceed 20 characters")
              .matches(/^[aA-zZ\s]+$/, "Alphabet only")
              .trim()
              .required("Required"),
            email: Yup.string()
              .email("Invalid email")
              .matches(/(\W|^)[\w.-]{0,25}@(gmail|google|yahoo|hotmail|live|kevhausen|outlook|).(com|cl|ar|col|pe|ven|br)(\W|$)/, "Invalid email")
              .min(5,"At least 5 characters")
          .max(40, "Can not exceed 40 characters")
              .trim()
              .required("Required"),
            password: Yup.string()
              .min(7, "At least 7 characters")
              .max(35, "Can not exceed 35 characters")
              .minLowercase(3, "At least 3 lowercase letter")
              .minUppercase(1, "At least 1 capital letter")
              .minNumbers(1, "At least 1 number")
              .minSymbols(1, "At least 1 symbol")
              .required("Required"),
            image: Yup.string().required("Required"),
            gender: Yup.string()
              .oneOf(["Male", "Female"], "Invalid gender")
              .required("Required"),
          })}
          onSubmit={(values, { setSubmitting }) => {
            props.signUp(values)
            setSubmitting(false);
          }}
        >
          <Form>
            <div className="d-flex gap-2">
              <StringInput
                label="Name"
                name="name"
                type="text"
                placeholder="kevin"
                className="w-100"
              />
              <StringInput
                label="Last Name"
                name="lastName"
                type="text"
                placeholder="kevin"
                className="w-100"
              />
            </div>

            <StringInput
              label="Email"
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
                label="Password"
                name="password"
                type={showPass ? "text" : "password"}
                placeholder="kevin"
              />
            </div>
            <div className="d-flex sign-radio-container">
              <RadioInput name="gender" />
              <StringInput
                className="col-6"
                label="Image Url"
                name="image"
                type="text"
                placeholder="kevin"
              />
            </div>

            <div className="btn-container d-flex justify-content-center">
              <button className="text-light p-2 m-2 sign-button" type="submit">
                Sign Up
              </button>
            </div>
            {props.error ? (
              <div className="text-danger text-center">
                {props.error}
              </div>
            ) : (
              ""
            )}
            <div className="d-flex justify-content-center flex-column align-items-center">
              <p className="text-center text-shadow text-light">
                Already registered? sign in{" "}
                <Link className="sign-here-link" to="/signin">
                  {" "}
                  <strong className="sign-here">here</strong>
                </Link>{" "}
              </p>
              <p className="text-white text-shadow google-text fw-bold">
                or Sign Up with Google
              </p>
              <GoogleLogin
                className="googleLogin"
                clientId="205491317030-kvfnncacikijvdksu4984jfjhr586hbf.apps.googleusercontent.com"
                buttonText="Sign Up with Google"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy={"single_host_origin"}
              />
            </div>
          </Form>
        </Formik> 
        </>}
            
          </>
       
      
      </Container>


      <Container fluid className="col-8 col-md-6 col-lg-6 col-xl-6 col-xxl-8 bg-info sign-in-portrait" style={{
          backgroundImage: `url(${SignInPic})`,
        }}>
            </Container>
      </Container>
      <Footer />
    </>
  );
};

const mapStateToProps = (state) => {
    return {
      user: state.userReducer.user,
      error: state.userReducer.error,
      success: state.userReducer.success,
      message:state.userReducer.message
    };
  };
  const mapDispatchToProps = {
    googleLogin: userActions.googleLogin,
    signUp : userActions.signUpUser

  };


export default connect(mapStateToProps,mapDispatchToProps)(SignUp);

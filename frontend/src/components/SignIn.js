import { React, useState } from "react";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";
import { GoogleLogin } from "react-google-login";
import Menu from "../components/Menu";
import * as Yup from "yup";
import { Formik, Form, useField } from "formik";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import FormR from "react-bootstrap/Form";
import Footer from "./Footer";
import SignInPic from "../assets/sign-in.jpg";
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
      ) : (
        <p className="text-danger mb-1 invisible">a</p>
      )}
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
    props.googleLogin(googleUser);
  };

  if (props.user) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <div className="fondo-menu-sign">
        <Menu />
      </div>
      <Container fluid className="d-flex p-0">
        <Container
          fluid
          className="col-8 col-md-6 col-lg-6 col-xl-6 col-xxl-8 bg-info sign-in-portrait"
          style={{
            backgroundImage: `url(${SignInPic})`,
          }}
        ></Container>

        <Container
          fluid
          className="signin-container col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 col-xxl-4 p-3 d-flex flex-column"
        >
          <div className="d-flex justify-content-center">
            <img
              className="sign-logo"
              src="./assets/logo3.png"
              alt="Logo Slippers"
            />
          </div>

          <h2 className="registrate text-light">Sign In Credentials</h2>
          <Formik
            initialValues={{
              email: "",
              password: "",
            }}
            validationSchema={Yup.object({
              email: Yup.string()
                .email("Invalid email")
                .matches(
                  /(\W|^)[\w.-]{0,25}.(com|cl|ar|col|pe|ven|br)(\W|$)/,
                  "Invalid email"
                )
                .min(5, "At least 5 characters")
                .max(40, "Can not exceed 40 characters")
                .trim()
                .required("Required"),
              password: Yup.string()
                .min(7, "Password must contain at least 7 characters")
                .max(35, "Password can not exceed 35 characters")
                .required("Required"),
            })}
            onSubmit={(values, { setSubmitting }) => {
              props.signIn(values);
              setSubmitting(false);
            }}
          >
            <Form>
              <StringInput
                label="Email"
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
              <div className="btn-container d-flex justify-content-center">
                <button className="sign-button" type="submit">
                  Sign In
                </button>
              </div>
              {props.error ? (
                <div className="text-danger text-center">{props.error}</div>
              ) : (
                ""
              )}

              <p className="text-center disabled text-shadow text-light">
                Don't have an account? Register{" "}
                <Link className="sign-here-link" to="/signup">
                  <strong className="fw-bold sign-here">here</strong>
                </Link>{" "}
              </p>

              <div className="d-flex justify-content-center flex-column align-items-center">
                <p className="text-white text-shadow google-text fw-bold">
                  or Sign In with Google
                </p>
                <GoogleLogin
                  className="googleLogin"
                  clientId="205491317030-kvfnncacikijvdksu4984jfjhr586hbf.apps.googleusercontent.com"
                  buttonText="Sign In with Google"
                  onSuccess={responseGoogle}
                  onFailure={responseGoogle}
                  cookiePolicy={"single_host_origin"}
                />
              </div>
            </Form>
          </Formik>
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
  };
};
const mapDispatchToProps = {
  googleLogin: userActions.googleLogin,
  signIn: userActions.signInUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);

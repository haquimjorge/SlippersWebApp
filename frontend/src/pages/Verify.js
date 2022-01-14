import Container from "react-bootstrap/Container";
import { connect } from "react-redux";
import userActions from "../redux/actions/userActions";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import Spinner from "react-bootstrap/Spinner";
import Stack from "react-bootstrap/Stack";
import { Link } from "react-router-dom";

const Verify = (props) => {
  const [redirect, setRedirect] = useState(false);
  const { user, verifyEmail } = props;
  const uniqueString = props.params.uniqueString;
  let navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      verifyEmail(uniqueString);
    }
  }, [verifyEmail, uniqueString, user]);

  if (props.success !== null && redirect === false) {
    setTimeout(() => {
      setRedirect(true);
    }, 3000);
  }

  if (redirect) {
    navigate("/");
  }

  return (
    <>
      <Container
        fluid
        className="verify-page-section vh-100 d-flex justify-content-center flex-column align-items-center bg-dark"
      >
        <Stack
          gap={5}
          className="d-flex justify-content-center align-items-center"
        >
          <div className="d-flex justify-content-center">
            <img
              className="sign-logo"
              src="../assets/logo3.png"
              alt="Logo Slippers"
            />
          </div>
          <p className="text-shadow-slipper display-6 text-center text-light">
            {props.user ? (
              "¡Welcome " + props.user.name + "!"
            ) : (
              <Spinner animation="border" variant="warning" size="sm" />
            )}
          </p>
          {props.success !== null || props.success !== undefined ? (
              props.success ? (
                  <>
                <p className="text-shadow-slipper text-center text-warning">{props.message}</p>
                
          </>
              ) : (
                  <>
                <p className="text-shadow-slipper text-center text-warning">{props.error}</p>
                
          </>
              )
            ) : (
              <Spinner animation="grow" variant="danger" />
            )}
            {props.message || props.error? <>
            <p className="text-light">Redirecting to Home...</p>
            <Link to="/">(Click here if automatic redirect does not work)</Link>
            
            </>
            
             : <p className="invisible">redirecting</p>}
          <Spinner animation="grow" variant="warning" />
        </Stack>
      </Container>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.userReducer.user,
    error: state.userReducer.error,
    message: state.userReducer.message,
    success: state.userReducer.success,
  };
};

const mapDispatchToProps = {
  verifyEmail: userActions.verifyEmail,
};
export default connect(mapStateToProps, mapDispatchToProps)(Verify);

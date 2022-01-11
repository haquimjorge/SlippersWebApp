import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import { connect } from "react-redux";
import userActions from "../redux/actions/userActions";
import { Link } from "react-router-dom";
import User from "../assets/user.png";
import Image from "react-bootstrap/Image";


function Navbar(props) {
    const token = localStorage.getItem('token')
    let imagenUsuario = (
      <Image
        className="user-icon"
        src={props.user ? props.user.image : User}
      ></Image>
    );
  return (
    <>
      <div className="container-menu">
        <ul className="menu">
          <div className="logo-menu">
            <img src="./assets/logo3.png" />
          </div>

          <li>
            <a className="botones-menu" href="#">
              Home
            </a>
          </li>
          <li>
            <a className="botones-menu" href="#">
              Shopp
            </a>
          </li>
          <li>
            <a className="botones-menu" href="#">
              Contacts
            </a>
          </li>
        </ul>
        <DropdownButton id="dropdown-basic-button" title={imagenUsuario}>
            {props.user ? (
                <>
              <Dropdown.Item as={Link} to="/account">
                Account
              </Dropdown.Item>
              <Dropdown.Item onClick={() => props.logOut()}>
              Sign Out
            </Dropdown.Item>
            </>
            ) : (
                <>
              <Dropdown.Item as={Link} to="/signin">
                Sign In
              </Dropdown.Item>
              <Dropdown.Item as={Link} to="/signup">
              Sign Up
            </Dropdown.Item>
            </>
            )}
          </DropdownButton>

        <a type="button" href="#">
          <img
            className="carrito"
            src="./assets/carrito-de-compras.png"
            alt="carrito"
          />
        </a>
      </div>
    </>
  );
}

const mapStateToProps = (state) => {
    return {
      user: state.userReducer.user,
    };
  };
  
  const mapDispatchToProps = {
    logOut: userActions.logOut,
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(Navbar);

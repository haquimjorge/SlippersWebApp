import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Carrito from "./Carrito";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import { connect } from "react-redux";
import userActions from "../redux/actions/userActions";
import Image from "react-bootstrap/Image";
import "../index.css";

function Menu(props) {
  let imagenUsuario = props.user ? (
    <Image className="user-icon" src={props.user.image}></Image>
  ) : (
    <Image className="user-icon" src="./assets/usuario1.png" />
  );
  return (
    <>
      <Navbar className="contenedor-menu bg-dark" expand="lg">
        <Container>
          <div className="logo-menu ms-5">
            <img src="./assets/logo3.png" />
          </div>
          <Navbar.Toggle
            className="hamburguesa"
            aria-controls="basic-navbar-nav"
          />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="d-flex justify-content-around w-50 m-auto align-items-center">
              <Link className="botones-menu text-light text-center" to="/">
                Home
              </Link>
              <Link className="botones-menu text-light text-center" to="/shop">
                Shop
              </Link>
              <Link
                className="botones-menu text-light text-center"
                to="/contacts"
              >
                Contacts
              </Link>

              <DropdownButton
                className=""
                id="dropdown-basic-button"
                title={imagenUsuario}
              >
                {props.user ? (
                  <div className="contenedor-dropdown">
                    <Dropdown.Item
                      className="dropdown-item"
                      as={Link}
                      to="/account"
                    >
                      Account
                    </Dropdown.Item>
                    <Dropdown.Item
                      className="dropdown-item"
                      onClick={() => props.logOut()}
                    >
                      Sign Out
                    </Dropdown.Item>
                  </div>
                ) : (
                  <div className="contenedor-dropdown">
                    <Dropdown.Item
                      className="dropdown-item"
                      as={Link}
                      to="/signin"
                    >
                      Sign In
                    </Dropdown.Item>
                    <Dropdown.Item
                      className="dropdown-item"
                      as={Link}
                      to="/signup"
                    >
                      Sign Up
                    </Dropdown.Item>
                  </div>
                )}
              </DropdownButton>
            </Nav>
          </Navbar.Collapse>
          <Link to="/cart">
            <Carrito />
          </Link>
        </Container>
      </Navbar>
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

export default connect(mapStateToProps, mapDispatchToProps)(Menu);

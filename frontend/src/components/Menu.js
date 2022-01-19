import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import { connect } from "react-redux";
import userActions from "../redux/actions/userActions";
import Image from "react-bootstrap/Image";
import Logo from "../assets/logo3.png";
import User from "../assets/usuario1.png";
import "../index.css";
import CarritoModal from "./CarritoModal";


function Menu(props) {
    console.log(props.user)
  let imagenUsuario = props.user ? (
    <Image className="user-icon" src={props.user.googleUser ? props.user.image : `./files/${props.user.image}` }></Image>
  ) : (
    <Image className="user-icon" src={User} />
  );
  return (
    <>
      <Navbar className="contenedor-menu bg-dark" expand="lg">
        <Container>
          <div className="logo-menu ms-5">
            <img src={Logo} alt="logo" />
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
                  props.user.rol === "Admin" ? (
                    <div className="contenedor-dropdown">
                      <Dropdown.Item
                        className="dropdown-item"
                        as={Link}
                        to="/admin"
                      >
                        Admin Panel
                      </Dropdown.Item>
                      <Dropdown.Item
                        className="dropdown-item"
                        as={Link}
                        to="/account"
                      >
                        Account
                      </Dropdown.Item>
                      <Dropdown.Item
                        className="dropdown-item"
                        as={Link}
                        to="/check"
                      >
                        Checkout
                      </Dropdown.Item>
                      <Dropdown.Item
                        className="dropdown-item"
                        onClick={() => props.logOut()}
                      >
                        Sign Out
                      </Dropdown.Item>
                    </div>
                  ) : (
                    <>
                      <Dropdown.Item
                        className="dropdown-item"
                        as={Link}
                        to="/account"
                      >
                        Account
                      </Dropdown.Item>
                      <Dropdown.Item
                        className="dropdown-item"
                        as={Link}
                        to="/check"
                      >
                        Checkout
                      </Dropdown.Item>
                      <Dropdown.Item
                        className="dropdown-item"
                        onClick={() => props.logOut()}
                      >
                        Sign Out
                      </Dropdown.Item>
                    </>
                  )
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
          <CarritoModal />
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

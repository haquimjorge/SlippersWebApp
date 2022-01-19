import Container from "react-bootstrap/Container";
import { React } from "react";
import { connect } from "react-redux";
import shoeActions from "../redux/actions/shoeActions";

import AdminSingleVariaton from "./AdminSingleVariation"

function AdminVariations(props) {
  return (
    <>
      <Container fluid className="">
        <p>
          Here you can upload new variations for each product and check how many
          of them have. Simply hover your mouse on any box to see details (press
          on mobile).
        </p>
        {props.shoes &&
          props.shoes.map((shoe) => (
            <AdminSingleVariaton shoe={shoe} />
          ))}
      </Container>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    shoes: state.shoeReducer.shoes,
  };
};

const mapDispatchToProps = {
  sendIdtoEdit: shoeActions.sendIdtoEdit,
};
export default connect(mapStateToProps, mapDispatchToProps)(AdminVariations);

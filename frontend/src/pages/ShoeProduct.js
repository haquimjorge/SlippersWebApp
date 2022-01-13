import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import shoeActions from "../redux/actions/shoeActions";

const ShoeProduct = (props) => {

  useEffect(() => {
    props.getOneShoe(props.params.shoesId);
  }, []);
  console.log(props.oneShoe)

  return <>
  <p>{props.oneShoe.name}</p>
  
  </>;
};

const mapDispatchToProps = {
  getOneShoe: shoeActions.getOneShoe,
};

const mapStateToProps = (state) => {
  return {
    oneShoe: state.shoeReducer.oneShoe,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ShoeProduct);

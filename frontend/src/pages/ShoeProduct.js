import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import shoeActions from "../redux/actions/shoeActions";

const ShoeProduct = (props) => {
  const params = useParams();
  console.log(params)

  useEffect(() => {
    props.getOneShoe(props.params.shoeId);
  }, []);

  return <>asdadadadaddadadaddad</>;
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

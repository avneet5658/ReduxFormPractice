import React from "react";
import { connect } from "react-redux";

const Display = ({ forms }) => {
  console.log(forms);
  return <div>{JSON.stringify(forms.contact.values)}</div>;
};

const mapStatetoProps = (state) => {
  return {
    forms: state.form,
  };
};

export default connect(mapStatetoProps, null)(Display);

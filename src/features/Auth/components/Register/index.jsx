import { unwrapResult } from "@reduxjs/toolkit";
import { useSnackbar } from "notistack";
import PropTypes from "prop-types";
import React from "react";
import { useDispatch } from "react-redux";
import { register } from "../../userSlice";
import RegisterForm from "../RegisterForm";

Register.propTypes = {
  closeDialog: PropTypes.func,
};

function Register(props) {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = async (values) => {
    try {
      // auto set username bang email.
      values.username = values.email;
      console.log("Form submit", values);
      const action = register(values);
      const resultAction = await dispatch(action);
      const user = unwrapResult(resultAction);
      // unwrapResult hamf để nó handle error

      // close dialog
      const { closeDialog } = props;
      if (closeDialog) {
        closeDialog();
      }

      // do something here register successfully
      console.log("new user:", user);
      enqueueSnackbar("Register successfully", { variant: "success" });
    } catch (error) {
      console.log("fail to register", error);
      enqueueSnackbar(error.message, { variant: "error" });
    }
  };
  return (
    <div>
      <RegisterForm onSubmit={handleSubmit}></RegisterForm>
    </div>
  );
}

export default Register;

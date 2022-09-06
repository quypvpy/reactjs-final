import { unwrapResult } from "@reduxjs/toolkit";
import { useSnackbar } from "notistack";
import PropTypes from "prop-types";
import React from "react";
import { useDispatch } from "react-redux";
import { login, register } from "../../userSlice";
import LoginForm from "../LoginForm";

Login.propTypes = {
  closeDialog: PropTypes.func,
};

function Login(props) {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = async (values) => {
    try {
      console.log("Form submit", values);
      const action = login(values);
      const resultAction = await dispatch(action);
      const user = unwrapResult(resultAction);
      // unwrapResult hamf để nó handle error

      // close dialog
      const { closeDialog } = props;
      if (closeDialog) {
        closeDialog();
      }

      // do something here register successfully
    } catch (error) {
      console.log("fail to login", error);
      enqueueSnackbar(error.message, { variant: "error" });
    }
  };
  return (
    <div>
      <LoginForm onSubmit={handleSubmit}></LoginForm>
    </div>
  );
}

export default Login;

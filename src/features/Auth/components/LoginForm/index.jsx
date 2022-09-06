import React from "react";
import PropTypes from "prop-types";
import InputField from "../../../../components/form-controls/InputField";
import { useForm } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  Avatar,
  Button,
  LinearProgress,
  makeStyles,
  Typography,
} from "@material-ui/core";

import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import PasswordField from "../../../../components/form-controls/PasswordField";

const useStyles = makeStyles((theme) => ({
  // 1 spacing laf 8px
  root: {
    position: "relative",
  },
  avatar: {
    margin: "0 auto",
    backgroundColor: theme.palette.secondary.main,
  },
  title: {
    margin: theme.spacing(1.0, 0, 2.0, 0),
    textAlign: "center",
  },
  submit: {
    margin: theme.spacing(2.5, 0, 1.5, 0),
  },
  progress: {
    position: "absolute",
    top: theme.spacing(1),
    left: 0,
    right: 0,
  },
}));

LoginForm.propTypes = {
  onSubmit: PropTypes.func,
};

function LoginForm(props) {
  const classes = useStyles();

  const schema = yup.object().shape({
    identifier: yup
      .string()
      .required("Please enter your email.")
      .email("please enter an valid address"),
    password: yup.string().required("Please enter your password."),
  });

  const form = useForm({
    defaultValues: {
      identifier: "",
      password: "",
    },
    resolver: yupResolver(schema),
  });
  const handleSubmit = async (values) => {
    // console.log("RegisterForm", values);
    const { onSubmit } = props;
    if (onSubmit) {
      await onSubmit(values);
    }
    // them await để bắt nó đợi..xong mới tính là hết submitting

    // form.reset();
  };

  // hiển thị loading
  const { isSubmitting } = form.formState;
  return (
    // handleSubmit đầu tiên là hàm của form.. cái thứ 2 là hàm mình xử lí
    <div className={classes.root}>
      {/* neeus đang submit thì show */}
      {isSubmitting && (
        <LinearProgress className={classes.progress}></LinearProgress>
      )}
      <Avatar className={classes.avatar}>
        <LockOutlinedIcon></LockOutlinedIcon>
      </Avatar>

      <Typography className={classes.title} component="h3" variant="h5">
        Sign In
      </Typography>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        Todo Form
        {/* name là lấy chỗ default value */}
        <InputField name="identifier" label="Email" form={form}></InputField>
        <PasswordField
          name="password"
          label="Password"
          form={form}
        ></PasswordField>
        <Button
          disabled={isSubmitting}
          type="submit"
          fullWidth
          className={classes.submit}
          variant="contained"
          color="primary"
        >
          Sign In
        </Button>
      </form>
    </div>
  );
}

export default LoginForm;

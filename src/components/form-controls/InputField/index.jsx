import React from "react";
import PropTypes from "prop-types";
import { makeStyles, TextField } from "@material-ui/core";
import { Controller } from "react-hook-form";

InputField.propTypes = {
  form: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,

  label: PropTypes.string,
  disabled: PropTypes.bool,
};

const useStyles = makeStyles((theme) => ({
  // 1 spacing laf 8px
  root: {
    position: "relative",
  },
  input: {
    //   height: 32,
    //   padding: "0 30px",
  },
}));

// cần khai báo thông tin cha truyền xuống như.. name label..,
function InputField(props) {
  const classes = useStyles();
  const { form, name, label, disabled } = props;

  const { errors, formState } = form;
  // show khi control ddax touched và có error
  const hasError = errors[name];
  // const hasError = formState.touched[name] && errors[name];
  // console.log(errors[name], formState.touched[name]);
  // ở dưới !! ta đã biến thánh true false.. nên nếu đã touch(có chỉnh sửa ) thì true..k thì undefiend
  // nên cả 2 đềug có nó mới show lỗi.
  // nếu có lỗi thì nó show lỗi.. k thì underfiend

  return (
    // để tự đông bidding những hàm như onchange onblur thì sủ dụng tv ngoài là controler của react hoookform
    <Controller
      name={name}
      control={form.control}
      as={TextField}
      variant="outlined"
      margin="normal"
      fullWidth
      size="small"
      className={classes.input}
      label={label}
      disabled={disabled}
      // vô MUI để coi cách show error ở componet textfeild
      error={!!hasError}
      helperText={errors[name]?.message}
    ></Controller>
  );
}

export default InputField;

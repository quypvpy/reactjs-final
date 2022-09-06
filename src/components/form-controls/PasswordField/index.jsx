import PropTypes from "prop-types";
import React, { useState } from "react";
import { Controller } from "react-hook-form";

import FormControl from "@material-ui/core/FormControl";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import InputLabel from "@material-ui/core/InputLabel";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { FormHelperText } from "@material-ui/core";

PasswordField.propTypes = {
  form: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,

  label: PropTypes.string,
  disabled: PropTypes.bool,
};

// cần khai báo thông tin cha truyền xuống như.. name label..,
function PasswordField(props) {
  const { form, name, label, disabled } = props;

  const { errors } = form;
  // show khi control ddax touched và có error
  const hasError = !!errors[name];
  // console.log(errors[name], formState.touched[name]);
  // ở dưới !! ta đã biến thánh true false.. nên nếu đã touch(có chỉnh sửa ) thì true..k thì undefiend
  // nên cả 2 đềug có nó mới show lỗi.
  // nếu có lỗi thì nó show lỗi.. k thì underfiend

  const [showPassword, setShowPassword] = useState(false);
  const toggleShowPassword = () => {
    setShowPassword((x) => !x);
  };

  return (
    // để tự đông bidding những hàm như onchange onblur thì sủ dụng tv ngoài là controler của react hoookform

    <FormControl
      error={hasError}
      margin="normal"
      fullWidth
      size="small"
      variant="outlined"
    >
      <InputLabel htmlFor={name}>{label}</InputLabel>
      <Controller
        name={name}
        control={form.control}
        as={OutlinedInput}
        id={name}
        type={showPassword ? "text" : "password"}
        label={label}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={toggleShowPassword}
              edge="end"
            >
              {showPassword ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>
        }
        //   labelWidth={70}
        // minhf tùy chỉnh label witdt để khoảng cách với ô input rộng ra
        //    label={label} thêm vô để nó tự fix chữ theo lable khi chữ dài ngắn tùy ô.

        disabled={disabled}
        // vô MUI để coi cách show error ở componet textfeild

        // vif OutlinedInput k hỗ trợ helperText như textfield nên phải dùng
        // error={!!hasError}
        // helperText={errors[name]?.message}
      ></Controller>
      <FormHelperText>{errors[name]?.message}</FormHelperText>
    </FormControl>
  );
}

export default PasswordField;

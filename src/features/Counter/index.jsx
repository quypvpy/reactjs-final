import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { increase } from "./countSlice";
import { decrease } from "./countSlice";
import { useDispatch } from "react-redux";

import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles({
  root: {
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    border: 0,
    borderRadius: 3,
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    color: "white",
    height: 32,
    padding: "0 30px",
  },
});
// và nhớ đổi button thanhg Button của MUI

CounterFeature.propTypes = {};

function CounterFeature(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  // useSelector hook để lấy state trong redux của mình
  // state là root state của mình.. .count là sate mình muốn lấy
  const count = useSelector((state) => state.count);
  const handleIncreaseClick = () => {
    const action = increase();
    // const action = increase(123);
    // console.log(action);
    dispatch(action);
    // có thể truyền paload như index là tại vị trí mình muốn xóa vân vân
  };
  const handleDecreaseClick = () => {
    const action = decrease();
    dispatch(action);
  };
  return (
    <div>
      Counter :{count}
      <div className="">
        <Button className={classes.root} onClick={handleIncreaseClick}>
          Increase
        </Button>
        <Button className={classes.root} onClick={handleDecreaseClick}>
          Decrease
        </Button>
      </div>
    </div>
  );
}

export default CounterFeature;

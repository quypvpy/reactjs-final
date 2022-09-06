import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import MenuIcon from "@material-ui/icons/Menu";
import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";

import { Box, IconButton, Menu, MenuItem } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import CloseIcon from "@material-ui/icons/Close";
import { useDispatch, useSelector } from "react-redux";
import Login from "../../features/Auth/components/Login";
import Register from "../../features/Auth/components/Register";
import { logout } from "../../features/Auth/userSlice";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  link: {
    textDecoration: "none",
    color: "white",
  },
  closeButton: {
    position: "absolute",
    top: theme.spacing(1),
    right: theme.spacing(1),
    color: theme.palette.grey[500],
    zIndex: 1,
  },
  login: {
    display: "block",
    margin: "0 auto",
  },
}));

const MODE = {
  LOGIN: "login",
  REGISTER: "register",
};

export default function Header() {
  const dispatch = useDispatch();
  const loggedInUser = useSelector((state) => state.user.current);
  // chueyenr về booelan
  const isLoggedIn = !!loggedInUser.id;
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState(MODE.LOGIN);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleUserClick = (e) => {
    setAnchorEl(e.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };
  const handleLogoutClick = () => {
    const action = logout();
    dispatch(action);
  };

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <MenuIcon className={classes.menuButton} />
          <Typography variant="h6" className={classes.title}>
            <Link className={classes.link} to="/">
              PQ PHAM
            </Link>
          </Typography>

          <NavLink className={classes.link} to="/todos">
            <Button color="inherit">Todos</Button>
          </NavLink>
          <NavLink className={classes.link} to="/albums">
            <Button color="inherit">Album</Button>
          </NavLink>
          {/* neeus chuaw đăng nhập thì show */}
          {!isLoggedIn && (
            <>
              <Button color="inherit" onClick={handleClickOpen}>
                Login
              </Button>
            </>
          )}
          {/* nếu đăng nhập r */}
          {/* neeus k nằm trong icon butoon thì nó k pointer con trỏ chuột dc */}
          {isLoggedIn && (
            <IconButton color="inherit" onClick={handleUserClick}>
              <AccountCircleIcon></AccountCircleIcon>
            </IconButton>
          )}
        </Toolbar>
      </AppBar>

      <Menu
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        getContentAnchorEl={null}
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
      >
        <MenuItem onClick={handleCloseMenu}>My account</MenuItem>
        <MenuItem onClick={handleLogoutClick}>Logout</MenuItem>
      </Menu>

      <Dialog
        disableEscapeKeyDown
        disableBackdropClick
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <IconButton className={classes.closeButton} onClick={handleClose}>
          <CloseIcon></CloseIcon>
        </IconButton>

        <DialogContent>
          {/* mode = register thif show nguyeen cais sau && */}
          {mode === MODE.REGISTER && (
            <>
              <Register closeDialog={handleClose}></Register>
              <Box textAlign="center">
                <Button
                  color="primary"
                  onClick={() => {
                    setMode(MODE.LOGIN);
                  }}
                >
                  Already have account . Login here
                </Button>
              </Box>
            </>
          )}

          {mode === MODE.LOGIN && (
            <>
              <Login closeDialog={handleClose}></Login>
              {/* <Box textAlign="center"> */}
              <Button
                className={classes.login}
                color="primary"
                onClick={() => {
                  setMode(MODE.REGISTER);
                }}
              >
                Dont have account . Register here
              </Button>
              {/* </Box> */}
            </>
          )}
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

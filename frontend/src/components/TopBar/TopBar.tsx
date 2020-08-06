import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { bindActionCreators, Dispatch } from "redux";
import {connect} from "react-redux";
import * as AppActions from "../../actions/AppActions";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
}));

interface DispatchProps {
  logout(): void
  loginPage(): void
}

type Props = DispatchProps;

const MenuAppBar = ({ logout, loginPage }: Props) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={classes.root}>
      <AppBar >
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Calendar
          </Typography>
            <div>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open}
                onClose={handleClose}
              >
                <MenuItem onClick={() => {
                  logout()
                  loginPage()
                }
                }>Logout</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
              </Menu>
            </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}

const mapStateToProps = ()  => ({});

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators(AppActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(MenuAppBar);




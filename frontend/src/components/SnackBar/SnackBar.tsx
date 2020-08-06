import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { connect } from "react-redux";
import { AppReducer } from "../../types";
import { bindActionCreators, Dispatch } from "redux";
import * as AppActions from "../../actions/AppActions";



function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

interface StateProps {
    app: AppReducer,
}

interface DispatchProps {
    closeSnackBar(): void,
  
  }

interface SnackBarProps {
}

type Props = SnackBarProps & StateProps & DispatchProps;

const SnackBar = ({ app, closeSnackBar }: Props) => {
  const classes = useStyles();
  

  return (
    <div className={classes.root}>
      <Snackbar open={app.openSnackBar} autoHideDuration={6000} onClose={() => closeSnackBar()}>
        <Alert onClose={() => closeSnackBar()} severity={app.severitySnackBar}>
          {app.msgSnackBar}
        </Alert>
      </Snackbar>
    </div>
  );
}

const mapStateToProps = (state: any)  => ({
    app: state.AppReducer,
});


const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators(AppActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(SnackBar);
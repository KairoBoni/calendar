import React, { useState, useEffect } from 'react';
import { bindActionCreators, Dispatch } from "redux";
import { connect } from "react-redux";
import * as AppActions from "../../actions/AppActions";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import { TransitionProps } from '@material-ui/core/transitions';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Event } from '../../types'
import DialogContentText from '@material-ui/core/DialogContentText';
import { timeConverter } from "../../utils"
import Typography from '@material-ui/core/Typography';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
      width: "100%",
    },
    textField: {
      width: "95%",
    },
    Text: {
        display: "flex",
        flexDirection: "column"
    },
    Calendar: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between"
    },
    DialogContent: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between"
    },
  }),
);


const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement<any, any> },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface AddEventProps {
    event: Event
    userEmail: string
}

interface DispatchProps {
  getEvents(email: string):void
  acceptEvent(event: Event): void
  refuseEvent(event: Event): void

}


type Props = AddEventProps & DispatchProps;

const InvitedEvent = ({  event , userEmail, getEvents, acceptEvent, refuseEvent }: Props) => {
  const classes = useStyles();

  const [open, setOpen] = React.useState(true);

  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => setOpen(false)}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">Invited Event</DialogTitle>
        <DialogContent className={classes.DialogContent}>
          <DialogContentText id="alert-dialog-description">
            <p>You recive an invite of to participate of this event:</p>
            <p>Name: {event.name}</p>
            <p>description: {event.description}</p>
            <p>Start: {timeConverter(event.start)}</p>
            <p>end: {timeConverter(event.end)}</p>
          </DialogContentText>
        </DialogContent>
        <p/>
        <DialogActions>
          <Button onClick={() => {
            event.user_email = userEmail
            acceptEvent(event)
            console.log(event)
            setTimeout(function(){ getEvents(userEmail); }, 1000);
            setOpen(false)
          }} color="primary">
            Accept
          </Button>
          <Button onClick={() => {
          event.user_email = userEmail
          refuseEvent(event)
          console.log(event)
          setTimeout(function(){ getEvents(userEmail); }, 1000);
          setOpen(false)

          }} color="secondary">
            Refuse
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}



const mapStateToProps = ()  => ({});

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators(AppActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(InvitedEvent);




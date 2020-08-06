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
import TextField from '@material-ui/core/TextField';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { DateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { Event } from '../../types'
import { VerifyTimes } from '../../utils'

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
    handleClose(): void
    isOpen: boolean
    event: Event
    userEvents: Event[]
    userEmail: string
}

interface DispatchProps {
  DispatchNewMsg(severity: "success" | "error" | "info" | "warning", msg: string): void
  getEvents(email: string):void
  updateEvent(event: Event): void
  deleteEvent(id: number): void
}


type Props = AddEventProps & DispatchProps;

const EditEvent = ({ handleClose, isOpen, event, DispatchNewMsg, userEvents, userEmail, getEvents, updateEvent, deleteEvent }: Props) => {
  const classes = useStyles();


  const [start, setStart] = useState<Date | null>(new Date())
  const [end, setEnd] = useState<Date | null>(new Date())
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")

  return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
    <div>
      <Dialog
        open={isOpen}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">Edit Event</DialogTitle>
        <DialogContent className={classes.DialogContent}>
        <div className={classes.Text}>
            <TextField
             required 
             id="standard-required" 
             label="Name"
             value={name}
             onChange={event => setName(event.target.value)}
             />
            <TextField 
            required
            id="standard-required"
            label="Description"
            value={description}
            onChange={event => setDescription(event.target.value)}
            />
        </div>
        <p/>
        <div className={classes.Calendar}>
              <form className={classes.container} noValidate>
                  <DateTimePicker
                    label="Start"
                    inputVariant="outlined"
                    value={start}
                    onChange={newDate => setStart(newDate)}
                    className={classes.textField}
                  />
              </form>
              <form className={classes.container} noValidate>
                 <DateTimePicker
                    label="End"
                    inputVariant="outlined"
                    value={end}
                    onChange={newDate => setEnd(newDate)}
                    className={classes.textField}
                  />
              </form>
        </div>
        </DialogContent>
        <p/>
        <DialogActions>
          <Button onClick={() => {
          if (VerifyTimes(start!, end!, userEvents)) {
            const e: Event = {
              id: event.id,
              name: name,
              description: description,
              user_email: userEmail,
              start: start!.getTime(),
              end: end!.getTime()
          };

            updateEvent(e)
            setTimeout(function(){ getEvents(userEmail); }, 1000);
            handleClose()
          } else {
            DispatchNewMsg("warning", "Cant Create New event, verify the time of start and end")
          }
          }} color="primary">
            Schedule
          </Button>
          <Button onClick={() => {

          deleteEvent(event!.id)
          setTimeout(function(){ getEvents(userEmail); }, 1000);
          handleClose()
          }} color="secondary">
            Delete
          </Button>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
          </MuiPickersUtilsProvider>
  );
}



const mapStateToProps = ()  => ({});

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators(AppActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(EditEvent);




import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import { TransitionProps } from '@material-ui/core/transitions';
import TextField from '@material-ui/core/TextField';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { findByLabelText } from '@testing-library/react';

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

}

type Props = AddEventProps;

const AddEvent = ({ handleClose, isOpen }: Props) => {
  const classes = useStyles();
  return (
    <div>
      <Dialog
        open={isOpen}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">Add A New Event</DialogTitle>
        <DialogContent className={classes.DialogContent}>
        <div className={classes.Text}>
            <TextField required id="standard-required" label="Name"/>
            <TextField required id="standard-required" label="Description"/>
        </div>
        <p/>
        <div className={classes.Calendar}>
            <form className={classes.container} noValidate>
                <TextField
                    id="datetime-start"
                    label="Start"
                    type="datetime-local"
                    className={classes.textField}
                    InputLabelProps={{
                    shrink: true,
                    }}
                />
            </form>
            <form className={classes.container} noValidate>
                <TextField
                    id="datetime-end"
                    label="End"
                    type="datetime-local"
                    className={classes.textField}
                    InputLabelProps={{
                    shrink: true,
                    }}
                />
            </form>
        </div>
        </DialogContent>
        <p/>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Schedule
          </Button>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default AddEvent;

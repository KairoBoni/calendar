import React from "react";
import Login from "../Login";
import Signup from "../Signup";
import { connect } from "react-redux";
import TopBar from "../TopBar"
import EventsTable from "../EventsTable"
import AddEvent from "../AddEvent"
import { makeStyles } from '@material-ui/core/styles';

let componentMap= new Map();
componentMap.set("LOGIN_PAGE",  <Login/>)
componentMap.set("SIGNUP_PAGE",  <Signup/>)


interface StateProps {
}

interface DispatchProps {
}

type Props = StateProps & DispatchProps;

const useStyles = makeStyles((theme) => ({
    header: {
      height:"100%",
    },
    body: {
      marginTop: 100,
      marginBottom:20,
      marginLeft: 20,
      marginRight: 20,


    },
  }));
  

const Events = () => {
  const [open, setOpen] = React.useState(true);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

    const classes = useStyles();
    return (
        <React.Fragment>
          <div className={classes.header}>
            <TopBar/>
          </div>
          <div className={classes.body}>
            <EventsTable
              handleOpenAddEvent={handleOpen}
            />
          </div>
          <AddEvent
            handleClose={handleClose}
            isOpen={open}
          />
        </React.Fragment>
        
    )
};

const mapStateToProps = (state: any)  => ({
    app: state.AppReducer,
});

const mapDispatchToProps = ({});

export default connect(mapStateToProps, mapDispatchToProps)(Events);


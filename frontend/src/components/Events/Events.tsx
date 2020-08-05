import React, { useEffect } from "react";
import Login from "../Login";
import Signup from "../Signup";
import { connect } from "react-redux";
import TopBar from "../TopBar"
import EventsTable from "../EventsTable"
import AddEvent from "../AddEvent"
import EditEvent from "../EditEvent"
import { makeStyles } from '@material-ui/core/styles';
import { bindActionCreators, Dispatch } from "redux";
import * as AppActions from "../../actions/AppActions";
import { UserReducer, Event } from "../../types";



let componentMap= new Map();
componentMap.set("LOGIN_PAGE",  <Login/>)
componentMap.set("SIGNUP_PAGE",  <Signup/>)


interface StateProps {
  userReducer: UserReducer
}

interface DispatchProps {
  getEvents(email: string):void
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
  

const Events = ({ getEvents, userReducer }: Props) => {

  useEffect(() => {
    getEvents(userReducer.user.email)
  }, []);

  const [openAddEvent, setOpenAddEvent] = React.useState(false);

  const handleOpenAddEvent = () => {
    setOpenAddEvent(true);
  };

  const handleCloseAddEvent = () => {
    setOpenAddEvent(false);
  };

  const [openEditEvent, setOpenEditEvent] = React.useState(false);
  const [selectedEvent, setSelectedEvent] = React.useState<Event>(userReducer.events[0]);


  const handleOpenEditEvent = (id: number) => {
    const event = userReducer.events.find(e => e.id == id)
    setSelectedEvent(event!)
    setOpenEditEvent(true);
  };

  const handleCloseEditEvent = () => {
    setOpenEditEvent(false);
  };

    const classes = useStyles();
    return (
        <React.Fragment>
          <div className={classes.header}>
            <TopBar/>
          </div>
          <div className={classes.body}>
            <EventsTable
              events={userReducer.events}
              handleOpenAddEvent={handleOpenAddEvent}
              handleOpenEditEvent={handleOpenEditEvent}
            />
          </div>
          <AddEvent
            userEmail={userReducer.user.email}
            userEvents={userReducer.events}
            handleClose={handleCloseAddEvent}
            isOpen={openAddEvent}
          />
          <EditEvent
            event={selectedEvent}
            userEvents={userReducer.events}
            isOpen={openEditEvent}
            handleClose={handleCloseEditEvent}

          />
          
        </React.Fragment>
        
    )
};

const mapStateToProps = (state: any)  => ({
  userReducer: state.UserReducer,
});

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators(AppActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Events);


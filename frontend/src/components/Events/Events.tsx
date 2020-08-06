import React, { useEffect } from "react";
import Login from "../Login";
import Signup from "../Signup";
import { connect } from "react-redux";
import TopBar from "../TopBar"
import EventsTable from "../EventsTable"
import AddEvent from "../AddEvent"
import EditEvent from "../EditEvent"
import InvitedEvent from "../InvitedEvent"
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
  getEmailUsers(): void
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
  

const Events = ({ getEvents, getEmailUsers , userReducer }: Props) => {

  useEffect(() => {
    getEvents(userReducer.user.email)
    getEmailUsers()
  }, []);

  const [openAddEvent, setOpenAddEvent] = React.useState(false);

  const handleOpenAddEvent = () => {
    setOpenAddEvent(true);
  };

  const handleCloseAddEvent = () => {
    setOpenAddEvent(false);
  };

  const initialEvent: Event = {
    id:0,
    name: "",
    description: "",
    start: 0,
    end: 0
  };

  const [openEditEvent, setOpenEditEvent] = React.useState(false);
  const [selectedEvent, setSelectedEvent] = React.useState<Event>(initialEvent);


  const handleOpenEditEvent = (id: number) => {
    const event = userReducer.events.find(e => e.id === id)
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
            userEmailList={userReducer.user_emails}
          />
          <EditEvent
            event={selectedEvent}
            userEvents={userReducer.events}
            isOpen={openEditEvent}
            handleClose={handleCloseEditEvent}
            userEmail={userReducer.user.email}
          />

          {
            userReducer.events
            .filter(e => e.confirmed === false)
            .map(e => {
              return (
                <InvitedEvent
                  event={e}
                  userEmail={userReducer.user.email}
                  key={e.id}
                />
              )
            })
          }
          
        </React.Fragment>
        
    )
};

const mapStateToProps = (state: any)  => ({
  userReducer: state.UserReducer,
});

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators(AppActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Events);


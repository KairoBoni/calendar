import React from "react";
import Login from "../Login";
import Signup from "../Signup";
import Events from "../Events";
import { AppReducer } from "../../types";
import { connect } from "react-redux";

let componentMap= new Map();
componentMap.set("LOGIN_PAGE",  <Login/>)
componentMap.set("SIGNUP_PAGE",  <Signup/>)
componentMap.set("EVENTS_PAGE",  <Events/>)



interface StateProps {
    app: AppReducer,
}

interface DispatchProps {
  }

type Props = StateProps & DispatchProps;

const CalendarView = ({ app }: Props) => {
    return (
        <React.Fragment>
             {componentMap.get(app.page)}
        </React.Fragment>
    )
};

const mapStateToProps = (state: any)  => ({
    app: state.AppReducer,
});

const mapDispatchToProps = ({});

export default connect(mapStateToProps, mapDispatchToProps)(CalendarView);


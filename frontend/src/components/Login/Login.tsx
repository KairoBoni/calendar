import React, { useState }  from "react";
import { bindActionCreators, Dispatch } from "redux";
import {connect} from "react-redux";
import { UserReducer, Login } from '../../types'
import * as AppActions from "../../actions/AppActions";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';


const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

interface DispatchProps {
  signupPage(): void,
  eventsPage(): void,
  login(user: Login): void

}

type Props = DispatchProps;

const LoginPage = ({ signupPage, eventsPage, login }: Props) => {
  const classes = useStyles();

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const clearForm = () => {
    setEmail('')
    setPassword('')
  }


  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={event => setEmail(event.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={event => setPassword(event.target.value)}
          />
          <Button
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={() => {
              const user: Login = {
                email: email,
                password: password
            };
              login(user)
              clearForm()
            }}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item>
              <Link href="#" variant="body2" onClick={() => {signupPage()}}>
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}

const mapStateToProps = ()  => ({});

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators(AppActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);


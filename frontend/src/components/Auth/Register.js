import React, { useState } from "react";
import { Mutation } from "react-apollo";
import { gql } from "apollo-boost";
import withStyles from "@material-ui/core/styles/withStyles";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import FormControl from "@material-ui/core/FormControl";
import Paper from "@material-ui/core/Paper";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import Gavel from "@material-ui/icons/Gavel";
import VerifiedUserTwoTone from "@material-ui/icons/VerifiedUserTwoTone";

function Transition(props) {
  return <Slide direction="up" {...props}/>
}

const Register = ({ classes, setNewUser }) => {
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [open, setOpen] = useState(false)

  const handleSubmit = (e, createUser) => {
    e.preventDefault()
    createUser()
  }

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Avatar className={classes.avatar}>
          <Gavel />
        </Avatar>
        <Typography variant="headline">
          Register
        </Typography>
        <Mutation 
          mutation={REGISTER_MUTATION}
          variables={{ username, email, password }}
          onCompleted={data => {
            console.log({data})
            setOpen(true)
          }}
        >
          {(createUser, {loading, error}) => {
            return (
              <form onSubmit={(e) => handleSubmit(e, createUser)} className={classes.form}>
                <FormControl margin="normal" required fullWidth>
                  <InputLabel htmlFor="username">Username</InputLabel>
                  <Input id="username" onChange={e => setUsername(e.target.value)}/>
                </FormControl>
                <FormControl margin="normal" required fullWidth>
                  <InputLabel htmlFor="email">Email</InputLabel>
                  <Input id="email" type="email" onChange={e => setEmail(e.target.value)}/>
                </FormControl>
                <FormControl margin="normal" required fullWidth>
                  <InputLabel htmlFor="password">Password</InputLabel>
                  <Input id="password" type="password" onChange={e => setPassword(e.target.value)}/>
                </FormControl>
                <Button
                  className={classes.submit}
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="secondary"
                  disabled={loading || !username.trim || !email.trim || !password.trim}
                >
                  {loading ? "Registering..." : "Register"}
                </Button>
                <Button
                  onClick={() => setNewUser(false)}
                  color="primary"
                  variant="outlined"
                  fullWidth
                >
                  Previous user? Login here
                </Button>
                {error && <div>Error</div>}
              </form>
            )
          }}
        </Mutation>
      </Paper>

      <Dialog
        open={open}
        disableBackdropClick={true}
        TransitionComponent={Transition}
      >
        <DialogTitle>
          <VerifiedUserTwoTone className={classes.icon} />
          New account
        </DialogTitle>
        <DialogContent>
          <DialogContentText>User {username} successfully created</DialogContentText>
          <DialogActions>
            <Button
            color="primary"
            variant="contained"
            onClick={() => setNewUser(false)}
            >
              Login
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </div>
  );
};

const REGISTER_MUTATION = gql`
  mutation ($username: String!, $email: String!, $password: String!) {
    createUser(username:$username, email:$email, password:$password) {
      user {
        id
        username
        email
      }
    }
  }
`

const styles = theme => ({
  root: {
    width: "auto",
    display: "block",
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up("md")]: {
      width: 400,
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: theme.spacing.unit * 2
  },
  title: {
    marginTop: theme.spacing.unit * 2,
    color: theme.palette.openTitle
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%",
    marginTop: theme.spacing.unit
  },
  submit: {
    marginTop: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 2
  },
  icon: {
    padding: "0px 2px 2px 0px",
    verticalAlign: "middle",
    color: "green"
  }
});

export default withStyles(styles)(Register);
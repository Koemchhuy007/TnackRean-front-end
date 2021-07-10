import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useHistory } from "react-router";
import QueuePlayNextIcon from "@material-ui/icons/QueuePlayNext";
import { MenuItem } from "@material-ui/core";
const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  typography: {
    submit: {
      margin: theme.spacing(3, 0, 2),
      color: `#9e9e9e`,
    },
  },
}));
const Sex = [
  {
    value: "Male",
    label: "Male",
  },
  {
    value: "Female",
    label: "Female",
  },
];
const Roles = [
  {
    value: "Teacher",
    label: "Teacher",
  },
  {
    value: "Student",
    label: "Student",
  },
];

export default function Register({ props }) {
  const classes = useStyles();
  const history = useHistory();

  const [sex, setSex] = React.useState("");
  const [role, setRole] = React.useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [comfirmPassword, setComfirmPassword] = useState("");
  const [name, setname] = useState("");
  const [passwordPush, setPasswordPush] = useState("");
  const [confrimPasswordError, setConfirmPasswordError] = useState(false);

  const handleChangeSex = (event) => {
    setSex(event.target.value);
  };
  const handleChangeRole = (event) => {
    setRole(event.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setConfirmPasswordError(false);
    if (password == comfirmPassword) {
      setPasswordPush(password);
    } else {
      setConfirmPasswordError(true);
    }
    if (email && passwordPush && name && sex && role) {
      let objpushTeacher = {
        name,
        sex,
        email,
        passwordPush,
        role,
      };
      let objpushStudent = {
        name,
        sex,
        email,
        passwordPush,
        role,
      }
      if (role == "Teacher") {
        fetch("http://localhost:8000/teacher", {
          method: "POST",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify(objpushTeacher),
        }).then(() => history.push("/"));
      }else if(role == "Student"){
        fetch("http://localhost:8000/students", {
          method: "POST",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify(objpushStudent),
        }).then(() => history.push("/"));
      }
    }
  };
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <QueuePlayNextIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Register
        </Typography>
        <form
          className={classes.form}
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                onChange={(e) => setname(e.target.value)}
                variant="outlined"
                margin="normal"
                fullWidth
                label="Name"
                color="secondary"
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="standard-select-currency"
                select
                label="Sex"
                value={sex}
                onChange={handleChangeSex}
                fullWidth
                variant="outlined"
                style={{ marginTop: "16px" }}
                color="secondary"
                required
              >
                {Sex.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          </Grid>

          <TextField
            onChange={(e) => setEmail(e.target.value)}
            variant="outlined"
            margin="normal"
            fullWidth
            label="Email Address"
            name="email"
            autoComplete="email"
            color="secondary"
            required
          />
          <TextField
            onChange={(e) => setPassword(e.target.value)}
            variant="outlined"
            margin="normal"
            fullWidth
            name="password"
            label="Password"
            type="password"
            maxlength="8"
            id="password"
            autoComplete="current-password"
            color="secondary"
            required
          />
          <TextField
            onChange={(e) => setComfirmPassword(e.target.value)}
            variant="outlined"
            margin="normal"
            fullWidth
            name="password"
            label="Confirm Password"
            type="password"
            id="password"
            maxlength="8"
            color="secondary"
            error={confrimPasswordError}
            required
          />
          <TextField
            id="standard-select-currency"
            select
            label="Role"
            value={role}
            onChange={handleChangeRole}
            fullWidth
            variant="outlined"
            style={{ marginTop: "16px", marginBottom: "16px" }}
            color="secondary"
            required
          >
            {Roles.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>

          <Button
            fullWidth
            variant="contained"
            color="secondary"
            className={classes.submit}
            type="submit"
          >
            Register
          </Button>
        </form>
      </div>
    </Container>
  );
}

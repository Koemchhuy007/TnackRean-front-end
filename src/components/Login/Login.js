import React, { useEffect, useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { Link} from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useHistory } from "react-router";
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

export default function Login({ props }) {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(false);

  const [passWordError, setpassWordError] = useState(false);
  const history = useHistory();
  const [teacherData, setTeacherData] = useState([]);
  const [studentData, setStudentData] = useState([]);

  useEffect(() => {
    fetch(" http://localhost:8000/teacher")
      .then((res) => res.json())
      .then((data) => setTeacherData(data));

    fetch(" http://localhost:8000/students")
      .then((res) => res.json())
      .then((data) => setStudentData(data));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setEmailError(false);
    setpassWordError(false);
    console.log(email, password);
    console.log(teacherData);
    console.log(studentData);
    if (email == "") {
      setEmailError(true);
    }
    if (password == "") {
      setpassWordError(true);
    }
    if (email && password) {
      // eslint-disable-next-line no-lone-blocks
      {
        teacherData.map((teacher) => {
          if (teacher.email === email && teacher.passwordPush === password) {
            history.push("/teacherpage/teacher/");
          }
        });

        studentData.map((student) => {
          if (student.email === email && student.passwordPush === password) {
            history.push("/student/myclass/");
          }
        });
      }
    }
  };
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
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <TextField
            onChange={(e) => setEmail(e.target.value)}
            variant="outlined"
            margin="normal"
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            color="secondary"
            error={emailError}
            required
          />
          <TextField
            onChange={(e) => setPassword(e.target.value)}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            color="secondary"
            error={passWordError}
          />

          <FormControlLabel
            control={<Checkbox value="remember" color="secondary" />}
            label="Remember me"
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="secondary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link to="#" variant="body2" color="secondary">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link to="/register" variant="body2" color="secondary">
                {"Don't have an account? Register here"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}

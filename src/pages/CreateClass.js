import React, { useState } from "react";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";
import { Grid, makeStyles } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles({
  field: {
    marginTop: 20,
    marginBottom: 20,
    display: "block",
  },
});

export default function Create() {
  const classes = useStyles();
  const history = useHistory();
  const [classname, setClassName] = useState("");
  const [subject, setSubject] = useState("");
  const [duration, setDuration] = useState("");
  const [teacherInform, setTeacherInform] = useState("");
  const [classnameError, setClassnameError] = useState(false);
  const [subjectsError, setSubjectsError] = useState(false);
  const [durationError, setDurationError] = useState(false);
  const [teacherInformError, setTeacherInformError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setClassnameError(false);
    setSubjectsError(false);
    setDurationError(false);
    setTeacherInformError(false);

    if (classname == "") {
      setClassnameError(true);
    }
    if (subject == "") {
      setSubjectsError(true);
    }
    if (duration == "") {
      setDurationError(true);
    }
    if (teacherInform == "") {
      setTeacherInformError(true);
    }
    if (classname && subject && duration && teacherInform) {
      fetch("http://localhost:8000/classes", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ classname, subject, duration, teacherInform }),
      }).then(() => history.push("/teacherpage/teacher"));
    }
  };

  return (
    <Container size="sm">
      <Typography
        variant="h6"
        color="textSecondary"
        component="h2"
        gutterBottom
      >
        Create a New Class
      </Typography>

      <form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <TextField
              className={classes.field}
              onChange={(e) => setClassName(e.target.value)}
              label="Class Name"
              variant="outlined"
              color="secondary"
              fullWidth
              required
              error={classnameError}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              className={classes.field}
              onChange={(e) => setSubject(e.target.value)}
              label="Subject"
              variant="outlined"
              color="secondary"
              fullWidth
              required
              error={subjectsError}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              className={classes.field}
              onChange={(e) => setDuration(e.target.value)}
              label="Duration"
              variant="outlined"
              color="secondary"
              fullWidth
              required
              error={durationError}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField
              className={classes.field}
              onChange={(e) => setTeacherInform(e.target.value)}
              label="Teacher Infrom"
              variant="outlined"
              color="secondary"
              multiline
              rows={4}
              fullWidth
              required
              error={teacherInformError}
            />
          </Grid>
        </Grid>
        <Button
          type="submit"
          color="secondary"
          variant="contained"
          endIcon={<KeyboardArrowRightIcon />}
        >
          Submit
        </Button>
      </form>
    </Container>
  );
}

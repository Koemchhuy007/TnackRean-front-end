import React, { useEffect, useState } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import { Grid, Slide, TextField } from '@material-ui/core';
import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});
const useStyles = makeStyles({
  field: {
    marginTop: 20,
    marginBottom: 20,
    display: "block",
  },
});
const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

export default function EditDialog({open, setOpen, nodeObj,setNodes}) {
  const classes = useStyles();
  const [classname, setClassName] = useState("");
  const [subject, setSubject]=  useState("");
  const [duration, setDuration] = useState("");
  const [teacherInform,setTeacherInform] = useState("");


  useEffect(() => {
    setClassName(nodeObj.classname);
    setSubject(nodeObj.subject);
    setDuration(nodeObj.duration);
    setTeacherInform(nodeObj.teacherInform)
  },[open]);
  const handleClose = () => {
    setOpen(false);
  };
  
const handleSubmit = (e) => {
  e.preventDefault();
  if(classname && subject && duration && teacherInform){
    fetch("http://localhost:8000/classes/"+nodeObj.id,{
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ classname,subject,duration,teacherInform})
    }).then(()=>{
      fetch('http://localhost:8000/classes')
      .then(res => res.json())
      .then(data => setNodes(data))
      setOpen(false);
    })
  }
}
  return (
    <div>
      <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" TransitionComponent={Transition} open={open}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
         Update class info
        </DialogTitle>
        <DialogContent dividers>
        <form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={4}>
            <TextField
              className={classes.field}
              onChange={(e) => setClassName(e.target.value)}
              label="Class Name"
              variant="outlined"
              color="secondary"
              fullWidth
              required
              defaultValue={classname}
           
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
              defaultValue={subject}
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
              defaultValue={duration}
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
              defaultValue={teacherInform}
            />
          </Grid>
        </Grid>
        <Button
          type="submit"
          color="secondary"
          variant="contained"
          endIcon={<KeyboardArrowRightIcon/>}
        >
          Update
        </Button>
      </form>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} color="primary">
            Save changes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import { Grid, TextField } from '@material-ui/core';
import Slide from '@material-ui/core/Slide';
import AddBoxIcon from '@material-ui/icons/AddBox';
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
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
export default function AddClasswork({open,setOpen,setclassWorkData }) {
  const handleClose = () => {
    setOpen(false);
  };
  const [workTitle, setWorkTitle] = useState("");
  const [dateLine, setDateLine] = useState("");
  const [docLink, setDocLink] = useState("");
  const [discription, setDescription] = useState("");
  const handleSubmit = (e) =>{
    e.preventDefault();
    fetch("http://localhost:8000/classwork", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ 
          workTitle, 
          dateLine, 
          docLink, 
          discription 
        }),
      }).then(()=>{
        fetch('http://localhost:8000/classwork')
        .then(res => res.json())
        .then(data => {
          setclassWorkData(data)
          setOpen(false);
        })
      })
  }
  return (
    <div>
      <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open} TransitionComponent={Transition}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Class Work
        </DialogTitle>
        <DialogContent dividers>
          <form  onSubmit={handleSubmit}>
           <Grid container spacing={3}>
               <Grid item xs={12} sm={6}>
               <TextField
                    label="Work title"
                    type="text"
                    color="secondary"
                    variant="outlined"
                    onChange={(e)=>setWorkTitle(e.target.value)}
                    required
                  />
               </Grid>
               <Grid item xs={12} sm={6}>
               <TextField
                    label="dateline"
                    type="date"
                    color="secondary"
                    variant="outlined"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    onChange={(e)=>setDateLine(e.target.value)}
                    required
                  />
               </Grid>
           </Grid>
           <Grid container spacing={3}>
               <Grid item xs={12} sm={12}>
               <TextField
                    label="Link Document"
                    type="link"
                    color="secondary"
                    variant="outlined"
                    multiline
                    rows={2}
                    fullWidth
                    onChange={(e)=>setDocLink(e.target.value)}
                  />
               </Grid>
           </Grid>
           <Grid container spacing={3}>
           <Grid item xs={12} sm={12}>
               <TextField
                    label="Description"
                    type="text"
                    color="secondary"
                    variant="outlined"
                    multiline
                    rows={4}
                    fullWidth
                    onChange={(e)=>setDescription(e.target.value)}
                  />
               </Grid>
           </Grid>
           <Button
           style={{float:"right", marginTop:"10px"}}
           variant="contained"
           type="submit" 
           autoFocus  
           color="secondary">
            Save changes
          </Button>
        </form>   
        </DialogContent>
        <DialogActions>
        
        </DialogActions>
      </Dialog>
    </div>
  );
}

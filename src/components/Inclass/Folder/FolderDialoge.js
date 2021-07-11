import React, { useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import { Grid, TextField } from "@material-ui/core";
const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: "absolute",
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
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
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

export default function FolderDialoge({ open, setOpen, setfolder }) {
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const [filename, setfilsName] = useState("");
  const [urlname, seturlname] = useState("");
  const [filenameError, setfilenameError] = useState(false);
  const [fileurlError, setfileurlError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setfilenameError(false);
    setfileurlError(false);

    if (filename == "") {
      setfilenameError(true);
    }
    if (urlname == "") {
      setfileurlError(true);
    }
    if (filename && urlname) {
      fetch("http://localhost:8000/folder", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ filename, urlname }),
      }).then((res) => {
        handleClose();
        res.json();
        fetch("http://localhost:8000/folder")
          .then((res) => res.json())
          .then((data) => setfolder(data));
      });
    }
  };

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Open dialog
      </Button>
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          File
        </DialogTitle>
        <DialogContent dividers>
          <form noValidate autoComplete="off" onSubmit={handleSubmit}>
            <Grid container spacing={1}>
              <Grid item xs={12} sm={12}>
                <TextField
                  onChange={(e) => setfilsName(e.target.value)}
                  label="File name"
                  variant="outlined"
                  color="secondary"
                  fullWidth
                  required
                  error={filenameError}
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  onChange={(e) => seturlname(e.target.value)}
                  label="Link Url"
                  variant="outlined"
                  color="secondary"
                  fullWidth
                  required
                  error={fileurlError}
                />
              </Grid>
            </Grid>
            <Button
              autoFocus
              type="submit"
              variant="contained"
              color="secondary"
            >
              Upload
            </Button>
          </form>
        </DialogContent>
        <DialogActions></DialogActions>
      </Dialog>
    </div>
  );
}

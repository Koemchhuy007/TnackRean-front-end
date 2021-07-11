import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import { NotListedLocation } from "@material-ui/icons";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function DeleteFolderDialoge({
  openDeleteDialog,
  setOpenDeleteDialog,
  folderObj,
  setfolder,
}) {
  const handleClose = () => {
    setOpenDeleteDialog(false);
  };
  const handleDelete = () => {
    console.log(folderObj);
    fetch("http://localhost:8000/folder/" + folderObj, {
      method: "DELETE",
    }).then(() => {
      fetch("http://localhost:8000/folder")
        .then((res) => res.json())
        .then((data) => setfolder(data));
      setOpenDeleteDialog(false);
    });
  };
  return (
    <div>
      <Dialog
        open={openDeleteDialog}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">
          {"Are you sure"}
          <NotListedLocation />
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Warning: You will not get back this file!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Disagree
          </Button>
          <Button onClick={handleDelete}>Agree</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

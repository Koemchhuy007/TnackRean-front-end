import React, { useState, useEffect } from "react";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import FolderDialoge from "./FolderDialoge";
import ViewFolderDialoge from "./ViewFolderDialoge";

const useStyles = makeStyles({
  addbutton: {
    float: "right",
    margin: "20px",
  },
  flex_container: {},
  btn_container: {
    display: "flex",
    justifyContent: "flex-end",
    width: "100%",
    height: "100%",
  },
});
export default function Folder() {
  const [open, setOpen] = React.useState(false);
  const classes = useStyles();

  const [folder, setfolder] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/folder")
      .then((res) => res.json())
      .then((data) => setfolder(data));
  }, []);
  const handleClickOpen = () => {
    setOpen(true);
  };

  return (
    <div>
      <div className={classes.btn_container}>
        <Button
          variant="contained"
          color="secondary"
          className={classes.addbutton}
          onClick={handleClickOpen}
        >
          UploadFile
        </Button>
      </div>

      <FolderDialoge open={open} setOpen={setOpen} setfolder={setfolder} />
      <div className={classes.flex_container}>
        <ViewFolderDialoge folder={folder} setfolder={setfolder} />
      </div>
    </div>
  );
}

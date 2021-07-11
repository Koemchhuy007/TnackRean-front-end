import React from "react";
import { Box, Link, makeStyles, Button } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import DeleteFolderDialoge from "./DeleteFolderDialoge";
import { useState } from "react";

const useStyles = makeStyles({
  flex_container: {
    display: "flex",
    width: "100%",
    justifyContent: "flex-end",
  },
  btn_delete: {
    background: "#FF0000",
    color: "#FFFFFF",
  },
  btn_container: {
    justifyContent: "flex-end",
  },
});
export default function ViewFolderDialoge({ folder, setfolder }) {
  const classes = useStyles();

  const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false);
  const [folderObj, setfolderObj] = useState({});

  const handleClick = (obj) => {
    setfolderObj(obj);
  };
  return (
    <div>
      {folder.map((data) => (
        <Box
          key={data.id}
          boxShadow={3}
          bgcolor="background.paper"
          m={1}
          p={1}
          style={{ borderRadius: "5px", flexGrow: "1" }}
        >
          <div style={{ margin: 10 }}>
            <h4>{data.filename}</h4>
            <Link href={data.urlname} color=" #50C878">
              {data.urlname}
            </Link>
          </div>
          <div className={classes.flex_container}>
            <Button
              variant="contained"
              className={classes.btn_delete}
              onClick={() => handleClick(data.id) || setOpenDeleteDialog(true)}
            >
              <DeleteIcon />
            </Button>
          </div>
        </Box>
      ))}
      <DeleteFolderDialoge
        openDeleteDialog={openDeleteDialog}
        setOpenDeleteDialog={setOpenDeleteDialog}
        folderObj={folderObj}
        setfolder={setfolder}
      />
    </div>
  );
}

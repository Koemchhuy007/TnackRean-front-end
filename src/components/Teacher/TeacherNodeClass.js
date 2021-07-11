import React, { useState } from "react";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import DeleteOutlined from "@material-ui/icons/DeleteOutlined";
import { makeStyles } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import { yellow, green, pink, blue } from "@material-ui/core/colors";
import EditIcon from "@material-ui/icons/Edit";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import EditDialog from "./EditDialog";
import DeleteDialog from "./DeleteDialog";
import { useHistory } from "react-router";
var randomArrayColor = [yellow[700], green[500], pink[500], blue[500]];
const random_color = (items) => {
  return items[Math.floor(Math.random() * items.length)];
};
const useStyles = makeStyles({
  avatar: {
    backgroundColor: () => {
      var color = random_color(randomArrayColor).toString();
      return color;
    },
  },
});
const options = [
  { id: 1, text: "Edit", icon: <EditIcon /> },
  { id: 2, text: "Delete", icon: <DeleteOutlined /> },
];
const ITEM_HEIGHT = 48;
export default function TeacherNodeClass({ node, setNodes }) {
  const history = useHistory()
  const classes = useStyles(node);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const [nodeObj, setNodeObj] = useState({});

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const [openEditDialog, setOpenEditDialog] = React.useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false);
  const handleClickOpen = (option, obj) => {
    if (option == "Edit") {
      setOpenEditDialog(true);
      setAnchorEl(null);
      setNodeObj(obj);
    } else {
      setOpenDeleteDialog(true);
      setAnchorEl(null);
      setNodeObj(obj);
    }
  };
  console.log(node);
  return (
    <div>
      <Card elevation={1}>
        <CardHeader
          avatar={
            <Avatar className={classes.avatar}>
              {node.subject[0].toUpperCase()}
            </Avatar>
          }
          action={
            <IconButton
              aria-label="more"
              aria-controls="long-menu"
              aria-haspopup="true"
              onClick={handleClick}
            >
              <MoreVertIcon />
            </IconButton>
          }
          title={node.classname}
          subheader={`${node.subject} | ${node.duration}`}
        />
        <CardContent onClick={() => history.push("/class-doc/folder/"+ node.id)}>
          <Typography variant="body2" color="textSecondary">
            {node.teacherInform}
          </Typography>
        </CardContent>
      </Card>
      <Menu
        id="long-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: "20ch",
          },
        }}
      >
        {options.map((option) => (
          <MenuItem
            key={option.id}
            // selected={option === "Pyxis"}
            onClick={() => handleClickOpen(option.text, node)}
          >
            <IconButton>{option.icon}</IconButton>
            {option.text}
          </MenuItem>
        ))}
      </Menu>
      <EditDialog
        open={openEditDialog}
        setOpen={setOpenEditDialog}
        nodeObj={nodeObj}
        setNodes={setNodes}
      />
      <DeleteDialog
        open={openDeleteDialog}
        setOpen={setOpenDeleteDialog}
        nodeObj={nodeObj}
        setNodes={setNodes}
      />
    </div>
  );
}

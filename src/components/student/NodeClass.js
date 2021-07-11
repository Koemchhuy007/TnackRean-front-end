import React, { useState } from "react";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import { yellow, green, pink, blue } from "@material-ui/core/colors";
import Menu from "@material-ui/core/Menu";
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
const ITEM_HEIGHT = 48;
export default function NodeClass({ node, setNodes }) {
  const history = useHistory()
  const classes = useStyles(node);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const [nodeObj, setNodeObj] = useState({});
  const [opens, setOpen] = React.useState(false);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
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
            ></IconButton>
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
      ></Menu>
    </div>
  );
}

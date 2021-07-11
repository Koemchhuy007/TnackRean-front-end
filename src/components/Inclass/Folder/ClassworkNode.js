import React, { useState } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { CardHeader, Divider } from "@material-ui/core";
import AddBoxIcon from "@material-ui/icons/AddBox";
import AddAnswerDialog from "./AddAnswerDialog";
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  details: {
    display: "flex",
    flexDirection: "column",
  },
  content: {
    flex: "1 0 auto",
  },
  cover: {
    width: 151,
  },
  controls: {
    display: "flex",
    alignItems: "center",
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  playIcon: {
    height: 38,
    width: 38,
  },
}));
export default function ClassworkNode({ classwork, setclassWorkData }) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  return (
    <>
      <Card className={classes.root}>
      <CardHeader 
          action={
            <IconButton aria-label="settings" onClick={() => setOpen(true)} >
              <AddBoxIcon />
            </IconButton>
          }
        />
        <div className={classes.details}>
          <CardContent className={classes.content}>
            <Typography component="h5" variant="h5">
              {classwork.workTitle}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              Link Document: {classwork.docLink}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              Dateline: {classwork.dateLine}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              Discription: {classwork.discription}
            </Typography>
          </CardContent>
        </div>
       
      </Card>
      <AddAnswerDialog open={open} setOpen={setOpen} classwork={classwork}  setclassWorkData={setclassWorkData}/>
    </>
  );
}

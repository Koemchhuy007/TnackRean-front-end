import { Button, Grid } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import AddClasswork from "./AddClasswork";
import ClassworkNode from "./ClassworkNode";

export default function ClassWork() {
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const [classworkData, setclassWorkData] = useState([]);
  useEffect(() => {
    fetch("http://localhost:8000/classwork")
      .then((res) => res.json())
      .then((data) => setclassWorkData(data));
  }, []);
  return (
    <div>
      <Button
        color="secondary"
        variant="contained"
        style={{ float: "right" }}
        onClick={handleClickOpen}
      >
        Add Class Work
      </Button>
    <Grid container spacing={2}>
    {classworkData.map((classwork) => (
        <Grid item xs={12} sm={3} key={classwork.id}>
        <ClassworkNode classwork={classwork} setclassWorkData={setclassWorkData}   />
        </Grid>
      ))}
    </Grid>
      <AddClasswork open={open} setOpen={setOpen} setclassWorkData={setclassWorkData}  />
    </div>
  );
}

import React, { useState } from "react";

import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Input from "@material-ui/core/Input";

import PropTypes from "prop-types";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  itemcontent: {
    textAlign: "left",
    //TODO Add header de couleur + activité = couleur
  },
  titleInput: {
    ...theme.typography.h6,
  },
}));

export default function RecordContent(props) {
  const classes = useStyles();
  const [title, setTitle] = useState(props.title);
  const [description, setDescription] = useState(props.description);

  const editable = true; //TODO Manage public/private view

  function changeTitle(e) {
    setTitle(e.target.value);
    // postRecordContentToBackend.current(
    //   props.timelineID,
    //   props.recordID,
    //   e.target.value,
    //   description
    // );
  }

  function changeDescription(e) {
    setDescription(e.target.value);
  }
  if (editable) {
    //TODO Changer icone on Hover
    //TODO Add pop edition mode
    return (
      <Paper
        elevation={3}
        className={`${classes.paper} ${classes.itemcontent}`}
      >
        <Input
          className={classes.titleInput}
          fullWidth
          disableUnderline
          //readOnly To switch mode TODO
          value={title}
          onChange={changeTitle}
          placeholder="Titre"
        />
        <Input
          fullWidth
          value={description}
          onChange={changeDescription}
          placeholder="Description"
          multiline
          rows={3}
          rowsMax={5}
        />
      </Paper>
    );
  } else {
    return (
      <Paper
        elevation={3}
        className={`${classes.paper} ${classes.itemcontent}`}
      >
        <Typography variant="h6" component="h1">
          {props.title}
        </Typography>
        <Typography>{props.description}</Typography>
      </Paper>
    );
  }
}

RecordContent.propTypes = {
  timelineID: PropTypes.number.isRequired,
  recordID: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

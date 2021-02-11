import React, { useCallback } from "react";

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
  const editable = true; //TODO Manage public/private view
  const callbackRefFocus = useCallback((inputElement) => {
    //Note add condition on ArrowRef to prevent losing focus when arrowRef is initialized init
    //Damned crappy arrowRef mechanism
    if (inputElement) {
      inputElement.focus();
    }
  }, []);
  function changeTitle(e) {
    props.setTitle(e.target.value);
    props.updateContent(e.target.value, props.description);
  }

  function changeDescription(e) {
    props.setDescription(e.target.value);
    props.updateContent(props.title, e.target.value);
  }
  if (editable) {
    //TODO Changer icone on Hover
    return (
      <Paper variant="outlined" className={classes.itemcontent}>
        <Input
          inputRef={props.isFocussed() && callbackRefFocus}
          className={classes.titleInput}
          fullWidth
          //readOnly To switch mode TODO
          value={props.title}
          onChange={changeTitle}
          placeholder="Mon activité"
        />
        <Input
          fullWidth
          value={props.description}
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
      <Paper variant="outlined" className={classes.itemcontent}>
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
  setTitle: PropTypes.func.isRequired,
  description: PropTypes.string.isRequired,
  setDescription: PropTypes.func.isRequired,
  updateContent: PropTypes.func.isRequired,
  isFocussed: PropTypes.func.isRequired,
};

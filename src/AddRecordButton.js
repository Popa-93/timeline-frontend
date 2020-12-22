import React from "react";
import { Tooltip, IconButton } from "@material-ui/core";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";

export default function AddRecordButton(props) {
  return (
    <Tooltip title="Ajouter un enregistrement">
      <IconButton
        onClick={props.onClick}
        aria-label="Ajouter un enregistrement"
      >
        <AddCircleOutlineIcon fontSize="large" />
      </IconButton>
    </Tooltip>
  );
}

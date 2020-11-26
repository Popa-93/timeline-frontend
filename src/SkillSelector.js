import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Checkbox from "@material-ui/core/Checkbox";
import Avatar from "@material-ui/core/Avatar";

import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";

const useStyles = makeStyles((theme) => ({
  skillselector: {
    position: "relative",
    border: "1px solid black",
    flexGrow: "0" /* do not grow   - initial value: 0 */,
    flexShrink: "0" /* do not shrink - initial value: 1 */,
    //flexBasis: "30rem", /* width/height  - initial value: auto */
    backgroundColor: theme.palette.background.paper,
  },
  fab: {
    width: "2rem",
    height: "Auto",
    position: "absolute",
    right: 0,
    bottom: "-1rem",
  },
}));

export default function SkillSelector(props) {
  const classes = useStyles();

  const handleToggle = (activityId) => () => {
    const currentIndex = props.filter.indexOf(activityId);
    const newFilter = [...props.filter];

    if (currentIndex === -1) {
      newFilter.push(activityId);
    } else {
      newFilter.splice(currentIndex, 1);
    }
    props.setFilter(newFilter);
  };
  /*
    updateActivity
        fetch(`${process.env.REACT_APP_BASE_URL}/activities/ID`,
        method: 'PUT'
    delete 
        fetch(`${process.env.REACT_APP_BASE_URL}/activities/ID`,
        DELETE
    */

  const newActivity = (e) => {
    e.preventDefault();
    return; //TODO implement add via REST
    fetch(`${process.env.REACT_APP_BASE_URL}/activities`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        //  "name" : name
      }),
    })
      .then((response) => response.json())
      .then((response) => console.log("response:", response));

    console.log("New activity created");
  };

  return (
    <List dense className={classes.skillselector}>
      {props.activities.map((activity) => {
        const labelId = `checkbox-list-secondary-label-${activity.name}`;
        return (
          <ListItem key={activity.id} button>
            <ListItemAvatar>
              <Avatar
                alt={activity.name}
                src={`${process.env.PUBLIC_URL}/images/skills/${activity.name}.png`}
              />
            </ListItemAvatar>
            <ListItemText id={labelId} primary={activity.name} />
            <ListItemSecondaryAction>
              <Checkbox
                edge="end"
                onChange={handleToggle(activity.id)}
                checked={props.filter && props.filter.includes(activity.id)}
                inputProps={{ "aria-labelledby": labelId }}
              />
            </ListItemSecondaryAction>
          </ListItem>
        );
      })}
      <Fab color="primary" aria-label="add" className={classes.fab}>
        <AddIcon onClick={newActivity} />
      </Fab>
    </List>
  );
}

import React, { Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Tooltip from "@material-ui/core/Tooltip";
import { ReactComponent as FilterIcon } from "./filter.svg";
import SvgIcon from "@material-ui/core/SvgIcon";

import PropTypes from "prop-types";

import CrossOverIcon from "./crossOverIcon.svg";

const useStyles = makeStyles((theme) => ({
  skillselector: {
    position: "relative",
    border: "1px solid black",
    flexGrow: "0" /* do not grow   - initial value: 0 */,
    flexShrink: "0" /* do not shrink - initial value: 1 */,
    minWidth: "60px",
    minHeight: "400px",
  },
  activitySelected: {
    filter: "none",
    margin: "auto",
  },
  activityNotSelected: {
    position: "relative",
    filter: "grayscale(100%)",
    margin: "auto",
    "&::after": {
      content: "''",
      position: "absolute",
      width: "100%",
      height: "100%",
      background: `url(${CrossOverIcon})`,
      backgroundSize: "cover",
    },
  },
  listItem: {
    justifyContent: "center",
  },
}));

export default function SkillSelector(props) {
  console.log(props);

  const classes = useStyles();
  //const ident = useContext(IdentContext); //TODO Use for add or remove

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

  return (
    <Fragment>
      <List className={classes.skillselector}>
        <Tooltip
          title="Filtrer par activité" //TODO Add i18n
          placement="right"
          TransitionProps={{ timeout: 600 }}
        >
          <SvgIcon style={{ padding: "0", margin: "0" }}>
            <FilterIcon />
          </SvgIcon>
        </Tooltip>

        {props.activities &&
          props.activities.map((activity) => {
            return (
              <ListItem
                key={activity.id}
                className={classes.listItem}
                onClick={handleToggle(activity.id)}
              >
                <ListItemAvatar>
                  <Tooltip
                    title={activity.name}
                    placement="right"
                    TransitionProps={{ timeout: 600 }}
                    enterDelay={500}
                  >
                    <Avatar
                      variant="rounded"
                      alt={activity.name}
                      src={`${process.env.PUBLIC_URL}/images/skills/python.png`}
                      // src={`${process.env.PUBLIC_URL}/images/skills/${activity.name}.png`} //TODO readd it
                      className={
                        props.filter && props.filter.includes(activity.id)
                          ? classes.activitySelected
                          : classes.activityNotSelected
                      }
                    ></Avatar>
                  </Tooltip>
                </ListItemAvatar>
              </ListItem>
            );
          })}
      </List>
    </Fragment>
  );
}

SkillSelector.propTypes = {
  activities: PropTypes.arrayOf(PropTypes.number).isRequired,
  filter: PropTypes.arrayOf(PropTypes.number).isRequired,
  setFilter: PropTypes.func.isRequired,
};

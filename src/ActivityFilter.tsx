import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Tooltip from "@material-ui/core/Tooltip";
import { ReactComponent as FilterIcon } from "./filter.svg";
import SvgIcon from "@material-ui/core/SvgIcon";
import Box from "@material-ui/core/Box";

import PropTypes from "prop-types";

import CrossOverIcon from "./crossOverIcon.svg";

const useStyles = makeStyles((theme) => ({
  activityFilter: {
    position: "relative",
    //border: "1px solid black",
    flexGrow: 0 /* do not grow   - initial value: 0 */,
    flexShrink: 0 /* do not shrink - initial value: 1 */,
    minWidth: "60px",
  },
  activity: {
    "&:hover": {
      cursor: "pointer",
    },
  },
  activitySelected: {
    filter: "none",
    margin: "auto",
  },
  activityNotSelected: {
    position: "relative",
    filter: "grayscale(100%)",
    margin: "auto",
    "&::before": {
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

export default function ActivityFilter(props) {
  const classes = useStyles();
  const { filter, setFilter, activities } = props;

  const handleToggle = (activityId) => () => {
    const currentIndex = filter.indexOf(activityId);
    const newFilter = [...filter];

    if (currentIndex === -1) {
      newFilter.push(activityId);
    } else {
      newFilter.splice(currentIndex, 1);
    }
    setFilter(newFilter);
  };

  return (
    <Box>
      {activities && activities.length > 0 && (
        <List className={classes.activityFilter}>
          <Tooltip
            title="Filtrer par activité" //TODO Add i18n
            placement="right"
            TransitionProps={{ timeout: 600 }}
          >
            <SvgIcon
              style={{
                padding: "0",
                margin: "2",
                position: "relative",
                bottom: "-16px",
              }}
            >
              <FilterIcon />
            </SvgIcon>
          </Tooltip>
          {activities
            .slice()
            .reverse()
            .map((activity) => {
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
                        variant="square"
                        alt={activity.name}
                        src={activity.avatar}
                        className={`${classes.activity} ${
                          filter && filter.includes(activity.id)
                            ? classes.activitySelected
                            : classes.activityNotSelected
                        }`}
                      ></Avatar>
                    </Tooltip>
                  </ListItemAvatar>
                </ListItem>
              );
            })}
        </List>
      )}
    </Box>
  );
}

ActivityFilter.propTypes = {
  activities: PropTypes.arrayOf(PropTypes.object).isRequired,
  filter: PropTypes.arrayOf(PropTypes.number).isRequired,
  setFilter: PropTypes.func.isRequired,
};

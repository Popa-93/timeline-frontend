import React from "react";
import TimelineItem from "@material-ui/lab/TimelineItem";
import TimelineSeparator from "@material-ui/lab/TimelineSeparator";
import TimelineConnector from "@material-ui/lab/TimelineConnector";
import TimelineContent from "@material-ui/lab/TimelineContent";
import TimelineOppositeContent from "@material-ui/lab/TimelineOppositeContent";
import TimelineDot from "@material-ui/lab/TimelineDot";
import FastfoodIcon from "@material-ui/icons/Fastfood"; //TODO replace

import PropTypes from "prop-types";

import PrettyDateDisplay from "./PrettyDateDisplay";
import RecordContent from "./RecordContent";

export default function RecordItem(props) {
  return (
    <TimelineItem>
      <TimelineOppositeContent>
        <PrettyDateDisplay date={props.date} />
        {/* //TODO Sprite date */}
      </TimelineOppositeContent>
      <TimelineSeparator>
        <TimelineDot>
          {/* variant="outlined" TODO decide*/}
          <FastfoodIcon />
          {/* <Typography>{record.activity}</Typography> */}
        </TimelineDot>
        <TimelineConnector />
      </TimelineSeparator>
      <TimelineContent>
        <RecordContent
          timelineID={props.timelineID}
          recordID={props.id}
          title={props.title}
          description={props.description}
        />
      </TimelineContent>
    </TimelineItem>
  );
}

RecordItem.propTypes = {
  timelineID: PropTypes.number.isRequired,
  recordID: PropTypes.number.isRequired,
  date: PropTypes.string.isRequired, //TODO Change type to JS Date
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

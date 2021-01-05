import React, { useState, useRef, useEffect } from "react";

import TimelineItem from "@material-ui/lab/TimelineItem";
import TimelineSeparator from "@material-ui/lab/TimelineSeparator";
import TimelineConnector from "@material-ui/lab/TimelineConnector";
import TimelineContent from "@material-ui/lab/TimelineContent";
import TimelineOppositeContent from "@material-ui/lab/TimelineOppositeContent";
import TimelineDot from "@material-ui/lab/TimelineDot";
import FastfoodIcon from "@material-ui/icons/Fastfood"; //TODO replace
import PropTypes from "prop-types";

import RecordContent from "./RecordContent";
import RecordDate from "./RecordDate";

import { debounce } from "lodash";

export default function RecordItem(props) {
  const [date, setDate] = useState(props.date);
  const [title, setTitle] = useState(props.title);
  const [description, setDescription] = useState(props.description);
  const [activity, setActivity] = useState(props.activity);

  //Debounce API call after onChange
  const postRecordToBackend = useRef(null);
  useEffect(() => {
    const postRecord = (
      timelineID,
      recordID,
      date,
      title,
      description,
      activity
    ) => {
      const twoDigitFormater = new Intl.NumberFormat("fr-FR", {
        minimumIntegerDigits: 2,
      });
      const djangoFormatedDate = `${date.getFullYear()}-${twoDigitFormater.format(
        date.getMonth() + 1
      )}-${twoDigitFormater.format(date.getDate())}`;

      console.log("djangoFormatedDate =", djangoFormatedDate);
      fetch(
        `${process.env.REACT_APP_BACKEND_BASE_URL}/api/records/${recordID}/`,
        {
          method: "PATCH",
          credentials: "include",
          headers: {
            accept: "*/*",
            "content-type": "application/json",
          },
          body: JSON.stringify({
            timelineID: timelineID,
            date: djangoFormatedDate,
            title: title,
            description: description,
            activity: activity,
          }),
        }
      ).then((response) => {
        console.log("**TRY TO** PATCH RECORD ON BACKEND"); //TODO Remove
        if (!response.ok) {
          // TODO Cleanup this crap and manage asynch log cleanly
          console.log("**PATCH RECORD ** KO");
          console.log(
            "Response status ",
            response.status + " \n text " + response.statusText
          );
          response.text().then(function (text) {
            console.log("TXT =", text);
          });

          throw new Error(
            `Fetch ${process.env.REACT_APP_BACKEND_BASE_URL}/api/records/ return status ` +
              response.status
          );
        }
        console.log("** PATCH RECORD ** OK");
      });
    };
    postRecordToBackend.current = debounce(postRecord, 500);
    return postRecordToBackend.current.cancel();
  }, []);

  const updateContent = (titleToSet, descriptionToSet) => {
    setTitle(titleToSet);
    setDescription(descriptionToSet);
    postRecordToBackend.current(
      props.timelineID,
      props.recordID,
      date,
      titleToSet,
      descriptionToSet,
      activity
    );
  };

  const updateDate = (dateToSet) => {
    console.log("dateToSet =", dateToSet);
    setDate(dateToSet);
    postRecordToBackend.current(
      props.timelineID,
      props.recordID,
      dateToSet,
      title,
      description,
      activity
    );
  };

  // function changeTitle(e) {

  //   setTitle(e.target.value);
  //   postTitleToBackend.current(timelineID, e.target.value);
  // }
  return (
    <TimelineItem>
      <TimelineOppositeContent>
        <RecordDate date={date} updateDate={updateDate}></RecordDate>
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
          recordID={props.recordID}
          title={title}
          setTitle={setTitle}
          description={description}
          setDescription={setDescription}
          updateContent={updateContent}
        />
      </TimelineContent>
    </TimelineItem>
  );
}

RecordItem.propTypes = {
  timelineID: PropTypes.number.isRequired,
  recordID: PropTypes.number.isRequired,
  date: PropTypes.instanceOf(Date),
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

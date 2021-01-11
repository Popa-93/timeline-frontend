import React, { useContext, useState, useEffect } from "react";

import Timeline from "@material-ui/lab/Timeline";

import PropTypes from "prop-types";

import { IdentContext } from "./App";
import RecordItem from "./RecordItem";

function RecordList(props) {
  const { ident } = useContext(IdentContext);
  const [records, setRecords] = useState([]);

  //const [isLoading, setIsLoading] = useState(false); //TODO add loading spinner

  //TODO Create a custom hook to handle fetch
  // -> https://www.robinwieruch.de/react-hooks-fetch-data

  useEffect(() => {
    //TODO setIsLoading(true);
    if (!ident) {
      setRecords(null);
    } else {
      fetch(`${process.env.REACT_APP_BACKEND_BASE_URL}/api/records/`, {
        credentials: "include",
      })
        .then((res) => res.json())
        .then(
          (res) => {
            setRecords(res.results);
            //TODO setIsLoading(false);
          },
          (error) => {
            setRecords(null);
            throw new Error(
              `Error during records initialization fetch : ${error}`
            );
            // TODO Display image in place of component using missing datas
          }
        );
    }
    //TODO setIsLoading(false);
  }, [ident]);

  return (
    //{isLoading ? <p>Loading</p> : <p>Not loading</p>}
    //TODO Manage loading icon EVEYWHERE

    <Timeline
      align="alternate"
      style={{ backgroundColor: "green" }} //TODO Remove
    >
      {records &&
        records
          .filter((record) => props.filter.includes(record.activityID))
          .map((record) => (
            <RecordItem
              key={record.id}
              timelineID={record.timelineID}
              recordID={record.id}
              date={new Date(record.date)}
              title={record.title}
              description={record.description}
              activityID={record.ActivityID}
            />
          ))}
    </Timeline>
  );
}

RecordList.propTypes = {
  filter: PropTypes.arrayOf(PropTypes.number).isRequired,
};

export default RecordList;

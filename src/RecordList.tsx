import React, { useContext, useState, useEffect, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import Timeline from "@material-ui/lab/Timeline";
import Box from "@material-ui/core/Box";
import Tooltip from "@material-ui/core/Tooltip";
import PropTypes from "prop-types";
import parse from "date-fns/parse";
import compareAsc from "date-fns/compareAsc";

import { IdentContext } from "./App";
import RecordItem from "./RecordItem";
import jwtRefreshingFetch from "./jwtRefreshingFetch";
import useMediaQuery from "@material-ui/core/useMediaQuery";

const useStyles = makeStyles((theme) => ({
  box: {
    position: "relative",
    display: "flex",
  },
  fab: {
    flexShrink: 0,
    position: "sticky",
    top: 0,
    left: 0,
  },
  recordlist: {
    "@media (orientation: landscape)": {
      backgroudColor: "red",
    },
    "@media (orientation: portrait)": {
      backgroudColor: "blue",
    },
    marginLeft: theme.spacing(1),
  },
}));

function RecordList(props) {
  const { ident } = useContext(IdentContext);
  const [records, setRecords] = useState([]);
  const classes = useStyles();
  const focusOnRecordID = useRef(0); //0 = Falsy + not an index

  //const [isLoading, setIsLoading] = useState(false); //TODO add loading spinner

  //TODO Create a custom hook to handle fetch
  // -> https://www.robinwieruch.de/react-hooks-fetch-data

  const convertRecordDate = (record) => {
    record.date = parse(record.date, "yyyy-MM-dd", new Date());
    return record;
  };

  const addRecord = () => {
    //Create an empty newRecord in DB (needed to enable inline editeding in lower components)
    jwtRefreshingFetch(
      `${process.env.REACT_APP_BACKEND_BASE_URL}/api/records/`,
      {
        method: "POST",
        credentials: "include",
        headers: {
          accept: "*/*",
          "content-type": "application/json",
        },
        body: JSON.stringify({
          timelineID: props.timelineID,
          title: "",
          description: "",
          //activityID: activity,
        }),
      }
    ).then((response) => {
      if (!response.ok) {
        // TODO Cleanup this crap and manage asynch log cleanly
        //response.text().then((text) => console.log(text));
        response.json().then((respBody) => {
          throw new Error(
            `POST ${process.env.REACT_APP_BACKEND_BASE_URL}/api/records/ return status= ` +
              response.status +
              " statusText= " +
              response.statusText +
              " respBody" +
              respBody
          );
        });
      } else {
        //RecordList.tsx:65 {"id":5,"title":"","date":"2021-01-31","description":"","activityID":null,"timelineID":1}
        response.json().then((respBody) => {
          focusOnRecordID.current = respBody.id;
          setRecords([convertRecordDate(respBody), ...records]);
        });
      }
    });
  };

  //setRecords( ,...records)
  // key="newRecord"
  // timelineID={record.timelineID}
  // recordID={record.id}
  // date={new Date(record.date)}
  // title={record.title}
  // description={record.description}
  // activityID={record.activityID}

  useEffect(() => {
    //TODO setIsLoading(true);
    if (!ident) {
      setRecords(null);
    } else {
      jwtRefreshingFetch(
        `${process.env.REACT_APP_BACKEND_BASE_URL}/api/records/`,
        {
          credentials: "include",
        }
      )
        .then((res) => res.json())
        .then(
          (res) => {
            setRecords(res.results.map(convertRecordDate));
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
    <Box className={classes.box}>
      <Tooltip
        title="Ajouter un enregistrement" //TODO Add i18n
        placement="right"
        TransitionProps={{ timeout: 600 }}
      >
        <Fab
          color="primary"
          aria-label="Add record"
          size="small"
          className={classes.fab}
          onClick={() => addRecord()}
        >
          <AddIcon />
        </Fab>
      </Tooltip>
      <Timeline
        align={useMediaQuery("(orientation:landscape)") ? "alternate" : "left"}
      >
        {records &&
          records
            .slice()
            .sort((a, b) => compareAsc(b.date, a.date))

            // compareAsc(
            //   parse(b.date, "yyyy-MM-dd", new Date()),
            //   parse(a.date, "yyyy-MM-dd", new Date())
            // )

            // Below would be nice but I need to apply filter in RecordItem as the activity can be updated at this level
            // .filter((record) => props.filter.includes(record.activityID))
            .map((record) => (
              <RecordItem
                key={record.id}
                record={record}
                activities={props.activities}
                addActivity={props.addActivity}
                updateActivity={props.updateActivity}
                filter={props.filter}
                focusOnRecordID={focusOnRecordID.current}
                setFocusOnRecord={(id) => (focusOnRecordID.current = id)}
                updateRecord={(updatedRecord) => {
                  setRecords(
                    records.map((record) =>
                      updatedRecord.id === record.id ? updatedRecord : record
                    )
                  );
                }}
              />
            ))}
      </Timeline>
    </Box>
  );
}

RecordList.propTypes = {
  timelineID: PropTypes.number.isRequired,
  activities: PropTypes.arrayOf(PropTypes.object).isRequired,
  addActivity: PropTypes.func.isRequired,
  updateActivity: PropTypes.func.isRequired,
  filter: PropTypes.arrayOf(PropTypes.number).isRequired,
};

export default RecordList;

import React from 'react'
import { makeStyles } from '@material-ui/core/styles';

import { VerticalTimeline, VerticalTimelineElement }  from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles((theme) => ({
  timeline: {
    border: "1px solid black",
    backgroundColor: theme.palette.background.paper,
  },
}));

function Timeline (props) {
  const classes = useStyles();
  return (
    <VerticalTimeline className= {classes.timeline}>
      {props.records
        .filter((record) => props.filter.includes(record.activitiesName))
        .map((record) => {
        return (
        <VerticalTimelineElement
          key = {record.title} //TODO change for BDD UID
          className="vertical-timeline-element--school"
          date={record.date}
          iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
          //TODO use common avatar in view and filter
          icon={<Avatar
            src={`${process.env.PUBLIC_URL}/images/skills/${record.activitiesName}.png`}
            alt={record.activitiesName}
            />}
          >
            <h3 className="vertical-timeline-element-title">{record.title}</h3>
            <h4 className="vertical-timeline-element-subtitle">{record.subtitle}</h4>
            <p>{record.desc} </p>
        </VerticalTimelineElement>);
    })}

    </VerticalTimeline>
);}

export default Timeline;

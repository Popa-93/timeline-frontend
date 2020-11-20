import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Checkbox from '@material-ui/core/Checkbox';
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles((theme) => ({
    skillselector: {
        border: "1px solid black",
        flexGrow: "0",     /* do not grow   - initial value: 0 */
        flexShrink: "0",   /* do not shrink - initial value: 1 */
        //flexBasis: "30rem", /* width/height  - initial value: auto */
        backgroundColor: theme.palette.background.paper,
        }
  }));

export default function SkillSelector(props) {
    const classes = useStyles();

    
    const handleToggle = (value) => () => {
        const currentIndex = props.filter.indexOf(value);
        const newFilter = [...props.filter];

        if (currentIndex === -1)
            {
            newFilter.push(value);
            } else {
            newFilter.splice(currentIndex, 1);
            }
        props.setFilter(newFilter);
        };

    return (
        <List dense className={classes.skillselector}>
            {props.activitiesName.map((value) => {
                const labelId = `checkbox-list-secondary-label-${value}`;
                return (
                    <ListItem key={value} button>
                        <ListItemAvatar>
                            <Avatar
                                alt={value}
                                src={`${process.env.PUBLIC_URL}/images/skills/${value}.png`}
                            />
                        </ListItemAvatar>
                        <ListItemText id={labelId} primary={value} />
                        <ListItemSecondaryAction>
                            <Checkbox
                                edge="end"
                                onChange={handleToggle(value)}
                                checked={props.filter.includes(value)}
                                inputProps={{ 'aria-labelledby': labelId }}
                            />
                        </ListItemSecondaryAction>
                    </ListItem>
                    );
                })}
        </List>
        );
    }

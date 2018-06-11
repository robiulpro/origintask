import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';

import Dialog from '@material-ui/core/Dialog';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';

import Paper from '@material-ui/core/Paper';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';

import DateFnsUtils from 'material-ui-pickers/utils/date-fns-utils';
import {format} from 'date-fns/esm';
import MuiPickersUtilsProvider from 'material-ui-pickers/utils/MuiPickersUtilsProvider';
import DatePicker from 'material-ui-pickers/DatePicker';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';

import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import ScheduleIcon from '@material-ui/icons/Schedule';
import AlarmOffIcon from '@material-ui/icons/AlarmOff';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ImageIcon from '@material-ui/icons/Image';
import WorkIcon from '@material-ui/icons/Work';
import BeachAccessIcon from '@material-ui/icons/BeachAccess';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

const styles = theme => ({
  root: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
    marginTop: theme.spacing.unit * 3,
  }),
  button: {
    position: 'absolute',
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 2,
  },
  appBar: {
    position: 'relative',
  },
  flex: {
    flex: 1,
  },
  margin: {
    margin: theme.spacing.unit,
  },
  card: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    marginBottom: 16,
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  chip: {
    margin: theme.spacing.unit,
  },
});

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class TaskViewModal extends React.Component {

  render() {
  const { classes, task } = this.props; 
  return (
      <Dialog
          fullScreen
          open={this.props.viewClicked}
          onClose={this.props.closeViewModal}
          TransitionComponent={Transition}
        >
          <AppBar className={classes.appBar}>
            <Toolbar>
              <IconButton color="inherit" onClick={this.props.closeViewModal} aria-label="Close">
                <CloseIcon />
              </IconButton>
              <Typography variant="title" color="inherit" className={classes.flex}>
                {task.title}
              </Typography>
            </Toolbar>
          </AppBar>

          <Card className={classes.card}>
        <CardContent>
          <Typography className={classes.title} color="textPrimary">
            {task.title}
          </Typography>
          <Typography component="p" color="textSecondary">
            {task.description}
          </Typography>

          <List>
        <ListItem>
          <Avatar>
            <AccountCircleIcon />
          </Avatar>
          <ListItemText primary="Created By: admin" secondary="Jan 9, 2014" />
        </ListItem>
        {task.assigned_to !== null &&(
        <ListItem>
          <Avatar>
            <WorkIcon />
          </Avatar>
          <ListItemText primary="Assigned To: rohanpro" secondary="Jan 7, 2014" />
        </ListItem>
        )}
        {task.status == 'COMPLETED' &&(
        <ListItem>
          <Avatar>
            <CheckCircleIcon />
          </Avatar>
          <ListItemText primary="Mark As Completed" secondary="July 20, 2014" />
        </ListItem>
        )}
      </List>

            <br />
        {!task.is_expired && task.target_date !== null && task.status !== 'COMPLETED' &&(
        <Chip
            avatar={<Avatar><ScheduleIcon /></Avatar>}
            label={task.expired_until}
            className={classes.chip}
        />
        )}

        {task.is_expired && task.status !== 'COMPLETED' &&(
        <Chip
            avatar={<Avatar><AlarmOffIcon /></Avatar>}
            label='Missed target date!'
            className={classes.chip}
        />
        )}

        {task.status == 'COMPLETED' &&(
        <Chip
            avatar={<Avatar><CheckCircleIcon /></Avatar>}
            label='Completed'
            className={classes.chip}
        />
        )}

        </CardContent>
        <CardActions>
          <Button onClick={this.props.closeViewModal} size="small">Close</Button>
        </CardActions>
      </Card>

        </Dialog>
  );
  }
}

TaskViewModal.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TaskViewModal);

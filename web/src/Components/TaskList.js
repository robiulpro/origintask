import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import FaceIcon from '@material-ui/icons/Face';

import EditTaskModal from './EditTaskModal';
import Filters from './Filters';

const styles = theme => ({
  root: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
    marginTop: theme.spacing.unit * 3,
  }),
  chip: {
    margin: theme.spacing.unit,
  },
});

class TaskList extends React.Component {
  state = {
    checked: [0],
    isEditOpen: false,
    currentTask: {}
  };

  handleToggle = value => () => {
    const { checked } = this.state;
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    this.setState({
      checked: newChecked,
    });
  };

  openEditModal = task => () => {
    console.log('Opening task edit module for > ',task);
    this.setState({
      isEditOpen: true,
      currentTask: task
    });
  };

 

  closeEditModal = value => () => {
    this.setState({
      isEditOpen: false,
      currentTask: {}
    });
  };

  render() {
    const { classes, tasks } = this.props;
    console.log(tasks);
    let auth = true;
    return (
      <div>        
        <Filters />
      <Paper className={classes.root} elevation={4}>
        <List dense={true}>
          {tasks.map(task => (
            <ListItem
              key={task.id}
              role={undefined}
              dense
              button
              /* onClick={this.handleToggle(task.id)} */
              className={classes.listItem}
            >
              <Checkbox
                checked={this.state.checked.indexOf(task.id) !== -1}
                onClick={this.handleToggle(task.id)}
                tabIndex={-1}
                disableRipple
              />
              <ListItemText primary={task.title} secondary={task.description} />
             {/*  <Chip
        avatar={<Avatar>MB</Avatar>}
        label="Clickable Chip"
        className={classes.chip}
      /> */}
              <ListItemSecondaryAction>
                <IconButton onClick={this.openEditModal(task)} aria-label="Edit">
                  <EditIcon />
                </IconButton>
                <IconButton onClick={() => {this.props.deleteTask(task.id)}} aria-label="Delete">
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
        <EditTaskModal
          isEditOpen={this.state.isEditOpen}
          currentTask={this.state.currentTask}
          displayToast={this.props.displayToast}
          closeEditModal={this.closeEditModal()}
        />
      </Paper>
      </div>
    );
  }
}

TaskList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TaskList);

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

import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';

import EditTaskModal from './EditTaskModal';


import DeleteConfirmModal from './DeleteConfirmModal';
import CompleteConfirmModal from './CompleteConfirmModal';

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

  constructor(props){
    super(props);
    this.state = {
      checked: [0],
      isEditOpen: false,
      currentTask: {},
      deleteClicked: false,
      deleteId: null,
      completedClicked: false,
      completedId: null
    };
    this.handleHideCompleted= this.handleHideCompleted.bind(this);
  }

  handleHideCompleted = event => {
    this.props.switcHideCompleted(event.target.checked);
  };
  

  openCompleteConfirmModal = taskId => () => {
    this.setState({
      completedClicked: true,
      completedId: taskId
    });
  };

  closeCompleteConfirmModal = value => () => {
    this.setState({
      completedClicked: false,
      completedId: null
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

  openDeleteConfirmModal = taskId => () => {
    this.setState({
      deleteClicked: true,
      deleteId: taskId
    });
  };

 

  closeDeleteConfirmModal = value => () => {
    this.setState({
      deleteClicked: false,
      deleteId: null
    });
  };

  render() {
    const { classes, tasks, loggedInUser } = this.props;
    return (
      <div>
        
      <Paper className={classes.root} elevation={4}>
      <FormGroup>
          <FormControlLabel
            control={
              <Switch checked={this.props.hideCompleted} onChange={this.handleHideCompleted} aria-label="Hide Completed" />
            }
            label={'Hide Completed'}
          />
          </FormGroup>
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
                disabled={task.status === 'COMPLETED'}
                checked={task.status === 'COMPLETED'}
                onClick={this.openCompleteConfirmModal(task.id)}
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
                <IconButton
                disabled={task.status === 'COMPLETED'} 
                onClick={this.openEditModal(task)} 
                aria-label="Edit">
                  <EditIcon />
                </IconButton>
                <IconButton disabled={loggedInUser.id !== task.created_by} onClick={this.openDeleteConfirmModal(task.id)} aria-label="Delete">
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
        {this.state.isEditOpen && (
        <EditTaskModal
          isEditOpen={this.state.isEditOpen}
          currentTask={this.state.currentTask}
          displayToast={this.props.displayToast}
          closeEditModal={this.closeEditModal()}
          updateTask={this.props.updateTask}
        />
        )}

        {this.state.deleteClicked && (
        <DeleteConfirmModal
          deleteClicked={this.state.deleteClicked}
          deleteId={this.state.deleteId}
          deleteTask={this.props.deleteTask}
          closeDeleteConfirmModal={this.closeDeleteConfirmModal()}
        />
        )}

        {this.state.completedClicked && (
        <CompleteConfirmModal
          completedClicked={this.state.completedClicked}
          completedId={this.state.completedId}
          updateTask={this.props.updateTask}
          closeCompleteConfirmModal={this.closeCompleteConfirmModal()}
        />
        )}

      </Paper>
      </div>
    );
  }
}

TaskList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TaskList);

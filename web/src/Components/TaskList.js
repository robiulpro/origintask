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
import Typography from '@material-ui/core/Typography';

import EditTaskModal from './EditTaskModal';


import DeleteConfirmModal from './DeleteConfirmModal';
import CompleteConfirmModal from './CompleteConfirmModal';
import TaskViewModal from './TaskViewModal';

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
      taskToBeDeleted: null,
      completedClicked: false,
      completedTask: null,
      viewClicked: false,
      viewTask: null
    };
    this.handleHideCompleted= this.handleHideCompleted.bind(this);
    this.openCompleteConfirmModal= this.openCompleteConfirmModal.bind(this);
    this.openEditModal= this.openEditModal.bind(this);
    this.openDeleteConfirmModal= this.openDeleteConfirmModal.bind(this);
  }

  handleHideCompleted = event => {
    this.props.switcHideCompleted(event.target.checked);
  };
  

  openCompleteConfirmModal = task => () => {
    if((task.created_by !== this.props.loggedInUser.id) && (task.assigned_to != null && task.assigned_to !== this.props.loggedInUser.id)){
      this.props.displayToast({variant: 'error', message: 'You dont have permission to perform this action!'});
    }else{
      this.setState({
        completedClicked: true,
        completedTask: task
      });
    }    
  };

  closeCompleteConfirmModal = value => () => {
    this.setState({
      completedClicked: false,
      completedTask: null
    });
  };

  openEditModal = task => () => {
    console.log('Opening task edit module for > ',task);
    if(this.props.loggedInUser.id === task.created_by){
      this.setState({
        isEditOpen: true,
        currentTask: task
      });
    }else{      
      this.props.displayToast({variant: 'error', message: 'You dont have permission to edit the task!'});
    }    
  };

 

  closeEditModal = value => () => {
    this.setState({
      isEditOpen: false,
      currentTask: {}
    });
  };

  openDeleteConfirmModal = task => () => {
    if(this.props.loggedInUser.id === task.created_by){
      this.setState({
        deleteClicked: true,
        taskToBeDeleted: task
      });
    }else{
      this.props.displayToast({variant: 'error', message: 'You dont have permission to delete the task!'});
    }
  };

 

  closeDeleteConfirmModal = value => () => {
    this.setState({
      deleteClicked: false,
      taskToBeDeleted: null
    });
  };


  openViewModal = task => () => {
    this.setState({
      viewClicked: true,
      viewTask: task
    });
  };

 

  closeViewModal = value => () => {
    this.setState({
      viewClicked: false,
      viewTask: null
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
              className={classes.listItem}
            >
              <Checkbox
                disabled={(task.created_by !== loggedInUser.id) && (task.assigned_to != null && task.assigned_to !== loggedInUser.id)}
                checked={task.status === 'COMPLETED'}
                onClick={this.openCompleteConfirmModal(task)}
                tabIndex={-1}
                disableRipple
              />
              <ListItemText onClick={this.openViewModal(task)} primary={task.title} secondary={task.description.replace(/^(.{120}[^\s]*).*/, "$1")} />
             
              <ListItemSecondaryAction>
                <IconButton
                disabled={task.created_by !== loggedInUser.id} 
                onClick={this.openEditModal(task)} 
                aria-label="Edit">
                  <EditIcon />
                </IconButton>
                <IconButton disabled={task.created_by !== loggedInUser.id} onClick={this.openDeleteConfirmModal(task.id)} aria-label="Delete">
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
          
        {tasks.length <= 0 && (
          <Typography component="p" color="textSecondary">
            No task found..
        </Typography>
        )}

        {this.state.isEditOpen && (
        <EditTaskModal
          isEditOpen={this.state.isEditOpen}
          currentTask={this.state.currentTask}
          displayToast={this.props.displayToast}
          closeEditModal={this.closeEditModal()}
          updateTask={this.props.updateTask}
          users={this.props.users}
        />
        )}

        {this.state.deleteClicked && (
        <DeleteConfirmModal
          deleteClicked={this.state.deleteClicked}
          taskToBeDeleted={this.state.taskToBeDeleted}
          deleteTask={this.props.deleteTask}
          closeDeleteConfirmModal={this.closeDeleteConfirmModal()}
        />
        )}

        {this.state.completedClicked && (
        <CompleteConfirmModal
          completedClicked={this.state.completedClicked}
          completedTask={this.state.completedTask}
          updateTask={this.props.updateTask}
          loggedInUser={this.props.loggedInUser}
          closeCompleteConfirmModal={this.closeCompleteConfirmModal()}
        />
        )}

        {this.state.viewClicked && (
        <TaskViewModal
          viewClicked={this.state.viewClicked}
          task={this.state.viewTask}
          closeViewModal={this.closeViewModal()}
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

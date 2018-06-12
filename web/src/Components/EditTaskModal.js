import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

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

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

var toDate = require('date-fns/toDate');
var moment = require('moment');


const styles = theme => ({
  root: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
    marginTop: theme.spacing.unit * 3,
  }),
  appBar: {
    position: 'relative',
  },
  flex: {
    flex: 1,
  },
  margin: {
    margin: theme.spacing.unit,
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
  },
});

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class EditTaskModal extends React.Component {

  constructor(props){
    super(props);
    console.log(props);
    this.state = {
      title: props.currentTask.title,
      description: props.currentTask.description,
      assignedTo: props.currentTask.assigned_to == null ? '' : props.currentTask.assigned_to,
      selectedDate: null,
    };
    this.handleSubmit= this.handleSubmit.bind(this);
  }

  componentDidMount(){
    if(this.props.currentTask.target_date != null){
      this.setState({ selectedDate: toDate(this.props.currentTask.target_date) });
      }
  }

  handleSubmit(event) {
    event.preventDefault();

    let data = {
      title: this.state.title,
      description: this.state.description
    };
    if(this.state.selectedDate != null){
      var target_date = format(this.state.selectedDate, 'YYYY-MM-DD')+" 11:59:59";
      data.target_date = target_date;
    }

    console.log("assigned to > ", this.state.assignedTo);

    if(this.props.currentTask.assigned_to == null && this.state.assignedTo != ''){
      console.log("null to value");
      data.assigned_to = this.state.assignedTo;
      data.assigned_on = moment.utc().format('YYYY-MM-DD HH:mm:ss');
      data.status = 'ASSIGNED';
    }

    if(this.props.currentTask.assigned_to != null && this.state.assignedTo == ''){
      console.log("value to null");
      data.assigned_to = '';
      data.assigned_on = '';
      data.status = 'CREATED';
    }

    if(this.props.currentTask.assigned_to != null && this.state.assignedTo != ''){
      if(this.props.currentTask.assigned_to !== this.state.assignedTo){
        console.log("assigner changed");
        data.assigned_to = this.state.assignedTo;
        //data.assigned_on = format(new Date().getTime(), 'YYYY-MM-DD HH:mm:ss');
        data.assigned_on = moment.utc().format('YYYY-MM-DD HH:mm:ss');
      }
    }


    console.log(data);
    this.props.updateTask(this.props.currentTask.id,data);
    this.props.closeEditModal();   
  };

  handleDateChange = (date) => {
    this.setState({ selectedDate: date });
  };

  onInputChange(event){
    console.log(event.target.name,event.target.value);
   this.setState({[event.target.name]: event.target.value});
}

  render() {
    console.log(this.state);
  const { classes, isEditOpen, currentTask, users } = this.props;
  const { selectedDate } = this.state;
  
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>

      <Dialog
          fullScreen
          open={isEditOpen}
          onClose={this.props.closeEditModal}
          TransitionComponent={Transition}
        >
        <form className={classes.container} noValidate>
          <AppBar className={classes.appBar}>
            <Toolbar>
              <IconButton color="inherit" onClick={this.props.closeEditModal} aria-label="Close">
                <CloseIcon />
              </IconButton>
              <Typography variant="title" color="inherit" className={classes.flex}>
                Update Task #{currentTask.id}
              </Typography>
              <Button type="submit" color="inherit" onClick={this.handleSubmit}>
                Update
              </Button>
            </Toolbar>
          </AppBar>
          
          <Paper className={classes.root} elevation={4}>
          
       <FormControl fullWidth className={classes.margin}>
      <TextField
        id="title"
        name="title"
        label="Title"
        type="text"
        value={this.state.title}
        className={classes.textField}
        onChange={e => this.onInputChange(e)}
        required
      />
      </FormControl>
      <FormControl fullWidth className={classes.margin}>
      <TextField
        id="description"
        name="description"
        label="Description"
        multiline
        rowsMax="4"
        value={this.state.description}
        className={classes.textField}
        onChange={e => this.onInputChange(e)}
        required
      />
      </FormControl>
      <DatePicker
          label="Target Completion Date"
          value={selectedDate}
          onChange={this.handleDateChange}
          disablePast={true}
        />

        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="assignedTo">Assign To</InputLabel>
          <Select
            value={this.state.assignedTo}
            onChange={e => this.onInputChange(e)}
            inputProps={{
              name: 'assignedTo',
              id: 'assignedTo',
            }}
          >
        <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {users.map(user => (
              <MenuItem key={user.id} value={user.id}>{user.username}</MenuItem>
            ))}
          </Select>
        </FormControl>      
    
    </Paper>
    </form>

        </Dialog>

    </MuiPickersUtilsProvider>
  );
  }
}

EditTaskModal.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EditTaskModal);

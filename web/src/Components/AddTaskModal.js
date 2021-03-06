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
});

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class AddTaskModal extends React.Component {

  constructor(props){
    super(props);
    this.handleSubmit= this.handleSubmit.bind(this);
  }

  state = {
    open: false,
    selectedDate: null,
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleSubmit(event) {
    event.preventDefault();
    if (!event.target.checkValidity()) {
      this.props.displayToast({variant: 'error', message: 'Error creating task, empty form submitted!'});
      return;
    }
    const formData = new FormData(event.target);
    let data = {};
    for (var pair of formData.entries()) {
      data[pair[0]] = pair[1];
    }    
    data.created_by = this.props.loggedInUser.id;
    if(this.state.selectedDate != null){
      var target_date = format(this.state.selectedDate, 'YYYY-MM-DD')+" 11:59:59";
      data.target_date = target_date;
    }
    
    
    this.props.addTask(data);    
  };

  handleDateChange = (date) => {
    this.setState({ selectedDate: date });
  };

  render() {
  const { classes } = this.props;
  const { selectedDate } = this.state;  
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Button onClick={this.handleClickOpen} variant="fab" color="secondary" aria-label="add" className={classes.button}>
        <AddIcon />
      </Button>      

      <Dialog
          fullScreen
          open={this.state.open}
          onClose={this.handleClose}
          TransitionComponent={Transition}
        >
        <form onSubmit={this.handleSubmit} className={classes.container} noValidate>
          <AppBar className={classes.appBar}>
            <Toolbar>
              <IconButton color="inherit" onClick={this.handleClose} aria-label="Close">
                <CloseIcon />
              </IconButton>
              <Typography variant="title" color="inherit" className={classes.flex}>
                Add New Task
              </Typography>
              <Button type="submit" color="inherit" onClick={this.handleClose}>
                Save
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
        className={classes.textField}
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
        className={classes.textField}
        required
      />
      </FormControl>

      <DatePicker
          label="Target Completion Date"
          value={selectedDate}
          onChange={this.handleDateChange}
          disablePast={true}
        />      
    
    </Paper>
    </form>

        </Dialog>

    </MuiPickersUtilsProvider>
  );
  }
}

AddTaskModal.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AddTaskModal);

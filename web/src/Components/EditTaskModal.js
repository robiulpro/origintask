import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import Icon from '@material-ui/core/Icon';
import DeleteIcon from '@material-ui/icons/Delete';

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

var toDate = require('date-fns/toDate');


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
      selectedDate: null,
    };
    this.handleSubmit= this.handleSubmit.bind(this);
  }

  componentDidMount(){
    if(this.props.currentTask.target_date != null){
      this.setState({ selectedDate: toDate(this.props.currentTask.target_date) });
      }
  }
  

  /* componentWillReceiveProps(nextProps) {
    if(nextProps !== this.props){    
    if(nextProps.currentTask.target_date != null){
    this.setState({ selectedDate: toDate(nextProps.currentTask.target_date) });
    }else{
      this.setState({ selectedDate: null });
    }
  }
  }; */

  handleSubmit(event) {
    event.preventDefault();
    /* if (!event.target.checkValidity()) {
      this.props.displayToast({variant: 'error', message: 'Error updating task, empty form submitted!'});
      return;
    } */
    /* const formData = new FormData(event.target);
    let data = {};
    for (var pair of formData.entries()) {
      //console.log(pair[0]+ ', ' + pair[1]);
      data[pair[0]] = pair[1];
    }     */

    let data = {
      //id: this.props.currentTask.id,
      title: this.state.title,
      description: this.state.description
    };
    if(this.state.selectedDate != null){
      var target_date = format(this.state.selectedDate, 'YYYY-MM-DD')+" 11:59:59";
      data.target_date = target_date;
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
  const { classes, isEditOpen, currentTask } = this.props;
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

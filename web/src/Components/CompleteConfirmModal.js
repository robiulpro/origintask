import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import {format} from 'date-fns/esm';
var moment = require('moment');

class CompleteConfirmModal extends React.Component {

    constructor(props){
        super(props);

        let actionComplete;
        if(props.completedTask.status === 'COMPLETED'){
          actionComplete = false;
        }else{
          actionComplete = true;
        }

        this.state={
          actionComplete: actionComplete
        };
        this.handleClose= this.handleClose.bind(this);
        this.completeTask= this.completeTask.bind(this);
      }

  handleClose = () => {
    this.props.closeCompleteConfirmModal();
  };

  completeTask = task => () => {
      let data = {};
      if(this.state.actionComplete){
        data = {
          status: 'COMPLETED',
          completed_on: moment.utc().format('YYYY-MM-DD HH:mm:ss'),
          completed_by: this.props.loggedInUser.id
      };
      }else{
        let status;
        if(task.assigned_by !== null){
          status = 'ASSIGNED';
        }else{
          status = 'CREATED';
        }
        data = {
          status: status,
          completed_on: null,
          completed_by: null
      };
      }      
      this.props.updateTask(task.id,data);
      this.props.closeCompleteConfirmModal();
  }

  render() {
    const { fullScreen } = this.props;

    return (
      <div>
        <Dialog
          fullScreen={fullScreen}
          open={this.props.completedClicked}
          onClose={this.handleClose}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title">{this.state.actionComplete ? 'Confirm Mark As Complete' : 'Confirm Mark As Not Complete'}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure want to mark the task #{this.props.completedTask.id} as {this.state.actionComplete ? 'Completed' : 'Not Completed'}.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.completeTask(this.props.completedTask)} color="primary" autoFocus>
              {this.state.actionComplete ? 'Mark As Completed' : 'Mark As Not Completed'}
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

CompleteConfirmModal.propTypes = {
  fullScreen: PropTypes.bool.isRequired,
};

export default withMobileDialog()(CompleteConfirmModal);

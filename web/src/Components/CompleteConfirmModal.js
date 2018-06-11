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

class CompleteConfirmModal extends React.Component {

    constructor(props){
        super(props);
        this.handleClose= this.handleClose.bind(this);
        this.completeTask= this.completeTask.bind(this);
      }

  handleClose = () => {
    this.props.closeCompleteConfirmModal();
  };

  completeTask = taskId => () => {
      const task = {
          status: 'COMPLETED',
          completed_on: format(new Date(), 'YYYY-MM-DD HH:mm:ss')
      };
      this.props.updateTask(taskId,task);
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
          <DialogTitle id="responsive-dialog-title">{"Confirm Mark As Complete"}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure want to mark the task #{this.props.completedId} as completed.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.completeTask(this.props.completedId)} color="primary" autoFocus>
              Mark as completed
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

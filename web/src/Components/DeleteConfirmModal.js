import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import withMobileDialog from '@material-ui/core/withMobileDialog';

class DeleteConfirmModal extends React.Component {

    constructor(props){
        super(props);
        this.handleClose= this.handleClose.bind(this);
        this.deleteTask= this.deleteTask.bind(this);
      }

  handleClose = () => {
    this.props.closeDeleteConfirmModal();
  };

  deleteTask = taskId => () => {
      this.props.deleteTask(taskId);
      this.props.closeDeleteConfirmModal();
  }

  render() {
    const { fullScreen } = this.props;

    return (
      <div>
        <Dialog
          fullScreen={fullScreen}
          open={this.props.deleteClicked}
          onClose={this.handleClose}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title">{"Confirm Delete?"}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure want to delte the task #{this.props.deleteId}?.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.deleteTask(this.props.deleteId)} color="primary" autoFocus>
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

DeleteConfirmModal.propTypes = {
  fullScreen: PropTypes.bool.isRequired,
};

export default withMobileDialog()(DeleteConfirmModal);

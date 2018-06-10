import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import withMobileDialog from '@material-ui/core/withMobileDialog';

import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';

class Filters extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            filter: props.filter
          };
        this.applyFilter= this.applyFilter.bind(this);
      }

      handleFilterChange = event => {
        this.setState({ filter: event.target.value });
      };

      applyFilter = () => {
        this.props.applyFilter(this.state.filter);
        this.props.closeFiltersModal();        
      };

  render() {
    const { fullScreen } = this.props;

    return (
      <div>
        <Dialog
          fullScreen={fullScreen}
          open={this.props.openFilterModal}
          onClose={this.props.closeFiltersModal}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title">{"Filters"}</DialogTitle>
          <DialogContent>
            
          <FormControl component="fieldset" required>
          <FormLabel component="legend">Option</FormLabel>
          <RadioGroup
            aria-label="filter"
            name="filter"
            value={this.state.filter}
            onChange={this.handleFilterChange}
          >
            <FormControlLabel value="all" control={<Radio />} label="All" />
            <FormControlLabel value="assigned" control={<Radio />} label="All Assigned" />
            <FormControlLabel value="un-assigned" control={<Radio />} label="Un-assigned" />
            <FormControlLabel value="assigned-to-me" control={<Radio />} label="Assigned to me" />
            <FormControlLabel value="missed-target" control={<Radio />} label="Missed target date" />
          </RadioGroup>
        </FormControl>

          </DialogContent>
          <DialogActions>
            <Button onClick={this.props.closeFiltersModal} color="primary">
              Close
            </Button>
            <Button onClick={this.applyFilter} color="primary" autoFocus>
              Apply
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

Filters.propTypes = {
  fullScreen: PropTypes.bool.isRequired,
};

export default withMobileDialog() (Filters);

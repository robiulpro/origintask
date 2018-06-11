import React from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import FilterListIcon from '@material-ui/icons/FilterList';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import TaskList from './Components/TaskList';
import AddTaskModal from './Components/AddTaskModal';
import Toast from './Components/Toast';
import Filters from './Components/Filters';

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { 
  getUserInfo, 
  getTasks, 
  addTask,
  updateTask,
  hideToast,
  displayToast,
  deleteTask,
  applyFilter,
  switcHideCompleted
} from './task';

class MenuAppBar extends React.Component {
  state = {
    auth: true,
    anchorEl: null,
    openFilterModal: false
  };

  componentWillMount(){
    this.props.getUserInfo();
    this.props.getTasks();
  }

  handleChange = (event, checked) => {
    this.setState({ auth: checked });
  };

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  refreshPage = () => {
    window.location.reload();
  };

  openFiltersModal = () => {
    this.setState({ openFilterModal: true });
  };

  closeFiltersModal = () => {
    this.setState({ openFilterModal: false });
  };

  render() {
    const { tasks } = this.props;
    const { auth, anchorEl } = this.state;
    const open = Boolean(anchorEl);

    console.log(tasks);

    return (
      <div style={{flexGrow: 1}}>        
        <AppBar position="static">
          <Toolbar>
            <IconButton style={{marginLeft: -12, marginRight: 20}} color="inherit" aria-label="Menu">
              <MenuIcon />
            </IconButton>
            <Typography variant="title" color="inherit" style={{flex: 1}}>
              Task List
            </Typography>
            {auth && (
              <div>
                Welcome {this.props.loggedInUser.username}
                <IconButton
                  aria-owns={open ? 'menu-appbar' : null}
                  aria-haspopup="true"
                  onClick={this.handleMenu}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={open}
                  onClose={this.handleClose}
                >
                  <MenuItem onClick={this.handleClose}>Profile</MenuItem>
                  
                    <MenuItem onClick={this.refreshPage}  component={Link} to="/logout">Logout</MenuItem>
                  
                </Menu>
                  
                <IconButton onClick={this.openFiltersModal} color="inherit" aria-label="Filters">
                  <FilterListIcon />
                </IconButton>

              </div>
            )}
          </Toolbar>
        </AppBar>

        
            
        {/*<FormGroup>
          <FormControlLabel
            control={
              <Switch checked={auth} onChange={this.handleChange} aria-label="LoginSwitch" />
            }
            label={auth ? 'Logout' : 'Login'}
          />
          </FormGroup>*/}

        <TaskList 
        tasks={this.props.tasks}
        displayToast={this.props.displayToast}
        deleteTask={this.props.deleteTask}
        updateTask={this.props.updateTask}
        hideCompleted={this.props.hideCompleted}
        switcHideCompleted={this.props.switcHideCompleted}
        loggedInUser={this.props.loggedInUser}
        />
        <AddTaskModal 
        addTask={this.props.addTask}
        loggedInUser={this.props.loggedInUser}
        displayToast={this.props.displayToast}
        />

        {this.state.openFilterModal && (
        <Filters
        openFilterModal={this.state.openFilterModal}
        closeFiltersModal={this.closeFiltersModal}
        filter={this.props.filter}
        applyFilter={this.props.applyFilter             }
        />
        )}

          <Toast toast={this.props.toast} hideToast={this.props.hideToast} />

      </div>
    );
  }
}

MenuAppBar.propTypes = {
  //classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  tasks: state.task.tasks,
  loading: state.task.loading,
  toast: state.task.toast,
  loggedInUser: state.task.loggedInUser,
  filter: state.task.filter,
  hideCompleted: state.task.hideCompleted
})

const mapDispatchToProps = dispatch => bindActionCreators({
  getUserInfo,
  getTasks,
  addTask,
  updateTask,
  hideToast,
  displayToast,
  deleteTask,
  applyFilter,
  switcHideCompleted
}, dispatch)

//export default withStyles(styles)(MenuAppBar);
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MenuAppBar)
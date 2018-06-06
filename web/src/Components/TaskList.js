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

const styles = theme => ({
  root: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
    marginTop: theme.spacing.unit * 3,
  }),
});

class TaskList extends React.Component {
  state = {
    checked: [0],
  };

  handleToggle = value => () => {
    const { checked } = this.state;
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    this.setState({
      checked: newChecked,
    });
  };

  render() {
    const { classes, tasks } = this.props;
    console.log(tasks);

    return (
      <Paper className={classes.root} elevation={4}>
        <List>
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
                checked={this.state.checked.indexOf(task.id) !== -1}
                onClick={this.handleToggle(task.id)}
                tabIndex={-1}
                disableRipple
              />
              <ListItemText primary={task.title} secondary={task.description} />
              <ListItemSecondaryAction>
                <IconButton aria-label="Edit">
                  <EditIcon />
                </IconButton>
                <IconButton aria-label="Delete">
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </Paper>
    );
  }
}

TaskList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TaskList);

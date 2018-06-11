import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';

const styles = theme => ({
    selected: {
      color: 'green',
      background: 'red',
    },
    chip: {
        margin: theme.spacing.unit,
      },
  });

  class TaskDescription extends React.Component{
    render (){
        const { classes, task } = this.props;
        const description = task.description.replace(/^(.{120}[^\s]*).*/, "$1");
        return (
        <span>
            {description}
        </span>
        );
    }
  }
  
  export default withStyles(styles)(TaskDescription)
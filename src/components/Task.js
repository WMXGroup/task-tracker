import React, { Component } from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import MoreHoriz from '@material-ui/icons/MoreHoriz';
import { withStyles } from '@material-ui/core/styles';

const styles = (theme) => ({
  taskStyle:{
    border: '1px solid #ccc',
    borderRadius: '25px',
    width:'700px',
    marginTop: '5px',
  },
  checkbox:{
    // height: 0,
    width: '5px',
  },
  taskContainer: {
    display:'flex',
  },
  blackColor: {
    color: 'black'
  }
});

class Task extends Component {

  state = {
    showDetails: false,
  }

  render() {
    const {
      classes,
      task,
      completeTask,
      launchModal
    } = this.props;

    return (
      <div className={classes.taskContainer} key={task.id}>
        {task.status !== 'Completed' &&
          <Checkbox
            checked={task.status === 'Completed' ? true : false}
            className={classes.checkbox}
            onChange={() => completeTask(task.id)}
            color="primary"
            size='small'
            />
        }
        <TextField
          className={classes.taskStyle}
          disabled
          InputProps={{
            disableUnderline: true,
            style: {
              paddingLeft: '5px',
            },
            classes:{
              disabled: classes.blackColor
            },
          }}
          value={task.description}
          multiline
        />
          <IconButton
          onClick={() => launchModal('Edit', task.id)} 
          size='small'
          >
          <MoreHoriz
            className={classes.moveButtons}
          />
        </IconButton>
      </div>
    )
  }
}

export default withStyles(styles)(Task)
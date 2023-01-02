import React, { Component } from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import { withStyles } from '@material-ui/core/styles';
import ActionMenu from './ActionMenu';

const styles = (theme) => ({
  taskStyle:{
    border: '1px solid',
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
      ignoreTask,
      makeCurrent,
      snoozeWeek,
      skipOccurence,
      launchDetails,
      launchCompleteCompleted,
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
        <ActionMenu 
          snoozeWeek={() => snoozeWeek(task.id)}
          skipOccurence={() => skipOccurence(task.id)}
          ignoreTask={() => ignoreTask(task.id)}
          makeCurrent={() => makeCurrent(task.id)}
          launchCompleteCompleted={() => launchCompleteCompleted(task.id)}
        />
        <TextField
          className={classes.taskStyle}
          style={{
            borderColor: this.props.task.dueDate === 'Invalid date' ? 'red' : '#ccc',
          }}
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
          //onClick={() => alert(task.description)}
        />
        <IconButton
        onClick={() => launchDetails('Edit', task.id)} 
        size='small'
        >
          <EditIcon
            className={classes.moveButtons}
          />
        </IconButton>
      </div>
    )
  }
}

export default withStyles(styles)(Task)
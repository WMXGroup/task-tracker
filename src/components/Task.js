import React, { Component } from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
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
  },
  fieldLabel: {
    marginTop: '5px',
    marginRight: '5px',
    alignContent: 'center',
  },
});

class Task extends Component {

  state = {
    showDetails: false,
    isIgnored: false,
  }

  render() {
    const {
      classes,
      header,
      task,
      completeTask,
      launchDetails,
      snoozeDay,
      makeCurrent,
      ignoreTask,
      deleteOccurence,
    } = this.props;

    let isChecked = false
    let isIgnored = false
    const { dates } = task
    for (let i = 0; i < dates.length; i++) {
      if (dates[i].date === header && dates[i].state === 'closed') {
        isChecked = true
      } else if (dates[i].date === header && dates[i].state === 'ignored') {
        isIgnored = true
      }
    }
    return (
      <div className={classes.taskContainer} key={task.id}>
        <Checkbox
          checked={isChecked}
          className={classes.checkbox}
          onChange={() => completeTask(task.id, header)}
          color="primary"
          size='small'
          />
        <ActionMenu
          snoozeDay={() => snoozeDay(task.id, header)}
          makeCurrent={() => makeCurrent(task.id, header)}
          ignoreTask={() => ignoreTask(task.id, header)}
          deleteOccurence={() => deleteOccurence(task.id, header)}
          type={task.type}
          category={task.category}
          frequency={task.frequency}
          recurDays={task.recurDays}
        />
        <Typography className={classes.fieldLabel}>
            {task.priority}
        </Typography>
        <TextField
          className={classes.taskStyle}
          style={{
            borderColor: isIgnored === true ? 'gray' : 'black',
            backgroundColor: isIgnored === true ? 'lightgray' : null,
            textDecoration: isChecked ? 'line-through' : '',
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
          inputProps={{ style: { color: isIgnored === true ? 'gray' : 'black' } }}
          value={task.description}
          multiline
          //onClick={() => alert(task.description)}
        />
        <IconButton
        onClick={() => launchDetails('Edit', task.id)} 
        size='small'
        >
          <EditIcon/>
        </IconButton>
      </div>
    )
  }
}

export default withStyles(styles)(Task)
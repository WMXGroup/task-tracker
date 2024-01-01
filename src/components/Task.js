import React, { Component } from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';

import ExtensionIcon from '@material-ui/icons/Extension';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import DirectionsCarIcon from '@material-ui/icons/DirectionsCar';
import TodayIcon from '@material-ui/icons/Today';
import TimerIcon from '@material-ui/icons/Timer';
import TheatersIcon from '@material-ui/icons/Theaters';
import BuildIcon from '@material-ui/icons/Build';
import EditIcon from '@material-ui/icons/Edit';
import { indigo } from '@material-ui/core/colors';
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
        />
        {task.type === 'Activity' &&
        <IconButton size='small'>
          <ExtensionIcon style={{color:indigo[500]}}/>
        </IconButton>
        }
        {task.type === 'Chore' &&
        <IconButton size='small'>
          <ShoppingCartIcon style={{color:indigo[500]}}/>
        </IconButton>
        }
        {task.type === 'Errand' &&
        <IconButton size='small'>
          <DirectionsCarIcon style={{color:indigo[500]}}/>
        </IconButton>
        }
        {task.type === 'Event' &&
        <IconButton size='small'>
          <TodayIcon style={{color:indigo[500]}}/>
        </IconButton>
        }
        {task.type === 'Habit' &&
        <IconButton size='small'>
          <TimerIcon style={{color:indigo[500]}}/>
        </IconButton>
        }
        {task.type === 'Media' &&
        <IconButton size='small'>
          <TheatersIcon style={{color:indigo[500]}}/>
        </IconButton>
        }
        {task.type === 'Task' &&
        <IconButton size='small'>
          <BuildIcon style={{color:indigo[500]}}/>
        </IconButton>
        }
        <TextField
          className={classes.taskStyle}
          style={{
            borderColor: isIgnored === true ? 'gray' : 'black',
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
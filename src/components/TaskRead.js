import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import { withStyles } from '@material-ui/core/styles';

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

class TaskRead extends Component {

  state = {
    showDetails: false,
    isIgnored: false,
  }

  render() {
    const {
      classes,
      task,
      launchDetails,
    } = this.props;

    return (
      <div className={classes.taskContainer} key={task.id}>
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
          value={task.date + ' : ' + task.description}
          multiline
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

export default withStyles(styles)(TaskRead)
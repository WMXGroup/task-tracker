import React, { Component } from 'react';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import DirectionsCarIcon from '@material-ui/icons/DirectionsCar';
import TodayIcon from '@material-ui/icons/Today';
import LoopIcon from '@material-ui/icons/Loop';
import BuildIcon from '@material-ui/icons/Build';
import AlarmIcon from '@material-ui/icons/Alarm';
import BeachAccessIcon from '@material-ui/icons/BeachAccess';
import LowPriorityIcon from '@material-ui/icons/LowPriority';

import { red, orange, yellow, green, blue, purple } from '@material-ui/core/colors';

export default class ActionMenu extends Component {

  state = {
    anchorEl: null,
    setAnchorEl: false,
  }

  handleMenu = event => {
    this.setState({
      anchorEl: event.currentTarget,
      setAnchorEl: true
    });
  };

  handleClose = () => {
    this.setState({
      setAnchorEl: false
    });
  };

  handleClick = (currentView) => {
    this.props.handleViewChange(currentView);
    this.handleClose();
  }

  handleIgnore = () => {
    this.handleClose();
    this.props.ignoreTask();
  }

  render() {
    const {
      snoozeDay,
      makeCurrent,
      ignoreTask,
      deleteOccurence,
      type,
      recurDays,
      frequency
    } = this.props;

    return (
      <React.Fragment>
        {/* <IconButton
          size='small'
          onClick={this.handleMenu}
          >
          <MoreVert />
        </IconButton> */}
        {type === 'Deadline' &&
        <IconButton size='small' onClick={this.handleMenu}>
          <AlarmIcon style={{color:red[500]}}/>
        </IconButton>
        }
        {(type === 'Tracking' && recurDays === 1) &&
        <IconButton size='small' onClick={this.handleMenu}>
          <LoopIcon style={{color:yellow[500]}}/>
        </IconButton>
        }
        {(type === 'Tracking' && recurDays !== 1) &&
        <IconButton size='small' onClick={this.handleMenu}>
          <LoopIcon style={{color:orange[500]}}/>
        </IconButton>
        }
        {type === 'Periodic' &&
        <IconButton size='small' onClick={this.handleMenu}>
          <LowPriorityIcon style={{color:green[500]}}/>
        </IconButton>
        }
        {type === 'Event' &&
        <IconButton size='small' onClick={this.handleMenu}>
          <TodayIcon style={{color:blue[500]}}/>
        </IconButton>
        }
        {type === 'Floating' &&
        <IconButton size='small' onClick={this.handleMenu}>
          <BeachAccessIcon style={{color:purple[500]}}/>
        </IconButton>
        }
        {type === '' &&
        <IconButton size='small' onClick={this.handleMenu}>
          <BuildIcon />
        </IconButton>
        }
        <Menu
            id="menu-appbar"
            anchorEl={this.state.anchorEl}
            getContentAnchorEl={null}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
            open={this.state.setAnchorEl}
            onClose={this.handleClose}
          >
          <MenuItem
            onClick={snoozeDay}
            >
            Snooze to Next Day
          </MenuItem>
          <MenuItem
            onClick={() => {this.handleIgnore()}}
            >
            Ignore Task
          </MenuItem>
          <MenuItem
            onClick={makeCurrent}
            >
            Make Current
          </MenuItem>
          <MenuItem
            onClick={deleteOccurence}
            >
            Delete Occurence
          </MenuItem>
          </Menu>
        </React.Fragment>
    )
  }
}

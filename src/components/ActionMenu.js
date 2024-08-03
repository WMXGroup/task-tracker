import React, { Component } from 'react';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import SnoozeIcon from '@material-ui/icons/Snooze';
import MoreVert from '@material-ui/icons/MoreVert';

import ExtensionIcon from '@material-ui/icons/Extension';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import DirectionsCarIcon from '@material-ui/icons/DirectionsCar';
import TodayIcon from '@material-ui/icons/Today';
import TimerIcon from '@material-ui/icons/Timer';
import TheatersIcon from '@material-ui/icons/Theaters';
import BuildIcon from '@material-ui/icons/Build';
import EditIcon from '@material-ui/icons/Edit';
import { indigo } from '@material-ui/core/colors';
import { red } from '@material-ui/core/colors';

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
        {type === 'Activity' &&
        <IconButton size='small' onClick={this.handleMenu}>
          <ExtensionIcon style={{color:indigo[500]}}/>
        </IconButton>
        }
        {(type === 'Chore' && frequency === 'Daily') &&
        <IconButton size='small' onClick={this.handleMenu}>
          <ShoppingCartIcon style={{color:red[500]}}/>
        </IconButton>
        }
        {(type === 'Chore' && frequency !== 'Daily') &&
        <IconButton size='small' onClick={this.handleMenu}>
          <ShoppingCartIcon style={{color:indigo[500]}}/>
        </IconButton>
        }
        {type === 'Errand' &&
        <IconButton size='small' onClick={this.handleMenu}>
          <DirectionsCarIcon style={{color:indigo[500]}}/>
        </IconButton>
        }
        {type === 'Event' &&
        <IconButton size='small' onClick={this.handleMenu}>
          <TodayIcon style={{color:indigo[500]}}/>
        </IconButton>
        }
        {type === 'Habit' &&
        <IconButton size='small' onClick={this.handleMenu}>
          <TimerIcon style={{color:indigo[500]}}/>
        </IconButton>
        }
        {type === 'Media' &&
        <IconButton size='small' onClick={this.handleMenu}>
          <TheatersIcon style={{color:indigo[500]}}/>
        </IconButton>
        }
        {type === 'Task' &&
        <IconButton size='small' onClick={this.handleMenu}>
          <BuildIcon style={{color:indigo[500]}}/>
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

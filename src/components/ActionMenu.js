import React, { Component } from 'react';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import SnoozeIcon from '@material-ui/icons/Snooze';
import MoreVert from '@material-ui/icons/MoreVert';

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

  render() {
    const {
      ignoreTask,
      makeCurrent,
      skipOccurence,
      snoozeWeek,
      launchCompleteCompleted,
    } = this.props;

    return (
      <React.Fragment>
        <IconButton
          size='small'
          onClick={this.handleMenu}
          >
          <MoreVert />
        </IconButton>
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
            onClick={ignoreTask}
            >
            Snooze to Next Day
          </MenuItem>
          <MenuItem
            onClick={snoozeWeek}
            >
            Snooze to Next Week
          </MenuItem>
          <MenuItem
            onClick={makeCurrent}
            >
            Make Current
          </MenuItem>
          <MenuItem
            onClick={skipOccurence}
            >
            Skip Occurence
          </MenuItem>
          <MenuItem
            onClick={launchCompleteCompleted}
            >
            Complete with Hours
          </MenuItem>
          </Menu>
        </React.Fragment>
    )
  }
}

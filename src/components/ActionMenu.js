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

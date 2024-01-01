import React, { Component } from 'react';
import IconButton from '@material-ui/core/IconButton';
import FilterList from '@material-ui/icons/FilterList';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

export default class ViewSelector extends Component {

  state = {
    currentViews: [
      'All Tasks',
      'Scheduled',
      'Unscheduled',
    ],
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

    return (
      <React.Fragment>
        <IconButton
          edge="start"
          color="inherit"
          onClick={this.handleMenu}
          >
          <FilterList />
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
          {this.state.currentViews.map((currentView, i) => (
            <MenuItem
              key={i}
              selected={this.props.currentView === currentView}
              value={currentView}
              onClick={() => this.handleClick(currentView)}
              >
              {currentView}
            </MenuItem>
          ))}
          </Menu>
        </React.Fragment>
    )
  }
}

import React, { Component } from 'react';
import IconButton from '@material-ui/core/IconButton';
import DateRange from '@material-ui/icons/DateRange';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

export default class TimeframeSelector extends Component {

  state = {
    timeframes: [
      '+7',
      '+30',
      '+90',
      '+365',
      '+1000',
      '-7',
      '-30',
      '-90',
      '-365',
      '-1000',
      '<7>',
      '<30>',
      '<90>',
      '<365>',
      '<1000>',
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

  handleClick = (value) => {
    this.props.handleTimeframeChange(value);
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
          <DateRange />
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
          {this.state.timeframes.map((timeframe, i) => (
            <MenuItem
              key={i}
              selected={this.props.currentTimeframe === timeframe}
              value={timeframe}
              onClick={() => this.handleClick(timeframe)}
              >
              {timeframe}
            </MenuItem>
          ))}
          </Menu>
        </React.Fragment>
    )
  }
}

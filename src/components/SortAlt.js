import React, { Component } from 'react';
import IconButton from '@material-ui/core/IconButton';
import Collections from '@material-ui/icons/Collections';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

export default class SortAlt extends Component {

  state = {
    sortOptions: [
      'Category',
      'Status',
      'Priority',
      'Assigned',
      'Contact',
      'Due Date',
      'Due Week',
      'Due Month',
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

  handleClick = (sortOption) => {
    this.props.handleSortChange(sortOption);
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
          <Collections />
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
          {this.state.sortOptions.map((sortOption, i) => (
            <MenuItem
              key={i}
              value={sortOption}
              onClick={() => this.handleClick(sortOption)}
              >
              {sortOption}
            </MenuItem>
          ))}
          </Menu>
        </React.Fragment>
    )
  }
}

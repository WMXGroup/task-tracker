import React, { Component } from 'react';
import IconButton from '@material-ui/core/IconButton';
import ListIcon from '@material-ui/icons/List';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

export default class RelatedLists extends Component {

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

  handleClick = (option) => {
    this.props.changeList(option);
  }

  render() {

    return (
      <React.Fragment>
        <IconButton
          edge="start"
          color="inherit"
          onClick={this.handleMenu}
          >
          <ListIcon />
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
          {this.props.relatedLists.map((option, i) => (
            <MenuItem
              key={i}
              value={option}
              onClick={() => this.handleClick(option)}
              >
              {option}
            </MenuItem>
          ))}
          </Menu>
        </React.Fragment>
    )
  }
}

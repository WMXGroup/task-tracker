import React, { Component } from 'react';
import IconButton from '@material-ui/core/IconButton';
import CategoryIcon from '@material-ui/icons/Category';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

export default class CategoryFilter extends Component {

  state = {
    filterOptions: [],
    anchorEl: null,
    setAnchorEl: false,
  }

  componentWillReceiveProps(nextProps, prevProps) {
    this.setState({
      filterOptions: [...nextProps.categories, 'All']
    })
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

  handleClick = (filterOption) => {
    this.props.handleCategoryFilterChange(filterOption);
  }

  render() {

    return (
      <React.Fragment>
        <IconButton
          edge="start"
          color="inherit"
          onClick={this.handleMenu}
          >
          <CategoryIcon />
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
          {this.state.filterOptions.map((filterOption, i) => (
            <MenuItem
              key={i}
              selected={this.props.categoryFilter.includes(filterOption)}
              value={filterOption}
              onClick={() => this.handleClick(filterOption)}
              >
              {filterOption}
            </MenuItem>
          ))}
          </Menu>
        </React.Fragment>
    )
  }
}

import React, { Component } from 'react';
import IconButton from '@material-ui/core/IconButton';
import ListAltIcon from '@material-ui/icons/ListAlt';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import moment from 'moment';

export default class PresetSelector extends Component {

  state = {
    currentPresets: [
      'Next 7 days',
    //   'Last Week',
    //   'This Week',
    //   'Next Week',
    //   'Last Year',
    //   'This Year',
    //   'Next Year',
      'Movies Watched',
      'Movies To Watch',
      'Past Events',
      'Upcoming Events',
      'Past Activities',
      'Upcoming Events'
    //   'All Past',
    //   'All Future',
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

  handleClick = (currentPreset) => {
    let newStart = '';
    let newEnd = '';
    let newCategoryFilter = this.props.categoryFilter;
    let newView = this.props.currentView;

    if (currentPreset ===  'Next 7 days') {
        newStart = moment().format('YYYY-MM-DD')
        newEnd = moment().add(7,'days').format('YYYY-MM-DD')
        newView = 'Scheduled'
        newCategoryFilter = ['All']
    } else if (currentPreset ===  'Last Week') {


    } else if (currentPreset ===  'This Week') {

    } else if (currentPreset ===  'Next Week') {
    } else if (currentPreset ===  'Past Activities') {
      newCategoryFilter = ['Fun']
      newStart = 'Invalid date'
      newEnd = moment().format('YYYY-MM-DD')
      newView = 'Scheduled'
    } else if (currentPreset ===  'Upcoming Activities') {
      newCategoryFilter = ['Fun']
      newView = 'Unscheduled'
      newStart = 'Invalid date'
      newEnd = moment().format('YYYY-MM-DD')
    } else if (currentPreset ===  'Past Events') {
      newCategoryFilter = ['Events']
      newStart = 'Invalid date'
      newEnd = moment().format('YYYY-MM-DD')
      newView = 'Scheduled'
    } else if (currentPreset ===  'Upcoming Events') {
      newCategoryFilter = ['Events']
      newView = 'Unscheduled'
      newStart = 'Invalid date'
      newEnd = moment().format('YYYY-MM-DD')
    } else if (currentPreset ===  'Movies Watched') {
      newCategoryFilter = ['Movies']
      newStart = 'Invalid date'
      newEnd = moment().format('YYYY-MM-DD')
      newView = 'Scheduled'
    } else if (currentPreset ===  'Movies To Watch') {
      newCategoryFilter = ['Movies']
      newView = 'Unscheduled'
      newStart = 'Invalid date'
      newEnd = moment().format('YYYY-MM-DD')
    } else if (currentPreset ===  'All Past') {
        newStart = 'Invalid date'
        newEnd = moment().format('YYYY-MM-DD')
    } else if (currentPreset ===  'All Future') {

    } 
    // moment(this.props.startDate).toISOString()
    this.props.handlePresetChange(currentPreset, newStart, newEnd, newCategoryFilter, newView);
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
          <ListAltIcon />
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
          {this.state.currentPresets.map((currentPreset, i) => (
            <MenuItem
              key={i}
              selected={this.props.currentPreset === currentPreset}
              value={currentPreset}
              onClick={() => this.handleClick(currentPreset)}
              >
              {currentPreset}
            </MenuItem>
          ))}
          </Menu>
        </React.Fragment>
    )
  }
}

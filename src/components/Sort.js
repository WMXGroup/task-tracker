import React, { Component } from 'react';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  whiteColor: {
    color: 'white',
  }
});

class Sort extends Component {

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
  }
  render() {

    const {
      classes,
      currentSort,
      handleSortChange
    } = this.props;

    return (
      <FormControl >
        <Select
          disableUnderline
          classes={{
            root: classes.whiteColor,
            icon: classes.whiteColor,
          }}
          value={currentSort}
          onChange={handleSortChange}
          label="Sort"
        >
          {this.state.sortOptions.map((sortOption, i) => (
            <MenuItem
              key={i}
              value={sortOption}
              >
              {sortOption}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    )
  }
}

export default withStyles(styles)(Sort)
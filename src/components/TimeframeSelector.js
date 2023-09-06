import React, { Component } from 'react';
import IconButton from '@material-ui/core/IconButton';
import DateRange from '@material-ui/icons/DateRange';
import Menu from '@material-ui/core/Menu';
import Typography from '@material-ui/core/Typography';
import DateFnsUtils from '@date-io/date-fns';
import MenuItem from '@material-ui/core/MenuItem';
import moment from 'moment';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

const styles = {
  fieldStyle:{
    width:'700px',
    // margin: '5px',
  },
  fieldLabel: {
    alignContent: 'center',
    minWidth: '90px',
    maxWidth: '90px'
  },
  fieldContainer: {
    display: 'flex',
    width:'270px',
    alignContent: 'center',
    alignItems: 'center',
    margin: '.5rem',
  },
  dateContainer: {
    display: 'flex',
    alignContent: 'center',
    alignItems: 'center',
    padding: 0,
    margin: 0
  },
};

export default class TimeframeSelector extends Component {

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
    }, () => this.props.handleTimeframeChange());
  };

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
          <div style={styles.fieldContainer}>
            <Typography style={styles.fieldLabel}>
              Start Date
            </Typography>
            <div style={styles.dateContainer}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  disableToolbar
                  autoOk={true}
                  variant="inline"
                  format="yyyy-MM-dd"
                  value={moment(this.props.startDate).toISOString()}
                  onChange={(e) => this.props.dateChange(e,'startDate')}
                  KeyboardButtonProps={{
                    'aria-label': 'change date',
                  }}
                  inputVariant="outlined"
                  InputProps={{
                    style: styles.dateStyle
                  }}
                  />
              </MuiPickersUtilsProvider>
            </div>
          </div>
          <div style={styles.fieldContainer}>
            <Typography style={styles.fieldLabel}>
              End Date
            </Typography>
            <div style={styles.dateContainer}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  disableToolbar
                  autoOk={true}
                  variant="inline"
                  format="yyyy-MM-dd"
                  value={moment(this.props.endDate).toISOString()}
                  onChange={(e) => this.props.dateChange(e,'endDate')}
                  KeyboardButtonProps={{
                    'aria-label': 'change date',
                  }}
                  inputVariant="outlined"
                  InputProps={{
                    style: styles.dateStyle
                  }}
                  />
              </MuiPickersUtilsProvider>
            </div>
          </div>
          </Menu>
        </React.Fragment>
    )
  }
}

import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Button from '@material-ui/core/Button';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import moment from 'moment';

const styles = {
  fieldLabel: {
    alignContent: 'center',
    minWidth: '90px',
    maxWidth: '90px'
  },
  fieldContainer: {
    display: 'flex',
    alignContent: 'center',
    alignItems: 'center',
    margin: '.5rem',
  },
  inputStyle: {
    paddingLeft: '15px',
    paddingTop: '10px',
    paddingBottom: '10px'
  },
  dateStyle: {
    height: '40px',
    padding: 0
  },
  dateContainer: {
    display: 'flex',
    alignContent: 'center',
    alignItems: 'center',
    padding: 0,
    margin: 0
  },
  buttonContainer: {
    display: 'flex',
    alignContent: 'left',
    alignItems: 'left',
    justifyContent: 'left',
  },
  buttonStyle: {
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '5px'
  },
  headerName: {
    color: '#aaa',
    margin: '10px',
  },
  headerClose: {
    margin: '10px',
    color: '#aaa',
  },
  headerContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '10px'
  },
  dialogContainer: {
    marginBottom: '70px'
  },
};

export default class LogDetail extends Component {

  state = {
    logId: this.props.type === 'Edit'? this.props.logDetails.logId : '',
    logDate: this.props.type === 'Edit'? this.props.logDetails.logDate : '',
    logText:  this.props.type === 'Edit'? this.props.logDetails.logText : '',
    logValue: this.props.type === 'Edit'? this.props.logDetails.logValue : '',
  }

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  uuidv4 = () => {
    return Math.random().toString(36).substring(2) + Date.now().toString(36);
  }

  dateChange = (e) => {
    this.setState({
      logDate: moment(e).format('MM/DD/YYYY'),
    })
  }

  render() {

    return (
      <div style={styles.dialogContainer}>
        <div style={styles.headerContainer}> 
          <div style={styles.headerName}>
            <Typography variant="h5">
                Log Management
            </Typography>
          </div>
          <div style={styles.headerClose}>
            <IconButton
              onClick={() => this.props.toggleDisplay('Details')}
              size='small'
              >
              <CloseIcon />
            </IconButton>
          </div>
        </div>
        <div style={styles.fieldContainer}>
          <Typography style={styles.fieldLabel}>
            Log Date
          </Typography>
          <div style={styles.dateContainer}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                disableToolbar
                autoOk={true}
                variant="inline"
                format="MM/dd/yyyy"
                value={this.state.logDate}
                onChange={(e) => this.dateChange(e)}
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
            Log Text
          </Typography>
          <TextField 
            style={styles.fieldStyle}
            name='logText'
            variant="outlined"
            InputProps={{
              style: styles.inputStyle
            }}
            onChange={this.onChange}
            value={this.state.logText}
            multiline
          />
        </div>
        <div style={styles.fieldContainer}>
          <Typography style={styles.fieldLabel}>
            Log Value
          </Typography>
          <TextField 
            style={styles.fieldStyle}
            name='logValue'
            variant="outlined"
            InputProps={{
              style: styles.inputStyle
            }}
            onChange={this.onChange}
            value={this.state.logValue}
            multiline
          />
        </div>
        {this.props.type === "Add" && 
          <div style={styles.buttonContainer}>
            <React.Fragment>
              <div style={styles.buttonStyle}>
                <Button 
                  style={styles.buttonStyle}
                  variant="contained"
                  color="primary"
                  onClick={() => this.props.addLog({
                    logId: this.uuidv4(),
                    logDate: this.state.logDate,
                    logText: this.state.logText,
                    logValue: this.state.logValue,
                  })}
                  >
                  Add
                </Button>
              </div>
            </React.Fragment>
          </div>
        }
        {this.props.type === "Edit" && 
          <div style={styles.buttonContainer}>
            <React.Fragment>
              <div style={styles.buttonStyle}>
                <Button 
                  style={styles.buttonStyle}
                  variant="contained"
                  color="primary"
                  onClick={() => this.props.saveLog(this.state.logId, {
                    logId: this.state.logId,
                    logDate: this.state.logDate,
                    logText: this.state.logText,
                    logValue: this.state.logValue,
                  })}
                  >
                  Save
                </Button>
              </div>
            </React.Fragment>
          </div>
        }
      </div>
    )
  }
}

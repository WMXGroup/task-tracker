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

export default class AddRelatedList extends Component {

  state = {
    listId: ''
  }

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSave = () => {
    this.props.addListValue(this.state.listId);
    this.props.toggleDisplay('Tasks');
  }

  render() {

    return (
      <div style={styles.dialogContainer}>
        <div style={styles.headerContainer}> 
          <div style={styles.headerName}>
            <Typography variant="h5">
                Add Releated List
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
            List Id
          </Typography>
          <TextField 
            style={styles.fieldStyle}
            name='listId'
            variant="outlined"
            InputProps={{
              style: styles.inputStyle
            }}
            onChange={this.onChange}
            value={this.state.listId}
            multiline
          />
        </div>
        <div style={styles.buttonContainer}>
          <React.Fragment>
            <div style={styles.buttonStyle}>
              <Button 
                style={styles.buttonStyle}
                variant="contained"
                color="primary"
                onClick={() => this.handleSave()}
                >
                Save
              </Button>
            </div>
          </React.Fragment>
        </div>
      </div>
    )
  }
}

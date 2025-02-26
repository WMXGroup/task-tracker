import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
  KeyboardTimePicker,
} from '@material-ui/pickers';
import moment from 'moment';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import ArrowBack from '@material-ui/icons/ArrowBack';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';

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
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
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
    padding: '10px'
  },
  dialogContainer: {
    marginBottom: '70px'
  },
  paperContainer: {
    height: '160px',
    padding: 0,
    width: 400,
    overflow: 'auto'
  },
};

export default class DetailModal extends Component {

  state = {
    id: this.props.mode === 'Edit'? this.props.taskDetails.id : this.props.uuidv4(),
    description:  this.props.mode === 'Edit'? this.props.taskDetails.description : '',
    category: this.props.mode === 'Edit'? this.props.taskDetails.category : '',
    priority: this.props.mode === 'Edit'? this.props.taskDetails.priority : '',
    dates: this.props.mode === 'Edit'? this.props.taskDetails.dates : [],
    notes: this.props.mode === 'Edit'? this.props.taskDetails.notes : '',
    type: this.props.mode === 'Edit'? this.props.taskDetails.type : '',
    frequency: this.props.mode === 'Edit'? this.props.taskDetails.frequency : 'One-time',
    recurDays: this.props.mode === 'Edit'? this.props.taskDetails.recurDays : 0,
    recurStart: this.props.mode === 'Edit'? this.props.taskDetails.recurStart : '',
    recurEnd:this.props.mode === 'Edit'? this.props.taskDetails.recurEnd : '',
    isUpdating: false,
    newDate: '',
    newState: '',
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    this.sortCompleted();
  }

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  sortCompleted = () => {
    const newCompleted = this.state.dates.sort((a, b) => new Date(b.date) - new Date(a.date));
    this.setState({
      dates: newCompleted,
    })
  }

  onAutoChange = (e, newValue, fieldName) => {
    this.setState({
      [fieldName]: newValue
    });
  }

  onCheck = () => {
    // this.setState({
    //   isActive: !this.state.isActive
    // })
  }

  onDateSelection = (e, date) => {
    this.setState({
      newDate: date.date,
      newState: date.state
    })
  }

  addTask = () => {
    const { taskDetails } = this.props
    let iDate = this.state.recurStart
    let newDates = []
    let finalDates = []
    if (this.state.recurDays !== 0 && this.state.recurStart !== '' && taskDetails.recurEnd !== '') {
      // remove future data
      const oldDates = this.state.dates.filter((item) => moment(item.date).format('YYYY-MM-DD') < moment().format('YYYY-MM-DD'));
      // create new dates
      do {
        newDates.push({
          date: iDate,
          state: 'open',
        })
        iDate = moment(iDate).add(this.state.recurDays,'days').format('YYYY-MM-DD')
      } while (iDate < this.state.recurEnd);
      // merge
      finalDates = [...oldDates,...newDates]

    } else {
      finalDates = this.state.dates
    }

    this.props.createTask({
      id: this.state.id,
      description: this.state.description,
      category: this.state.category,
      priority: this.state.priority,
      dates: finalDates,
      notes: this.state.notes,
      type: this.state.type,
      frequency: this.state.frequency,
      recurDays: this.state.recurDays,
      recurStart: this.state.recurStart,
      recurEnd: this.state.recurEnd,
    });
    this.props.toggleDisplay('Tasks');
  }

  saveCurrentTask = () => {
    const { taskDetails } = this.props
    let iDate = this.state.recurStart
    let newDates = []
    let finalDates = []
    if (taskDetails.recurDays !== this.state.recurDays || taskDetails.recurStart !== this.state.recurStart || taskDetails.recurEnd !== this.state.recurEnd) {
      // remove future data
      const oldDates = taskDetails.dates.filter((item) => moment(item.date).format('YYYY-MM-DD') < moment().format('YYYY-MM-DD'));
      // create new dates
      do {
        newDates.push({
          date: iDate,
          state: 'open',
        })
        iDate = moment(iDate).add(this.state.recurDays,'days').format('YYYY-MM-DD')
      } while (iDate < this.state.recurEnd);
      // merge
      finalDates = [...oldDates,...newDates]

    } else {
      finalDates = this.state.dates
    }

    this.props.saveTask(this.state.id, {
      id: this.state.id,
      description: this.state.description,
      category: this.state.category,
      priority: this.state.priority,
      dates: finalDates,
      notes: this.state.notes,
      type: this.state.type,
      frequency: this.state.frequency,
      recurDays: this.state.recurDays,
      recurStart: this.state.recurStart,
      recurEnd: this.state.recurEnd,
    });
    this.props.toggleDisplay('Tasks');
  }

  deleteCurrentTask = () => {
    this.props.deleteTask(this.state.id);
    this.props.toggleDisplay('Tasks');
  }

  handleDeleteCompleted = (id) => {
    const newCompleted = this.state.dates.filter((item) => item.completedId !== id)
    this.setState({
      dates: newCompleted,
    });
  }

  saveDate = (date) => {
    const newCompleted = this.state.taskDetails.dates.filter((item) => item.date !== date)
    let newTaskDetails = this.state.taskDetails;
    newTaskDetails.dates = [...newCompleted, date];
    this.setState({ 
      taskDetails: newTaskDetails,
    })
  }

  upsertDate = () => {
    let curDates = this.state.dates;
    if(curDates.some(item => item.date === this.state.newDate)) {
      const newDates = this.state.dates.map ((item, i) => {
        if (item.date === this.state.newDate) {
          item.state = this.state.newState
        }
        return item
      })
      this.setState({ 
        dates: newDates
      })
    } else {
        const newDates = [...curDates, {
          date: this.state.newDate,
          state: this.state.newState,
      }]
      this.setState({ 
        dates: newDates,
      })
    }
  }

  dateChange = (e, field) => {
    this.setState({
      [field]: moment(e).format('YYYY-MM-DD'),
    })
  }

  deleteDate = (date) => {
    const newDates = this.state.dates.filter((value) => value.date !== date)
    this.setState({ 
      dates: newDates
    })
  }

  render() {
    const {
      mode,
      categories,
      toggleDisplay
    } = this.props;

    return (
      <div style={styles.dialogContainer}>
        <div style={styles.headerContainer}>
          <div style={styles.headerClose}>
              <IconButton
                onClick={() => toggleDisplay('Tasks')}
                size='small'
                >
                <ArrowBack />
              </IconButton>
            </div> 
          <div style={styles.headerName}>
            <Typography variant="h5">
                Task Management
            </Typography>
          </div>
        </div>
        <div style={styles.fieldContainer}>
          <Typography style={styles.fieldLabel}>
            Description
          </Typography>
          <TextField 
            style={styles.fieldStyle}
            name='description'
            variant="outlined"
            InputProps={{
              style: styles.inputStyle
            }}
            onChange={this.onChange}
            value={this.state.description}
            multiline
          />
        </div>
        <div style={styles.fieldContainer}>
          <Typography style={styles.fieldLabel}>
            Category
          </Typography>
          <Autocomplete
            size='small'
            style={styles.fieldStyle}
            options={categories}
            defaultValue={this.state.category}
            getOptionLabel={(option) => typeof option === 'string' ? option : option.category}
            renderInput={(params) => <TextField {...params} variant="outlined" />}
            freeSolo
            inputValue={this.state.category}
            onInputChange={(e, newValue) => this.onAutoChange(e, newValue, 'category')}
            />
        </ div>
        <div style={styles.fieldContainer}>
          <Typography style={styles.fieldLabel}>
            Type
          </Typography>
          <Autocomplete
            options={['Deadline','Event','Floating','Periodic','Tracking']}
            defaultValue={this.state.type}
            getOptionLabel={(option) => typeof option === 'string' ? option : option.type}
            style={styles.fieldStyle}
            size='small'
            renderInput={(params) => <TextField {...params} variant="outlined" />}
            inputValue={this.state.type}
            onInputChange={(e, newValue) => this.onAutoChange(e, newValue, 'type')}
            />
        </ div>
        <div style={styles.fieldContainer}>
          <Typography style={styles.fieldLabel}>
            Frequency
          </Typography>
          <Autocomplete
            options={['One-time','Daily','Weekly','Ongoing','Recurring']}
            defaultValue={this.state.frequency}
            getOptionLabel={(option) => typeof option === 'string' ? option : option.frequency}
            style={styles.fieldStyle}
            size='small'
            renderInput={(params) => <TextField {...params} variant="outlined" />}
            inputValue={this.state.frequency}
            onInputChange={(e, newValue) => this.onAutoChange(e, newValue, 'frequency')}
            />
        </ div>
        {(this.state.frequency === 'Recurring' || this.state.frequency === 'Daily' || this.state.frequency === 'Weekly') &&
          <div>
            <div style={styles.fieldContainer}>
              <Typography style={styles.fieldLabel}>
                Recurring Days
              </Typography>
              <TextField 
                style={styles.fieldStyle}
                name='recurDays'
                type="number"
                variant="outlined"
                InputProps={{
                  style: styles.inputStyle
                }}
                onChange={this.onChange}
                value={this.state.recurDays}
                multiline
              />
            </div>
            <div style={styles.fieldContainer}>
              <Typography style={styles.fieldLabel}>
                Recurring Start
              </Typography>
              <div style={styles.dateContainer}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    disableToolbar
                    autoOk={true}
                    variant="inline"
                    format="yyyy-MM-dd"
                    value={moment(this.state.recurStart).toISOString()}
                    onChange={(e) => this.dateChange(e, 'recurStart')}
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
                Recurring End
              </Typography>
              <div style={styles.dateContainer}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    disableToolbar
                    autoOk={true}
                    variant="inline"
                    format="yyyy-MM-dd"
                    value={moment(this.state.recurEnd).toISOString()}
                    onChange={(e) => this.dateChange(e, 'recurEnd')}
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
          </div>
        }
        <div style={styles.fieldContainer}>
          <Typography style={styles.fieldLabel}>
            Priority
          </Typography>
          <TextField 
            style={styles.fieldStyle}
            name='priority'
            type="number"
            variant="outlined"
            InputProps={{
              style: styles.inputStyle
            }}
            onChange={this.onChange}
            value={this.state.priority}
            multiline
          />
        </div>
        <div style={styles.fieldContainer}>
          <Typography style={styles.fieldLabel}>
            Notes
          </Typography>
          <TextField 
            style={styles.fieldStyle}
            name='notes'
            variant="outlined"
            InputProps={{
              style: styles.inputStyle
            }}
            onChange={this.onChange}
            value={this.state.notes}
            multiline
          />
        </div>
        <div style={styles.fieldContainer}>
          <Typography style={styles.fieldLabel}>
            Dates
          </Typography>
          <Paper 
            variant="outlined" 
            style={styles.paperContainer}>
            <List>
              {
                this.state.dates.map((date) => (
                  <ListItem 
                  button
                  onClick={(e) => this.onDateSelection(e, date)}
                  >
                    Date: {date.date}, State: {date.state}
                    <ListItemSecondaryAction>
                      <IconButton 
                        edge="end" 
                        aria-label="delete"
                        onClick={() => {this.deleteDate(date.date)}}>
                        <CloseIcon />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                ))
              }
            </List>
          </Paper>
        </div>
        <div style={styles.fieldContainer}>
          <Typography style={styles.fieldLabel}>
            New Date
          </Typography>
          <div style={styles.dateContainer}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                disableToolbar
                autoOk={true}
                variant="inline"
                format="yyyy-MM-dd"
                value={moment(this.state.newDate).toISOString()}
                onChange={(e) => this.dateChange(e, 'newDate')}
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
            New State
          </Typography>
          <Autocomplete
            options={['open','closed']}
            getOptionLabel={(option) => typeof option === 'string' ? option : option.newState}
            style={styles.fieldStyle}
            size='small'
            value={this.state.newState}
            renderInput={(params) => <TextField {...params} variant="outlined" />}
            //inputValue={this.state.newState}
            onInputChange={(e, newValue) => this.onAutoChange(e, newValue, 'newState')}
            />
        </ div>
        <div style={styles.fieldContainer}>
          <div style={styles.buttonStyle}>
            <Button 
              style={styles.buttonStyle}
              variant="contained"
              color="primary"
              onClick={() => this.upsertDate()}
              >
              Upsert
            </Button>
          </div>
        </div>
        <div style={styles.buttonContainer}>
          {mode === 'Add' &&
            <div style={styles.buttonStyle}>
              <Button 
                style={styles.buttonStyle}
                variant="contained"
                color="primary"
                onClick={this.addTask}
                >
                Add
              </Button>
            </div>
          }
          {mode === 'Edit' &&
            <React.Fragment>
              <div style={styles.buttonStyle}>
                <Button 
                  style={styles.buttonStyle}
                  variant="contained"
                  color="primary"
                  onClick={this.saveCurrentTask}
                  >
                  Save
                </Button>
              </div>
              <div style={styles.buttonStyle}>
                <Button 
                  style={styles.buttonStyle}
                  variant="contained"
                  color="primary"
                  onClick={this.deleteCurrentTask}
                  >
                  Delete
                </Button>
              </div>
            </React.Fragment>
          }
        </div>
      </div>
    )
  }
}

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
    justifyContent: 'space-between',
    padding: '10px'
  },
  dialogContainer: {
    marginBottom: '70px'
  },
  paperContainer: {
    height: '80px',
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
    subCategory: this.props.mode === 'Edit'? this.props.taskDetails.subCategory : '',
    status: this.props.mode === 'Edit'? this.props.taskDetails.status : '',
    dueDate: this.props.mode === 'Edit'? this.props.taskDetails.dueDate : moment().format('YYYY-MM-DD'),
    hours: this.props.mode === 'Edit'? this.props.taskDetails.hours : 0,
    weeklyGoal: this.props.mode === 'Edit'? this.props.taskDetails.weeklyGoal : 0,
    priority: this.props.mode === 'Edit'? this.props.taskDetails.priority : '',
    assigned: this.props.mode === 'Edit'? this.props.taskDetails.assigned : '',
    contact: this.props.mode === 'Edit'? this.props.taskDetails.contact : '',
    workTime: this.props.mode === 'Edit'? this.props.taskDetails.workTime : [],
    tags: this.props.mode === 'Edit'? this.props.taskDetails.tags : [],
    completedDates: this.props.mode === 'Edit'? this.props.taskDetails.completedDates : [],
    notes: this.props.mode === 'Edit'? this.props.taskDetails.notes : '',
    type: this.props.mode === 'Edit'? this.props.taskDetails.type : 'One-time',
    recurDays: this.props.mode === 'Edit'? this.props.taskDetails.recurDays : 0,
    isUpdating: false,
    startTime: this.props.mode === 'Edit'? this.props.taskDetails.startTime : '12:00 AM',
    points: this.props.mode === 'Edit'? this.props.taskDetails.points : '',
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
    const newCompleted = this.state.completedDates.sort((a, b) => new Date(b.completedDate) - new Date(a.completedDate));
    console.log('Test', newCompleted);
    this.setState({
      completedDates: newCompleted,
    })

  }

  dateChange = (e) => {
    this.setState({
      dueDate: moment(e).format('YYYY-MM-DD'),
    })
  }

  startTimeChange = (e) => {
    this.setState(({
      startTime: moment(e)
    }))
  }

  onAutoChange = (e, newValue, fieldName) => {
    this.setState({
      [fieldName]: newValue
    });
  }

  onStatusChange = (e, newValue, fieldName) => {
    const {
      type,
      dueDate,
      recurDays,
      isUpdating,
      completedDates
    } = this.state
    if (isUpdating === false) {
      if (newValue === 'Completed') {
        let curDueDate = dueDate === undefined ? moment().format('YYYY-MM-DD') : dueDate;
        let curRecurDays = recurDays === undefined ? 0 : recurDays;
        if (type === 'Recurring' || type === 'Habit') {
          this.setState({
            isUpdating: true,
            status: 'Not Started',
            recurDays: curRecurDays,
            dueDate: moment(curDueDate).add(curRecurDays, 'days').format('YYYY-MM-DD'),
            completedDates: [...completedDates,
              {
              completedId: this.props.uuidv4(),
              completedDate: moment(curDueDate).format('YYYY-MM-DD'),
              hours: 0
              }
            ],
          }, ()=> {
            this.setState({ 
              isUpdating: false,
            }, () => this.saveCurrentTask())
          });
        } else if (type === 'One-time') {
          this.setState({
            isUpdating: true,
            status: 'Completed',
            dueDate: curDueDate,
            completedDates: [{
              completedId: this.props.uuidv4(),
              completedDate: moment(curDueDate).format('YYYY-MM-DD'),
              hours: 0
              }],
          }, ()=> {
            this.setState({ 
              isUpdating: false,
            }, () => this.saveCurrentTask())
          })
        }
      } else {
        this.setState({
          [fieldName]: newValue,
        })
      }
    }

  }

  onCheck = () => {
    // this.setState({
    //   isActive: !this.state.isActive
    // })
  }

  addTask = () => {
    this.props.createTask({
      id: this.state.id,
      description: this.state.description,
      category: this.state.category,
      subCategory: this.state.subCategory,
      status: this.state.status,
      dueDate: this.state.dueDate,
      hours: this.state.hours,
      weeklyGoal: this.state.weeklyGoal,
      priority: this.state.priority,
      assigned: this.state.assigned,
      contact: this.state.contact,
      workTime: this.state.workTime,
      tags: this.state.tags,
      completedDates: this.state.completedDates,
      notes: this.state.notes,
      type: this.state.type,
      recurDays: this.state.recurDays,
      startTime: this.state.startTime,
      points: this.state.points,
    });
    this.props.toggleDisplay('Tasks');
  }

  saveCurrentTask = () => {
    this.props.saveTask(this.state.id, {
      id: this.state.id,
      description: this.state.description,
      category: this.state.category,
      subCategory: this.state.subCategory,
      status: this.state.status,
      dueDate: this.state.dueDate,
      hours: this.state.hours,
      weeklyGoal: this.state.weeklyGoal,
      priority: this.state.priority,
      assigned: this.state.assigned,
      contact: this.state.contact,
      workTime: this.state.workTime,
      tags: this.state.tags,
      completedDates: this.state.completedDates,
      notes: this.state.notes,
      type: this.state.type,
      recurDays: this.state.recurDays,
      startTime: this.state.startTime,
      points: this.state.points,
    });
    this.props.toggleDisplay('Tasks');
  }

  deleteCurrentTask = () => {
    this.props.deleteTask(this.state.id);
    this.props.toggleDisplay('Tasks');
  }

  handleTimeChange = (value) => {
    this.setState({
      startTime: moment(value).format('hh:mm A'),
    })
  };

  handleDeleteCompleted = (id) => {
    const newCompleted = this.state.completedDates.filter((item) => item.completedId !== id)
    this.setState({
      completedDates: newCompleted,
    });
  }

  render() {
    const {
      mode,
      categories,
      subcategories,
      assignedUsers,
      contactUsers,
      toggleDisplay
    } = this.props;

    return (
      <div style={styles.dialogContainer}>
        <div style={styles.headerContainer}> 
          <div style={styles.headerName}>
            <Typography variant="h5">
                Task Management
            </Typography>
          </div>
          <div style={styles.headerClose}>
            <IconButton
              onClick={() => toggleDisplay('Tasks')}
              size='small'
              >
              <CloseIcon />
            </IconButton>
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
            Sub Category
          </Typography>
          <Autocomplete
            size='small'
            style={styles.fieldStyle}
            options={subcategories}
            defaultValue={this.state.subCategory}
            getOptionLabel={(option) => typeof option === 'string' ? option : option.subCategory}
            renderInput={(params) => <TextField {...params} variant="outlined" />}
            freeSolo
            inputValue={this.state.subCategory}
            onInputChange={(e, newValue) => this.onAutoChange(e, newValue, 'subCategory')}
            />
        </ div>
        <div style={styles.fieldContainer}>
          <Typography style={styles.fieldLabel}>
            Type
          </Typography>
          <Autocomplete
            options={['One-time','Recurring','Habit','Activity','Time-block', 'Event']}
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
            Status
          </Typography>
          <Autocomplete
            options={['Not Started','In Progress','On Hold','Completed']}
            defaultValue={this.state.status}
            getOptionLabel={(option) => typeof option === 'string' ? option : option.status}
            style={styles.fieldStyle}
            size='small'
            renderInput={(params) => <TextField {...params} variant="outlined" />}
            inputValue={this.state.status}
            onInputChange={(e, newValue) => this.onStatusChange(e, newValue, 'status')}
            />
        </ div>
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
            Due Date
          </Typography>
          <div style={styles.dateContainer}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                disableToolbar
                autoOk={true}
                variant="inline"
                format="yyyy-MM-dd"
                value={moment(this.state.dueDate).toISOString()}
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
            Start Time
          </Typography>
          <div style={styles.dateContainer}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardTimePicker
                disableToolbar
                autoOk={true}
                variant="inline"
                helperText={''}
                error={false}
                placeholder="12:00 AM"
                mask="__:__ _M"
                value={moment('01/01/2000' + ' ' + this.state.startTime)}
                onChange={date => this.handleTimeChange(date)}
                KeyboardButtonProps={{
                  'aria-label': 'change time',
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
            Hours
          </Typography>
          <TextField 
            style={styles.fieldStyle}
            name='hours'
            type="number"
            variant="outlined"
            InputProps={{
              style: styles.inputStyle
            }}
            onChange={this.onChange}
            value={this.state.hours}
            multiline
          />
        </div>
        <div style={styles.fieldContainer}>
          <Typography style={styles.fieldLabel}>
            Weekly Goal
          </Typography>
          <TextField 
            style={styles.fieldStyle}
            name='weeklyGoal'
            type="number"
            variant="outlined"
            InputProps={{
              style: styles.inputStyle
            }}
            onChange={this.onChange}
            value={this.state.weeklyGoal}
            multiline
          />
        </div>
        <div style={styles.fieldContainer}>
          <Typography style={styles.fieldLabel}>
            Points
          </Typography>
          <TextField 
            style={styles.fieldStyle}
            name='points'
            type="number"
            variant="outlined"
            InputProps={{
              style: styles.inputStyle
            }}
            onChange={this.onChange}
            value={this.state.points}
            multiline
          />
        </div>
        <div style={styles.fieldContainer}>
          <Typography style={styles.fieldLabel}>
            Assigned
          </Typography>
          <Autocomplete
            options={assignedUsers}
            defaultValue={this.state.assigned}
            getOptionLabel={(option) => typeof option === 'string' ? option : option.assigned}
            style={styles.fieldStyle}
            size='small'
            renderInput={(params) => <TextField {...params} variant="outlined" />}
            freeSolo
            inputValue={this.state.assigned}
            onInputChange={(e, newValue) => this.onAutoChange(e, newValue, 'assigned')}
            />
        </ div>
        <div style={styles.fieldContainer}>
          <Typography style={styles.fieldLabel}>
            Contact
          </Typography>
          <Autocomplete
            options={contactUsers}
            defaultValue={this.state.contact}
            getOptionLabel={(option) => typeof option === 'string' ? option : option.contact}
            style={styles.fieldStyle}
            size='small'
            renderInput={(params) => <TextField {...params} variant="outlined" />}
            freeSolo
            inputValue={this.state.contact}
            onInputChange={(e, newValue) => this.onAutoChange(e, newValue, 'contact')}
            />
        </div>
        {/* <div style={styles.fieldContainer}>
          <Typography style={styles.fieldLabel}>
            Active
          </Typography>
          <Checkbox
            checked={this.state.isActive}
            name='isActive'
            onChange={this.onCheck}
            color="primary"
            size='small'
          />
        </div> */}
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
            Completed Dates
          </Typography>
          <Paper 
            variant="outlined" 
            style={styles.paperContainer}>
            <List>
              {
                this.state.completedDates.map((date) => (
                  <ListItem 
                  button
                  onClick={() => this.props.launchEditCompleted(this.state, date)}
                  >
                    Date: {date.completedDate}, Hours: {date.hours}
                    <ListItemSecondaryAction>
                      <IconButton 
                        edge="end" 
                        aria-label="delete"
                        onClick={() => this.handleDeleteCompleted(date.completedId)}>
                        <CloseIcon />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                ))
              }
            </List>
          </Paper>
          <div style={styles.buttonStyle}>
              <Button 
                style={styles.buttonStyle}
                variant="contained"
                color="primary"
                onClick={() => this.props.launchNewCompleted(this.state)}
                >
                +
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

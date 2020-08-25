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
} from '@material-ui/pickers';
import moment from 'moment';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

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
};

export default class DetailModal extends Component {

  state = {
    id: this.props.type === 'Edit'? this.props.taskDetails.id : '',
    description:  this.props.type === 'Edit'? this.props.taskDetails.description : '',
    category: this.props.type === 'Edit'? this.props.taskDetails.category : '',
    status: this.props.type === 'Edit'? this.props.taskDetails.status : '',
    dueDate: this.props.type === 'Edit'? this.props.taskDetails.dueDate : moment().format('MM/DD/YYYY'),
    actual: this.props.type === 'Edit'? this.props.taskDetails.actual : 0,
    goal: this.props.type === 'Edit'? this.props.taskDetails.goal : 0,
    priority: this.props.type === 'Edit'? this.props.taskDetails.priority : '',
    assigned: this.props.type === 'Edit'? this.props.taskDetails.assigned : '',
    contact: this.props.type === 'Edit'? this.props.taskDetails.contact : '',
    isActive: this.props.type === 'Edit'? this.props.taskDetails.isActive : true,
    activeDate: this.props.type === 'Edit'? this.props.taskDetails.activeDate : moment().format('MM/DD/YYYY'),
    workTime: this.props.type === 'Edit'? this.props.taskDetails.workTime : [],
    tags: this.props.type === 'Edit'? this.props.taskDetails.tags : [],
    completedDate: this.props.type === 'Edit'? this.props.taskDetails.completedDate : '',
    dueWeek: this.props.type === 'Edit'? this.props.taskDetails.dueweek : moment().startOf('isoweek').format('MM/DD/YYYY'),
    dueMonth: this.props.type === 'Edit'? this.props.taskDetails.dueMonth : moment().format('MMMM YYYY'),
    notes: this.props.type === 'Edit'? this.props.taskDetails.notes : '',
    type: this.props.type === 'Edit'? this.props.taskDetails.type : 'One-time',
    recurDays: this.props.type === 'Edit'? this.props.taskDetails.recurDays : 0,
    isUpdating: false,
    startTime: this.props.type === 'Edit'? this.props.taskDetails.startTime : moment({hour: 5}),
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  dateChange = (e) => {
    this.setState({
      dueDate: moment(e).format('MM/DD/YYYY'),
      dueWeek: moment(e).startOf('week').format('MM/DD/YYYY'),
      dueMonth: moment(e).format('MMMM YYYY'),
    })
  }

  activeDateChange = (e) => {
    this.setState({
      activeDate: moment(e).format('MM/DD/YYYY'),
      isActive: e = '' ? this.state.isActive : moment().format('YYYY-MM-DD') >= moment(e).format('YYYY-MM-DD') ? true : moment(e).format('YYYY-MM-DD')  > moment().format('YYYY-MM-DD') ? false : this.state.isActive
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
      activeDate,
      recurDays,
      isUpdating
    } = this.state
    if (isUpdating === false) {
      if (newValue === 'Completed') {
        if (type === 'Recurring') {
          this.setState({
            isUpdating: true,
            status: '',
            completedDate: '',
            dueDate: moment(dueDate).add(recurDays, 'days').format('MM/DD/YYYYY'),
            dueWeek: moment(dueDate).add(recurDays, 'days').startOf('week').format('MM/DD/YYYY'),
            dueMonth: moment(dueDate).add(recurDays, 'days').format('MMMM YYYY'),
            activeDate: moment(activeDate).add(recurDays, 'days'),
            isActive: moment(activeDate).format('YYYY-MM-DD') < moment().format('YYYY-MM-DD') ? true : false
          }, ()=> {
            this.setState({ 
              isUpdating: false,
            })
          });
        } else if (type === 'One-time') {
          this.setState({
            isUpdating: true,
            completedDate: moment().format('MM/DD/YYYY'),
            status: 'Completed',
            isActive: false
          }, ()=> {
            this.setState({ 
              isUpdating: false,
            })
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
    this.setState({
      isActive: !this.state.isActive
    })
  }

  uuidv4 = () => {
    return Math.random().toString(36).substring(2) + Date.now().toString(36);
  }

  addTask = () => {
    this.props.createTask({
      id: this.uuidv4(),
      description: this.state.description,
      category: this.state.category,
      status: this.state.status,
      dueDate: this.state.dueDate,
      actual: this.state.actual,
      goal: this.state.goal,
      priority: this.state.priority,
      assigned: this.state.assigned,
      contact: this.state.contact,
      isActive: this.state.isActive,
      activeDate: this.state.activeDate,
      workTime: this.state.workTime,
      tags: this.state.tags,
      completedDate: this.state.completedDate,
      dueWeek: this.state.dueWeek,
      dueMonth: this.state.dueMonth,
      notes: this.state.notes,
      type: this.state.type,
      recurDays: this.state.recurDays,
      startTime: this.state.startTime
    });
    this.props.toggleDisplay('Tasks');
  }

  saveCurrentTask = () => {
    this.props.saveTask(this.state.id, {
      id: this.state.id,
      description: this.state.description,
      category: this.state.category,
      status: this.state.status,
      dueDate: this.state.dueDate,
      actual: this.state.actual,
      goal: this.state.goal,
      priority: this.state.priority,
      assigned: this.state.assigned,
      contact: this.state.contact,
      isActive: this.state.isActive,
      activeDate: this.state.activeDate,
      workTime: this.state.workTime,
      tags: this.state.tags,
      completedDate: this.state.completedDate,
      dueWeek: this.state.dueWeek,
      dueMonth: this.state.dueMonth,
      notes: this.state.notes,
      type: this.state.type,
      recurDays: this.state.recurDays,
      startTime: this.state.startTime
    });
    this.props.toggleDisplay('Tasks');
  }

  deleteCurrentTask = () => {
    this.props.deleteTask(this.state.id);
    this.props.toggleDisplay('Tasks');
  }

  render() {
    const {
      type,
      categories,
      assignedUsers,
      contactUsers,
      toggleDisplay
    } = this.props;

    // console.log(this.props)
    // console.log(this.state)

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
            Type
          </Typography>
          <Autocomplete
            options={['One-time','Recurring']}
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
                format="MM/dd/yyyy"
                value={this.state.dueDate}
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
            Active Date
          </Typography>
          <div style={styles.dateContainer}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                disableToolbar
                autoOk={true}
                variant="inline"
                format="MM/dd/yyyy"
                value={this.state.activeDate}
                onChange={(e) => this.activeDateChange(e)}
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
            Actual
          </Typography>
          <TextField 
            style={styles.fieldStyle}
            name='actual'
            type="number"
            variant="outlined"
            InputProps={{
              style: styles.inputStyle
            }}
            onChange={this.onChange}
            value={this.state.actual}
            multiline
          />
        </div>
        <div style={styles.fieldContainer}>
          <Typography style={styles.fieldLabel}>
            Goal
          </Typography>
          <TextField 
            style={styles.fieldStyle}
            name='goal'
            type="number"
            variant="outlined"
            InputProps={{
              style: styles.inputStyle
            }}
            onChange={this.onChange}
            value={this.state.goal}
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
        <div style={styles.fieldContainer}>
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
        <div style={styles.buttonContainer}>
          {type === 'Add' &&
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
          {type === 'Edit' &&
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

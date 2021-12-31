import React, { Component } from 'react';
import Dialog from '@material-ui/core/Dialog';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
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
    // width:'700px',
    margin: '5px',
  },
  buttonStyle: {
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '5px'
  },
  inputStyle: {
    height: '40px',
    paddingLeft: '15px'
  },
};

export default class DetailModalTest extends Component {

  state = {
    id: this.props.type === 'Edit'? this.props.taskDetails.id : '',
    description:  this.props.type === 'Edit'? this.props.taskDetails.description : '',
    category: this.props.type === 'Edit'? this.props.taskDetails.category : '',
    status: this.props.type === 'Edit'? this.props.taskDetails.status : '',
    dueDate: this.props.type === 'Edit'? this.props.taskDetails.dueDate : moment().format('YYYY-MM-DD'),
    actual: this.props.type === 'Edit'? this.props.taskDetails.actual : 0,
    goal: this.props.type === 'Edit'? this.props.taskDetails.goal : 0,
    priority: this.props.type === 'Edit'? this.props.taskDetails.priority : '',
    assigned: this.props.type === 'Edit'? this.props.taskDetails.assigned : '',
    contact: this.props.type === 'Edit'? this.props.taskDetails.contact : '',
    isActive: this.props.type === 'Edit'? this.props.taskDetails.isActive : true,
    workTime: this.props.type === 'Edit'? this.props.taskDetails.workTime : [],
    tags: this.props.type === 'Edit'? this.props.taskDetails.tags : [],
    completedDate: this.props.type === 'Edit'? this.props.taskDetails.completedDate : '',
    dueWeek: this.props.type === 'Edit'? this.props.taskDetails.dueweek : moment().startOf('isoweek').format('YYYY-MM-DD'),
    dueMonth: this.props.type === 'Edit'? this.props.taskDetails.dueMonth : moment().format('MMMM YYYY'),
    notes: this.props.type === 'Edit'? this.props.taskDetails.notes : '',
  }

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  dateChange = (e) => {
    this.setState({
      dueDate: moment(e),
      dueWeek: moment(e).startOf('week').format('YYYY-MM-DD'),
      dueMonth: moment(e).format('MMMM YYYY'),
    })
  }

  onAutoChange = (e, newValue, fieldName) => {
      this.setState({
        [fieldName]: newValue
      });
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
      workTime: this.state.workTime,
      tags: this.state.tags,
      completedDate: this.state.completedDate,
      dueWeek: this.state.dueWeek,
      dueMonth: this.state.dueMonth,
      notes: this.state.notes
    });
    this.props.toggleModal();
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
      workTime: this.state.workTime,
      tags: this.state.tags,
      completedDate: this.state.completedDate,
      dueWeek: this.state.dueWeek,
      dueMonth: this.state.dueMonth,
      notes: this.state.notes
    });
    this.props.toggleModal();
  }

  deleteCurrentTask = () => {
    this.props.deleteTask(this.state.id);
    this.props.toggleModal();
  }

  render() {
    const {
      toggleModal,
      openModal,
      type,
      categories,
      assignedUsers,
      contactUsers,
    } = this.props;

    return (
      <Dialog 
        onClose={() => toggleModal()} 
        open={openModal}
        maxWidth='md'
        fullWidth
        disableBackdropClick
        disableEscapeKeyDown	
        >
        <Grid container>
          <Grid container>
            <Grid item>
              <Typography variant="h5">
                  Task Management
              </Typography>
            </Grid>
            <Grid item>
              <IconButton
                onClick={() => toggleModal()}
                size='small'
                >
                <CloseIcon />
              </IconButton>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item >
              <Typography>
                Description
              </Typography>
            </Grid>
            <Grid item >
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
            </Grid>
          </Grid>
          <Grid container>
            <Grid item>
              <Typography>
                Category
              </Typography>
            </Grid>
            <Grid item>
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
              </Grid>
          </Grid>
          <Grid container>
            <Grid item>
              <Typography>
                Status
              </Typography>
            </Grid>
            <Grid item>
              <Autocomplete
                options={['Not Started','In Progress','On Hold','Complete']}
                defaultValue={this.state.status}
                getOptionLabel={(option) => typeof option === 'string' ? option : option.status}
                style={styles.fieldStyle}
                size='small'
                renderInput={(params) => <TextField {...params} variant="outlined" />}
                inputValue={this.state.status}
                onInputChange={(e, newValue) => this.onAutoChange(e, newValue, 'status')}
                />
              </Grid>
          </ Grid>
          <Grid container>
            <Grid item>
              <Typography>
                Priority
              </Typography>
            </Grid>
            <Grid item>
              <Autocomplete
                options={['1','2','3','4','5']}
                defaultValue={this.state.priority}
                getOptionLabel={(option) => typeof option === 'string' ? option : option.priority}
                style={styles.fieldStyle}
                size='small'
                renderInput={(params) => <TextField {...params} variant="outlined" />}
                inputValue={this.state.priority}
                onInputChange={(e, newValue) => this.onAutoChange(e, newValue, 'priority')}
                />
            </Grid>
          </Grid>
          <Grid container>
            <Grid item>
              <Typography>
                Due Date
              </Typography>
            </Grid>
            <Grid item>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  disableToolbar
                  autoOk={true}
                  variant="inline"
                  format="yyyy-MM-dd"
                  margin="normal"
                  value={moment(this.state.dueDate).toISOString()}
                  onChange={(e) => this.dateChange(e)}
                  KeyboardButtonProps={{
                    'aria-label': 'change date',
                  }}
                  inputVariant="outlined"
                  InputProps={{
                    style: styles.inputStyle
                  }}
                  />
              </MuiPickersUtilsProvider>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item>
              <Typography>
                Actual
              </Typography>
            </Grid>
            <Grid item>
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
            </Grid>
          </Grid>
          <Grid container>
            <Grid item>
              <Typography>
                Goal
              </Typography>
            </Grid>
            <Grid item>
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
            </Grid>
          </Grid>
          <Grid container>
            <Grid item>
              <Typography>
                Assigned
              </Typography>
            </Grid>
            <Grid item>
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
            </Grid>
          </ Grid>
          <Grid container>
            <Grid item>
              <Typography>
                Contact
              </Typography>
            </Grid>
            <Grid item>
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
              </Grid>
          </Grid>
          <Grid container>
            <Grid item>
              <Typography>
                Active
              </Typography>
            </Grid>
            <Grid item>
              <Checkbox
                checked={this.state.isActive}
                name='isActive'
                onChange={this.onCheck}
                color="primary"
                size='small'
                />
            </Grid>
          </Grid>
          <Grid container>
            <Grid item>
              <Typography item>
                Notes
              </Typography>
            </Grid>
            <Grid item>
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
            </Grid>
          </Grid>
          <Grid container>
            {type === 'Add' &&
              <Grid item>
                <Button 
                  style={styles.buttonStyle}
                  variant="contained"
                  color="primary"
                  onClick={this.addTask}
                  >
                  Add
                </Button>
              </Grid>
            }
            {type === 'Edit' &&
              <Grid container>
                <Grid item>
                  <Button 
                    style={styles.buttonStyle}
                    variant="contained"
                    color="primary"
                    onClick={this.saveCurrentTask}
                    >
                    Save
                  </Button>
                </Grid>
                <Grid item>
                  <Button 
                    style={styles.buttonStyle}
                    variant="contained"
                    color="primary"
                    onClick={this.deleteCurrentTask}
                    >
                    Delete
                  </Button>
                </Grid>
              </Grid>
            }
            </Grid>
        </Grid>
      </Dialog>
    )
  }
}

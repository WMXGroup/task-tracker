import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Divider from '@material-ui/core/Divider';
import { withStyles } from '@material-ui/core/styles';
import TaskGroup from './TaskGroup';
import TaskDetails from './TaskDetails';
import LogDetail from './LogDetail';
import {tasks} from './TestTasks';
import SortAlt from './SortAlt';
import ActiveFilter from './ActiveFilter';
import CategoryFilter from './CategoryFilter';
import Report from './Report';
import moment from 'moment';
import axios from 'axios';

const styles = theme => ({
  taskContainer: {
    maxWidth: '700px',
    marginBottom: '70px'
  },
  formControl: {
    minWidth: 120,
    margin: '5px',
  },
  addButton: {
    margin: '5px',
    alignContent: 'center',
    fontSize: '17px',
    color: 'white'
  },
  actionBar: {
    display: 'flex'
  },
  appBar: {
    top: 'auto',
    bottom: 0,
  },
  grow: {
    flexGrow: 1,
  },
  fabButton: {
    position: 'absolute',
    zIndex: 1,
    top: -30,
    left: 0,
    right: 0,
    margin: '0 auto',
  },
});

class Main extends Component {

  state = {
    tasks: [],
    headers: [],
    lastSaved: null,
    isLoading: false,
    anchorEl: null,
    setAnchorEl: false,
    currentSort: 'Due Date',
    trackerName: 'Test Title',
    selectedTask: null,
    detailType: null,
    logForm: null,
    logDetails: {},
    categories: [],
    subcategories: [],
    assignedUsers: [],
    contactUsers: [],
    taskDetails: {},
    filterOption: 'Active',
    categoryFilter: 'All',
    display: 'Tasks',
    debugMode: true,
    categoryReport: [],
  }

  componentDidMount = () => {
    if(this.state.debugMode === true){
      this.setState({
        tasks: tasks
      })
    } else {
      this.getServerData();
    };
    
  }

  componentDidUpdate = (prevProps, prevState) => {
    if (this.state.tasks !== prevState.tasks) {
      this.getSortHeaders(this.state.tasks, this.state.currentSort);
      this.getUniqueValues(this.state.tasks, 'category', 'categories');
      this.getUniqueValues(this.state.tasks, 'subCategory', 'subcategories')
      this.getUniqueValues(this.state.tasks, 'assigned', 'assignedUsers');
      this.getUniqueValues(this.state.tasks, 'contact', 'contactUsers');
    }
  }

  fixMissingFields = () => {
    const newTasks = this.state.tasks.map((task) => {
      if (task.weeklyGoal === undefined) {
        task.weeklyGoal = 0
      }
      if (task.hours === undefined) {
        task.hour = 0
      }
      if (task.log === undefined) {
        task.log = []
      }
      if (task.startTime === undefined) {
        task.startTime = null
      }
      if (task.subCategory === undefined) {
        task.subCategory = ''
      }
      return task;
    })
    this.setState({
      tasks: newTasks,
    }, () => this.saveData());
  }

  getServerData = () => {
    let search = window.location.search;
    let params = new URLSearchParams(search);
    let listId = params.get('query');

    if(listId !== undefined && listId !== null){
      this.setState({
        isLoading: true
      },() => {
        axios
        .get(`https://guarded-mesa-76047.herokuapp.com/api/lists/${listId}`)
        .then(res => this.setState({
          trackerName: res.data.listName,
          tasks: res.data.list,
          lastSaved: res.data.lastSaved,
          isLoading: false
        }))
        .then(() => {
          this.activateTasks()
          this.getSortHeaders(this.state.tasks, this.state.currentSort)
          this.getUniqueValues(this.state.tasks, 'category', 'categories')
          this.getUniqueValues(this.state.tasks, 'subCategory', 'subcategories')
          this.getUniqueValues(this.state.tasks, 'assigned', 'assignedUsers')
          this.getUniqueValues(this.state.tasks, 'contact', 'contactUsers')
          this.fixMissingFields()
        })
        }
      )
    }
  }

  saveData = () => {
    this.handleClose();
    let search = window.location.search;
    let params = new URLSearchParams(search);
    let listId = params.get('query');
    const currentDT = new Date();

    if(this.state.debugMode === false){
      if(listId === null){
        axios
        .post(`https://guarded-mesa-76047.herokuapp.com/api/lists/new`, {
          list: this.state.tasks,
          listName: this.state.trackerName,
          lastSaved: new Date()
        })
        .then((res) => {
          alert('New list created!')
          return(res);
        })
        .then((res) => {
          const newId = res.data._id;
          const a = document.createElement("a");
          a.href = `https://wmxgroup.github.io/task-tracker/?query=${newId}`;
          a.click();
        })
      } else {
        axios
        .post(`https://guarded-mesa-76047.herokuapp.com/api/lists/update/${listId}`, {
          list: this.state.tasks,
          listName: this.state.trackerName,
          lastSaved: currentDT
        })
        .then(() => {
          this.setState({
            lastSaved: currentDT
          })
        });
      }
    }
  }

  downloadFile = (content, fileName, contentType) => {
    const a = document.createElement("a");
    const file = new Blob([content], { type: contentType });
    a.href = URL.createObjectURL(file);
    a.download = fileName;
    a.click();
  }

  exportJSON = () => {
    this.handleClose();
    this.downloadFile(JSON.stringify(this.state.tasks), "data.json", "text/plain");
  }

  getFile = (e) => {
    this.handleClose();
    let files = e.target.files;
    let reader = new FileReader();
    reader.readAsText(files[0]);

    reader.onload = e => {
      this.setState({
        tasks: JSON.parse(e.target.result)
      })
    };
  }

  createNew = () => {
    this.handleClose();

    axios
    .post(`https://guarded-mesa-76047.herokuapp.com/api/lists/new`, {
      list: [],
      listName: this.state.trackerName,
      lastSaved: new Date()
    })
    .then((res) => {
      alert('New list created!')
      return(res);
    })
    .then((res) => {
      const newId = res.data._id;

      const a = document.createElement("a");
      a.href = `https://wmxgroup.github.io/task-tracker/?query=${newId}`;
      a.click();
    });
  }

  createTask = (task) => {
    this.setState({ tasks: [...this.state.tasks, task]}, () => this.saveData());
  }

  launchDetails = (type, id) => {
    const taskDetail = this.state.tasks.filter((task) => task.id === id)
    this.setState({
      detailType: type,
      taskDetails: taskDetail[0]
    },
    () => this.toggleDisplay('Details'));
  }

  launchNewTask = () => {
    this.setState({
      detailType: 'Add'
    },
    () => this.toggleDisplay('Details'));
  }

  completeTask = (id) => {
    const newTasks = this.state.tasks.map((task) => {
      if (task.id === id) {
        let curDueDate = task.dueDate;
        let newActiveDate = moment(task.activeDate).add(task.recurDays, 'days').format('MM/DD/YYYY');
        if (task.type === 'Recurring') {
          task.dueDate = moment(curDueDate).add(task.recurDays, 'days').format('MM/DD/YYYY');
          task.dueWeek = moment(curDueDate).add(task.recurDays, 'days').startOf('week').format('MM/DD/YYYY');
          task.dueMonth = moment(curDueDate).add(task.recurDays, 'days').format('MMMM YYYY');
          task.activeDate = moment(task.activeDate).add(task.recurDays, 'days');
          task.isActive = moment(newActiveDate).format('YYYY-MM-DD') < moment().format('YYYY-MM-DD') ? true : false
          task.completedDates = [...task.completedDates, moment(curDueDate).format('MM/DD/YYYY')]
        } else if (task.type === 'One-time') {
          task.completedDate = moment().format('MM/DD/YYYY');
          task.completedDates = [...task.completedDates, moment(curDueDate).format('MM/DD/YYYY')]
          task.status = 'Completed';
          task.isActive = false;
        }
      }
      return task;
    });
    this.setState({
      tasks: newTasks,
    }, () => this.saveData());
  }

  ignoreTask = (id) => {
    const newTasks = this.state.tasks.map((task) => {
      if (task.id === id) {
          task.dueDate = moment(task.dueDate).add(1, 'days').format('MM/DD/YYYY');
          task.dueWeek = moment(task.dueDate).add(1, 'days').startOf('week').format('MM/DD/YYYY');
          task.dueMonth = moment(task.dueDate).add(1, 'days').format('MMMM YYYY');
          task.activeDate = moment(task.activeDate).add(1, 'days').format('MM/DD/YYYY');
          task.isActive = moment(task.activeDate).format('YYYY-MM-DD') <= moment().format('YYYY-MM-DD') ? true : false
      }
      return task;
    });
    this.setState({
      tasks: newTasks,
    }, () => this.saveData());
  }

  makeCurrent = (id) => {
    const newTasks = this.state.tasks.map((task) => {
      if (task.id === id) {
          task.dueDate = moment().format('MM/DD/YYYY');
          task.dueWeek = moment().startOf('week').format('MM/DD/YYYY');
          task.dueMonth = moment().format('MMMM YYYY');
          task.activeDate = moment().format('MM/DD/YYYY');
          task.isActive = true;
      }
      return task;
    });
    this.setState({
      tasks: newTasks,
    }, () => this.saveData());
  }

  activateTasks = () => {
    const newTasks = this.state.tasks.map((task) => {
      if (moment().format('YYYY-MM-DD') >= moment(task.activeDate).format('YYYY-MM-DD') && task.activeDate !== '' && task.status !== 'Completed') {
        task.isActive = true;
      }
      return task;
    });
    this.setState({
      tasks: newTasks,
    }, () => this.saveData());
  }

  saveTask = (id, task) => {
    const newTasks = this.state.tasks.filter((task) => task.id !== id)
    this.setState(
      { tasks: [...newTasks, task],
        completedTasks : task.status === 'completed' ? [...this.state.completedTasks, task] : this.state.completedTasks
      }, () => this.saveData()
      );
  }

  deleteTask = (id) => {
    const newTasks = this.state.tasks.filter((task) => task.id !== id)
    this.setState({
      tasks: newTasks,
    }, () => this.saveData());
  }

  getSortHeaders = (data, keyName) => {
    const lowerKeyName = this.getKeyName(keyName)
    let resArr = [];
    data.filter((item) => {
      let i = resArr.findIndex(x => x === item[lowerKeyName] );
      if(i <= -1){
        resArr.push(item[lowerKeyName]);
      }
      return null;
    });
    resArr.sort();
    this.setState({
      headers: resArr,
      currentSort: keyName,
    })
  }

  getKeyName = (sortName) => {
    let keyName = '';
    switch (sortName) {
      case 'Category':
        keyName = "category";
        break;
      case 'Sub Category':
        keyName = "subCategory";
        break;
      case 'Status':
        keyName = "status";
        break;
      case 'Priority':
        keyName = "priority";
        break;
      case 'Hours':
        keyName = "hours";
        break;
      case 'Start Time':
        keyName = "startTime";
        break;
      case 'Assigned':
        keyName = "assigned";
        break;
      case 'Contact':
        keyName = "contact";
        break;
      case 'Due Date':
        keyName = "dueDate";
        break;
      case 'Due Week':
        keyName = "dueWeek";
        break;
      case 'Due Month':
        keyName = "dueMonth";
        break;
      default:
        keyName = "";
    }
    return keyName;
  }

  getUniqueValues = (data, fieldName, arrayName) => {
    let resArr = [];
    data.filter((item) => {
      let i = resArr.findIndex(x => x === item[fieldName] );
      if(i <= -1){
        resArr.push(item[fieldName]);
      }
      return null;
    });
    resArr.sort((a,b) => (a > b) ? 1 : -1);
    this.setState({
      [arrayName]: resArr
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

  handleTitleChange = (e) => {
    this.setState({
      trackerName: e.target.value
    })
  }

  handleSwitchChange = (e) => {
    this.setState({
      [e.target.name]: e.target.checked
    })
  }

  handleSortChange = (sortOption) => {
    this.getSortHeaders(this.state.tasks, sortOption)
  };

  handleFilterChange = (filterOption) => {
    this.setState({
      filterOption
    })
  };

  handleCategoryFilterChange = (categoryFilter) => {
    this.setState({
      categoryFilter
    })
  };

  toggleDisplay = (displayName) => {
    this.setState({
      display: displayName
    })
  }

  calculatePoints = () => {
    let pointsArray = [];
    const {
      categories,
      tasks,
    } = this.state;

    for (let i = 0; i < categories.length; i++) {
      pointsArray.push({
        category: categories[i],
        totalPoints: 0,
        weeklyPoints: 0,
      })
    }

    for (let i = 0; i < tasks.length; i++) {
      for (let j = 0; j < pointsArray.length; j++) {
        if (pointsArray[j].category === tasks[i].category) {
          pointsArray[j].weeklyPoints += tasks[i].points * ((tasks[i].recurDays === 0 || tasks[i].recurDays === null || tasks[i].recurDays === '' ) ? 0 : Math.floor(7/tasks[i].recurDays))
          for (let k = 0; k < tasks[i].completedDates.length; k++) {
            if (moment(tasks[i].completedDates[k]).format('YYYYMMDD') >= moment().startOf('week').format('YYYYMMDD'))
            pointsArray[j].totalPoints = parseInt(pointsArray[j].totalPoints) + (tasks[i].points === null || tasks[i].points === '' ) ? 0 : tasks[i].points;
          }
        }
      }
    }

    this.setState({
      categoryReport: pointsArray,
    })
  }

  launchReport = async () => {
    await this.handleClose();
    await this.calculatePoints();
    await this.toggleDisplay('Report');
  }

  launchNewLog = (curTaskDetails) => {
    this.setState({
      logForm: 'Add',
      taskDetails: curTaskDetails
    },
    () => this.toggleDisplay('Log'));
  }

  launchEditLog = (curTaskDetails, logDetails) => {
    this.setState({
      logForm: 'Edit',
      logDetails: logDetails,
      taskDetails: curTaskDetails
    },
    () => this.toggleDisplay('Log'));
  }

  saveLog = (id, log) => {
    const newLogs = this.state.taskDetails.log.filter((item) => item.logId !== id)
    let newTaskDetails = this.state.taskDetails;
    newTaskDetails.log = [...newLogs, log];
    this.setState({ 
      taskDetails: newTaskDetails,
    },
    () => this.toggleDisplay('Details'));
  }

  addLog = (log) => {
    let newTaskDetails = this.state.taskDetails;
    const newLogs = [...newTaskDetails.log, log]
    newTaskDetails.log = newLogs;
    this.setState({ 
      taskDetails: newTaskDetails,
    },
    () => this.toggleDisplay('Details'));
  }

  render() {

    console.log(this.state);

    const {
      classes
    } = this.props;

    return (
      <React.Fragment>
        <AppBar 
          position="fixed" 
          color="primary"
          >
            <Toolbar>
              <IconButton
                edge="start"
                color="inherit"
                onClick={this.handleMenu}
                >
                <MenuIcon />
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
                  <input 
                    type="file"
                    style={{ display: 'none' }}
                    id="raised-button-file"
                    name="file" 
                    onChange={this.getFile}
                    accept=".json"
                    />
                  <label htmlFor="raised-button-file">
                    <MenuItem onClick={() => this.getFile()}>Import JSON</MenuItem>
                  </label>
                  <MenuItem onClick={() => this.exportJSON()}>Export Data</MenuItem>
                  {/* <MenuItem onClick={() => this.saveData()}>Save Data</MenuItem> */}
                  <MenuItem onClick={() => this.createNew()}>Create New</MenuItem>
                  <MenuItem onClick={() => this.launchReport()}>Show Report</MenuItem>
                </Menu>
              <Typography variant="h6">
                  Task Tracker
              </Typography>
              <div className={classes.grow} />
              <div className={classes.addButton}>
                <SortAlt
                  handleSortChange={this.handleSortChange}
                />
              </div>
              <div className={classes.addButton}>
                <ActiveFilter
                  handleFilterChange={this.handleFilterChange}
                />
              </div>
              <div className={classes.addButton}>
                <CategoryFilter
                  handleFilterChange={this.handleCategoryFilterChange}
                  categories={this.state.categories}
                />
              </div>
            </Toolbar>
          </AppBar>
          <Toolbar />
          {this.state.display === 'Tasks' &&
            <React.Fragment>
              <div
                style={{
                  fontStyle:'italic',
                  color:'#bbb',
                }}>
                  {this.state.lastSaved === null ? 'Not Saved' : 'Last Saved: ' + this.state.lastSaved}
              </div>
              <TextField
                InputProps={{
                  disableUnderline: true,
                  style: {
                    display: 'block',
                    fontSize: '2em',
                    marginTop: '0.3em',
                    marginBottom: '0.3em',
                    // padding: 0
                  },
                }}
                value={this.state.trackerName}
                onChange={this.handleTitleChange}
              />
              <Divider />
              <div className={classes.taskContainer}>
                {this.state.headers.map ((header, i) => (
                  <TaskGroup
                    tasks={this.state.tasks}
                    header={header}
                    currentSort={this.state.currentSort}
                    key={i}
                    completeTask={this.completeTask}
                    launchDetails={this.launchDetails}
                    ignoreTask={this.ignoreTask}
                    makeCurrent={this.makeCurrent}
                    getKeyName={this.getKeyName}
                    filterOption={this.state.filterOption}
                    categoryFilter={this.state.categoryFilter}
                    />
                ))}
              </div>
            </React.Fragment>
          }
          {this.state.display === 'Details' &&
            <TaskDetails
              toggleDisplay={this.toggleDisplay}
              type={this.state.detailType}
              categories={this.state.categories}
              subcategories={this.state.subcategories}
              assignedUsers={this.state.assignedUsers}
              contactUsers={this.state.contactUsers}
              createTask={this.createTask}
              taskDetails={this.state.taskDetails}
              saveTask={this.saveTask}
              deleteTask={this.deleteTask}
              launchNewLog={this.launchNewLog}
              launchEditLog={this.launchEditLog}
            />
          }
          {this.state.display === 'Report' &&
            <Report
              categoryReport={this.state.categoryReport}
              toggleDisplay={this.toggleDisplay}
            />
          }
          {this.state.display === 'Log' &&
            <LogDetail
              type={this.state.logForm}
              toggleDisplay={this.toggleDisplay}
              saveLog={this.saveLog}
              addLog={this.addLog}
              logDetails={this.state.logDetails}
            />
          }
          {this.state.display !== 'Details' &&
            <AppBar position="fixed" color="primary" className={classes.appBar}>
              <Toolbar>
                <Fab 
                  color="secondary" 
                  aria-label="add" 
                  className={classes.fabButton}
                  onClick={() => this.launchNewTask()}
                  >
                  <AddIcon />
                </Fab>
              </Toolbar>
            </AppBar>
          }
      </React.Fragment>
    )
  }
}

export default withStyles(styles)(Main)
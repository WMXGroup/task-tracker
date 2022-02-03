import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import RefreshIcon from '@material-ui/icons/Refresh';
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
import RelatedLists from './RelatedLists';
import ActiveFilter from './ActiveFilter';
import CategoryFilter from './CategoryFilter';
import Report from './Report';
import AddRelatedList from './AddRelatedList';
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
    trackerName: '',
    selectedTask: null,
    detailType: null,
    logForm: null,
    logDetails: {},
    categories: [],
    subcategories: [],
    assignedUsers: [],
    contactUsers: [],
    taskDetails: {},
    currentSort: 'Due Date',
    filterOption: 'Active',
    categoryFilter: ['All'],
    display: 'Tasks',
    debugMode: false,
    relatedLists: [],
    categoryReport: [],
    reportWeek: moment().startOf('week').format('YYYY-MM-DD'),
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
      // if (task.weeklyGoal === undefined) {
      //   task.weeklyGoal = 0
      // }
      // if (task.hours === undefined) {
      //   task.hour = 0
      // }
      // if (task.log === undefined) {
      //   task.log = []
      // }
      // if (task.startTime === undefined) {
      //   task.startTime = null
      // }
      // if (task.subCategory === undefined) {
      //   task.subCategory = ''
      // }
      task.startTime = '12:00 AM'
      return task;
    })
    this.setState({
      tasks: newTasks,
    }, () => this.saveData());
  }

  switchDateFormat = () => {
  const newTasks = this.state.tasks.map((task) => {
    if (task.activeDate !== undefined) {
      task.activeDate = moment(task.activeDate).format('YYYY-MM-DD')
    }
    if (task.dueDate !== undefined) {
      task.dueDate = moment(task.dueDate).format('YYYY-MM-DD')
    }
    if (task.dueMonth !== undefined) {
      task.dueMonth = moment(task.dueDate).format('YYYY-MM')
    }
    if (task.dueWeek !== undefined) {
      task.dueWeek = moment(task.dueWeek).format('YYYY-MM-DD')
    }

    const newCompletedDates = task.completedDates.map((taskDate) => (
      moment(taskDate).format('YYYY-MM-DD')
    ));
    task.completedDates = newCompletedDates;

    const newLogs = task.log.map((curLog) => (
        {
        logId: curLog.logId,
        logDate: (curLog.logDate === undefined || curLog.logDate === null) ? curLog.logDate : moment(curLog.logDate).format('YYYY-MM-DD'),
        logText: curLog.logText,
        logValue: curLog.logValue
        }
    ));
    task.log = newLogs;
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
          isLoading: false,
          relatedLists: (res.data.relatedLists === undefined || res.data.relatedLists === null) ? [] : res.data.relatedLists,
        }))
        .then(() => {
          this.activateTasks()
          this.getSortHeaders(this.state.tasks, this.state.currentSort)
          this.getUniqueValues(this.state.tasks, 'category', 'categories')
          this.getUniqueValues(this.state.tasks, 'subCategory', 'subcategories')
          this.getUniqueValues(this.state.tasks, 'assigned', 'assignedUsers')
          this.getUniqueValues(this.state.tasks, 'contact', 'contactUsers')
          // this.fixMissingFields()
          // this.switchDateFormat()
        })
        }
      )
    }
  }

  changeList = (listId) => {
    const a = document.createElement("a");
    a.href = `https://wmxgroup.github.io/task-tracker/?query=${listId}`;
    a.click();
  }

  addListValue = (listId) => {
    this.setState({
      relatedLists: [...this.state.relatedLists, listId]
    }, () => this.saveData())
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
          lastSaved: new Date(),
          relatedLists: this.state.relatedLists
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
          lastSaved: currentDT,
          relatedLists: this.state.relatedLists
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
        let curDueDate = task.dueDate === undefined ? moment().format('YYYY-MM-DD') : task.dueDate;
        let curRecurDays = task.recurDays === undefined ? 0 : task.recurDays;
        let curActiveDate = task.activeDate === undefined ? moment().format('YYYY-MM-DD') : task.activeDate;
        let newActiveDate = moment(curActiveDate).add(curRecurDays, 'days').format('YYYY-MM-DD');
        if (task.type === 'Recurring') {
          task.status = 'Not Started';
          task.recurDays = curRecurDays;
          task.dueDate = moment(curDueDate).add(curRecurDays, 'days').format('YYYY-MM-DD');
          task.dueWeek = moment(curDueDate).add(curRecurDays, 'days').startOf('week').format('YYYY-MM-DD');
          task.dueMonth = moment(curDueDate).add(curRecurDays, 'days').format('YYYY-MM');
          task.activeDate = newActiveDate
          task.isActive = moment(newActiveDate).format('YYYY-MM-DD') < moment().format('YYYY-MM-DD') ? true : false
          task.completedDate = ''
          task.completedDates = [...task.completedDates, moment(curDueDate).format('YYYY-MM-DD')]
        } else if (task.type === 'One-time') {
          task.status = 'Completed';
          task.dueDate = curDueDate;
          task.dueWeek = moment(curDueDate).startOf('week').format('YYYY-MM-DD');
          task.dueMonth = moment(curDueDate).format('YYYY-MM');
          task.activeDate = curActiveDate;
          task.isActive = false;
          task.completedDate = moment().format('YYYY-MM-DD');
          task.completedDates = [...task.completedDates, moment(curDueDate).format('YYYY-MM-DD')];
        }
      }
      return task;
    });
    this.setState({
      tasks: newTasks,
    }, () => this.saveData());
  }

  skipOccurence = (id) => {
    const newTasks = this.state.tasks.map((task) => {
      if (task.id === id) {
          let curDueDate = task.dueDate === undefined ? moment().format('YYYY-MM-DD') : task.dueDate;
          let curRecurDays = task.recurDays === undefined ? 0 : task.recurDays;
          let curActiveDate = task.activeDate === undefined ? moment().format('YYYY-MM-DD') : task.activeDate;
          let newActiveDate = moment(curActiveDate).add(curRecurDays, 'days').format('YYYY-MM-DD');
          task.recurDays = curRecurDays;
          task.dueDate = moment(curDueDate).add(curRecurDays, 'days').format('YYYY-MM-DD');
          task.dueWeek = moment(curDueDate).add(curRecurDays, 'days').startOf('week').format('YYYY-MM-DD');
          task.dueMonth = moment(curDueDate).add(curRecurDays, 'days').format('YYYY-MM');
          task.activeDate = newActiveDate;
          task.isActive = moment(newActiveDate).format('YYYY-MM-DD') <= moment().format('YYYY-MM-DD') ? true : false
      }
      return task;
    });
    this.setState({
      tasks: newTasks,
    }, () => this.saveData());
  }

  snoozeWeek = (id) => {
    const newTasks = this.state.tasks.map((task) => {
      if (task.id === id) {
          let curDueDate = task.dueDate === undefined ? moment().format('YYYY-MM-DD') : task.dueDate;
          let curActiveDate = task.activeDate === undefined ? moment().format('YYYY-MM-DD') : task.activeDate;
          let newActiveDate = moment(curActiveDate).add(7, 'days').format('YYYY-MM-DD');
          task.dueDate = moment(curDueDate).add(7, 'days').format('YYYY-MM-DD');
          task.dueWeek = moment(curDueDate).add(7, 'days').startOf('week').format('YYYY-MM-DD');
          task.dueMonth = moment(curDueDate).add(7, 'days').format('YYYY-MM');
          task.activeDate = newActiveDate
          task.isActive = moment(newActiveDate).format('YYYY-MM-DD') <= moment().format('YYYY-MM-DD') ? true : false
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
          task.dueDate = moment(task.dueDate).add(1, 'days').format('YYYY-MM-DD');
          task.dueWeek = moment(task.dueDate).add(1, 'days').startOf('week').format('YYYY-MM-DD');
          task.dueMonth = moment(task.dueDate).add(1, 'days').format('YYYY-MM');
          task.activeDate = moment(task.activeDate).add(1, 'days').format('YYYY-MM-DD');
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
          task.dueDate = moment().format('YYYY-MM-DD');
          task.dueWeek = moment().startOf('week').format('YYYY-MM-DD');
          task.dueMonth = moment().format('YYYY-MM');
          task.activeDate = moment().format('YYYY-MM-DD');
          task.isActive = true;
      }
      return task;
    });
    this.setState({
      tasks: newTasks,
    }, () => this.saveData());
  }

  makeAllActiveCurrent = () => {
    const newTasks = this.state.tasks.map((task) => {
      console.log(task);
      if (task.dueDate <= moment().format('YYYY-MM-DD') && task.activeDate <= moment().format('YYYY-MM-DD') && task.status !== 'Completed' && task.dueDate !== undefined) {
          task.dueDate = moment().format('YYYY-MM-DD');
          task.dueWeek = moment().startOf('week').format('YYYY-MM-DD');
          task.dueMonth = moment().format('YYYY-MM');
          task.activeDate = moment().format('YYYY-MM-DD');
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
    if (lowerKeyName === 'startTime'){
      let startTimeNoNulls = resArr.filter((task) => task !== null);
      let startTimeDay = startTimeNoNulls.filter((task) => task.includes("AM"));
      let startTimeNight = startTimeNoNulls.filter((task) => task.includes("PM"));
      startTimeDay.sort();
      startTimeNight.sort();
      resArr = [...startTimeDay, ...startTimeNight, null];
    } else {
      resArr.sort();
    }
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
  
  uuidv4 = () => {
    return Math.random().toString(36).substring(2) + Date.now().toString(36);
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

  handleSortChange = (sortOption) => {
    this.getSortHeaders(this.state.tasks, sortOption)
  };

  handleFilterChange = (filterOption) => {
    this.setState({
      filterOption
    })
  };

  handleCategoryFilterChange = (category) => {
    const { categoryFilter } = this.state;
    if (category === 'All'){
      this.setState({
        categoryFilter: ['All'],
    })} else if (categoryFilter.includes(category)) {
      const newCategoryFilter = categoryFilter.filter((value) => value !== category)
      this.setState({
        categoryFilter: newCategoryFilter,
      })
    } else {
      const newCategoryFilter = categoryFilter.filter((value) => value !== 'All')
      this.setState({
        categoryFilter: [...newCategoryFilter, category]
      })
    }
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
      reportWeek,
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
            if (moment(tasks[i].completedDates[k]).format('YYYY-MM-DD') >= reportWeek && moment(tasks[i].completedDates[k]).format('YYYY-MM-DD') < moment(reportWeek).add(7, 'days').format('YYYYMMDD')) {
              const newPoints = (tasks[i].points === null || tasks[i].points === '') ? 0 : parseInt(tasks[i].points);
              pointsArray[j].totalPoints = parseInt(pointsArray[j].totalPoints) + newPoints;
            }
          }
        }
      }
    }

    this.setState({
      categoryReport: pointsArray,
    })
  }

  updateReportWeek = async (direction) => {
    if (direction === 1){
      this.setState({
        reportWeek: moment(this.state.reportWeek).add(7, 'days').format('YYYY-MM-DD')
      }, () => this.calculatePoints())
    } else {
      this.setState({
        reportWeek: moment(this.state.reportWeek).subtract(7, 'days').format('YYYY-MM-DD')
      }, () => this.calculatePoints())
    }
  }

  launchReport = async () => {
    await this.handleClose();
    await this.calculatePoints();
    await this.toggleDisplay('Report');
  }

  launchAddList = async () => {
    await this.handleClose();
    await this.toggleDisplay('AddRelatedList');
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

    if(this.state.debugMode === true){
        console.log(this.state);
    }

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
                  <MenuItem onClick={() => this.createNew()}>Create New</MenuItem>
                  <MenuItem onClick={() => this.launchReport()}>Show Report</MenuItem>
                  <MenuItem onClick={() => this.makeAllActiveCurrent()}>Make Tasks Current</MenuItem>
                  <MenuItem onClick={() => this.launchAddList()}>Add Related List</MenuItem>
                </Menu>
              <Typography variant="h6">
                  Task Tracker
              </Typography>
              <div className={classes.grow} />       
              <div className={classes.addButton}>
                <SortAlt
                  currentSort={this.state.currentSort}
                  handleSortChange={this.handleSortChange}
                />
              </div>
              <div className={classes.addButton}>
                <ActiveFilter
                  filterOption={this.state.filterOption}
                  handleFilterChange={this.handleFilterChange}
                />
              </div>
              <div className={classes.addButton}>
                <CategoryFilter
                  handleCategoryFilterChange={this.handleCategoryFilterChange}
                  categories={this.state.categories}
                  categoryFilter={this.state.categoryFilter}
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
                    key={i}
                    completeTask={this.completeTask}
                    launchDetails={this.launchDetails}
                    ignoreTask={this.ignoreTask}
                    makeCurrent={this.makeCurrent}
                    snoozeWeek={this.snoozeWeek}
                    skipOccurence={this.skipOccurence}
                    getKeyName={this.getKeyName}
                    currentSort={this.state.currentSort}
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
              uuidv4={this.uuidv4}
            />
          }
          {this.state.display === 'Report' &&
            <Report
              categoryReport={this.state.categoryReport}
              toggleDisplay={this.toggleDisplay}
              updateReportWeek={this.updateReportWeek}
              reportWeek={this.state.reportWeek}
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
              <IconButton
                edge="start"
                color="inherit"
                onClick={() => this.getServerData()}
                >
                <RefreshIcon />
              </IconButton>
              <div className={classes.addButton}>
                <RelatedLists
                  relatedLists={this.state.relatedLists}
                  changeList={this.changeList}
                />
              </div>       
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
          {this.state.display === 'AddRelatedList' &&
            <AddRelatedList
              relatedLists={this.state.relatedLists}
              toggleDisplay={this.toggleDisplay}
              addListValue={this.addListValue}
          />
          }
      </React.Fragment>
    )
  }
}

export default withStyles(styles)(Main)
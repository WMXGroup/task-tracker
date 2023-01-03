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
import CompletedDetail from './CompletedDetail';
import {tasks} from './TestTasks';
import RelatedLists from './RelatedLists';
import ViewSelector from './ViewSelector';
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
    mode: null,
    completedForm: null,
    completedDetails: {},
    categories: [],
    subcategories: [],
    assignedUsers: [],
    contactUsers: [],
    taskDetails: {},
    currentView: 'Scheduled',
    categoryFilter: ['All'],
    display: 'Tasks',
    debugMode: window.location.hostname === "localhost",
    relatedLists: [],
    categoryReport: [],
    reportWeek: moment().startOf('week').format('YYYY-MM-DD'),
  }

  componentDidMount = () => {
    // console.log('componentDidMount');
    // If needing to update data use this:
    // tasks: this.updateData(tasks),
    if(this.state.debugMode === true){
      this.setState({
        tasks: tasks,
      });
    } else {
      this.getServerData();
    };
    
  }

  componentDidUpdate = (prevProps, prevState) => {
    //console.log('componentDidUpdate');
    if (this.state.tasks !== prevState.tasks) {
      this.getHeaders(this.state.tasks, this.state.currentView);
      this.getUniqueValues(this.state.tasks, 'category', 'categories');
      this.getUniqueValues(this.state.tasks, 'subCategory', 'subcategories')
      this.getUniqueValues(this.state.tasks, 'assigned', 'assignedUsers');
      this.getUniqueValues(this.state.tasks, 'contact', 'contactUsers');
    }
  }

  updateData = (data) => {
    const newTasks = data.map((task) => {
      if (task.type === 'Habit' && task.status !== 'Completed') {
        task.dueDate = moment().format('YYYY-MM-DD');
      }
      delete task.dueWeek;
      delete task.dueMonth;
      return task;
    })
    return newTasks;
  }

  getServerData = () => {
    let search = window.location.search;
    let params = new URLSearchParams(search);
    let listId = params.get('query');
    // If needing to update data structure use this:
    // tasks: this.updateData(res.data.list),

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
          this.getHeaders(this.state.tasks, this.state.currentView)
          this.getUniqueValues(this.state.tasks, 'category', 'categories')
          this.getUniqueValues(this.state.tasks, 'subCategory', 'subcategories')
          this.getUniqueValues(this.state.tasks, 'assigned', 'assignedUsers')
          this.getUniqueValues(this.state.tasks, 'contact', 'contactUsers')
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
      mode: type,
      taskDetails: taskDetail[0]
    },
    () => this.toggleDisplay('Details'));
  }

  launchNewTask = () => {
    this.setState({
      mode: 'Add'
    },
    () => this.toggleDisplay('Details'));
  }

  completeTask = (id) => {
    const newTasks = this.state.tasks.map((task) => {
      if (task.id === id) {
        let curDueDate = task.dueDate === undefined ? moment().format('YYYY-MM-DD') : task.dueDate;
        let curRecurDays = task.recurDays === undefined ? 0 : task.recurDays;
        if (task.type === 'Recurring' || task.type === 'Habit') {
          task.status = 'Not Started';
          task.recurDays = curRecurDays;
          task.dueDate = moment(curDueDate).add(curRecurDays, 'days').format('YYYY-MM-DD');
          task.completedDates = [...task.completedDates, 
            {
            completedId: this.uuidv4(),
            completedDate: moment(curDueDate).format('YYYY-MM-DD'),
            hours: 0
            }
          ];
        } else if (task.type === 'One-time') {
          task.status = 'Completed';
          task.dueDate = curDueDate;
          task.completedDates = [...task.completedDates, 
            {
            completedId: this.uuidv4(),
            completedDate: moment(curDueDate).format('YYYY-MM-DD'),
            hours: 0
            }
          ];
        }
      }
      return task;
    });
    this.setState({
      tasks: newTasks,
    }, () => this.saveData());
  }

  completeCompletedTask = (id, completedDate, hours) => {
    const newTasks = this.state.tasks.map((task) => {
      if (task.id === id) {
        let curDueDate = task.dueDate === undefined ? moment().format('YYYY-MM-DD') : task.dueDate;
        let curRecurDays = task.recurDays === undefined ? 0 : task.recurDays;
        if (task.type === 'Recurring' || task.type === 'Habit') {
          task.status = 'Not Started';
          task.recurDays = curRecurDays;
          task.dueDate = moment(curDueDate).add(curRecurDays, 'days').format('YYYY-MM-DD');
          task.completedDates = [...task.completedDates, 
            {
            completedId: this.uuidv4(),
            completedDate: completedDate,
            hours: hours
            }
          ];
        } else if (task.type === 'One-time') {
          task.status = 'Completed';
          task.dueDate = curDueDate;
          task.completedDates = [...task.completedDates, 
            {
            completedId: this.uuidv4(),
            completedDate: completedDate,
            hours: hours
            }
          ];
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
          task.recurDays = curRecurDays;
          task.dueDate = moment(curDueDate).add(curRecurDays, 'days').format('YYYY-MM-DD');
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
          task.dueDate = moment(curDueDate).add(7, 'days').format('YYYY-MM-DD');
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
      }
      return task;
    });
    this.setState({
      tasks: newTasks,
    }, () => this.saveData());
  }

  makeAllActiveCurrent = () => {
    const newTasks = this.state.tasks.map((task) => {
      if (task.dueDate <= moment().format('YYYY-MM-DD') && task.status !== 'Completed' && task.dueDate !== undefined) {
          task.dueDate = moment().format('YYYY-MM-DD');
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

  getHeaders = (tasks, currentView) => {
    let resArr = [];
    let uniqArr = []
    console.log(currentView);

    if (currentView === 'Scheduled') {
      // get all headers
      for (let i = 0; i < tasks.length; i++) {
        resArr.push(tasks[i].dueDate)
      }
    }

    if (currentView === 'Completed') {
      // get all headers
      for (let i = 0; i < tasks.length; i++) {
        for (let j = 0; j < tasks[i].completedDates.length; j++) {
          resArr.push(tasks[i].completedDates[j].completedDate)
        }
      }
    }

    if (currentView === 'Unscheduled') {
      // get all headers
      for (let i = 0; i < tasks.length; i++) {
        resArr.push(tasks[i].category)
      }
      console.log(resArr);
    }

    //remove dupes
    for (let i = 0; i < resArr.length; i++) {
      if (uniqArr.includes(resArr[i]) === false) {
        uniqArr.push(resArr[i])
      }
    }
    //sort
    uniqArr.sort();

    this.setState({
      headers: uniqArr,
      currentView: currentView,
    })
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

  handleViewChange = (currentView) => {
    this.getHeaders(this.state.tasks, currentView)
    this.setState({
      currentView
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
          pointsArray[j].weeklyPoints = parseInt(pointsArray[j].weeklyPoints) + ((tasks[i].weeklyGoal === null || tasks[i].weeklyGoal === '' ) ? 0 : parseInt(tasks[i].weeklyGoal))
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

  launchNewCompleted = (curTaskDetails) => {
    this.setState({
      completedForm: 'Add',
      taskDetails: curTaskDetails
    },
    () => this.toggleDisplay('Completed'));
  }

  launchEditCompleted = (curTaskDetails, completedDetails) => {
    this.setState({
      completedForm: 'Edit',
      completedDetails: completedDetails,
      taskDetails: curTaskDetails
    },
    () => this.toggleDisplay('Completed'));
  }

  launchCompleteCompleted = (id) => {
    const taskDetail = this.state.tasks.filter((task) => task.id === id)
    this.setState({
      mode: 'Edit',
      completedForm: 'Complete',
      taskDetails: taskDetail[0]
    },
    () => this.toggleDisplay('Completed'));
  }

  saveCompleted = (id, data) => {
    const newCompleted = this.state.taskDetails.completedDates.filter((item) => item.completedId !== id)
    let newTaskDetails = this.state.taskDetails;
    newTaskDetails.completedDates = [...newCompleted, data];
    this.setState({ 
      taskDetails: newTaskDetails,
    },
    () => this.toggleDisplay('Details'));
  }

  addCompleted = (completed) => {
    let newTaskDetails = this.state.taskDetails;
    const newCompleted = [...newTaskDetails.completedDates, completed]
    newTaskDetails.completedDates = newCompleted;
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
                <ViewSelector
                  currentView={this.state.currentView}
                  handleViewChange={this.handleViewChange}
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
                    currentView={this.state.currentView}
                    categoryFilter={this.state.categoryFilter}
                    launchCompleteCompleted={this.launchCompleteCompleted}
                    />
                ))}
              </div>
            </React.Fragment>
          }
          {this.state.display === 'Details' &&
            <TaskDetails
              toggleDisplay={this.toggleDisplay}
              mode={this.state.mode}
              categories={this.state.categories}
              subcategories={this.state.subcategories}
              assignedUsers={this.state.assignedUsers}
              contactUsers={this.state.contactUsers}
              createTask={this.createTask}
              taskDetails={this.state.taskDetails}
              saveTask={this.saveTask}
              deleteTask={this.deleteTask}
              launchNewCompleted={this.launchNewCompleted}
              launchEditCompleted={this.launchEditCompleted}
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
          {this.state.display === 'Completed' &&
            <CompletedDetail
              type={this.state.completedForm}
              toggleDisplay={this.toggleDisplay}
              saveCompleted={this.saveCompleted}
              addCompleted={this.addCompleted}
              completedDetails={this.state.completedDetails}
              taskDetails={this.state.taskDetails}
              completeCompletedTask={this.completeCompletedTask}
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
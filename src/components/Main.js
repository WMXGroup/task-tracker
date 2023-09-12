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
import {tasks} from './TestTasks';
import RelatedLists from './RelatedLists';
import ViewSelector from './ViewSelector';
import TimeframeSelector from './TimeframeSelector';
import CategoryFilter from './CategoryFilter';
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
    categories: [],
    taskDetails: {},
    currentView: 'Scheduled',
    categoryFilter: ['All'],
    display: 'Tasks',
    debugMode: window.location.hostname === "localhost",
    relatedLists: [],
    startDate:moment().format('YYYY-MM-DD'),
    endDate: moment().add(7,'days').format('YYYY-MM-DD'),
  }

  componentDidMount = () => {
    // If needing to update data use this:
      // tasks: this.updateData(tasks)
    // otherwise:
      // tasks: tasks

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
      this.getHeaders(this.state.tasks, this.state.currentView, this.state.startDate, this.state.endDate);
      this.getUniqueValues(this.state.tasks, 'category', 'categories');
    }
  }

  updateData = (data) => {
    const newTasks = data.map((task) => {
      // if (task.type === 'Habit' && task.status !== 'Completed') {
      //   if (task.dueDate < moment().format('YYYY-MM-DD')) {
      //     task.dueDate = moment().format('YYYY-MM-DD')
      //   }
      // }
      //
      if (task.type === 'Recurring') {
        task.frequency = 'Recurring'
      }
      if (task.type === 'One-time') {
        task.frequency = 'One-time'
      }

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
    // otherwise:
      // tasks: this.res.data.list

    if(listId !== undefined && listId !== null){
      this.setState({
        isLoading: true
      },() => {
        axios
        .get(`https://guarded-mesa-76047.herokuapp.com/api/lists/${listId}`)
        .then(res => this.setState({
          trackerName: res.data.listName,
          tasks: this.updateData(res.data.list),
          lastSaved: res.data.lastSaved,
          isLoading: false,
          relatedLists: (res.data.relatedLists === undefined || res.data.relatedLists === null) ? [] : res.data.relatedLists,
        }))
        .then(() => {
          this.getHeaders(this.state.tasks, this.state.currentView, this.state.startDate, this.state.endDate)
          this.getUniqueValues(this.state.tasks, 'category', 'categories')
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

  exportCSV = () => {
    this.handleClose();

    let curTasks = this.state.tasks;
    let newData = []
    for (let i = 0; i < curTasks.length; i++) {
      for (let j = 0; j < curTasks[i].dates.length; j++) {
        let curRow = [curTasks[i].description, curTasks[i].dates[j].date, curTasks[i].category]
        newData.push(curRow)
      }
    }

    let csvContent = newData.map(e => e.join(",")).join("\n");
    
    this.downloadFile(csvContent, "data.csv", "text/plain");
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

  completeTask = (id, date) => {
    const newTasks = this.state.tasks.map((task) => {
      if (task.id === id) {
        const newDates = task.dates.map((idate) => {
          if (idate.date === date && idate.state !== 'open') {
            idate.state = 'open'
          } else if (idate.date === date && idate.state !== 'closed') {
            idate.state = 'closed'
          }
          return idate;
        })
        task.dates = newDates
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
      { 
        tasks: [...newTasks, task],
      }, () => this.saveData()
      );
  }

  deleteTask = (id) => {
    const newTasks = this.state.tasks.filter((task) => task.id !== id)
    this.setState({
      tasks: newTasks,
    }, () => this.saveData());
  }

  getHeaders = (tasks, currentView, startDate, endDate) => {
    let resArr = [];
    let uniqArr = []

    // get day headers
    if (currentView = 'Scheduled') {
      for (let i = 0; i < tasks.length; i++) {
        for (let j = 0; j < tasks[i].dates.length; j++) {
          if (startDate === 'Invalid date' && tasks[i].dates[j].date <= moment(endDate).format('YYYY-MM-DD')){
            resArr.push(tasks[i].dates[j].date)
          }
          if (endDate === 'Invalid date' && tasks[i].dates[j].date >= moment(startDate).format('YYYY-MM-DD')){
            resArr.push(tasks[i].dates[j].date)
          }
          if (tasks[i].dates[j].date >= moment(startDate).format('YYYY-MM-DD') && tasks[i].dates[j].date <= moment(endDate).format('YYYY-MM-DD')) {
            resArr.push(tasks[i].dates[j].date)
          }
          if (tasks[i].dates[j].date <= moment(endDate).format('YYYY-MM-DD') && tasks[i].dates[j].state === 'open') {
            resArr.push(tasks[i].dates[j].date)
          }
        }
      }
    } else if (currenView = 'Unscheduled') {
        for (let i = 0; i < tasks.length; i++) {
          resArr.push(tasks[i].category)
        };
    }
    

    //remove dupes
    for (let i = 0; i < resArr.length; i++) {
      if (uniqArr.includes(resArr[i]) === false) {
        uniqArr.push(resArr[i])
      }
    }

    // //sort
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
    this.setState({
      currentView,
    }, () => this.getHeaders(this.state.tasks, currentView, this.state.startDate, this.state.endDate))
  };

  handleTimeframeChange = () => {
    this.getHeaders(this.state.tasks, this.state.currentView, this.state.startDate, this.state.endDate)
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

  launchAddList = async () => {
    await this.handleClose();
    await this.toggleDisplay('AddRelatedList');
  }


  dateChange = (e, type) => {
    if (type === 'startDate') {
      this.setState({
        startDate: moment(e).format('YYYY-MM-DD'),
      })
    }
    if (type === 'endDate') {
      this.setState({
        endDate: moment(e).format('YYYY-MM-DD'),
      })
    }
  }

  snoozeDay = (id, date) => {
    const newTasks = this.state.tasks.map((task) => {
      if (task.id === id) {
        const newDates = task.dates.map((idate) => {
          if (idate.date === date) {
            idate.date = moment(date).add(1, 'days').format('YYYY-MM-DD')
          }
          return idate;
        })
        task.dates = newDates
      }
      return task;
    });
    this.setState({
      tasks: newTasks,
    }, () => this.saveData());
  }

  makeCurrent = (id, date) => {
    const newTasks = this.state.tasks.map((task) => {
      if (task.id === id) {
        const newDates = task.dates.map((idate) => {
          if (idate.date === date) {
            idate.date = moment().format('YYYY-MM-DD')
          }
          return idate;
        })
        task.dates = newDates
      }
      return task;
    });
    this.setState({
      tasks: newTasks,
    }, () => this.saveData());
  }

  ignoreTask = (id, date) => {
    const newTasks = this.state.tasks.map((task) => {
      if (task.id === id) {
        const newDates = task.dates.map((idate) => {
          if (idate.date === date) {
            idate.state = 'ignored'
          }
          return idate;
        })
        task.dates = newDates
      }
      return task;
    });
    this.setState({
      tasks: newTasks,
    }, () => this.saveData());
  }

  deleteOccurence = (id, date) => {
    const newTasks = this.state.tasks.map((task) => {
      if (task.id === id) {
        const newDates = task.dates.filter((value) => value.date !== date)
        task.dates = newDates
      }
      return task;
    });
    this.setState({
      tasks: newTasks,
    }, () => this.saveData());
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
                  <MenuItem onClick={() => this.exportCSV()}>Export CSV New</MenuItem>
                  <MenuItem onClick={() => this.createNew()}>Create New</MenuItem>
                  <MenuItem onClick={() => this.launchAddList()}>Add Related List</MenuItem>
                </Menu>
              <Typography variant="h6">
                  Task Tracker
              </Typography>
              <div className={classes.grow} />       
              <div className={classes.addButton}>
                <TimeframeSelector
                  handleTimeframeChange={this.handleTimeframeChange}
                  dateChange={this.dateChange}
                  startDate={this.state.startDate}
                  endDate={this.state.endDate}
                />
              </div>
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
                    currentView={this.state.currentView}
                    categoryFilter={this.state.categoryFilter}
                    snoozeDay={this.snoozeDay}
                    makeCurrent={this.makeCurrent}
                    ignoreTask={this.ignoreTask}
                    deleteOccurence={this.deleteOccurence}
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
              createTask={this.createTask}
              taskDetails={this.state.taskDetails}
              saveTask={this.saveTask}
              deleteTask={this.deleteTask}
              launchNewDate={this.launchNewDate}
              uuidv4={this.uuidv4}
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
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
import DetailModal from './DetailModal';
import {tasks} from './TestTasks';
import SortAlt from './SortAlt';
import ActiveFilter from './ActiveFilter';
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
    currentSort: 'Category',
    trackerName: 'Test Title',
    selectedTask: null,
    openModal: false,
    modalType: null,
    categories: [],
    assignedUsers: [],
    contactUsers: [],
    taskDetails: {},
    filterOption: 'Active'
  }

  componentDidMount = () => {
    this.getServerData();
    this.activateTasks();
    // this.setState({
    //   tasks: tasks
    // })
  }

  componentDidUpdate = (prevProps, prevState) => {
    if (this.state.tasks !== prevState.tasks) {
      this.getSortHeaders(this.state.tasks, this.state.currentSort);
      this.getUniqueValues(this.state.tasks, 'category', 'categories');
      this.getUniqueValues(this.state.tasks, 'assigned', 'assignedUsers');
      this.getUniqueValues(this.state.tasks, 'contact', 'contactUsers');
    }
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
          this.getSortHeaders(this.state.tasks, this.state.currentSort)
          this.getUniqueValues(this.state.tasks, 'category', 'categories')
          this.getUniqueValues(this.state.tasks, 'assigned', 'assignedUsers')
          this.getUniqueValues(this.state.tasks, 'contact', 'contactUsers')
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
        alert('Data saved successfully!')
      });
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
    this.setState({ tasks: [...this.state.tasks, task]}
    )
  }

  launchModal = (type, id) => {
    const taskDetail = this.state.tasks.filter((task) => task.id === id)
    this.setState({
      modalType: type,
      taskDetails: taskDetail[0]
    },
    () => this.toggleModal());
  }

  completeTask = (id) => {
    const newTasks = this.state.tasks.map((task) => {
      if (task.id === id) {
        if (task.type === 'Recurring') {
          task.dueDate = moment(task.dueDate).add(task.recurDays, 'days').format('MM/DD/YYYY');
          task.dueWeek = moment(task.dueDate).add(task.recurDays, 'days').startOf('week').format('MM/DD/YYYY');
          task.dueMonth = moment(task.dueDate).add(task.recurDays, 'days').format('MMMM YYYY');
          task.activeDate = moment(task.activeDate).add(task.recurDays, 'days');
          task.isActive = moment(task.activeDate).format('YYYY-MM-DD') < moment().format('YYYY-MM-DD') ? true : false
        } else if (task.type === 'One-time') {
          task.completedDate = moment().format('MM/DD/YYYY');
          task.status = 'Completed';
          task.isActive = false;
        }
      }
      return task;
    });
    this.setState({
      tasks: newTasks,
    })
  }

  activateTasks = () => {
    const newTasks = this.state.tasks.map((task) => {
      if (moment().format('YYYY-MM-DD') >= moment(task.activeDate).format('YYYY-MM-DD') && task.activeDate !== '') {
        task.isActive = true;
      }
      return task;
    });
    this.setState({
      tasks: newTasks,
    })
  }

  saveTask = (id, task) => {
    const newTasks = this.state.tasks.filter((task) => task.id !== id)
    this.setState({ tasks: [...newTasks, task]})
  }

  deleteTask = (id) => {
    const newTasks = this.state.tasks.filter((task) => task.id !== id)
    this.setState({
      tasks: newTasks,
    })
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
      case 'Status':
        keyName = "status";
        break;
      case 'Priority':
        keyName = "priority";
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

  toggleModal = () => {
    this.setState({
      openModal: !this.state.openModal,
    })
  }

  render() {

    const {
      classes
    } = this.props;

    // console.log('Main State:', this.state);

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
                  <MenuItem onClick={() => this.saveData()}>Save Data</MenuItem>
                  <MenuItem onClick={() => this.createNew()}>Create New</MenuItem>
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
            </Toolbar>
          </AppBar>
          <Toolbar />
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
                launchModal={this.launchModal}
                getKeyName={this.getKeyName}
                filterOption={this.state.filterOption}
                />
            ))}
          </div>
          {this.state.openModal === true &&
            <DetailModal
              toggleModal={this.toggleModal}
              openModal={this.state.openModal}
              type={this.state.modalType}
              categories={this.state.categories}
              assignedUsers={this.state.assignedUsers}
              contactUsers={this.state.contactUsers}
              createTask={this.createTask}
              taskDetails={this.state.taskDetails}
              saveTask={this.saveTask}
              deleteTask={this.deleteTask}
            />
          }
      <AppBar position="fixed" color="primary" className={classes.appBar}>
        <Toolbar>
          <Fab 
            color="secondary" 
            aria-label="add" 
            className={classes.fabButton}
            onClick={() => this.launchModal('Add')}
            >
            <AddIcon />
          </Fab>
        </Toolbar>
      </AppBar>
      </React.Fragment>
    )
  }
}

export default withStyles(styles)(Main)
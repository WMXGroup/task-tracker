import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Typography from '@material-ui/core/Typography';
import SortAlt from './SortAlt';
import ActiveFilter from './ActiveFilter';
import axios from 'axios';

const styles = theme => ({
  addButton: {
    margin: '5px',
    alignContent: 'center',
    fontSize: '17px',
    color: 'white'
  },
  grow: {
    flexGrow: 1,
  },
});

class Header extends Component {

  state = {
    anchorEl: null,
    setAnchorEl: false,
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

  render() {

    const {
      classes,
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
      </React.Fragment>
    )
  }
}

export default withStyles(styles)(Header)

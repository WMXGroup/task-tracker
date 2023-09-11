import React, { Component } from 'react';
import Task from './Task';
import moment from 'moment';

export default class TaskGroup extends Component {
  render() {

    const {
      header,
      tasks,
      currentView,
      completeTask,
      launchDetails,
      categoryFilter,
      snoozeDay,
      makeCurrent,
      ignoreTask,
      deleteOccurence,
    } = this.props;

    let groupTasks = [];

    // groupTasks = tasks.filter((task) => (task['category'] === header))

      for (let i = 0; i < tasks.length; i++) {
        for (let j = 0; j < tasks[i].dates.length; j++) {
          if (tasks[i].dates[j].date === header) {
            groupTasks.push(tasks[i])
          }
        }
      }
    
    groupTasks.sort((a,b) => (a.priority > b.priority) ? 1 : -1);

    // groupTasks.sort((a,b) => (new Date('1970/01/01 ' + a.startTime) - new Date('1970/01/01 ' + b.startTime)));

    groupTasks = groupTasks.filter((task) => (categoryFilter.includes(task.category) || categoryFilter.includes('All')))

    return (
      <React.Fragment>
        {groupTasks.length !== 0 &&
        <h2
          style={{
          color: header < moment().format('YYYY-MM-DD') ? 'red' : 'black',
          }}>
          {header}
        </h2>
        }
        {groupTasks.map ((task, i) => (
          <Task
          header={header}
          task={task}
          key={i}
          completeTask={completeTask}
          launchDetails={launchDetails}
          snoozeDay={snoozeDay}
          makeCurrent={makeCurrent}
          ignoreTask={ignoreTask}
          deleteOccurence={deleteOccurence}
          />
        ))}
      </React.Fragment>
    )
  }
}

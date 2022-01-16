import React, { Component } from 'react';
import Task from './Task';

export default class TaskGroup extends Component {
  render() {

    const {
      header,
      tasks,
      currentSort,
      completeTask,
      ignoreTask,
      makeCurrent,
      snoozeWeek,
      skipOccurence,
      launchDetails,
      getKeyName,
      filterOption,
      categoryFilter,
    } = this.props;

    const lowercurrentSort = getKeyName(currentSort);
    let groupTasks = [];

    if (filterOption === 'Active') {
      groupTasks = tasks.filter((task) => (task[lowercurrentSort] === header && task.isActive === true ))
    } else if(filterOption === 'Inactive') {
      groupTasks = tasks.filter((task) => (task[lowercurrentSort] === header && task.isActive === false && task.status !== 'Completed' ))
    }  else if(filterOption === 'Completed') {
      groupTasks = tasks.filter((task) => (task[lowercurrentSort] === header && task.status === 'Completed' ))
    }  else if(filterOption === 'Incomplete') {
      groupTasks = tasks.filter((task) => (task[lowercurrentSort] === header && task.status !== 'Completed' ))
    } else {
      groupTasks = tasks.filter((task) => task[lowercurrentSort] === header)
    }

    groupTasks.sort((a,b) => (a.priority > b.priority) ? 1 : -1);

    groupTasks = groupTasks.filter((task) => (categoryFilter.includes(task.category) || categoryFilter.includes('All')))

    return (
      <React.Fragment>
        {groupTasks.length !== 0 &&
        <h2>{header}</h2>
        }
        {groupTasks.map ((task, i) => (
          <Task
          task={task}
          key={i}
          snoozeWeek={snoozeWeek}
          skipOccurence={skipOccurence}
          completeTask={completeTask}
          ignoreTask={ignoreTask}
          makeCurrent={makeCurrent}
          launchDetails={launchDetails}
          />
        ))}
      </React.Fragment>
    )
  }
}

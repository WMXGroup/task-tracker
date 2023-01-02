import React, { Component } from 'react';
import Task from './Task';
import moment from 'moment';

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
      launchCompleteCompleted,
    } = this.props;

    const lowercurrentSort = getKeyName(currentSort);
    let groupTasks = [];

    if (filterOption === 'Scheduled') {
      groupTasks = tasks.filter((task) => (task[lowercurrentSort] === header && task.status !== 'Completed' && moment(task.dueDate).format('YYYY-MM-DD') < moment().add(7, 'days').format('YYYY-MM-DD') && task.dueDate !== 'Invalid date'))
    } else if(filterOption === 'Completed') {
      groupTasks = tasks.filter((task) => (task[lowercurrentSort] === header && task.status === 'Completed' && task.dueDate !== 'Invalid date'))
    } else if(filterOption === 'Unscheduled') {
      groupTasks = tasks.filter((task) => (task[lowercurrentSort] === header && task.dueDate === 'Invalid date'))
    } else {
      groupTasks = tasks.filter((task) => task[lowercurrentSort] === header)
    }

    // groupTasks.sort((a,b) => (a.priority > b.priority) ? 1 : -1);

    groupTasks.sort((a,b) => (new Date('1970/01/01 ' + a.startTime) - new Date('1970/01/01 ' + b.startTime)));

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
          launchCompleteCompleted={launchCompleteCompleted}
          />
        ))}
      </React.Fragment>
    )
  }
}

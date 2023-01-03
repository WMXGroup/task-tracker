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
      ignoreTask,
      makeCurrent,
      snoozeWeek,
      skipOccurence,
      launchDetails,
      categoryFilter,
      launchCompleteCompleted,
    } = this.props;

    let groupTasks = [];

    if (currentView === 'Scheduled') {
      groupTasks = tasks.filter((task) => (task['dueDate'] === header && task.status !== 'Completed' && moment(task.dueDate).format('YYYY-MM-DD') < moment().add(7, 'days').format('YYYY-MM-DD') && task.dueDate !== 'Invalid date'))
    } else if(currentView === 'Completed') {
      for (let i = 0; i < tasks.length; i++) {
        for (let j = 0; j < tasks[i].completedDates.length; j++) {
          if (tasks[i].completedDates[j].completedDate === header) {
            groupTasks.push(tasks[i])
          }
        }
      }
    } else if(currentView === 'Unscheduled') {
      groupTasks = tasks.filter((task) => (task['category'] === header && task.dueDate === 'Invalid date'))
    } else {
      groupTasks = tasks.filter((task) => task['dueDate'] === header)
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

import React, { Component } from 'react';
import Task from './Task';

export default class TaskGroup extends Component {
  render() {

    const {
      header,
      tasks,
      currentSort,
      completeTask,
      deleteTask,
      edit,
      launchModal,
      getKeyName
    } = this.props;

    const lowercurrentSort = getKeyName(currentSort);
    const groupTasks = tasks.filter((task) => task[lowercurrentSort] === header)

    return (
      <div>
        <h2>{header}</h2>
        {groupTasks.map ((task, i) => (
          <Task
          task={task}
          key={i}
          completeTask={completeTask}
          deleteTask={deleteTask}
          edit={edit}
          launchModal={launchModal}
          />
        ))}
      </div>
    )
  }
}

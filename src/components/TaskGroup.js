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
      getKeyName,
      filterOption
    } = this.props;

    const lowercurrentSort = getKeyName(currentSort);
    let groupTasks;
    console.log(filterOption);

    if (filterOption === 'Active') {
      groupTasks = tasks.filter((task) => (task[lowercurrentSort] === header && task.isActive === true ))
    } else if(filterOption === 'In-Active') {
      groupTasks = tasks.filter((task) => (task[lowercurrentSort] === header && task.isActive === false ))
    } else {
      groupTasks = tasks.filter((task) => task[lowercurrentSort] === header)
    }

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

// used in Main.js
// const fixMissingFields = () => {
//   const newTasks = this.state.tasks.map((task) => {
//     // if (task.weeklyGoal === undefined) {
//     //   task.weeklyGoal = 0
//     // }
//     // if (task.hours === undefined) {
//     //   task.hour = 0
//     // }
//     // if (task.log === undefined) {
//     //   task.log = []
//     // }
//     // if (task.startTime === undefined) {
//     //   task.startTime = null
//     // }
//     // if (task.subCategory === undefined) {
//     //   task.subCategory = ''
//     // }
//     task.startTime = '12:00 AM'
//     return task;
//   })
//   this.setState({
//     tasks: newTasks,
//   }, () => this.saveData());
// }

// used in Main.js
// const switchDateFormat = () => {
//   const newTasks = this.state.tasks.map((task) => {
//     if (task.activeDate !== undefined) {
//       task.activeDate = moment(task.activeDate).format('YYYY-MM-DD')
//     }
//     if (task.dueDate !== undefined) {
//       task.dueDate = moment(task.dueDate).format('YYYY-MM-DD')
//     }
//     if (task.dueMonth !== undefined) {
//       task.dueMonth = moment(task.dueDate).format('YYYY-MM')
//     }
//     if (task.dueWeek !== undefined) {
//       task.dueWeek = moment(task.dueWeek).format('YYYY-MM-DD')
//     }

//     const newCompletedDates = task.completedDates.map((taskDate) => (
//       moment(taskDate).format('YYYY-MM-DD')
//     ));
//     task.completedDates = newCompletedDates;

//     const newLogs = task.log.map((curLog) => (
//         {
//         logId: curLog.logId,
//         logDate: (curLog.logDate === undefined || curLog.logDate === null) ? curLog.logDate : moment(curLog.logDate).format('YYYY-MM-DD'),
//         logText: curLog.logText,
//         logValue: curLog.logValue
//         }
//     ));
//     task.log = newLogs;
//     return task;
//   })
//   this.setState({
//     tasks: newTasks,
//   }, () => this.saveData());
// }
// used in main
// updateData = (data) => {
//   const newTasks = data.map((task) => {
//     const newCompletedDates = task.completedDates.map((taskDate) => {
//       if (taskDate.hasOwnProperty('completedDate')) {
//         return {
//           completedId: this.uuidv4(),
//           completedDate: taskDate.completedDate,
//           hours: taskDate.hours
//         }
//       } else {
//         return {
//           completedId: this.uuidv4(),
//           completedDate: moment(taskDate).format('YYYY-MM-DD'),
//           hours: 0
//         }
//       }
//     });
//     if (newCompletedDates.length === 0 && task.completedDate !== ''){
//       newCompletedDates.push({
//         completedId: this.uuidv4(),
//         completedDate: moment(task.completedDate).format('YYYY-MM-DD'),
//         hours: 0
//       })
//     }
//     task.completedDates = newCompletedDates;
//     //delete task.activeDate;
//     return task;
//   })
//   return newTasks;
export const tasks = [
  {
    id: 1,
    description: 'Fix the door',
    category:'House',
    subCategory: 'Improvements',
    status: 'Started',
    dueDate: '2023-01-06',
    hours: 0,
    weeklyGoal: 0,
    priority: '1',
    assigned: 'Adam',
    contact: 'Jim',
    notes: '',
    workTime: [],
    tags: [],
    type: 'One-time',
    recurDays: 0,
    completedDates: [],
    points: 0,
    startTime: "08:00 AM",
    startTimeValue: 800,
  },
  {
    id: 2,
    description: 'Check Transactions',
    category:'Finance',
    subCategory: '',
    status: 'Started',
    dueDate: '2023-01-06',
    hours: 0,
    weeklyGoal: 0,
    priority: '1',
    assigned: 'Adam',
    contact: 'Jim',
    notes: '',
    workTime: [],
    tags: [],
    type: 'One-time',
    recurDays: 0,
    completedDates: [],
    points: 0,
    startTime: "08:00 AM",
    startTimeValue: 800,
  },
  {
    id: 3,
    description: 'Review Task list',
    category:'Work',
    subCategory: '',
    status: 'Started',
    dueDate: '2023-01-01',
    hours: 3,
    weeklyGoal: 0,
    priority: '1',
    assigned: 'Adam',
    contact: 'Jim',
    notes: '',
    workTime: [],
    tags: [],
    type: 'One-time',
    recurDays: 0,
    completedDates: [],
    points: 0,
    startTime: "08:00 AM",
    startTimeValue: 800,
  },
  {
    id: 4,
    description: 'Get a lower interest rate',
    category:'Finance',
    subCategory: '',
    status: 'Started',
    dueDate: '2022-07-03',
    hours: 3,
    weeklyGoal: 0,
    priority: '1',
    assigned: 'Adam',
    contact: 'Jim',
    notes: '',
    workTime: [],
    tags: [],
    type: 'One-time',
    recurDays: 0,
    completedDates: [],
    points: 0,
    startTime: "08:30 PM",
    startTimeValue: 830,
  },
  {
    id: 5,
    description: 'Fix the front steps',
    category:'House',
    subCategory: 'Fixes',
    status: 'Started',
    dueDate: '2022-07-03',
    hours: 2,
    weeklyGoal: 0,
    priority: '1',
    assigned: 'Adam',
    contact: 'Jim',
    notes: '',
    workTime: [],
    tags: [],
    type: 'One-time',
    recurDays: 0,
    completedDates: [],
    points: 0,
    startTime: null,
    startTimeValue: null,
  },
  {
    id: 6,
    description: 'Watch Star Wars',
    category:'Fun',
    subCategory: 'Movie',
    status: 'Started',
    dueDate: 'Invalid date',
    hours: 2,
    weeklyGoal: 0,
    priority: '1',
    assigned: 'Adam',
    contact: 'Jim',
    notes: '',
    workTime: [],
    tags: [],
    type: 'One-time',
    recurDays: 0,
    completedDates: [
      {
        completedId: 1,
        completedDate: '2022-06-01',
        hours: 1
      },
      {
        completedId: 2,
        completedDate: '2022-06-02',
        hours: 1
      }
    ],
    points: 0,
    startTime: null,
    startTimeValue: null,
  },
  {
    id: 7,
    description: 'Drink 8 cups of water',
    category:'Health',
    subCategory: 'Daily',
    status: 'Started',
    dueDate: '2022-12-01',
    hours: 1,
    weeklyGoal: 0,
    priority: '1',
    assigned: 'Adam',
    contact: 'Jim',
    notes: '',
    workTime: [],
    tags: [],
    type: 'Habit',
    recurDays: 1,
    completedDates: [
      {
        completedId: 1,
        completedDate: '2022-06-01',
        hours: 1
      },
      {
        completedId: 2,
        completedDate: '2022-06-02',
        hours: 1
      },
      {
        completedId: 3,
        completedDate: '2022-07-02',
        hours: 1
      },
      {
        completedId: 4,
        completedDate: '2022-07-03',
        hours: 1
      }
    ],
    points: 1,
    startTime: "08:00 AM",
    startTimeValue: 800,
  },
  {
    id: 8,
    description: 'Exercise',
    category:'Health',
    subCategory: 'Daily',
    status: 'Started',
    dueDate: '2022-12-01',
    hours: 0,
    weeklyGoal: 0,
    priority: '2',
    assigned: 'Adam',
    contact: 'Jim',
    notes: '',
    workTime: [],
    tags: [],
    type: 'Habit',
    recurDays: 1,
    completedDates: [
      {
        completedId: 1,
        completedDate: '2022-12-02',
        hours: .5
      },
      {
        completedId: 2,
        completedDate: '2022-11-01',
        hours: 1
      },
      {
        completedId: 3,
        completedDate: '2022-12-03',
        hours: .5
      },
      {
        completedId: 4,
        completedDate: '2023-01-01',
        hours: .5
      }
    ],
    points: 1,
    startTime: "10:00 AM",
    startTimeValue: 1000,
  },
  {
    id: 9,
    description: 'Plan tommorows dinner',
    category:'Health',
    subCategory: 'Tasks',
    status: 'Started',
    dueDate: '2023-01-03',
    hours: 0,
    weeklyGoal: 0,
    priority: '3',
    assigned: 'Adam',
    contact: 'Jim',
    notes: '',
    workTime: [],
    tags: [],
    type: 'Recurring',
    recurDays: 1,
    completedDates: [],
    points: 1,
    startTime: "09:00 AM",
    startTimeValue: 900,
  },
  {
    id: 10,
    description: 'Go on a walk',
    category:'Family',
    subCategory: '',
    status: 'Started',
    dueDate: '2023-01-03',
    hours: 0,
    weeklyGoal: 0,
    priority: '3',
    assigned: 'Adam',
    contact: 'Jim',
    notes: '',
    workTime: [],
    tags: [],
    type: 'Recurring',
    recurDays: 1,
    completedDates: [],
    points: 1,
    startTime: "08:00 AM",
    startTimeValue: 800,
  },
  {
    id: 11,
    description: 'Watch spiderman',
    category:'Fun',
    subCategory: 'Movie',
    status: 'Completed',
    dueDate: '2021-01-06',
    hours: 0,
    weeklyGoal: 0,
    priority: '1',
    assigned: 'Adam',
    contact: 'Jim',
    notes: '',
    workTime: [],
    tags: [],
    type: 'One-time',
    recurDays: 0,
    completedDates: [
      {
        completedId: 1,
        completedDate: '2021-06-01',
        hours: 2
      },
    ],
    points: 0,
    startTime: "08:00 AM",
    startTimeValue: 800,
  },
]
export const tasks = [
  {
    id: 1,
    type: 'Habit',
    frequency: 'Recurring',
    description: 'Exercise',
    category:'Health',
    dates: [
      {
        date: '2023-08-27',
        state: 'closed',
      },
      {
        date: '2023-08-28',
        state: 'open',
      },
      {
        date: '2023-09-11',
        state: 'open',
      },
      {
        date: '2023-09-12',
        state: 'open',
      },
    ], 
    priority: '1',
    notes: '',
    recurDays: 0,
    recurStart: '',
    recurEnd: '',
  },
  {
    id: 2,
    type: 'Task',
    frequency: 'One-time',
    description: 'Pay a medical bill',
    category:'Tasks',
    dates: [
      {
        date: '2023-09-08',
        state: 'open',
      },
    ], 
    priority: '1',
    notes: '',
    recurDays: 0,
    recurStart: '',
    recurEnd: '',
  },
  {
    id: 3,
    type: 'Media',
    frequency: 'One-time',
    description: 'Watch Antman movie',
    category:'Movies',
    dates: [
      {
        date: '2023-09-12',
        state: 'open',
      },
    ], 
    priority: '1',
    recurDays: 0,
    recurStart: '',
    recurEnd: '',
  },
  {
    id: 4,
    type: 'Media',
    frequency: 'Ongoing',
    description: 'Watch show, season 1',
    category:'Shows',
    dates: [
      {
        date: '2023-09-12',
        state: 'closed',
      },
    ], 
    priority: '1',
    recurDays: 0,
    recurStart: '',
    recurEnd: '',
  },
]
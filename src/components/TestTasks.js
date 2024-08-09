export const tasks = [
  {
    id: 1,
    type: 'Chore',
    frequency: 'Daily',
    description: 'Exercise',
    category:'Health',
    dates: [
      {
        date: '2024-07-01',
        state: 'closed',
      },
      {
        date: '2024-08-01',
        state: 'open',
      },
      {
        date: '2024-08-09',
        state: 'open',
      },
      {
        date: '2024-08-12',
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
  {
    id: 5,
    type: 'Task',
    frequency: 'One-time',
    description: 'Watch the Matrix',
    category:'Media',
    dates: [
      {
        date: '2001-09-08',
        state: 'closed',
      },
    ], 
    priority: '1',
    notes: '',
    recurDays: 0,
    recurStart: '',
    recurEnd: '',
  },
]
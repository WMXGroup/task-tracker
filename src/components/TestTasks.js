export const tasks = [
  {
    id: 1,
    type: 'Recurring',
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
        date: '2023-09-09',
        state: 'open',
      },
      {
        date: '2023-09-10',
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
    type: 'One-time',
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
    type: 'One-time',
    description: 'Watch Antman movie',
    category:'Movies',
    dates: [
      {
        date: '2023-09-07',
        state: 'open',
      },
    ], 
    priority: '1',
    recurDays: 0,
    recurStart: '',
    recurEnd: '',
  },
]
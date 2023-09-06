export const tasks = [
  {
    id: 1,
    type: 'Recurring',
    description: 'Fix the door',
    category:'House',
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
        date: '2023-09-03',
        state: 'open',
      },
      {
        date: '2023-09-04',
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
        date: '2023-09-02',
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
        date: '2023-09-01',
        state: 'open',
      },
    ], 
    priority: '1',
    recurDays: 0,
    recurStart: '',
    recurEnd: '',
  },
]
export type TASK_TYPE = {
  id: string;
  title: string;
  description: string;
  tag: string;
  priority: 'low' | 'medium' | 'high';
  createdOn: string;
  status: 'to do' | 'in progress' | 'done' | 'cancel';
  history: boolean;
  future: boolean;
};

export const TASKS: Array<TASK_TYPE> = [
  {
    id: '1',
    title: 'Title 1',
    description: 'Description 1',
    tag: 'Tag 1',
    priority: 'low',
    createdOn: 'date',
    status: 'to do',
    history: false,
    future: false,
  },
  {
    id: '2',
    title: 'Title 2',
    description: 'Description 2',
    tag: 'Tag 2',
    priority: 'medium',
    createdOn: 'date',
    status: 'to do',
    history: false,
    future: false,
  },
  {
    id: '3',
    title: 'Title 3',
    description: 'Description 3',
    tag: 'Tag 3',
    priority: 'low',
    createdOn: 'date',
    status: 'to do',
    history: false,
    future: false,
  },
  {
    id: '4',
    title: 'Title 4',
    description: 'Description 4',
    tag: 'Tag 4',
    priority: 'high',
    createdOn: 'date',
    status: 'in progress',
    history: false,
    future: false,
  },
  {
    id: '5',
    title: 'Title 5',
    description: 'Description 5',
    tag: 'Tag 5',
    priority: 'medium',
    createdOn: 'date',
    status: 'done',
    history: false,
    future: false,
  },
]

export const PRIORITY_COLORS = {
  low: '#40A737',
  medium: '#FEA946',
  high: '#FF2473'
}

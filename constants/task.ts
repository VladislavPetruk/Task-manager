// export type TASK_STATUSES = 'to_do' | 'in_progress' | 'done' | 'cancel';
// export const TASK_STATUSES_ARRAY = ['to_do', 'in_progress', 'done', 'cancel'];

// export type TasksByStatus = Map<Task['status'], Array<Task>>;

// export type Task = {
//   id: string;
//   title: string;
//   description: string;
//   tags: Array<string>;
//   priority: 'low' | 'medium' | 'high';
//   createdOn: string;
//   updateOn: string;
//   status: TASK_STATUSES;
//   isCompleted: boolean;
//   isFutured: boolean;
//   position: number;
// };

type TaskComment = {
  content: string;
  id: string;
  createdOn: string;
  taskId: string;
};

export enum TaskStatus {
  TODO = 'to_do',
  IN_PROGRESS = 'in_progress',
  DONE = 'done',
  CANCEL = 'cancel',
}

export enum TaskPriority {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
}

export enum TaskTag {
  GOALS = 'goals',
  HEALTH = 'health',
  INTERESTS = 'interests',
  SPORT = 'sport',
  TRAVEL = 'travel',
  WORK = 'work',
  OTHER = 'other',
}

export type Task = {
  id: string;
  title: string;
  description: string;
  tags: Array<string>;
  priority: TaskPriority;
  createdOn: string;
  updatedOn: string;
  status: TaskStatus;
  isCompleted: boolean;
  isFutured: boolean;
  position: number;
  comments: Array<TaskComment>;
};

export const INITIAL_STATE: Task = {
  id: '',
  title: '',
  description: '',
  createdOn: '',
  updatedOn: '',
  tags: [],
  comments: [],
  priority: TaskPriority.MEDIUM,
  status: TaskStatus.TODO,
  isCompleted: false,
  isFutured: false,
  position: 0,
};

export const STATUS_OPTIONS = [
  { value: TaskStatus.TODO, label: 'To do' },
  { value: TaskStatus.IN_PROGRESS, label: 'In progress' },
  { value: TaskStatus.DONE, label: 'Done' },
  { value: TaskStatus.CANCEL, label: 'Cancel' },
];

export const TAGS_OPTIONS = [
  { value: TaskTag.GOALS, color: '#f37336' },
  { value: TaskTag.HEALTH, color: '#5aba4a' },
  { value: TaskTag.INTERESTS, color: '#78559b' },
  { value: TaskTag.SPORT, color: '#4758d6' },
  { value: TaskTag.TRAVEL, color: '#bf1796' },
  { value: TaskTag.WORK, color: '#c7b198' },
  { value: TaskTag.OTHER, color: '#BDBDBD' },
];
// export const TAGS_OPTIONS = [
//   { value: TaskTag.GOALS, color: '#AB47BC' },
//   { value: TaskTag.HEALTH, color: '#FFB74D' },
//   { value: TaskTag.INTERESTS, color: '#42A5F5' },
//   { value: TaskTag.SPORT, color: '#FF5733' },
//   { value: TaskTag.TRAVEL, color: '#4CAF50' },
//   { value: TaskTag.WORK, color: '#5C6BC0' },
//   { value: TaskTag.OTHER, color: '#BDBDBD' },
// ];

// interests: #42A5F5 — насичений блакитний, асоціюється з відкриттям і новизною.
// 	3.	travel: #4CAF50 — природний зелений, нагадує про пригоди та природу.
// 	4.	health: #FFB74D — теплий персиковий, що символізує баланс і гармонію.
// 	5.	goals: #AB47BC — насичений фіолетовий, асоціюється з амбіціями і натхненням.
// 	6.	work: #5C6BC0 — приглушений синій, що добре підходить для робочих задач.
// 	7.	other: #BDBDBD —

// const board: TaskStatus[] = [
//   TaskStatus.TODO,
//   TaskStatus.IN_PROGRESS,
//   TaskStatus.DONE,
// ];

// type TasksState = {
//   [key in TaskStatus]: Task[];
// };

// export const TASKS: Array<Task> = [
//   {
//     id: '1',
//     title: 'Title 1',
//     description: 'Description 1',
//     tag: 'Tag 1',
//     priority: 'low',
//     createdOn: 'date',
//     status: 'to do',
//     history: false,
//     future: false,
//   },
//   {
//     id: '2',
//     title: 'Title 2',
//     description: 'Description 2',
//     tag: 'Tag 2',
//     priority: 'medium',
//     createdOn: 'date',
//     status: 'to do',
//     history: false,
//     future: false,
//   },
//   {
//     id: '3',
//     title: 'Title 3',
//     description: 'Description 3',
//     tag: 'Tag 3',
//     priority: 'low',
//     createdOn: 'date',
//     status: 'to do',
//     history: false,
//     future: false,
//   },
//   {
//     id: '4',
//     title: 'Title 4',
//     description: 'Description 4',
//     tag: 'Tag 4',
//     priority: 'high',
//     createdOn: 'date',
//     status: 'in_progress',
//     history: false,
//     future: false,
//   },
//   {
//     id: '5',
//     title: 'Title 5',
//     description: 'Description 5',
//     tag: 'Tag 5',
//     priority: 'medium',
//     createdOn: 'date',
//     status: 'done',
//     history: false,
//     future: false,
//   },
// ];

export const PRIORITY_COLORS = {
  low: '#40A737',
  medium: '#FEA946',
  high: '#FF2473',
};

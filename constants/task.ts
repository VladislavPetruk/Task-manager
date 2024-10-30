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

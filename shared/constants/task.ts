export enum TaskStatus {
  TO_DO = 'TO_DO',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE',
  CANCEL = 'CANCEL',
}

export enum TaskPriority {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
}

export enum TaskStage {
  CURRENT = 'CURRENT',
  SCHEDULED = 'SCHEDULED',
  ARCHIVED = 'ARCHIVED',
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

type TaskComment = {
  content: string;
  id: string;
  createdOn: string;
  taskId: string;
};

export type Task = {
  id: string;
  title: string;
  description: string;
  tags: Array<string>;
  priority: TaskPriority;
  createdOn: string;
  updatedOn: string;
  status: TaskStatus;
  currentStage: TaskStage;
  position: number;
  comments: Array<TaskComment>;
};

// Options
export const STATUS_OPTIONS = [
  { value: TaskStatus.TO_DO, label: 'To do' },
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

// Labels
export const STATUS_LABELS: { [key in TaskStatus]: string } = {
  [TaskStatus.TO_DO]: 'To do',
  [TaskStatus.IN_PROGRESS]: 'In progress',
  [TaskStatus.DONE]: 'Done',
  [TaskStatus.CANCEL]: 'Cancel',
};

export const PRIORITY_LABELS: { [key in TaskPriority]: string } = {
  [TaskPriority.LOW]: 'Low',
  [TaskPriority.MEDIUM]: 'Medium',
  [TaskPriority.HIGH]: 'High',
};

export const STAGE_LABELS: { [key in TaskStage]: string } = {
  [TaskStage.CURRENT]: 'Current',
  [TaskStage.SCHEDULED]: 'Scheduled',
  [TaskStage.ARCHIVED]: 'Archived',
};

export const PRIORITY_COLORS = {
  [TaskPriority.LOW]: '#40A737',
  [TaskPriority.MEDIUM]: '#FEA946',
  [TaskPriority.HIGH]: '#FF2473',
};

// Initial states
export const INITIAL_STATE: Task = {
  id: '',
  title: '',
  description: '',
  createdOn: '',
  updatedOn: '',
  tags: [],
  comments: [],
  priority: TaskPriority.MEDIUM,
  status: TaskStatus.TO_DO,
  currentStage: TaskStage.CURRENT,
  // isCompleted: false,
  // isFutured: false,
  position: 0,
};

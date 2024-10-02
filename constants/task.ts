export type TASK_TYPE = {
  id: string
  title: string
  description: string
  tag: string
  priority: 'low' | 'medium' | 'high'
  createdOn: string
  status: 'to do' | 'in progress' | 'done' | 'cancel'
  history: boolean
  future: boolean
}

export const TASK: TASK_TYPE = {
  id: '1',
  title: 'Task title',
  description: 'Task description',
  tag: 'Task tag',
  priority: 'low',
  createdOn: 'date',
  status: 'to do',
  history: false,
  future: false
}
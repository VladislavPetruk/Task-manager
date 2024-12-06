import type { Editor } from '@tiptap/react';
import { TaskPriority, TaskStatus } from '../constants';
import { ZodIssue } from 'zod';

export type LoginParams = {
  email: string;
  password: string;
};

export type RegistrationParams = {
  username: string;
  email: string;
  password: string;
};

export type TaskHandlerParams = {
  title: string;
  description: string;
  tags: Array<string>;
  priority: TaskPriority;
  status: TaskStatus;
};

export interface FormatAction {
  label: string;
  icon?: React.ReactNode;
  shortcuts: string[];
  value: string;
  action: (editor: Editor) => void;
  isActive: (editor: Editor) => boolean;
  canExecute: (editor: Editor) => boolean;
}

export type ActionResult<T> =
  | { status: 'success'; data: T }
  | { status: 'error'; error: string | ZodIssue[] };

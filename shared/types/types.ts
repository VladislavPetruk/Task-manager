import { z } from 'zod';
import type { Editor } from '@tiptap/react';

export type LoginParams = {
  email: string;
  password: string;
};

export type RegistrationParams = {
  username: string;
  email: string;
  password: string;
};

export interface FormatAction {
  label: string;
  icon?: React.ReactNode;
  action: (editor: Editor) => void;
  isActive: (editor: Editor) => boolean;
  canExecute: (editor: Editor) => boolean;
  shortcuts: string[];
  value: string;
}

// temporary !!!
export const LOGIN_SCHEMA = z.object({
  email: z.string({
    required_error: 'You must fill email to login in dashboard',
  }),
  password: z.string({
    invalid_type_error: 'Invalid password',
    required_error: 'You must fill in this field.',
  }),
});

export const REGISTRATION_SCHEMA = z.object({
  username: z
    .string({
      required_error: 'You must fill in this field.',
    })
    .min(3, { message: 'Username must be at least 3 characters long' }),

  email: z
    .string({
      required_error: 'You must fill in this field',
    })
    .email({ message: 'Invalid email address' }),

  password: z
    .string({
      invalid_type_error: 'Invalid password',
      required_error: 'You must fill in this field.',
    })
    .min(8, { message: 'Password must be at least 8 characters long' })
    .regex(/[A-Za-z]/, { message: 'Password must contain at least one letter' })
    .regex(/\d/, { message: 'Password must contain at least one number' }),
});

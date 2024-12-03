import { z } from 'zod';

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

export const RESET_PASSWORD_SCHEMA = z.object({
  password: z
    .string({
      invalid_type_error: 'Invalid password',
      required_error: 'You must fill in this field.',
    })
    .min(8, { message: 'Password must be at least 8 characters long' })
    .regex(/[A-Za-z]/, { message: 'Password must contain at least one letter' })
    .regex(/\d/, { message: 'Password must contain at least one number' }),
});

export const TASK_HANDLER_SCHEMA = z.object({
  title: z
    .string({
      required_error: 'You must fill in this field.',
    })
    .min(3, { message: 'Title must be at least 3 characters long' }),

  description: z
    .string({
      required_error: 'Description is required',
    })
    .min(1, 'Description is required'),
});

export type ResetPasswordSchema = z.infer<typeof RESET_PASSWORD_SCHEMA>;

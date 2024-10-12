import { z } from 'zod';

const RegisterSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  firstName: z.string().min(1, 'Please enter your first name'),
  lastName: z.string().min(1, 'Please enter your last name'),
  password: z.string().min(8, 'Your password must be at least 8 characters long'),
  confirmPassword: z.string().min(8, 'Your password must be at least 8 characters long'),
  image: z.any().optional(),
}).superRefine(({ confirmPassword, password }, ctx) => {
  if (confirmPassword !== password) {
    ctx.addIssue({
      code: 'custom',
      message: 'The passwords did not match',
      path: ['confirmPassword'],
    });
  }
});

export default RegisterSchema;

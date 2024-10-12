import { z } from 'zod';

const LoginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(8, 'Your password must be at least 8 characters long'),
});

export default LoginSchema;

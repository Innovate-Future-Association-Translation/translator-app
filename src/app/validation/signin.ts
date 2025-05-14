import { z } from 'zod';

// Zod sign-in validation schema
export const signinSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(1, 'Password cannot be empty'),
});

// Sign-in form data type
export type SigninFormData = z.infer<typeof signinSchema>;

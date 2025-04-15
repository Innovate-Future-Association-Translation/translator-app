import { z } from 'zod';
const phoneCountryCodes = ['+61', '+86', '+1', '+44', '+81', '+82'];
const phoneRegex = new RegExp(
  `^(${phoneCountryCodes.map((code) => code.replace('+', '\\+')).join('|')})\\d+$`
);

// Zod validation schema for signup
export const signupSchema = z
  .object({
    name: z.string().min(1, 'Username cannot be empty'),
    email: z.string().email('Please enter a valid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    confirmPassword: z.string().min(1, 'Please confirm your password'),
    language: z.string().min(1, 'Please select a language'),
    phone: z
      .string()
      .min(1, 'Phone number cannot be empty')
      .regex(phoneRegex, 'Please enter a valid phone number'),
    selfDescription: z.string().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

// Signup form data type
export type SignupFormData = z.infer<typeof signupSchema>;

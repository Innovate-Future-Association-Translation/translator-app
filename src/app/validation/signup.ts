import { z } from 'zod';
const phoneCountryCodes = ['+61', '+86', '+1', '+44', '+81', '+82'];
const phoneRegex = new RegExp(
  `^(${phoneCountryCodes.map((code) => code.replace('+', '\\+')).join('|')})\\d+$`
);

const australianPhoneRegex = /^(?:\+61|0)4\d{8}$/;

// Zod validation schema for signup
export const signupSchema = z
  .object({
    name: z.string().min(1, 'Username cannot be empty'),
    email: z.string().email('Please enter a valid email address'),
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters')
      .max(30, 'Password must be at most 30 characters')
      .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
      .regex(/[0-9]/, 'Password must contain at least one number'),
    confirmPassword: z.string().min(1, 'Please confirm your password'),
    language: z.string().min(1, 'Please select a language'),
    phone: z
      .string()
      .min(1, 'Phone number cannot be empty')
      .refine(
        (value) => {
          if (value.startsWith('+61') || value.startsWith('0')) {
            return australianPhoneRegex.test(value);
          }
          return phoneRegex.test(value);
        },
        {
          message: 'Please enter a valid phone number. Australian mobile numbers should start with +614 or 04 followed by 8 digits',
        }
      ),
    selfDescription: z.string().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

// Signup form data type
export type SignupFormData = z.infer<typeof signupSchema>;

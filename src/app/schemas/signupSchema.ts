import * as z from "zod";

export const signupSchema = z
.object({
    email: z.string().email('This email has been registered'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    confirmPassword: z.string().min(6, 'Password must be at least 6 characters'),
    userName: z.string().min(1, 'Username is required'),
    language: z.string().nonempty('Please select a language'),
    phoneCode: z.string().nonempty('Country code is required'),
    phoneNumber: z.string().min(6, 'Invalid phone number'),
    description: z.string().max(300, 'Description too long').optional(),
})
.refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Passwords do not match',
});

export type SignupFormData = z.infer<typeof signupSchema>;

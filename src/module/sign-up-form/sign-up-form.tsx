'use client';

import {
    Box,
    Button, Flex,
    Heading, Image, Link, Text, useBreakpointValue
} from '@chakra-ui/react';
import { useState } from 'react';

import { SignupFormData, signupSchema } from '@/app/schemas/signupSchema';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
// Import Google icon
import { FcGoogle } from 'react-icons/fc';

import { ConfirmPasswordField } from './confirm-password';
import { DescriptionField } from './description';
import { EmailField } from './email';
import { LanguageField } from './language';
import { PasswordField } from './password';
import { PhoneNumberField } from './phone-number';
import { UsernameField } from './username';

/**
 * Registration Page Component
 * Provides a user interface with multiple registration methods
 * @returns JSX Element - Renders the registration page
 */
export default function SignUpPage() {
// Password visibility state
const [showPassword, setShowPassword] = useState(false);
const [showConfirmPassword, setShowConfirmPassword] = useState(false);
const isMobile = useBreakpointValue({ base: true, md: false });
const [countryCode, setCountryCode] = useState("+61");
// Use react-hook-form for form handling and validation
const {
register,
handleSubmit,
formState: { errors, isSubmitting },
} = useForm <SignupFormData>({
resolver: zodResolver(signupSchema),
mode: "onChange", 
});
// Password visibility toggle
const handleClickShowPassword = () => {
setShowPassword(prevState => !prevState);
};
// Send verification code handler
const handleSendCode = () => {
console.log('Sending verification code');
// In actual implementation, should call API to send verification code
};

// 处理Google OAuth认证
const handleGoogleOauth = () => {
    window.location.href = "http://localhost:8000/api/v1/users/googleAuth";
};

// add onSubmit function
const onSubmit = async (data:  SignupFormData) => {
try {
console.log("Form Data:", data);
// here can call API handling registration request
} catch (error) {
console.error('Registration error:', error);
}
};

return (
<Box bg="white" minH="100vh" maxW="md" py={8} mx="auto" px={{ base: 4, md: 8 }} width="100%">
{/* title - width responsive design */}
<Box mb={10} maxW={{ base: "70%", md: "100%" }} mx="auto">
    {/* Logo and menu */}
    <Flex justify="space-between" align="center" mb={8} width="100%">
    <Flex align="center">
        <Image
        src="/icons/logo.png"
        alt="IFA Translator Logo"
        w={10}
        h={10}
        borderRadius="full"
        mr={3}
        />
        <Text fontSize="xl" fontWeight="bold" color="blue.500">
        IFA TRANSLATOR
        </Text>
    </Flex>
    <Text fontSize="2xl">☰</Text>
    </Flex>

    {/* Sign Up title */}
    <Heading
    fontSize="2xl"
    fontWeight="bold"
    color="black"
    lineHeight="shorter"
    mb={6}
    textAlign="left" // force align left
    width="100%" // full container width
    >
    Sign Up
    </Heading>
</Box>

{/* Form container */}
<Box maxW={{ base: "70%", md: "100%" }} mx="auto" width="100%">
    <Flex
    as="form"
    direction="column"
    gap={6}
    onSubmit={handleSubmit(onSubmit)}
    width="100%"
    >
    {/* Email */}
    <EmailField register={register} errors={errors} />
    {/* Password */}
    <PasswordField
        register={register}
        errors={errors}
        showPassword={showPassword}
        onToggleShowPassword={() => setShowPassword(!showPassword)}
        />
    {/* ConfirmedPassword Field */}
    <ConfirmPasswordField
        register={register}
        errors={errors}
        showConfirmPassword={showConfirmPassword}
        onToggleShowConfirmPassword={() => setShowConfirmPassword(!showConfirmPassword)}
        />
    {/* Username */}
    <UsernameField register={register} errors={errors} />
    {/* Language */}
    <LanguageField register={register} errors={errors} />
    {/* PhoneNumber */}
    <PhoneNumberField
        register={register}
        errors={errors}
        countryCode={countryCode}
        setCountryCode={setCountryCode}
        />
    {/* Description */}
    <DescriptionField register={register} errors={errors} />
{/* Create account button */}
    <Button
        type="submit"
        colorScheme="gray"
        size="lg"
        mt={6}
        // mb={4}
        py={6}
        bg="gray.300"
        color="white"
        _hover={{ bg: "black" }}
        borderRadius="full"
    >
        Create Account
    </Button>
    {/* Divider */}
    <Flex w="full" align="center" gap={3}>
        <Box flex={1} h="1px" bg="gray.200" />
        <Text color="gray.500">OR</Text>
        <Box flex={1} h="1px" bg="gray.200" />
    </Flex>
    {/* Google login button */}
    <Button
        w="full"
        variant="outline"
        borderRadius="full"
        size={{ base: "md", md: "lg" }} // responsive size
        display="flex"
        justifyContent="center"
        alignItems="center"
        gap={2}
        py={{ base: 5, md: 6 }}
        fontSize={{ base: "sm", md: "md" }}
        borderWidth="1.5px"
        onClick={handleGoogleOauth}
    >
        <FcGoogle size={18} />
        {/* icon size is responsive */}
        <Text fontWeight="bold">Sign up with Google</Text>
    </Button>
    <Text textAlign="center" color="gray.600">
        Already have an account?{" "}
        <Link href="/signin" color="blue.500" fontWeight="bold" ml={2}>
        Sign In
        </Link>
    </Text>
    </Flex>
</Box>
</Box>
);
}


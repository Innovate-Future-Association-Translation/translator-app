'use client';

import { useErrorStore } from '@/store/errorStore';
import { useRouter } from 'next/navigation';
import AuthFailHandler from '@/app/module/auth-fail-handler/handle-auth-fail';

function AuthErrorPage() {
  const errorMessage = useErrorStore((state) => state.errorMessage);
  const router = useRouter();
  const switchToSignUp = () => {
    router.push('/signup');
  };

  const switchToSignIn = () => {
    router.push('/sign-in');
  };

  return (
    <AuthFailHandler
      errorMessage={errorMessage || 'An unknown error occurred.'}
      switchToSignIn={switchToSignIn}
      switchToSignUp={switchToSignUp}
    />
  );
}
export default AuthErrorPage;

"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const LoginPage = () => {
  const router = useRouter();

  useEffect(() => {
    router.push('/');
  }, [router]);

  return (
    <div>
      <p>Redirecting to home page...</p>
    </div>
  );
};

export default LoginPage;

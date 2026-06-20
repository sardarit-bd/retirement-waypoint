import { AuthPage } from '@/components/auth/auth-page';
import { redirect } from 'next/navigation';
import { getSession } from '@/lib/auth-client';

export default async function AuthRoute() {
  const session = await getSession();
  
  // Redirect if already authenticated
  if (session?.data) {
    redirect('/dashboard');
  }

  return <AuthPage />;
}
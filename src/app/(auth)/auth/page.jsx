import { AuthPage } from '@/components/auth/auth-page';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { getServerSession } from '@/lib/auth-server';

export default async function AuthRoute() {
  const session = await getServerSession(await headers());
  
  // Redirect if already authenticated
  if (session?.data) {
    const destination =
      session.data.user?.role === 'admin' ? '/admin' : '/dashboard';
    redirect(destination);
  }

  return <AuthPage />;
}

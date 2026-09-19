import { AuthPage } from '@/components/auth/auth-page';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { getServerSession } from '@/lib/auth-server';

export default async function AuthRoute({ searchParams }) {
  const session = await getServerSession(await headers());
  const resolvedSearchParams = await searchParams;
  const redirectUrl = resolvedSearchParams?.redirect;
  
  // Redirect if already authenticated
  if (session?.data) {
    const destination =
      redirectUrl || (session.data.user?.role === 'admin' ? '/admin' : '/dashboard');
    redirect(destination);
  }

  return <AuthPage />;
}

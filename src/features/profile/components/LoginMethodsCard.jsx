'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useQueryClient } from '@tanstack/react-query';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { CheckCircle, Mail, Key, Link as LinkIcon, Unlink, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { authClient } from '@/lib/auth-client';
import { QUERY_KEYS } from '@/lib/query-client';
import { useLinkedAccounts, QUERY_KEY_LINKED_ACCOUNTS } from '../hooks/useProfile';
import { ChangePasswordDialog } from './ChangePasswordDialog';
import toast from 'react-hot-toast';
import { FiChrome } from 'react-icons/fi';
import { ForgotPasswordModal } from '@/components/auth/forgot-password-modal';

export function LoginMethodsCard({ profile }) {
  const queryClient = useQueryClient();
  const { data: accounts, isLoading: accountsLoading } = useLinkedAccounts();
  const [isLinking, setIsLinking] = useState(false);
  const [isUnlinking, setIsUnlinking] = useState(false);
  const [passwordModalOpen, setPasswordModalOpen] = useState(false);
  const [forgotPasswordModalOpen, setForgotPasswordModalOpen] = useState(false);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const handledError = useRef(false);

  // Handle OAuth linking errors returned via redirect query params
  useEffect(() => {
    if (handledError.current) return;
    const params = new URLSearchParams(window.location.search);
    const error = params.get('error');
    const description = params.get('error_description');
    if (error && (error.includes('email_doesnt_match') || description?.includes('email'))) {
      handledError.current = true;
      toast.error(
        'Please choose the same Google email address as your Retirement Waypoint account to connect Google.'
      );
    }
  }, []);

  const hasEmailPassword = accounts?.some((a) => a.providerId === 'credential') ?? false;
  const hasGoogleLinked = accounts?.some((a) => a.providerId === 'google') ?? false;

  const invalidateQueries = () => {
    queryClient.invalidateQueries({ queryKey: [QUERY_KEY_LINKED_ACCOUNTS] });
    queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.USER_PROFILE] });
  };

  const handleConnectGoogle = () => {
    setConfirmDialogOpen(true);
  };

  const handleConnectGoogleConfirmed = async () => {
    setConfirmDialogOpen(false);
    setIsLinking(true);
    try {
      await authClient.linkSocial({
        provider: 'google',
        callbackURL: `${window.location.pathname}${window.location.search}`,
        errorCallbackURL: `${window.location.pathname}${window.location.search}`,
      });
    } catch (error) {
      toast.error(
        error?.message?.includes('email_doesnt_match')
          ? 'Please choose the same Google email address as your Retirement Waypoint account to connect Google.'
          : error?.message || 'Failed to connect Google account'
      );
    } finally {
      setIsLinking(false);
    }
  };

  const handleDisconnectGoogle = async () => {
    if (!hasEmailPassword) {
      toast.error('Cannot disconnect: you need at least one login method. Set a password first.');
      return;
    }

    setIsUnlinking(true);
    try {
      await authClient.unlinkAccount({ providerId: 'google' });
      invalidateQueries();
      toast.success('Google account disconnected');
    } catch (error) {
      const msg = error?.message || error?.status || 'Failed to disconnect Google account';
      toast.error(msg);
    } finally {
      setIsUnlinking(false);
    }
  };

  const hasMultipleMethods = [hasEmailPassword, hasGoogleLinked].filter(Boolean).length > 1;

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        <Card className="border-white/20 bg-white/80 backdrop-blur-xl rounded-3xl shadow-[0_15px_50px_rgba(4,16,58,0.08)]">
          <CardContent className="p-6">
            <h3 className="mb-4 text-lg font-semibold text-[#1B2B4B]">Login Methods</h3>

            {accountsLoading ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="h-5 w-5 animate-spin text-[#1B2B4B]/40" />
              </div>
            ) : (
              <div className="space-y-4">
                {/* Email & Password */}
                <div
                  className={cn(
                    'flex items-center justify-between rounded-xl border p-4 transition-all',
                    hasEmailPassword
                      ? 'border-emerald-500/20 bg-emerald-500/5'
                      : 'border-[#1B2B4B]/10 bg-[#F8F5EF]'
                  )}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={cn(
                        'rounded-lg p-2',
                        hasEmailPassword ? 'bg-emerald-500/10' : 'bg-[#1B2B4B]/5'
                      )}
                    >
                      <Mail
                        className={cn(
                          'h-5 w-5',
                          hasEmailPassword ? 'text-emerald-500' : 'text-[#1B2B4B]/40'
                        )}
                      />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-[#1B2B4B]">Email & Password</p>
                      <p className="text-xs text-[#1B2B4B]/50">
                        {hasEmailPassword ? 'Connected' : 'Not set'}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {hasEmailPassword ? (
                      <>
                        <Badge className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20">
                          <CheckCircle className="mr-1 h-3 w-3" />
                          Connected
                        </Badge>
                        <Button
                          onClick={() => setPasswordModalOpen(true)}
                          variant="outline"
                          size="sm"
                          className="rounded-full border-[#1B2B4B]/15 text-[#1B2B4B] hover:border-[#C9A84C]/30 cursor-pointer"
                        >
                          <Key className="mr-1 h-3 w-3" />
                          Change Password
                        </Button>
                      </>
                    ) : (
                      <>
                        <Badge variant="outline" className="text-[#1B2B4B]/40 border-[#1B2B4B]/10">
                          Not set
                        </Badge>
                        <Button
                          onClick={() => setForgotPasswordModalOpen(true)}
                          variant="outline"
                          size="sm"
                          className="rounded-full border-[#1B2B4B]/15 text-[#C9A84C] hover:border-[#C9A84C]/30 cursor-pointer"
                        >
                          <Key className="mr-1 h-3 w-3" />
                          Set Password
                        </Button>
                      </>
                    )}
                  </div>
                </div>

                {/* Google */}
                <div
                  className={cn(
                    'flex items-center justify-between rounded-xl border p-4 transition-all',
                    hasGoogleLinked
                      ? 'border-emerald-500/20 bg-emerald-500/5'
                      : 'border-[#1B2B4B]/10 bg-[#F8F5EF]'
                  )}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={cn(
                        'rounded-lg p-2',
                        hasGoogleLinked ? 'bg-emerald-500/10' : 'bg-[#1B2B4B]/5'
                      )}
                    >
                      <FiChrome
                        className={cn(
                          'h-5 w-5',
                          hasGoogleLinked ? 'text-emerald-500' : 'text-[#1B2B4B]/40'
                        )}
                      />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-[#1B2B4B]">Google Account</p>
                      <p className="text-xs text-[#1B2B4B]/50">
                        {hasGoogleLinked ? 'Connected' : 'Not connected'}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {hasGoogleLinked ? (
                      <>
                        <Badge className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20">
                          <CheckCircle className="mr-1 h-3 w-3" />
                          Connected
                        </Badge>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={handleDisconnectGoogle}
                          disabled={isUnlinking}
                          className="text-xs text-red-500 hover:bg-red-50 hover:text-red-600 cursor-pointer"
                        >
                          {isUnlinking ? (
                            <Loader2 className="mr-1 h-3 w-3 animate-spin" />
                          ) : (
                            <Unlink className="mr-1 h-3 w-3" />
                          )}
                          Disconnect
                        </Button>
                      </>
                    ) : (
                      <>
                        <Badge variant="outline" className="text-[#1B2B4B]/40 border-[#1B2B4B]/10">
                          Not connected
                        </Badge>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={handleConnectGoogle}
                          disabled={isLinking}
                          className="rounded-full border-[#1B2B4B]/15 text-[#1B2B4B] hover:border-[#C9A84C]/30 cursor-pointer"
                        >
                          {isLinking ? (
                            <Loader2 className="mr-1 h-3 w-3 animate-spin" />
                          ) : (
                            <LinkIcon className="mr-1 h-3 w-3" />
                          )}
                          Connect
                        </Button>
                      </>
                    )}
                  </div>
                </div>

                {/* Multiple Methods Info */}
                {hasMultipleMethods && (
                  <div className="rounded-xl bg-[#C9A84C]/10 p-4 text-center">
                    <p className="text-sm font-medium text-[#C9A84C]">
                      ✓ Multiple sign-in methods enabled
                    </p>
                    <p className="mt-1 text-xs text-[#1B2B4B]/60">
                      Your account can be accessed using any connected method.
                    </p>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>

      <ChangePasswordDialog open={passwordModalOpen} onOpenChange={setPasswordModalOpen} />

      <ForgotPasswordModal
        open={forgotPasswordModalOpen}
        onClose={() => {
          setForgotPasswordModalOpen(false);
          invalidateQueries();
        }}
      />

      <AlertDialog open={confirmDialogOpen} onOpenChange={setConfirmDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Connect Google Account?</AlertDialogTitle>
            <AlertDialogDescription>
              You must choose the <strong>same</strong> Google email address as your
              Retirement Waypoint account to connect Google.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleConnectGoogleConfirmed}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

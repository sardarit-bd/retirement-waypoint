'use client';

import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CheckCircle, Mail, Chrome, Key, Link as LinkIcon, Unlink } from 'lucide-react';
import { cn } from '@/lib/utils';
import { signIn } from '@/lib/auth-client';
import toast from 'react-hot-toast';
import { FiChrome } from 'react-icons/fi';

export function LoginMethodsCard({ profile }) {
  // TODO: Fetch these from backend
  const hasGoogleLinked = false;
  const hasEmailPassword = true;

  const handleConnectGoogle = async () => {
    try {
      await signIn.social({
        provider: 'google',
        callbackURL: window.location.href,
      });
    } catch (error) {
      toast.error('Failed to connect Google account');
    }
  };

  const handleDisconnectGoogle = async () => {
    // TODO: Implement disconnect
    toast.info('Google account disconnected');
  };

  const handleChangePassword = () => {
    // Redirect to change password page
    window.location.href = '/auth/change-password';
  };

  const methods = [
    {
      id: 'email',
      icon: Mail,
      label: 'Email & Password',
      connected: hasEmailPassword,
      description: hasEmailPassword ? 'Connected' : 'Password not set',
      color: 'text-blue-500',
    },
    {
      id: 'google',
      icon: FiChrome,
      label: 'Google Account',
      connected: hasGoogleLinked,
      description: hasGoogleLinked ? 'Connected' : 'Not connected',
      color: 'text-orange-500',
    },
  ];

  const hasMultipleMethods = methods.filter((m) => m.connected).length > 1;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
    >
      <Card className="border-white/20 bg-white/80 backdrop-blur-xl rounded-3xl shadow-[0_15px_50px_rgba(4,16,58,0.08)]">
        <CardContent className="p-6">
          <h3 className="mb-4 text-lg font-semibold text-[#1B2B4B]">Login Methods</h3>

          <div className="space-y-4">
            {methods.map((method) => {
              const Icon = method.icon;
              return (
                <div
                  key={method.id}
                  className={cn(
                    'flex items-center justify-between rounded-xl border p-4 transition-all',
                    method.connected
                      ? 'border-emerald-500/20 bg-emerald-500/5'
                      : 'border-[#1B2B4B]/10 bg-[#F8F5EF]'
                  )}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={cn(
                        'rounded-lg p-2',
                        method.connected ? 'bg-emerald-500/10' : 'bg-[#1B2B4B]/5'
                      )}
                    >
                      <Icon
                        className={cn(
                          'h-5 w-5',
                          method.connected ? 'text-emerald-500' : 'text-[#1B2B4B]/40'
                        )}
                      />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-[#1B2B4B]">
                        {method.label}
                      </p>
                      <p className="text-xs text-[#1B2B4B]/50">
                        {method.description}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {method.connected ? (
                      <>
                        <Badge className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20">
                          <CheckCircle className="mr-1 h-3 w-3" />
                          Connected
                        </Badge>
                        {method.id === 'google' && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={handleDisconnectGoogle}
                            className="text-xs text-red-500 hover:bg-red-50 hover:text-red-600"
                          >
                            <Unlink className="mr-1 h-3 w-3" />
                            Disconnect
                          </Button>
                        )}
                      </>
                    ) : (
                      <>
                        <Badge variant="outline" className="text-[#1B2B4B]/40 border-[#1B2B4B]/10">
                          Not connected
                        </Badge>
                        {method.id === 'google' && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={handleConnectGoogle}
                            className="rounded-full border-[#1B2B4B]/15 text-[#1B2B4B] hover:border-[#C9A84C]/30"
                          >
                            <LinkIcon className="mr-1 h-3 w-3" />
                            Connect
                          </Button>
                        )}
                      </>
                    )}
                  </div>
                </div>
              );
            })}

            {/* Password Management */}
            {hasEmailPassword && (
              <div className="flex items-center justify-between rounded-xl border border-[#1B2B4B]/10 bg-[#F8F5EF] p-4">
                <div className="flex items-center gap-3">
                  <Key className="h-5 w-5 text-[#C9A84C]" />
                  <div>
                    <p className="text-sm font-medium text-[#1B2B4B]">Password</p>
                    <p className="text-xs text-[#1B2B4B]/50">Last changed recently</p>
                  </div>
                </div>
                <Button
                  onClick={handleChangePassword}
                  variant="outline"
                  size="sm"
                  className="rounded-full border-[#1B2B4B]/15 text-[#1B2B4B] hover:border-[#C9A84C]/30"
                >
                  Change Password
                </Button>
              </div>
            )}

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
        </CardContent>
      </Card>
    </motion.div>
  );
}
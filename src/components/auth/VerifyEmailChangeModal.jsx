'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, KeyRound, Loader2 } from 'lucide-react';
import { emailOtp } from '@/lib/auth-client';
import toast from 'react-hot-toast';

export function VerifyEmailChangeModal({ open, newEmail, onClose, onSuccess }) {
  const [otp, setOtp] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [error, setError] = useState('');
  const hasSentRef = useRef(false);

  const sendCode = async () => {
    setIsSending(true);
    const { error: reqError } = await emailOtp.requestEmailChange({ newEmail });
    setIsSending(false);

    if (reqError) {
      toast.error(reqError.message || 'Failed to send verification code', {
        duration: 5000,
        position: 'top-right',
      });
      return;
    }
    toast.success(`📧 A verification code has been sent to ${newEmail}`, {
      duration: 4000,
      position: 'top-right',
    });
  };

  useEffect(() => {
    if (open && newEmail && !hasSentRef.current) {
      hasSentRef.current = true;
      sendCode();
    }
    if (!open) {
      hasSentRef.current = false;
      setOtp('');
      setError('');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, newEmail]);

  const handleVerify = async (e) => {
    e.preventDefault();
    setError('');

    if (!otp || otp.length < 6) {
      setError('Please enter the 6-digit code');
      return;
    }

    setIsVerifying(true);
    const { error: verifyError } = await emailOtp.changeEmail({ newEmail, otp });
    setIsVerifying(false);

    if (verifyError) {
      setError(verifyError.message || 'Invalid or expired code');
      toast.error(verifyError.message || 'Invalid or expired code', {
        duration: 5000,
        position: 'top-right',
      });
      return;
    }

    toast.success('✅ Email address updated successfully!', {
      duration: 4000,
      position: 'top-right',
    });
    onSuccess?.();
    onClose();
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.2 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl"
          >
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-xl font-bold text-[#1B2B4B]">Verify New Email</h3>
                <p className="mt-1 text-sm text-[#1B2B4B]/60">
                  Enter the code sent to <span className="font-medium">{newEmail}</span>
                </p>
              </div>
              <button
                onClick={onClose}
                className="text-[#1B2B4B]/40 hover:text-[#1B2B4B] transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleVerify} className="mt-6 space-y-4">
              <div className="relative">
                <KeyRound className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-[#1B2B4B]/40" />
                <input
                  type="text"
                  inputMode="numeric"
                  maxLength={6}
                  placeholder="6-digit code"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                  disabled={isVerifying}
                  className="w-full rounded-2xl border border-[#1B2B4B]/10 bg-[#F8F5EF] py-3.5 pl-11 pr-4 text-center text-lg tracking-[0.5em] text-[#1B2B4B] placeholder:tracking-normal placeholder:text-[#1B2B4B]/40 focus:border-[#C9A84C] focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/20 disabled:opacity-50"
                />
              </div>

              {error && <p className="text-xs text-red-500">{error}</p>}

              <button
                type="submit"
                disabled={isVerifying}
                className="w-full rounded-full bg-gradient-to-r from-[#C9A84C] to-[#D6B45A] py-3.5 text-sm font-semibold text-[#04103A] shadow-md shadow-[#C9A84C]/20 transition-all hover:shadow-[#C9A84C]/30 disabled:opacity-70"
              >
                {isVerifying ? (
                  <span className="flex items-center justify-center gap-2">
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Verifying...
                  </span>
                ) : (
                  'Verify & Update Email'
                )}
              </button>

              <div className="text-center">
                <button
                  type="button"
                  onClick={sendCode}
                  disabled={isSending}
                  className="text-xs text-[#C9A84C] hover:text-[#b89640] disabled:opacity-50"
                >
                  {isSending ? 'Sending...' : 'Resend code'}
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
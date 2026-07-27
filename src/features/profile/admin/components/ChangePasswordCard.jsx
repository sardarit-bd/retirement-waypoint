'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChangePasswordDialog } from '../../components/ChangePasswordDialog';

export function ChangePasswordCard() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        <Card className="border-0 bg-white rounded-3xl shadow-[0_8px_40px_rgba(27,43,75,0.08)]">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h3 className="text-lg font-semibold text-[#1B2B4B]">Change Password</h3>
                <p className="mt-1 text-sm text-[#1B2B4B]/60">
                  Update your password regularly to keep your account secure.
                </p>
              </div>
              <Button
                onClick={() => setIsOpen(true)}
                className="rounded-full bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold px-6 py-2.5 shadow-md shadow-orange-500/20 hover:shadow-orange-500/30 hover:scale-[1.02] transition-all duration-300 cursor-pointer"
              >
                Change Password
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <ChangePasswordDialog open={isOpen} onOpenChange={setIsOpen} />
    </>
  );
}
'use client';

import { useMutation } from '@tanstack/react-query';
import { contactApi } from '../api/contact.api';

export function useSubmitContactMessage() {
  return useMutation({
    mutationFn: (data) => contactApi.submitMessage(data),
  });
}
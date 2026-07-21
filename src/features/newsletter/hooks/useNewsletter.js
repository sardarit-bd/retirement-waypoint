'use client';

import { useMutation } from '@tanstack/react-query';
import { newsletterApi } from '../api/newsletter.api';

export function useSubscribeNewsletter() {
  return useMutation({
    mutationFn: (data) => newsletterApi.subscribe(data),
  });
}
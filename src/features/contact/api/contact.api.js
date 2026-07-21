import api from '@/lib/api/axios';
import { API_ENDPOINTS } from '@/lib/api/endpoints';

export const contactApi = {
  // Submit the public contact form
  submitMessage: async (data) => {
    const response = await api.post(API_ENDPOINTS.CONTACT.SUBMIT, data);
    return response.data;
  },
};
import api from '@/lib/api/axios';
import { API_ENDPOINTS } from '@/lib/api/endpoints';

export const contactMessagesApi = {
  // Get messages with search/filter/pagination
  getMessages: (params) => {
    return api.get(API_ENDPOINTS.CONTACT.ADMIN_ALL, { params });
  },

  // Get message stats
  getStats: () => {
    return api.get(API_ENDPOINTS.CONTACT.ADMIN_STATS);
  },

  // Get unread count (dashboard summary card)
  getUnreadCount: () => {
    return api.get(API_ENDPOINTS.CONTACT.ADMIN_UNREAD_COUNT);
  },

  // Get message by ID
  getMessageById: (id) => {
    return api.get(API_ENDPOINTS.CONTACT.ADMIN_SINGLE(id));
  },

  // Update message status
  updateStatus: (id, status) => {
    return api.patch(API_ENDPOINTS.CONTACT.ADMIN_UPDATE_STATUS(id), { status });
  },

  // Delete message
  deleteMessage: (id) => {
    return api.delete(API_ENDPOINTS.CONTACT.ADMIN_SINGLE(id));
  },
};
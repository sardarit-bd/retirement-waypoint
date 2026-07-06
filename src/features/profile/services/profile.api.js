import api from '@/lib/api/axios';
import { API_ENDPOINTS } from '@/lib/api/endpoints';

export const profileApi = {
  // Get user profile
  getProfile: async () => {
    const response = await api.get(API_ENDPOINTS.AUTH.ME);
    return response.data.data;
  },

  // Update profile
  updateProfile: async (data) => {
    const response = await api.patch(API_ENDPOINTS.AUTH.UPDATE_PROFILE, data);
    return response.data.data;
  },

  // Update profile image
  updateProfileImage: async (file) => {
    const formData = new FormData();
    formData.append('image', file);
    const response = await api.patch(API_ENDPOINTS.AUTH.UPDATE_PROFILE_IMAGE, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data.data;
  },

  // Remove profile image
  removeProfileImage: async () => {
    const response = await api.delete(API_ENDPOINTS.AUTH.REMOVE_PROFILE_IMAGE);
    return response.data.data;
  },
};
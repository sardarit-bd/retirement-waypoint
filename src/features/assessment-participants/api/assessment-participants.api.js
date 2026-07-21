import api from "@/lib/api/axios";


export const AssessmentParticipantsAPI = {
  // Get participants with filters
  getParticipants: (params) => {
    return api.get('/api/admin/assessment-participants', { params });
  },

  // Get participant stats
  getStats: () => {
    return api.get('/api/admin/assessment-participants/stats');
  },

  // Get participant by ID
  getParticipantById: (id) => {
    return api.get(`/api/admin/assessment-participants/${id}`);
  },
};
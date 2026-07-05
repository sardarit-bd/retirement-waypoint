import axios from "axios";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

class AssessmentApi {
  constructor() {
    this.baseUrl = `${API_BASE_URL}/api/assessments`;
  }

  // ==================== ADMIN: ASSESSMENT TYPES ====================

  // Get all assessment types (admin)
  async adminGetTypes(params = {}) {
    const queryParams = new URLSearchParams();
    if (params.page) queryParams.append('page', params.page);
    if (params.limit) queryParams.append('limit', params.limit);
    if (params.isPublished !== undefined) queryParams.append('isPublished', params.isPublished);
    if (params.sortBy) queryParams.append('sortBy', params.sortBy);
    if (params.sortOrder) queryParams.append('sortOrder', params.sortOrder);
  
    const url = queryParams.toString()
      ? `${this.baseUrl}/admin/types?${queryParams.toString()}`
      : `${this.baseUrl}/admin/types`;
  
    const response = await axios.get(url, { withCredentials: true });
    return response.data;
  }

  // Get assessment type by ID (admin)
  async adminGetType(typeId) {
    const response = await axios.get(`${this.baseUrl}/admin/types/${typeId}`, {
      withCredentials: true,
    });
    return response.data;
  }

  // ==================== ADMIN: ASSESSMENT PAGES ====================

  // Get all assessment pages (admin)
  async adminGetPages(params = {}) {
    const queryParams = new URLSearchParams();
    if (params.page) queryParams.append("page", params.page);
    if (params.limit) queryParams.append("limit", params.limit);
    if (params.search) queryParams.append("search", params.search);
    if (params.assessmentTypeId)
      queryParams.append("assessmentTypeId", params.assessmentTypeId);
    if (params.isPublished !== undefined)
      queryParams.append("isPublished", params.isPublished);
    if (params.sortBy) queryParams.append("sortBy", params.sortBy);
    if (params.sortOrder) queryParams.append("sortOrder", params.sortOrder);

    const url = queryParams.toString()
      ? `${this.baseUrl}/admin/pages?${queryParams.toString()}`
      : `${this.baseUrl}/admin/pages`;

    const response = await axios.get(url, { withCredentials: true });
    return response.data;
  }

  // Get assessment page by ID (admin)
  async adminGetPage(pageId) {
    const response = await axios.get(`${this.baseUrl}/admin/pages/${pageId}`, {
      withCredentials: true,
    });
    return response.data;
  }

  // Update assessment page (admin)
  async adminUpdatePage(pageId, data) {
    const response = await axios.patch(
      `${this.baseUrl}/admin/pages/${pageId}`,
      data,
      { withCredentials: true },
    );
    return response.data;
  }

  // Delete assessment page (admin)
  async adminDeletePage(pageId) {
    const response = await axios.delete(
      `${this.baseUrl}/admin/pages/${pageId}`,
      { withCredentials: true },
    );
    return response.data;
  }

  // ==================== PUBLIC ====================

  // Get public assessment by slug
  async getPublicAssessment(slug) {
    const response = await axios.get(`${this.baseUrl}/public/${slug}`, {
      withCredentials: true,
    });
    return response.data;
  }

  // Get public assessment result
  async getPublicAssessmentResult(submissionId) {
    const response = await axios.get(
      `${this.baseUrl}/public/result/${submissionId}`,
      { withCredentials: true },
    );
    return response.data;
  }

  // ==================== USER ====================

  // Submit assessment
  async submitAssessment(data) {
    const response = await axios.post(`${this.baseUrl}/submit`, data, {
      withCredentials: true,
    });
    return response.data;
  }

  // Get user submissions
  async getUserSubmissions(params = {}) {
    const queryParams = new URLSearchParams();
    if (params.page) queryParams.append("page", params.page);
    if (params.limit) queryParams.append("limit", params.limit);
    if (params.assessmentPageId)
      queryParams.append("assessmentPageId", params.assessmentPageId);
    if (params.sortBy) queryParams.append("sortBy", params.sortBy);
    if (params.sortOrder) queryParams.append("sortOrder", params.sortOrder);

    const url = queryParams.toString()
      ? `${this.baseUrl}/my-submissions?${queryParams.toString()}`
      : `${this.baseUrl}/my-submissions`;

    const response = await axios.get(url, { withCredentials: true });
    return response.data;
  }

  // Get submission by ID
  async getSubmission(submissionId) {
    const response = await axios.get(
      `${this.baseUrl}/my-submissions/${submissionId}`,
      { withCredentials: true },
    );
    return response.data;
  }

  // ==================== ADMIN: ASSESSMENTS ====================
  // Admin: Create assessment page
  async adminCreatePage(data) {
    const response = await axios.post(`${this.baseUrl}/admin/pages`, data, {
      withCredentials: true,
    });
    return response.data;
  }

  // Admin: Get sections by page ID
  async adminGetSections(params = {}) {
    const queryParams = new URLSearchParams();
    if (params.assessmentPageId)
      queryParams.append("assessmentPageId", params.assessmentPageId);
    if (params.isActive !== undefined)
      queryParams.append("isActive", params.isActive);
    if (params.sortBy) queryParams.append("sortBy", params.sortBy);
    if (params.sortOrder) queryParams.append("sortOrder", params.sortOrder);

    const url = queryParams.toString()
      ? `${this.baseUrl}/admin/sections?${queryParams.toString()}`
      : `${this.baseUrl}/admin/sections`;

    const response = await axios.get(url, { withCredentials: true });
    return response.data;
  }

  // Admin: Create section
  async adminCreateSection(data) {
    const response = await axios.post(`${this.baseUrl}/admin/sections`, data, {
      withCredentials: true,
    });
    return response.data;
  }

  // Admin: Update section
  async adminUpdateSection(sectionId, data) {
    const response = await axios.patch(
      `${this.baseUrl}/admin/sections/${sectionId}`,
      data,
      { withCredentials: true },
    );
    return response.data;
  }

  // Admin: Delete section
  async adminDeleteSection(sectionId) {
    const response = await axios.delete(
      `${this.baseUrl}/admin/sections/${sectionId}`,
      { withCredentials: true },
    );
    return response.data;
  }

  // Admin: Get questions by section ID
  async adminGetQuestions(params = {}) {
    const queryParams = new URLSearchParams();
    if (params.sectionId) queryParams.append("sectionId", params.sectionId);
    if (params.isActive !== undefined)
      queryParams.append("isActive", params.isActive);
    if (params.sortBy) queryParams.append("sortBy", params.sortBy);
    if (params.sortOrder) queryParams.append("sortOrder", params.sortOrder);

    const url = queryParams.toString()
      ? `${this.baseUrl}/admin/questions?${queryParams.toString()}`
      : `${this.baseUrl}/admin/questions`;

    const response = await axios.get(url, { withCredentials: true });
    return response.data;
  }

  // Admin: Create question
  async adminCreateQuestion(data) {
    const response = await axios.post(`${this.baseUrl}/admin/questions`, data, {
      withCredentials: true,
    });
    return response.data;
  }

  // Admin: Update question
  async adminUpdateQuestion(questionId, data) {
    const response = await axios.patch(
      `${this.baseUrl}/admin/questions/${questionId}`,
      data,
      { withCredentials: true },
    );
    return response.data;
  }

  // Admin: Delete question
  async adminDeleteQuestion(questionId) {
    const response = await axios.delete(
      `${this.baseUrl}/admin/questions/${questionId}`,
      { withCredentials: true },
    );
    return response.data;
  }

  // Admin: Get options by question ID
  async adminGetOptions(questionId) {
    const response = await axios.get(
      `${this.baseUrl}/admin/options/question/${questionId}`,
      { withCredentials: true },
    );
    return response.data;
  }

  // Admin: Create option
  async adminCreateOption(data) {
    const response = await axios.post(`${this.baseUrl}/admin/options`, data, {
      withCredentials: true,
    });
    return response.data;
  }

  // Admin: Update option
  async adminUpdateOption(optionId, data) {
    const response = await axios.patch(
      `${this.baseUrl}/admin/options/${optionId}`,
      data,
      { withCredentials: true },
    );
    return response.data;
  }

  // Admin: Delete option
  async adminDeleteOption(optionId) {
    const response = await axios.delete(
      `${this.baseUrl}/admin/options/${optionId}`,
      { withCredentials: true },
    );
    return response.data;
  }

  // ==================== RESULT RANGES ====================

  // Admin: Get result ranges by page ID
  async adminGetResultRanges(params = {}) {
    const queryParams = new URLSearchParams();
    if (params.assessmentPageId)
      queryParams.append("assessmentPageId", params.assessmentPageId);
    if (params.isActive !== undefined)
      queryParams.append("isActive", params.isActive);
    if (params.sortBy) queryParams.append("sortBy", params.sortBy);
    if (params.sortOrder) queryParams.append("sortOrder", params.sortOrder);

    const url = queryParams.toString()
      ? `${this.baseUrl}/admin/result-ranges?${queryParams.toString()}`
      : `${this.baseUrl}/admin/result-ranges`;

    const response = await axios.get(url, { withCredentials: true });
    return response.data;
  }

  // Admin: Get result range by ID
  async adminGetResultRange(rangeId) {
    const response = await axios.get(
      `${this.baseUrl}/admin/result-ranges/${rangeId}`,
      { withCredentials: true },
    );
    return response.data;
  }

  // Admin: Create result range
  async adminCreateResultRange(data) {
    const response = await axios.post(
      `${this.baseUrl}/admin/result-ranges`,
      data,
      { withCredentials: true },
    );
    return response.data;
  }

  // Admin: Update result range
  async adminUpdateResultRange(rangeId, data) {
    const response = await axios.patch(
      `${this.baseUrl}/admin/result-ranges/${rangeId}`,
      data,
      { withCredentials: true },
    );
    return response.data;
  }

  // Admin: Delete result range
  async adminDeleteResultRange(rangeId) {
    const response = await axios.delete(
      `${this.baseUrl}/admin/result-ranges/${rangeId}`,
      { withCredentials: true },
    );
    return response.data;
  }

  // ==================== RECOMMENDATIONS ====================

  // Admin: Get recommendations by result range ID
  async adminGetRecommendations(resultRangeId) {
    const response = await axios.get(
      `${this.baseUrl}/admin/recommendations/result-range/${resultRangeId}`,
      { withCredentials: true },
    );
    return response.data;
  }

  // Admin: Create recommendation
  async adminCreateRecommendation(data) {
    const response = await axios.post(
      `${this.baseUrl}/admin/recommendations`,
      data,
      { withCredentials: true },
    );
    return response.data;
  }

  // Admin: Update recommendation
  async adminUpdateRecommendation(recommendationId, data) {
    const response = await axios.patch(
      `${this.baseUrl}/admin/recommendations/${recommendationId}`,
      data,
      { withCredentials: true },
    );
    return response.data;
  }

  // Admin: Delete recommendation
  async adminDeleteRecommendation(recommendationId) {
    const response = await axios.delete(
      `${this.baseUrl}/admin/recommendations/${recommendationId}`,
      { withCredentials: true },
    );
    return response.data;
  }

  // Admin: Get all submissions
  async adminGetSubmissions(params = {}) {
    const queryParams = new URLSearchParams();
    if (params.page) queryParams.append("page", params.page);
    if (params.limit) queryParams.append("limit", params.limit);
    if (params.search) queryParams.append("search", params.search);
    if (params.assessmentPageId)
      queryParams.append("assessmentPageId", params.assessmentPageId);
    if (params.sortBy) queryParams.append("sortBy", params.sortBy);
    if (params.sortOrder) queryParams.append("sortOrder", params.sortOrder);

    const url = queryParams.toString()
      ? `${this.baseUrl}/admin/submissions?${queryParams.toString()}`
      : `${this.baseUrl}/admin/submissions`;

    const response = await axios.get(url, { withCredentials: true });
    return response.data;
  }

  // Admin: Get submission by ID
  async adminGetSubmission(submissionId) {
    const response = await axios.get(
      `${this.baseUrl}/admin/submissions/${submissionId}`,
      { withCredentials: true },
    );
    return response.data;
  }

  // Admin: Get assessment analytics
  async adminGetAnalytics(params = {}) {
    const queryParams = new URLSearchParams();
    if (params.assessmentPageId)
      queryParams.append("assessmentPageId", params.assessmentPageId);
    if (params.dateFrom) queryParams.append("dateFrom", params.dateFrom);
    if (params.dateTo) queryParams.append("dateTo", params.dateTo);

    const url = queryParams.toString()
      ? `${this.baseUrl}/admin/analytics?${queryParams.toString()}`
      : `${this.baseUrl}/admin/analytics`;

    const response = await axios.get(url, { withCredentials: true });
    return response.data;
  }
}

export const assessmentApi = new AssessmentApi();

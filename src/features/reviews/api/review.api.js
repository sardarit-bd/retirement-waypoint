import axios from "axios";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

class ReviewApi {
  constructor() {
    this.baseUrl = `${API_BASE_URL}/api/reviews`;
  }

  // Get public reviews for a book (approved only)
  async getBookReviews(bookId, params = {}) {
    const queryParams = new URLSearchParams(params);

    const response = await axios.get(
      `${this.baseUrl}/books/${bookId}/reviews?${queryParams.toString()}`
    );

    return response.data;
  }

  // Get review summary for a book
  async getReviewSummary(bookId) {
    const response = await axios.get(
      `${this.baseUrl}/books/${bookId}/reviews/summary`
    );

    return response.data;
  }

  // Get current user's review
  async getMyReview(bookId) {
    const response = await axios.get(
      `${this.baseUrl}/my-review/${bookId}`,
      {
        withCredentials: true,
      }
    );

    return response.data;
  }

  // Create review
  async createReview(data) {
    const response = await axios.post(
      this.baseUrl,
      data,
      {
        withCredentials: true,
      }
    );

    return response.data;
  }

  // Update review
  async updateReview(reviewId, data) {
    const response = await axios.patch(
      `${this.baseUrl}/${reviewId}`,
      data,
      {
        withCredentials: true,
      }
    );

    return response.data;
  }

  // Delete review
  async deleteReview(reviewId) {
    const response = await axios.delete(
      `${this.baseUrl}/${reviewId}`,
      {
        withCredentials: true,
      }
    );

    return response.data;
  }

  // Get all reviews (admin)
  async adminGetAllReviews(params = {}) {
    const queryParams = new URLSearchParams();
    if (params.page) queryParams.append('page', params.page);
    if (params.limit) queryParams.append('limit', params.limit);
    if (params.search) queryParams.append('search', params.search);
    if (params.rating) queryParams.append('rating', params.rating);
    if (params.approved !== undefined) queryParams.append('approved', params.approved);
    if (params.bookId) queryParams.append('bookId', params.bookId);
    if (params.userId) queryParams.append('userId', params.userId);
    if (params.sortBy) queryParams.append('sortBy', params.sortBy);
    if (params.sortOrder) queryParams.append('sortOrder', params.sortOrder);

    const url = queryParams.toString()
      ? `${this.baseUrl}/admin/reviews?${queryParams.toString()}`
      : `${this.baseUrl}/admin/reviews`;

    const response = await axios.get(url, { withCredentials: true });
    return response.data;
  }

  // Admin approve review
  async adminApproveReview(reviewId) {
    const response = await axios.patch(
      `${this.baseUrl}/admin/reviews/${reviewId}/approve`,
      {},
      { withCredentials: true }
    );
    return response.data;
  }

  // Admin reject review
  async adminRejectReview(reviewId) {
    const response = await axios.patch(
      `${this.baseUrl}/admin/reviews/${reviewId}/reject`,
      {},
      { withCredentials: true }
    );
    return response.data;
  }

  // Admin delete review
  async adminDeleteReview(reviewId) {
    const response = await axios.delete(
      `${this.baseUrl}/admin/reviews/${reviewId}`,
      { withCredentials: true }
    );
    return response.data;
  }

  // Get single review with details
  async getReview(reviewId) {
    const response = await axios.get(
      `${this.baseUrl}/${reviewId}`,
      { withCredentials: true }
    );
    return response.data;
  }

}

export const reviewApi = new ReviewApi();
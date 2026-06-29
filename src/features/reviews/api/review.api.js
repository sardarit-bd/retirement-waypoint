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
      `${this.baseUrl}/my-review/${bookId}`
    );

    return response.data;
  }

  // Create review
  async createReview(data) {
    const response = await axios.post(this.baseUrl, data);
    return response.data;
  }

  // Update review
  async updateReview(reviewId, data) {
    const response = await axios.patch(
      `${this.baseUrl}/${reviewId}`,
      data
    );

    return response.data;
  }

  // Delete review
  async deleteReview(reviewId) {
    const response = await axios.delete(
      `${this.baseUrl}/${reviewId}`
    );

    return response.data;
  }
}

export const reviewApi = new ReviewApi();
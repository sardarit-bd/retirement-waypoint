import axios from "axios";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

class ReviewApi {
  constructor() {
    this.baseUrl = `${API_BASE_URL}/api/reviews`;
  }

  async getBookReviews(bookId, params = {}) {
    const queryParams = new URLSearchParams(params);

    const response = await axios.get(
      `${this.baseUrl}/books/${bookId}/reviews?${queryParams.toString()}`
    );

    return response.data;
  }

  async getReviewSummary(bookId) {
    const response = await axios.get(
      `${this.baseUrl}/books/${bookId}/reviews/summary`
    );

    return response.data;
  }

  async getMyReview(bookId) {
    const response = await axios.get(
      `${this.baseUrl}/my-review/${bookId}`
    );

    return response.data;
  }

  async createReview(data) {
    const response = await axios.post(this.baseUrl, data);
    return response.data;
  }

  async updateReview(reviewId, data) {
    const response = await axios.patch(
      `${this.baseUrl}/${reviewId}`,
      data
    );

    return response.data;
  }

  async deleteReview(reviewId) {
    const response = await axios.delete(
      `${this.baseUrl}/${reviewId}`
    );

    return response.data;
  }
}

export const reviewApi = new ReviewApi();
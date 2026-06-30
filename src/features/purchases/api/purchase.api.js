import axios from "axios";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

class PurchaseApi {
  constructor() {
    this.baseUrl = `${API_BASE_URL}/api/purchases`;
  }

  /**
   * Check if user has purchased a specific book
   * @param {string} bookId - The book ID
   * @returns {Promise<{hasPurchased: boolean, purchase: object|null}>}
   */
  async checkPurchase(bookId) {
    const response = await axios.get(
      `${this.baseUrl}/check/${bookId}`,
      { withCredentials: true }
    );
    return response.data.data;
  }

  /**
   * Get user's purchase for a specific book
   * @param {string} bookId - The book ID
   * @returns {Promise<{purchase: object}>}
   */
  async getPurchaseByBook(bookId) {
    const response = await axios.get(
      `${this.baseUrl}/book/${bookId}`,
      { withCredentials: true }
    );
    return response.data.data;
  }

  /**
   * Get all user purchases with book details
   * @param {Object} params - Query parameters
   * @returns {Promise<{data: Array, meta: Object}>}
   */
  async getMyPurchases(params = {}) {
    const response = await axios.get(
      `${this.baseUrl}/my-purchases/with-details`,
      { params, withCredentials: true }
    );
    return response.data;
  }
}

export const purchaseApi = new PurchaseApi();
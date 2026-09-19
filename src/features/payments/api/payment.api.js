import axios from "axios";

const API_BASE_URL = "";

class PaymentApi {
  constructor() {
    this.baseUrl = `${API_BASE_URL}/api/payments`;
  }

  /**
   * Create Stripe Checkout Session for an order
   * @param {string} orderId - The order ID
   * @returns {Promise<{checkoutUrl: string, sessionId: string}>}
   */
  async createCheckoutSession(orderId) {
    const response = await axios.post(
      `${this.baseUrl}/create-checkout-session`,
      { orderId },
      { withCredentials: true }
    );

    return response.data.data;
  }

  /**
   * Retry payment for a failed order
   * @param {string} orderId - The order ID
   * @returns {Promise<{checkoutUrl: string, sessionId: string}>}
   */
  async retryPayment(orderId) {
    const response = await axios.post(
      `${this.baseUrl}/retry/${orderId}`,
      {},
      { withCredentials: true }
    );

    return response.data.data;
  }

  /**
   * Verify session after checkout redirect and retrieve download info
   * @param {string} orderId - The order ID
   * @param {string} sessionId - The Stripe session ID
   * @returns {Promise<any>}
   */
  async verifySession(orderId, sessionId) {
    const params = new URLSearchParams();
    if (orderId) params.append("orderId", orderId);
    if (sessionId) params.append("session_id", sessionId);

    const response = await axios.get(
      `${this.baseUrl}/verify-session?${params.toString()}`,
      { withCredentials: true }
    );

    return response.data.data;
  }
}

export const paymentApi = new PaymentApi();

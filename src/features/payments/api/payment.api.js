import axios from "axios";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

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
}

export const paymentApi = new PaymentApi();
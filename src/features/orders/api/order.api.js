import axios from "axios";

const API_BASE_URL = "";

class OrderApi {
  constructor() {
    this.baseUrl = `${API_BASE_URL}/api/orders`;
  }

  /**
   * Create a new order
   * @param {Object} orderData - Order data with items
   * @returns {Promise<{data: {_id: string, orderNumber: string, ...}}>}
   */
  async createOrder(orderData) {
    const response = await axios.post(this.baseUrl, orderData, {
      withCredentials: true,
    });

    return response.data;
  }

  async getOrderById(orderId) {
    const response = await axios.get(`${this.baseUrl}/${orderId}`, {
      withCredentials: true,
    });
    return response.data;
  }

  async getUserOrders(params = {}) {
    const response = await axios.get(`${this.baseUrl}/my-orders`, {
      params,
      withCredentials: true,
    });
    return response.data;
  }
}

export const orderApi = new OrderApi();

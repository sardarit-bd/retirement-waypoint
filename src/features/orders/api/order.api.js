import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

class OrderApi {
  constructor() {
    this.baseUrl = `${API_BASE_URL}/orders`;
  }

  async createOrder(orderData) {
    const response = await axios.post(this.baseUrl, orderData);
    return response.data;
  }

  async getOrderById(orderId) {
    const response = await axios.get(`${this.baseUrl}/${orderId}`);
    return response.data;
  }

  async getUserOrders() {
    const response = await axios.get(`${this.baseUrl}/my-orders`);
    return response.data;
  }
}

export const orderApi = new OrderApi();
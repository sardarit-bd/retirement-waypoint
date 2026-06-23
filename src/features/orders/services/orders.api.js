import api from '@/lib/api/axios';
import { API_ENDPOINTS } from '@/lib/api/endpoints';

export const ordersApi = {
  // Get all orders (admin)
  getAllOrders: async (params = {}) => {
    const response = await api.get(API_ENDPOINTS.ORDERS.ALL, { params });
    return response.data;
  },

  // Get user orders
  getMyOrders: async (params = {}) => {
    const response = await api.get(API_ENDPOINTS.ORDERS.MY_ORDERS, { params });
    return response.data;
  },

  // Get single order
  getOrder: async (orderId) => {
    const response = await api.get(API_ENDPOINTS.ORDERS.SINGLE(orderId));
    return response.data.data;
  },

  // Get order details with full data
  getOrderDetails: async (orderId) => {
    const response = await api.get(API_ENDPOINTS.ORDERS.SINGLE(orderId));
    return response.data.data;
  },

  // Update order status (admin)
  updateOrderStatus: async ({ orderId, orderStatus }) => {
    const response = await api.patch(API_ENDPOINTS.ORDERS.UPDATE_ORDER_STATUS(orderId), { orderStatus });
    return response.data.data;
  },

  // Update payment status (admin)
  updatePaymentStatus: async ({ orderId, paymentStatus }) => {
    const response = await api.patch(API_ENDPOINTS.ORDERS.UPDATE_PAYMENT_STATUS(orderId), { paymentStatus });
    return response.data.data;
  },

  // ✅ NEW: Retry payment - creates new Stripe checkout session
  retryPayment: async (orderId) => {
    const response = await api.post(`/api/orders/${orderId}/retry-payment`);
    return response.data.data;
  },
};
import axios from 'axios';

const API_BASE_URL = "";

class CouponApi {
  constructor() {
    this.baseUrl = `${API_BASE_URL}/api/coupons`;
  }

  // Admin: Get all coupons
  async adminGetAllCoupons(params = {}) {
    const queryParams = new URLSearchParams();
    if (params.page) queryParams.append('page', params.page);
    if (params.limit) queryParams.append('limit', params.limit);
    if (params.search) queryParams.append('search', params.search);
    if (params.type) queryParams.append('type', params.type);
    if (params.isActive !== undefined) queryParams.append('isActive', params.isActive);
    if (params.expired !== undefined) queryParams.append('expired', params.expired);
    if (params.sortBy) queryParams.append('sortBy', params.sortBy);
    if (params.sortOrder) queryParams.append('sortOrder', params.sortOrder);

    const url = queryParams.toString()
      ? `${this.baseUrl}/admin/coupons?${queryParams.toString()}`
      : `${this.baseUrl}/admin/coupons`;

    const response = await axios.get(url, { withCredentials: true });
    return response.data;
  }

  // Admin: Get coupon by ID
  async adminGetCoupon(couponId) {
    const response = await axios.get(
      `${this.baseUrl}/admin/coupons/${couponId}`,
      { withCredentials: true }
    );
    return response.data;
  }

  // Admin: Create coupon
  async adminCreateCoupon(data) {
    const response = await axios.post(
      `${this.baseUrl}/admin/coupons`,
      data,
      { withCredentials: true }
    );
    return response.data;
  }

  // Admin: Update coupon
  async adminUpdateCoupon(couponId, data) {
    const response = await axios.patch(
      `${this.baseUrl}/admin/coupons/${couponId}`,
      data,
      { withCredentials: true }
    );
    return response.data;
  }

  // Admin: Activate coupon
  async adminActivateCoupon(couponId) {
    const response = await axios.patch(
      `${this.baseUrl}/admin/coupons/${couponId}/activate`,
      {},
      { withCredentials: true }
    );
    return response.data;
  }

  // Admin: Deactivate coupon
  async adminDeactivateCoupon(couponId) {
    const response = await axios.patch(
      `${this.baseUrl}/admin/coupons/${couponId}/deactivate`,
      {},
      { withCredentials: true }
    );
    return response.data;
  }

  // Admin: Delete coupon
  async adminDeleteCoupon(couponId) {
    const response = await axios.delete(
      `${this.baseUrl}/admin/coupons/${couponId}`,
      { withCredentials: true }
    );
    return response.data;
  }

  // Admin: Get coupon usage
  async adminGetCouponUsage(couponId, params = {}) {
    const queryParams = new URLSearchParams();
    if (params.page) queryParams.append('page', params.page);
    if (params.limit) queryParams.append('limit', params.limit);

    const url = queryParams.toString()
      ? `${this.baseUrl}/admin/coupons/${couponId}/usage?${queryParams.toString()}`
      : `${this.baseUrl}/admin/coupons/${couponId}/usage`;

    const response = await axios.get(url, { withCredentials: true });
    return response.data;
  }

  // Public: Validate coupon
  async validateCoupon(code, subtotal) {
    const response = await axios.post(
      `${this.baseUrl}/validate`,
      { code, subtotal },
      { withCredentials: true }
    );
    return response.data;
  }
}

export const couponApi = new CouponApi();

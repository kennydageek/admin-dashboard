import { http } from '@/http/index.js';
// import app from '@/main';
import * as ENDPOINTS from './endpoints';
import { useToast } from 'vue-toastification';
const toast = useToast();

export default class CustomerService {
  // Fetch customer data
  static async fetchCustomers(params) {
    try {
      const { data } = await http.get(ENDPOINTS.GET_CUSTOMERS, { params });

      return data;
    } catch (err) {
      toast.error(err.response.data.message);
    }
  }

  //Fetch customer profile by id
  static async fetchCustomerById(customerId) {
    try {
      const { data } = await http.get(
        `${ENDPOINTS.GET_CUSTOMERS_BY_ID}/${customerId}`
      );
      return data;
    } catch (err) {
      toast.error(err.response.data.message);
    }
  }

  //Fetch all customer orders
  static async fetchAllCustomerOrders(customerId, params) {
    try {
      const { data } = await http.get(
        `${ENDPOINTS.GET_ALL_CUSTOMERS_ORDER}/${customerId}`,
        { params }
      );
      return data;
    } catch (err) {
      toast.error(err.response.data.message);
    }
  }

  //Fetch all customer processing orders
  static async fetchAllCustomerProcessingOrders(customerId, params) {
    try {
      const { data } = await http.get(
        `${ENDPOINTS.GET_ALL_CUSTOMERS_PROCESSING_ORDER}/${customerId}`,
        { params }
      );
      return data;
    } catch (err) {
      toast.error(err.response.data.message);
    }
  }

  //Fetch all customer completed orders
  static async fetchAllCustomerCompletedOrders(customerId, params) {
    try {
      const { data } = await http.get(
        `${ENDPOINTS.GET_ALL_CUSTOMERS_COMPLETED_ORDER}/${customerId}`,
        { params }
      );
      return data;
    } catch (err) {
      toast.error(err.response.data.message);
    }
  }

  // Search all customer completed orders
  static async searchCustomerOrders(customerId, params) {
    try {
      const { data } = await http.get(
        `${ENDPOINTS.SEARCH_ALL_CUSTOMERS_ORDER}/${customerId}`,
        { params }
      );
      console.log(data);
      return data;
    } catch (err) {
      toast.error(err?.response?.data?.message);
    }
  }

  //Fetch all customer cancelled orders
  static async fetchAllCustomerCancelledOrders(customerId, params) {
    try {
      const { data } = await http.get(
        `${ENDPOINTS.GET_ALL_CUSTOMERS_CANCELLED_ORDER}/${customerId}`,
        { params }
      );
      return data;
    } catch (err) {
      toast.error(err.response.data.message);
    }
  }
}

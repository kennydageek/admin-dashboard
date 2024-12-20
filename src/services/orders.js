import { http } from '@/http/index.js';
// import app from '@/main';
import * as ENDPOINTS from './endpoints';
import { useToast } from 'vue-toastification';
const toast = useToast();

export default class OrderService {
  static async fetchOrders(params) {
    try {
      const { data } = await http.get(ENDPOINTS.GET_ORDERS, { params });

      return data;
    } catch (err) {
      toast.error(err.response.data.message);
    }
  }
}

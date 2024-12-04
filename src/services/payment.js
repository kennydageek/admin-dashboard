import { http } from '@/http/index.js';
// import app from '@/main';
import * as ENDPOINTS from './endpoints';
import { useToast } from 'vue-toastification';
const toast = useToast();

export default class PaymentService {
  static async fetchTransactions(params) {
    try {
      const { data } = await http.get(ENDPOINTS.GET_TRANSACTIONS, { params });

      return data;
    } catch (err) {
      toast.error(err.response.data.message);
    }
  }

  static async filterTransactions(params) {
    try {
      const { data } = await http.get(ENDPOINTS.FILTER_TRANSACTIONS, {
        params,
      });

      return data;
    } catch (err) {
      toast.error(err.response.data.message);
    }
  }
}

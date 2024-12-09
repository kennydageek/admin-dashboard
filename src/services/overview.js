import { http } from '@/http/index.js';
// import app from '@/main';
import * as ENDPOINTS from './endpoints';
import { useToast } from 'vue-toastification';
const toast = useToast();

export default class OverviewService {
  static async fetchDashboardCards(params) {
    try {
      const { data } = await http.get(ENDPOINTS.GET_DASHBOARD_CARDS, {
        params,
      });

      return data;
    } catch (err) {
      toast.error(err.response.data.message);
    }
  }

  static async fetchDashboardChart(params) {
    try {
      const { data } = await http.get(ENDPOINTS.GET_DASHBOARD_CHART, {
        params,
      });

      return data;
    } catch (err) {
      toast.error(err.response.data.message);
    }
  }

  static async fetchSalesProgress(params) {
    try {
      const { data } = await http.get(ENDPOINTS.GET_SALES_PROGRESS, {
        params,
      });

      return data;
    } catch (err) {
      toast.error(err.response.data.message);
    }
  }
}

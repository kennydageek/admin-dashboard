import { http } from '@/http/index.js';
// import app from '@/main';
import * as ENDPOINTS from './endpoints';
import { useToast } from 'vue-toastification';
const toast = useToast();

export default class PartnerService {
  static async fetchPartners(params) {
    try {
      const { data } = await http.get(ENDPOINTS.GET_PARTNERS, { params });

      return data;
    } catch (err) {
      toast.error(err.response.data.message);
    }
  }

  static async fetchEntrepreneurs(params) {
    try {
      const { data } = await http.get(ENDPOINTS.GET_ENTREPRENEURS, { params });

      return data;
    } catch (err) {
      toast.error(err.response.data.message);
    }
  }

  static async fetchRestaurant(params) {
    try {
      const { data } = await http.get(ENDPOINTS.GET_RESTAURANTS, { params });

      return data;
    } catch (err) {
      toast.error(err.response.data.message);
    }
  }

  static async fetchVendors(params) {
    try {
      const { data } = await http.get(ENDPOINTS.GET_VENDORS, { params });

      return data;
    } catch (err) {
      toast.error(err.response.data.message);
    }
  }

  static async searchPartners(params) {
    try {
      const { data } = await http.get(ENDPOINTS.SEARCH_PARTNERS, { params });
      console.log(data);
      return data;
    } catch (err) {
      toast.error(err?.response?.data?.message);
    }
  }
}

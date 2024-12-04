import { http } from '@/http/index.js';
// import app from '@/main';
import * as ENDPOINTS from './endpoints';
import { useToast } from 'vue-toastification';
const toast = useToast();

export default class StaffService {
  static async createStaff(payload) {
    try {
      const { data } = await http.post(ENDPOINTS.CREATE_STAFF, payload);

      return data;
    } catch (err) {
      toast.error(err.response.data.message);
    }
  }

  static async editStaff(payload) {
    try {
      const { data } = await http.post(ENDPOINTS.EDIT_STAFF, payload);

      return data;
    } catch (err) {
      toast.error(err.response.data.message);
    }
  }

  static async searchStaff(params) {
    try {
      const { data } = await http.get(ENDPOINTS.SEARCH_STAFF, { params });

      return data;
    } catch (err) {
      toast.error(err.response.data.message);
    }
  }

  static async getStaff(params) {
    try {
      const { data } = await http.get(ENDPOINTS.GET_STAFF, { params });

      return data;
    } catch (err) {
      toast.error(err.response.data.message);
    }
  }

  static async getOneStaff(id) {
    try {
      const { data } = await http.get(`${ENDPOINTS.GET_ONE_STAFF}/${id}`);

      return data;
    } catch (err) {
      toast.error(err.response.data.message);
    }
  }

  static async deactivateStaff(payload) {
    try {
      const { data } = await http.post(ENDPOINTS.DEACTIVATATE_STAFF, payload);

      return data;
    } catch (err) {
      toast.error(err.response.data.message);
    }
  }
}

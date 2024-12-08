import { http } from '@/http/index.js';
// import app from '@/main';
import * as ENDPOINTS from './endpoints';
import { useToast } from 'vue-toastification';
const toast = useToast();

export default class CategoryService {
  static async fetchCategories(params) {
    try {
      const { data } = await http.get(ENDPOINTS.GET_CATEGORIES, { params });
      return data;
    } catch (err) {
      toast.error(err.response.data.message);
    }
  }

  static async createCategory(payload) {
    try {
      const { data } = await http.post(ENDPOINTS.CREATE_CATEGORY, payload);
      return data;
    } catch (err) {
      toast.error(err.response.data.message);
    }
  }
}

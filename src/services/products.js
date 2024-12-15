import { http } from '@/http/index.js';
// import app from '@/main';
import * as ENDPOINTS from './endpoints';
import { useToast } from 'vue-toastification';
const toast = useToast();

export default class ProductService {
  static async fetchProducts(params) {
    try {
      const { data } = await http.get(ENDPOINTS.GET_ALL_PRODUCTS, { params });

      return data;
    } catch (err) {
      toast.error(err.response.data.message);
    }
  }

  static async addToFeaturedProducts(payload) {
    try {
      const { data } = await http.post(
        ENDPOINTS.ADD_TO_FEATURED_PRODUCTS,
        payload
      );

      return data;
    } catch (err) {
      toast.error(err.response.data.message);
    }
  }

  static async removeFromFeaturedProducts(payload) {
    console.log(payload);
    try {
      const { data } = await http.delete(
        `${ENDPOINTS.REMOVE_FEATURED_PRODUCTS}/${payload.productId}`,
        payload
      );

      return data;
    } catch (err) {
      toast.error(err.response.data.message);
    }
  }

  static async fetchFeaturedProducts(params) {
    try {
      const { data } = await http.get(ENDPOINTS.GET_FEATURED_PRODUCTS, {
        params,
      });

      return data;
    } catch (err) {
      toast.error(err.response.data.message);
    }
  }
}

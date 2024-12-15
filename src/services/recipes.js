import { http } from '@/http/index.js';
// import app from '@/main';
import * as ENDPOINTS from './endpoints';
import { useToast } from 'vue-toastification';
const toast = useToast();

export default class RecipeService {
  static async fetchRecipes(params) {
    try {
      const { data } = await http.get(ENDPOINTS.GET_ALL_RECIPES, { params });

      return data;
    } catch (err) {
      toast.error(err.response.data.message);
    }
  }

  static async addToFeaturedRecipes(payload) {
    try {
      const { data } = await http.post(ENDPOINTS.ADD_FEATURED_RECIPES, payload);

      return data;
    } catch (err) {
      toast.error(err.response.data.message);
    }
  }

  static async removeFromFeaturedProducts(payload) {
    try {
      const { data } = await http.delete(
        `${ENDPOINTS.REMOVE_FEATURED_RECIPES}/${payload.productId}`,
        payload
      );

      return data;
    } catch (err) {
      toast.error(err.response.data.message);
    }
  }

  static async fetchFeaturedRecipes(params) {
    try {
      const { data } = await http.get(ENDPOINTS.GET_FEATURED_RECIPES, {
        params,
      });

      return data;
    } catch (err) {
      toast.error(err.response.data.message);
    }
  }
}

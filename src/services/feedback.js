import { http } from '@/http/index.js';
// import app from '@/main';
import * as ENDPOINTS from './endpoints';
import { useToast } from 'vue-toastification';
const toast = useToast();

export default class FeedbackService {
  static async fetchFeedbacks(params) {
    try {
      const { data } = await http.get(ENDPOINTS.GET_FEEDBACKS, { params });

      return data;
    } catch (err) {
      toast.error(err.response.data.message);
    }
  }

  static async fetchMarketplaceFeedback(params) {
    try {
      const { data } = await http.get(ENDPOINTS.GET_MARKETPLACE_FEEDBACK, {
        params,
      });

      return data;
    } catch (err) {
      toast.error(err.response.data.message);
    }
  }

  static async fetchPartnerFeedback(params) {
    try {
      const { data } = await http.get(ENDPOINTS.GET_PARTNER_FEEDBACK, {
        params,
      });

      return data;
    } catch (err) {
      toast.error(err.response.data.message);
    }
  }

  static async fetchRecipeFeedback(params) {
    try {
      const { data } = await http.get(ENDPOINTS.GET_RECIPE_FEEDBACK, {
        params,
      });

      return data;
    } catch (err) {
      toast.error(err.response.data.message);
    }
  }

  static async fetchGeneralFeedback(params) {
    try {
      const { data } = await http.get(ENDPOINTS.GET_GENERAL_FEEDBACK, {
        params,
      });

      return data;
    } catch (err) {
      toast.error(err.response.data.message);
    }
  }
}

// GET_RECIPE_FEEDBACK

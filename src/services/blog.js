import { http } from '@/http/index.js';
// import app from '@/main';
import * as ENDPOINTS from './endpoints';
import { useToast } from 'vue-toastification';
const toast = useToast();

export default class BlogService {
  static async fetchBlogPosts(params) {
    try {
      const { data } = await http.get(ENDPOINTS.GET_ALL_BLOGPOSTS, { params });

      return data;
    } catch (err) {
      toast.error(err.response.data.message);
    }
  }

  static async fetchBlogCategories(params) {
    try {
      const { data } = await http.get(ENDPOINTS.GET_BLOG_CATEGORIES, {
        params,
      });
      return data;
    } catch (err) {
      toast.error(err.response.data.message);
    }
  }

  static async createPost(payload) {
    try {
      const { data } = await http.post(ENDPOINTS.CREATE_POST, payload);
      return data;
    } catch (err) {
      toast.error(err.response.data.message);
    }
  }

  static async createBlogCategory(payload) {
    try {
      const { data } = await http.post(ENDPOINTS.CREATE_BLOG_CATEGORY, payload);
      return data;
    } catch (err) {
      toast.error(err.response.data.message);
    }
  }

  static async updateBlogPost(id, payload) {
    try {
      const { data } = await http.post(
        `${ENDPOINTS.UPDATE_POST}/${id}`,
        payload
      );
      return data;
    } catch (err) {
      toast.error(err.response.data.message);
    }
  }

  static async fetchABlogPost(id) {
    try {
      const { data } = await http.get(`${ENDPOINTS.GET_A_BLOGPOSTS}/${id}`);
      return data;
    } catch (err) {
      toast.error(err.response.data.message);
    }
  }

  static async deletePost(id) {
    try {
      const { data } = await http.delete(`${ENDPOINTS.DELETE_POST}/${id}`);
      return data;
    } catch (err) {
      toast.error(err.response.data.message);
    }
  }
}

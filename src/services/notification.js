import { http } from '@/http/index.js';
// import app from '@/main';
import * as ENDPOINTS from './endpoints';
import { useToast } from 'vue-toastification';
const toast = useToast();

export default class NotificationService {
  static async fetchNotifications(params) {
    try {
      const { data } = await http.get(ENDPOINTS.GET_NOTIFICATIONS, { params });

      return data;
    } catch (err) {
      toast.error(err.response.data.message);
    }
  }

  static async pushNotification(payload) {
    try {
      const { data } = await http.post(ENDPOINTS.PUSH_NOTIFICATIONS, payload);

      return data;
    } catch (err) {
      toast.error(err.response.data.message);
    }
  }

  static async uploadMedia(payload) {
    try {
      const { data } = await http.post(ENDPOINTS.UPLOAD_MEDIA, payload);

      return data;
    } catch (err) {
      console.log(err);
      // toast.error(err.response.message);
    }
  }
}

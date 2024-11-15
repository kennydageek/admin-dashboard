import { http } from '@/http/index.js';
// import app from '@/main';
import * as ENDPOINTS from './endpoints';

export default class AuthService {
  // Login user
  static async login(payload) {
    try {
      const { data } = await http.post(ENDPOINTS.LOGIN, payload);

      return data;
    } catch (err) {
      const statuscode = err.response.data.statusCode;
      if (statuscode === 412 || statuscode === 400) {
        return err;
      }
    }
  }

  static authenticateUser(tokens) {
    http.defaults.headers.common['Authorization'] = `Bearer ${tokens.access}`;
    localStorage.setItem('authToken', tokens.access);
    // localStorage.setItem('refreshToken', tokens.refresh);
  }
}

import { apiService } from './apiService';
import { User } from '../store/slices/authSlice';

export interface LoginCredentials {
  identifier: string;
  password: string;
}

export interface RegisterData {
  username: string;
  email: string;
  password: string;
  phoneNumber?: string;
}

export interface AuthResponse {
  message: string;
  token: string;
  user: User;
}

export interface VerifyTokenResponse {
  valid: boolean;
  user: User;
}

class AuthService {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    return apiService.post<AuthResponse>('/auth/login', credentials);
  }

  async register(userData: RegisterData): Promise<AuthResponse> {
    return apiService.post<AuthResponse>('/auth/register', userData);
  }

  async logout(): Promise<void> {
    return apiService.post<void>('/auth/logout');
  }

  async verifyToken(token: string): Promise<VerifyTokenResponse> {
    return apiService.get<VerifyTokenResponse>('/auth/verify');
  }

  async refreshToken(): Promise<AuthResponse> {
    return apiService.post<AuthResponse>('/auth/refresh');
  }
}

export const authService = new AuthService();

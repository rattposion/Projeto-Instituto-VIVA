const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api/v1';

class ApiService {
  private baseURL: string;
  private token: string | null = null;

  constructor() {
    this.baseURL = API_BASE_URL;
    this.token = localStorage.getItem('auth_token');
  }

  setToken(token: string) {
    this.token = token;
    localStorage.setItem('auth_token', token);
  }

  removeToken() {
    this.token = null;
    localStorage.removeItem('auth_token');
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;
    
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...(this.token && { Authorization: `Bearer ${this.token}` }),
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Auth endpoints
  async login(email: string, password: string) {
    const response = await this.request<any>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    
    if (response.data?.token) {
      this.setToken(response.data.token);
    }
    
    return response;
  }

  async register(email: string, password: string, name: string, workspaceName?: string) {
    const response = await this.request<any>('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ email, password, name, workspaceName }),
    });
    
    if (response.data?.token) {
      this.setToken(response.data.token);
    }
    
    return response;
  }

  async logout() {
    try {
      await this.request('/auth/logout', { method: 'POST' });
    } finally {
      this.removeToken();
    }
  }

  async getProfile() {
    return this.request<any>('/auth/me');
  }

  async updateProfile(data: { name?: string; avatar?: string }) {
    return this.request<any>('/auth/me', {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async changePassword(currentPassword: string, newPassword: string) {
    return this.request<any>('/auth/change-password', {
      method: 'PUT',
      body: JSON.stringify({ currentPassword, newPassword }),
    });
  }

  // Pixels endpoints
  async getPixels(params?: { page?: number; limit?: number; search?: string }) {
    const searchParams = new URLSearchParams();
    if (params?.page) searchParams.append('page', params.page.toString());
    if (params?.limit) searchParams.append('limit', params.limit.toString());
    if (params?.search) searchParams.append('search', params.search);
    
    const query = searchParams.toString();
    return this.request<any>(`/pixels${query ? `?${query}` : ''}`);
  }

  async getPixel(id: string) {
    return this.request<any>(`/pixels/${id}`);
  }

  async createPixel(data: { name: string; pixelId: string; metaAccount: string }) {
    return this.request<any>('/pixels', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updatePixel(id: string, data: { name?: string; metaAccount?: string; settings?: any }) {
    return this.request<any>(`/pixels/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deletePixel(id: string) {
    return this.request<any>(`/pixels/${id}`, {
      method: 'DELETE',
    });
  }

  async getPixelAnalytics(id: string, timeframe = '7d') {
    return this.request<any>(`/pixels/${id}/analytics?timeframe=${timeframe}`);
  }

  async testPixelConnection(id: string) {
    return this.request<any>(`/pixels/${id}/test`, {
      method: 'POST',
    });
  }

  // Events endpoints
  async getEvents(params?: { 
    page?: number; 
    limit?: number; 
    search?: string; 
    pixelId?: string;
    eventName?: string;
    status?: string;
    startDate?: string;
    endDate?: string;
  }) {
    const searchParams = new URLSearchParams();
    if (params?.page) searchParams.append('page', params.page.toString());
    if (params?.limit) searchParams.append('limit', params.limit.toString());
    if (params?.search) searchParams.append('search', params.search);
    if (params?.pixelId) searchParams.append('pixelId', params.pixelId);
    if (params?.eventName) searchParams.append('eventName', params.eventName);
    if (params?.status) searchParams.append('status', params.status);
    if (params?.startDate) searchParams.append('startDate', params.startDate);
    if (params?.endDate) searchParams.append('endDate', params.endDate);
    
    const query = searchParams.toString();
    return this.request<any>(`/events${query ? `?${query}` : ''}`);
  }

  async getEvent(id: string) {
    return this.request<any>(`/events/${id}`);
  }

  async createEvent(data: {
    pixelId: string;
    eventName: string;
    eventType?: string;
    parameters?: any;
    source?: string;
    userAgent?: string;
    ipAddress?: string;
  }) {
    return this.request<any>('/events', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async getEventsAnalytics(params?: { timeframe?: string; pixelId?: string }) {
    const searchParams = new URLSearchParams();
    if (params?.timeframe) searchParams.append('timeframe', params.timeframe);
    if (params?.pixelId) searchParams.append('pixelId', params.pixelId);
    
    const query = searchParams.toString();
    return this.request<any>(`/events/analytics/summary${query ? `?${query}` : ''}`);
  }

  // Analytics endpoints
  async getDashboardAnalytics(timeframe = '7d') {
    return this.request<any>(`/analytics/dashboard?timeframe=${timeframe}`);
  }

  async getWorkspaceOverview() {
    return this.request<any>('/analytics/overview');
  }

  async getRealtimeAnalytics() {
    return this.request<any>('/analytics/realtime');
  }

  // Conversions endpoints
  async getConversions(params?: { page?: number; limit?: number; search?: string; pixelId?: string }) {
    const searchParams = new URLSearchParams();
    if (params?.page) searchParams.append('page', params.page.toString());
    if (params?.limit) searchParams.append('limit', params.limit.toString());
    if (params?.search) searchParams.append('search', params.search);
    if (params?.pixelId) searchParams.append('pixelId', params.pixelId);
    
    const query = searchParams.toString();
    return this.request<any>(`/conversions${query ? `?${query}` : ''}`);
  }

  async createConversion(data: {
    name: string;
    pixelId: string;
    eventName: string;
    rules?: any[];
  }) {
    return this.request<any>('/conversions', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // Diagnostics endpoints
  async getDiagnostics(params?: { 
    page?: number; 
    limit?: number; 
    search?: string; 
    pixelId?: string;
    severity?: string;
    category?: string;
    status?: string;
  }) {
    const searchParams = new URLSearchParams();
    if (params?.page) searchParams.append('page', params.page.toString());
    if (params?.limit) searchParams.append('limit', params.limit.toString());
    if (params?.search) searchParams.append('search', params.search);
    if (params?.pixelId) searchParams.append('pixelId', params.pixelId);
    if (params?.severity) searchParams.append('severity', params.severity);
    if (params?.category) searchParams.append('category', params.category);
    if (params?.status) searchParams.append('status', params.status);
    
    const query = searchParams.toString();
    return this.request<any>(`/diagnostics${query ? `?${query}` : ''}`);
  }

  async runDiagnostics(pixelId: string) {
    return this.request<any>(`/diagnostics/run/${pixelId}`, {
      method: 'POST',
    });
  }

  // Integrations endpoints
  async getIntegrations(params?: { page?: number; limit?: number; search?: string }) {
    const searchParams = new URLSearchParams();
    if (params?.page) searchParams.append('page', params.page.toString());
    if (params?.limit) searchParams.append('limit', params.limit.toString());
    if (params?.search) searchParams.append('search', params.search);
    
    const query = searchParams.toString();
    return this.request<any>(`/integrations${query ? `?${query}` : ''}`);
  }

  async createIntegration(data: {
    type: string;
    name: string;
    description?: string;
    config?: any;
  }) {
    return this.request<any>('/integrations', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async testIntegration(id: string) {
    return this.request<any>(`/integrations/${id}/test`, {
      method: 'POST',
    });
  }

  // Workspaces endpoints
  async getWorkspaces(params?: { page?: number; limit?: number; search?: string }) {
    const searchParams = new URLSearchParams();
    if (params?.page) searchParams.append('page', params.page.toString());
    if (params?.limit) searchParams.append('limit', params.limit.toString());
    if (params?.search) searchParams.append('search', params.search);
    
    const query = searchParams.toString();
    return this.request<any>(`/workspaces${query ? `?${query}` : ''}`);
  }

  async createWorkspace(data: { name: string; description?: string }) {
    return this.request<any>('/workspaces', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async getWorkspaceMembers(workspaceId: string, params?: { page?: number; limit?: number }) {
    const searchParams = new URLSearchParams();
    if (params?.page) searchParams.append('page', params.page.toString());
    if (params?.limit) searchParams.append('limit', params.limit.toString());
    
    const query = searchParams.toString();
    return this.request<any>(`/workspaces/${workspaceId}/members${query ? `?${query}` : ''}`);
  }

  async inviteMember(workspaceId: string, data: { email: string; role: string }) {
    return this.request<any>(`/workspaces/${workspaceId}/invite`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }
}

export const apiService = new ApiService();
export default apiService;
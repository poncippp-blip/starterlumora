// Admin authentication system
export interface AdminUser {
  id: string;
  username: string;
  role: 'admin' | 'super_admin';
  permissions: string[];
  createdAt: string;
  lastLogin?: string;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

// Mock admin users - in production, this would be in a secure database
const ADMIN_USERS: Record<string, { password: string; user: AdminUser }> = {
  'admin': {
    password: 'admin123', // In production, this would be hashed
    user: {
      id: 'admin_1',
      username: 'admin',
      role: 'admin',
      permissions: ['upload_manga', 'edit_manga', 'delete_manga'],
      createdAt: '2024-01-01T00:00:00Z'
    }
  },
  'superadmin': {
    password: 'super123',
    user: {
      id: 'admin_2',
      username: 'superadmin',
      role: 'super_admin',
      permissions: ['upload_manga', 'edit_manga', 'delete_manga', 'manage_users'],
      createdAt: '2024-01-01T00:00:00Z'
    }
  }
};

const AUTH_TOKEN_KEY = 'manga_admin_token';
const CURRENT_USER_KEY = 'manga_current_admin';

// Generate a simple JWT-like token (in production, use proper JWT)
const generateToken = (user: AdminUser): string => {
  const payload = {
    userId: user.id,
    username: user.username,
    role: user.role,
    exp: Date.now() + (24 * 60 * 60 * 1000) // 24 hours
  };
  return btoa(JSON.stringify(payload));
};

// Verify token
const verifyToken = (token: string): AdminUser | null => {
  try {
    const payload = JSON.parse(atob(token));
    if (payload.exp < Date.now()) {
      return null; // Token expired
    }
    
    const adminData = Object.values(ADMIN_USERS).find(
      admin => admin.user.id === payload.userId
    );
    
    return adminData?.user || null;
  } catch {
    return null;
  }
};

// Login function
export const login = async (credentials: LoginCredentials): Promise<{ success: boolean; user?: AdminUser; error?: string }> => {
  const { username, password } = credentials;
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const adminData = ADMIN_USERS[username];
  
  if (!adminData || adminData.password !== password) {
    return { success: false, error: 'Invalid username or password' };
  }
  
  const user = { ...adminData.user, lastLogin: new Date().toISOString() };
  const token = generateToken(user);
  
  // Store token and user data
  localStorage.setItem(AUTH_TOKEN_KEY, token);
  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
  
  return { success: true, user };
};

// Logout function
export const logout = (): void => {
  localStorage.removeItem(AUTH_TOKEN_KEY);
  localStorage.removeItem(CURRENT_USER_KEY);
};

// Get current user
export const getCurrentUser = (): AdminUser | null => {
  const token = localStorage.getItem(AUTH_TOKEN_KEY);
  if (!token) return null;
  
  const user = verifyToken(token);
  if (!user) {
    // Token invalid, clear storage
    logout();
    return null;
  }
  
  return user;
};

// Check if user is authenticated
export const isAuthenticated = (): boolean => {
  return getCurrentUser() !== null;
};

// Check if user has specific permission
export const hasPermission = (permission: string): boolean => {
  const user = getCurrentUser();
  return user?.permissions.includes(permission) || false;
};

// Check if user is admin
export const isAdmin = (): boolean => {
  const user = getCurrentUser();
  return user?.role === 'admin' || user?.role === 'super_admin' || false;
};

// Check if user is super admin
export const isSuperAdmin = (): boolean => {
  const user = getCurrentUser();
  return user?.role === 'super_admin' || false;
};
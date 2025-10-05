/**
 * Permissions Hook
 * Sistema de permissões baseado em roles
 */

import { useAuth } from './useAuth';

export type Permission = 
  | 'view_dashboard'
  | 'edit_site_config'
  | 'manage_articles'
  | 'manage_leads'
  | 'manage_team'
  | 'manage_testimonials'
  | 'manage_users'
  | 'view_analytics';

export type Role = 'admin' | 'editor' | 'viewer' | 'user';

const ROLE_PERMISSIONS: Record<Role, Permission[]> = {
  admin: [
    'view_dashboard',
    'edit_site_config',
    'manage_articles',
    'manage_leads',
    'manage_team',
    'manage_testimonials',
    'manage_users',
    'view_analytics',
  ],
  editor: [
    'view_dashboard',
    'manage_articles',
    'manage_leads',
    'view_analytics',
  ],
  viewer: [
    'view_dashboard',
    'view_analytics',
  ],
  user: [],
};

export const usePermissions = () => {
  const { user, isAdmin } = useAuth();

  const hasPermission = (permission: Permission): boolean => {
    if (!user) return false;
    
    const userRole = user.role as Role;
    const permissions = ROLE_PERMISSIONS[userRole] || [];
    
    return permissions.includes(permission);
  };

  const hasAnyPermission = (permissions: Permission[]): boolean => {
    return permissions.some(permission => hasPermission(permission));
  };

  const hasAllPermissions = (permissions: Permission[]): boolean => {
    return permissions.every(permission => hasPermission(permission));
  };

  const canAccessRoute = (route: string): boolean => {
    const routePermissions: Record<string, Permission> = {
      '/admin/site-config': 'edit_site_config',
      '/admin/configuracoes': 'edit_site_config',
      '/admin/artigos': 'manage_articles',
      '/admin/leads': 'manage_leads',
      '/admin/equipe': 'manage_team',
      '/admin/depoimentos': 'manage_testimonials',
    };

    const requiredPermission = routePermissions[route];
    if (!requiredPermission) return true; // Rota sem restrição

    return hasPermission(requiredPermission);
  };

  return {
    hasPermission,
    hasAnyPermission,
    hasAllPermissions,
    canAccessRoute,
    isAdmin,
    userRole: user?.role as Role,
  };
};

/**
 * Verifica se usuário tem permissão para acessar
 */
export const checkPermission = (userRole: Role, permission: Permission): boolean => {
  const permissions = ROLE_PERMISSIONS[userRole] || [];
  return permissions.includes(permission);
};

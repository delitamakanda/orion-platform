import { Service, inject } from '@angular/core';
import { AuthStore } from '@app/features/auth/data-access/auth.store';
import { Role } from '../models/role.model';

@Service()
export class RbacService {
  private readonly store = inject(AuthStore);

  canAccess(roles: Role[]): boolean {
    return this.store.hasRole(roles);
  }

  canReviewPriority(): boolean {
    return this.canAccess(['administrateur', 'procureur', 'magistrat']);
  }

  canViewAudits(): boolean {
    return this.canAccess(['administrateur', 'procureur']);
  }

  canManageUsers(): boolean {
    return this.canAccess(['administrateur']);
  }

  canSyncComplaints(): boolean {
    return this.canAccess(['administrateur', 'agent']);
  }
}

import { AvatarComponent } from './avatar/avatar.component';
import { EmptyState } from './empty-state/empty-state';
import { PriorityBadge } from './priority-badge/priority-badge';
import { StatCard } from './stat-card/stat-card';
import { PageHeader } from './page-header/page-header';
import { AlertComponent } from './alert/alert.component';

export * from './avatar/avatar.component';
export * from './empty-state/empty-state';
export * from './priority-badge/priority-badge';
export * from './stat-card/stat-card';
export * from './page-header/page-header';
export * from './alert/alert.component';

export const SHARED_UI_COMPONENTS = [AvatarComponent, EmptyState, PriorityBadge, StatCard, PageHeader, AlertComponent];

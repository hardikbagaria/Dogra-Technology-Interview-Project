import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'tasks', pathMatch: 'full' },
  {
    path: 'login',
    loadComponent: () =>
      import('./components/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'tasks',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./components/task-list/task-list.component').then(m => m.TaskListComponent)
  },
  {
    path: 'tasks/new',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./components/task-form/task-form.component').then(m => m.TaskFormComponent)
  },
  {
    path: 'tasks/:id/edit',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./components/task-form/task-form.component').then(m => m.TaskFormComponent)
  },
  { path: '**', redirectTo: 'tasks' }
];

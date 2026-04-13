import { Routes } from '@angular/router';

import { Login } from './pages/login/login';
import { Signup } from './pages/signup/signup';
import { EmployeeList } from './pages/employee-list/employee-list';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  { path: 'login', component: Login },
  { path: 'signup', component: Signup },
  { path: 'employees', component: EmployeeList },

  { path: '**', redirectTo: 'login' }
];
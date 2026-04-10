import { Routes } from '@angular/router';
import { Login } from './login/login';
import { Track } from './track/track'; 

export const routes: Routes = [
  { path: 'login', component: Login },
  { path: 'track', component: Track },
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];
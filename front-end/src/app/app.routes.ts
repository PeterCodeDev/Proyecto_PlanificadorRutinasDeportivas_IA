import { Routes } from '@angular/router';
import { Login } from './login/login';
import { Track } from './track/track'; 
import { AiCoach} from './ai-coach/ai-coach';

export const routes: Routes = [
  { path: 'login', component: Login },
  { path: 'track', component: Track },
  { path: 'ai-coach', component: AiCoach},

  { path: '', redirectTo: '/login', pathMatch: 'full' }
];
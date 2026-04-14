import { Routes } from '@angular/router';
import { Login } from './login/login'; 
import { Track } from './track/track'; 
import { AiCoach } from './ai-coach/ai-coach';
import { Register } from './register/register'; // <-- Importa el nuevo componente

export const routes: Routes = [
  { path: 'login', component: Login },
  { path: 'register', component: Register }, // <-- Añade la ruta
  { path: 'track', component: Track },
  { path: 'ai-coach', component: AiCoach },
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];
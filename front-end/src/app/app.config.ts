import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideBrowserGlobalErrorListeners } from '@angular/core'; // Asegúrate de que la ruta de importación sea la correcta
import { provideMarkdown } from 'ngx-markdown';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    // Mantenemos tu capturador de errores global
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    // Añadimos el motor para que el servicio de la IA funcione
    provideHttpClient(),
    provideMarkdown()
  ]
};
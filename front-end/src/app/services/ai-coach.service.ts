import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Usamos exactamente el nombre que sale en tu captura de consola
export interface IAConfigResponse {
  respuesta_ia: string;
}

@Injectable({ providedIn: 'root' })
export class AICoachService {
  private apiUrl = 'https://localhost:7000/api/AiCoach/generar-rutina';

  constructor(private http: HttpClient) { }

  enviarPregunta(texto: string): Observable<IAConfigResponse> {
    // Enviamos "Mensaje" (con M mayúscula) para que C# lo reciba bien
    return this.http.post<IAConfigResponse>(this.apiUrl, { Mensaje: texto });
  }
}
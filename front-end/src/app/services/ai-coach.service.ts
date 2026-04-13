import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Esta interfaz debe tener el nombre EXACTO que ves en la consola
export interface IAConfigResponse {
  respuesta_ia: string;
}

@Injectable({
  providedIn: 'root'
})
export class AICoachService {
  private apiUrl = 'https://localhost:7000/api/AiCoach/generar-rutina';

  constructor(private http: HttpClient) { }

  enviarPregunta(texto: string): Observable<IAConfigResponse> {
    // IMPORTANTE: 'Mensaje' con M mayúscula para tu Bridge de C#
    return this.http.post<IAConfigResponse>(this.apiUrl, { Mensaje: texto });
  }
}
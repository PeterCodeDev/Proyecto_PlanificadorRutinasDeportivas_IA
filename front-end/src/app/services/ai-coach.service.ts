import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

<<<<<<< HEAD
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
=======
@Injectable({
  providedIn: 'root'
})
export class AICoachService {

  private apiUrl = 'http://127.0.0.1:8000/generar-rutina'; // Directo a Python
  constructor(private http: HttpClient) { }

  enviarPregunta(mensaje: string, historial: string[]): Observable<any> {
    // Creamos el cuerpo exacto que espera el CoachRequest en Python
    const body = {
      mensaje_usuario: mensaje,
      historial: historial
    };

    return this.http.post<any>(this.apiUrl, body);
>>>>>>> 57e8d12da78d0ba312f4a82134b5d7f5a51e048c
  }
}
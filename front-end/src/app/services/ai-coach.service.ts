import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AICoachService {
  // Asegúrate de que esta URL sea la de tu backend (FastAPI o el puente C#)
  // Cambia la URL para apuntar DIRECTAMENTE a Python (puerto 8000)
  // private apiUrl = 'https://localhost:7000/api/AiCoach/generar-rutina'; // Puente C#
  private apiUrl = 'http://127.0.0.1:8000/generar-rutina'; // Directo a Python
  constructor(private http: HttpClient) { }

  enviarPregunta(mensaje: string, historial: string[]): Observable<any> {
    // Creamos el cuerpo exacto que espera el CoachRequest en Python
    const body = {
      mensaje_usuario: mensaje,
      historial: historial
    };

    return this.http.post<any>(this.apiUrl, body);
  }
}
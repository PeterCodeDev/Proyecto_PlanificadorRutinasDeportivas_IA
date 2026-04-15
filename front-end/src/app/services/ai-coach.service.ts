import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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
  }
}
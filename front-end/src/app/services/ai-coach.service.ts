import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Definimos la interfaz para que TypeScript sepa qué recibimos
export interface IAConfigResponse {
  respuesta_ia: string;
}

@Injectable({
  providedIn: 'root'
})
export class AICoachService {
  // Asegúrate de que este puerto coincida con el de tu Visual Studio (C#)
  private apiUrl = 'http://localhost:8000/docs#/default/generar_rutina_generar_rutina_post';

  constructor(private http: HttpClient) { }

  // Método para enviar la pregunta al Backend de .NET
  enviarPregunta(mensaje: string): Observable<IAConfigResponse> {
    const body = { mensaje: mensaje }; // Coincide con CoachRequest { Mensaje } en C#
    return this.http.post<IAConfigResponse>(this.apiUrl, body);
  }
}
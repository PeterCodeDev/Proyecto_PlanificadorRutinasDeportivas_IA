import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  // Esta es la dirección de tu API en C#
  private apiUrl = 'http://localhost:5076/api/Usuarios';

  constructor(private http: HttpClient) { }

  // Función para registrar un usuario
  registrar(usuario: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/registrar`, usuario);
  }

  // Función para el login
  login(credenciales: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credenciales);
  }
}
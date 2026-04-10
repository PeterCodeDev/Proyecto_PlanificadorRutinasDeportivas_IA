import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive, Router } from '@angular/router'; // Asegúrate de que Router esté aquí
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-track',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './track.html',
  styleUrls: ['./track.css']
})
export class Track implements OnInit {
  nombreUsuario: string = '';

  // 1. El constructor debe recibir el router
  constructor(private router: Router) {} 

  ngOnInit() {
    const guardado = localStorage.getItem('usuarioNombre');
    this.nombreUsuario = guardado ? guardado : 'Atleta';
  }

  // 2. ESTA ES LA FUNCIÓN QUE TE PIDE EL ERROR. 
  // Debe estar dentro de las llaves de "export class Track"
  logout() {
    localStorage.removeItem('usuarioNombre'); 
    this.router.navigate(['/login']); 
  }
} // <-- Esta es la última llave que cierra la clase
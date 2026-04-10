import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router'; // 1. Importación arriba

@Component({
  selector: 'app-track',
  standalone: true,
  imports: [RouterLink, RouterLinkActive], // 2. ¡MUY IMPORTANTE! Tienen que estar aquí dentro
  templateUrl: './track.html',
  styleUrls: ['./track.css']
})
export class Track implements OnInit {
  nombreUsuario: string = 'Usuario'; // Nombre por defecto

  ngOnInit() {
    const guardado = localStorage.getItem('usuarioNombre');
    if (guardado) {
      this.nombreUsuario = guardado;
    }
  }
  }

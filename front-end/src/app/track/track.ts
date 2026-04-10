import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common'; // <-- Añade esto

@Component({
  selector: 'app-track',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule], // <-- Añade CommonModule aquí
  templateUrl: './track.html',
  styleUrls: ['./track.css']
})
export class Track implements OnInit {
  nombreUsuario: string = ''; // Lo dejamos vacío para que cargue el del storage

  ngOnInit() {
  const guardado = localStorage.getItem('usuarioNombre');
  this.nombreUsuario = guardado ? guardado : 'Atleta';
}
}
import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // <--- Importación necesaria

interface Ejercicio {
  id: number;
  nombre: string;
  grupoMuscular: string;
  detalle: string;
  peso: number;
  reps: number;
  completado: boolean;
}

@Component({
  selector: 'app-track',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule, FormsModule], // <--- Se añade aquí
  templateUrl: './track.html',
  styleUrls: ['./track.css']
})
export class Track implements OnInit {
  nombreUsuario: string = '';

  // Lista de ejercicios inicial con valores por defecto
  ejercicios: Ejercicio[] = [
    { 
      id: 1, 
      nombre: 'Barbell Back Squat', 
      grupoMuscular: 'Legs', 
      detalle: 'Set 1 of 3', 
      peso: 100, 
      reps: 8, 
      completado: false 
    },
    { 
      id: 2, 
      nombre: 'Incline Bench Press', 
      grupoMuscular: 'Chest', 
      detalle: 'Set 1 of 3', 
      peso: 60, 
      reps: 10, 
      completado: false 
    }
  ];

  constructor(private router: Router) {} 

  ngOnInit() {
    const guardado = localStorage.getItem('usuarioNombre');
    this.nombreUsuario = guardado ? guardado : 'Julio Sanchez';
  }

  marcarCompletado(id: number) {
    const ejercicio = this.ejercicios.find(e => e.id === id);
    if (ejercicio) {
      ejercicio.completado = true;
    }
  }

  logout() {
    localStorage.removeItem('usuarioNombre'); 
    this.router.navigate(['/login']); 
  }
}
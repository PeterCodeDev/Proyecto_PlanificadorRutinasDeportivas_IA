import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 

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
  imports: [RouterLink, RouterLinkActive, CommonModule, FormsModule], 
  templateUrl: './track.html',
  styleUrls: ['./track.css']
})
export class Track implements OnInit {
  nombreUsuario: string = '';

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

  // Elimina un ejercicio de la lista por su ID
  eliminarEjercicio(id: number) {
    this.ejercicios = this.ejercicios.filter(e => e.id !== id);
  }

  // Calcula el volumen total de la sesión
  get volumenTotal(): number {
    return this.ejercicios
      .filter(ej => ej.completado)
      .reduce((total, ej) => total + (ej.peso * ej.reps), 0);
  }

  // Añade un nuevo ejercicio editable
  agregarEjercicio() {
    const nuevoId = this.ejercicios.length > 0 
      ? Math.max(...this.ejercicios.map(e => e.id)) + 1 
      : 1;
      
    this.ejercicios.push({
      id: nuevoId,
      nombre: '', // Lo dejamos vacío para que el usuario escriba
      grupoMuscular: 'Custom',
      detalle: 'Extra Set',
      peso: 0,
      reps: 0,
      completado: false
    });
  }

  logout() {
    localStorage.removeItem('usuarioNombre'); 
    this.router.navigate(['/login']); 
  }
}
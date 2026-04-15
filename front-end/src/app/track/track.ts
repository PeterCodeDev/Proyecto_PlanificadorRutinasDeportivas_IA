import { Component, OnInit } from '@angular/core';
<<<<<<< HEAD
import { RouterLink, RouterLinkActive, Router } from '@angular/router'; // Asegúrate de que Router esté aquí
import { CommonModule } from '@angular/common';
=======
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
>>>>>>> 57e8d12da78d0ba312f4a82134b5d7f5a51e048c

@Component({
  selector: 'app-track',
  standalone: true,
<<<<<<< HEAD
  imports: [RouterLink, RouterLinkActive, CommonModule],
=======
  imports: [RouterLink, RouterLinkActive, CommonModule, FormsModule], 
>>>>>>> 57e8d12da78d0ba312f4a82134b5d7f5a51e048c
  templateUrl: './track.html',
  styleUrls: ['./track.css']
})
export class Track implements OnInit {
  nombreUsuario: string = '';

<<<<<<< HEAD
  // 1. El constructor debe recibir el router
=======
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

>>>>>>> 57e8d12da78d0ba312f4a82134b5d7f5a51e048c
  constructor(private router: Router) {} 

  ngOnInit() {
    const guardado = localStorage.getItem('usuarioNombre');
<<<<<<< HEAD
    this.nombreUsuario = guardado ? guardado : 'Atleta';
  }

  // 2. ESTA ES LA FUNCIÓN QUE TE PIDE EL ERROR. 
  // Debe estar dentro de las llaves de "export class Track"
=======
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

>>>>>>> 57e8d12da78d0ba312f4a82134b5d7f5a51e048c
  logout() {
    localStorage.removeItem('usuarioNombre'); 
    this.router.navigate(['/login']); 
  }
<<<<<<< HEAD
} // <-- Esta es la última llave que cierra la clase
=======
}
>>>>>>> 57e8d12da78d0ba312f4a82134b5d7f5a51e048c

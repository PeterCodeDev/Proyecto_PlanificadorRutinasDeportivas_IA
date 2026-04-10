import { Component } from '@angular/core';
import { RouterLink } from '@angular/router'; // 1. Importar

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink], // 2. Añadirlo aquí
  templateUrl: './register.html', // (o .component.html)
  styleUrls: ['./register.css']   // (o .component.css)
})
// En src/app/register/register.ts
export class Register {
  guardarNombre(nombre: string) {
    if (nombre) {
      localStorage.setItem('usuarioNombre', nombre);
    }
  }
}
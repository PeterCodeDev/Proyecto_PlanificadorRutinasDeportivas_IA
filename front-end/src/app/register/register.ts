import { Component } from '@angular/core';
import { RouterLink, Router } from '@angular/router'; // Añadimos Router para redirigir tras el registro
import { FormsModule } from '@angular/forms'; // Importante para leer los inputs
import { UsuarioService } from '../service/usuario.service'; // Asegúrate de que la ruta sea correcta

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink, FormsModule], // Añadimos FormsModule aquí
  templateUrl: './register.html',
  styleUrls: ['./register.css']
})
export class Register {
  // Objeto donde se guardarán los datos del formulario
  usuario = {
    nombre: '',
    email: '',
    password: ''
  };

  constructor(
    private usuarioService: UsuarioService,
    private router: Router
  ) {}

  onRegister() {
    // Llamamos al servicio para enviar los datos a C#
    this.usuarioService.registrar(this.usuario).subscribe({
      next: (res) => {
        alert("¡Registro exitoso en la base de datos!");
        this.router.navigate(['/login']); // Te manda al login automáticamente
      },
      error: (err) => {
        // Aquí verás el error de "El correo ya existe" que pusimos en C#
        alert("Error al registrar: " + (err.error || "Servidor no disponible"));
      }
    });
  }
}
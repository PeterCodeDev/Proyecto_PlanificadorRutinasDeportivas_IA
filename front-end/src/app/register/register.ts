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
  
  onRegister(confirmacion: string) {
  // 1. Validar que las contraseñas coincidan
  if (this.usuario.password !== confirmacion) {
    alert("Las contraseñas no coinciden.");
    return;
  }

  // 2. Si coinciden, enviar al servidor
  this.usuarioService.registrar(this.usuario).subscribe({
    next: (res) => {
      alert("¡Cuenta creada con éxito!");
      this.router.navigate(['/login']);
    },
    error: (err) => {
      // Mostrará "El correo ya está registrado" si el API devuelve error
      alert("Error: " + (err.error || "No se pudo conectar con el servidor"));
    }
  });
}
}
import { Component } from '@angular/core';
import { RouterLink, Router } from '@angular/router'; 
import { FormsModule } from '@angular/forms'; // <-- Importante para el [(ngModel)]
import { CommonModule } from '@angular/common'; // <-- Para mostrar el error con *if
import { UsuarioService } from '../service/usuario.service'; 

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, FormsModule, CommonModule], 
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login {
  // Objeto para los datos del formulario
  credenciales = {
    email: '',
    password: ''
  };

  mensajeError: string = ''; // Aquí guardaremos "Contraseña incorrecta", etc.

  constructor(
    private usuarioService: UsuarioService,
    private router: Router
  ) {}

  onLogin() {
  this.mensajeError = ''; 

  this.usuarioService.login(this.credenciales).subscribe({
    next: () => {
      // SI ES CORRECTO: Directo a la página de track sin avisos
      this.router.navigate(['/track']); 
    },
    error: (err) => {
      // SI ES INCORRECTO: Mostramos el aviso en el cuadro rojo
      this.mensajeError = "Correo o contraseña incorrectos";
    }
  });
}
}
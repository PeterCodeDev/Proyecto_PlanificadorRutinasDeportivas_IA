import { Component } from '@angular/core';
import { RouterLink } from '@angular/router'; // 1. Importar

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink], // 2. Añadirlo aquí
  templateUrl: './register.html', // (o .component.html)
  styleUrls: ['./register.css']   // (o .component.css)
})
export class Register { // Recuerda este nombre para el Paso 3

}
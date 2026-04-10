import { Component } from '@angular/core';
import { RouterLink } from '@angular/router'; // <-- Añade esta línea

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink], // <-- No olvides ponerlo aquí dentro
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login { // (O el nombre que tenga tu clase aquí)

}
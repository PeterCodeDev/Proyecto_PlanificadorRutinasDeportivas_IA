import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router'; // 1. Importación arriba

@Component({
  selector: 'app-track',
  standalone: true,
  imports: [RouterLink, RouterLinkActive], // 2. ¡MUY IMPORTANTE! Tienen que estar aquí dentro
  templateUrl: './track.html',
  styleUrls: ['./track.css']
})
export class Track { // (O el nombre que tenga tu clase aquí)

}
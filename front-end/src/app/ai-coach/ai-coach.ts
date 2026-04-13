import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-ai-coach',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './ai-coach.html',
  styleUrl: './ai-coach.css',
})
export class AiCoach implements OnInit {
  constructor() {

  }

  ngOnInit(): void {

  }

}

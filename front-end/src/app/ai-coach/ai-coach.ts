import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common'; // Para directivas como *ngFor
import { FormsModule } from '@angular/forms'; // Para el [(ngModel)]
import { AICoachService } from '../services/ai-coach.service'; // Ajusta la ruta a tu servicio

interface Mensaje {
  texto: string;
  sender: 'user' | 'ia';
}

@Component({
  standalone: true,
  selector: 'app-ai-coach',
  // Es vital añadir CommonModule y FormsModule aquí
  imports: [RouterLink, RouterLinkActive, CommonModule, FormsModule],
  templateUrl: './ai-coach.html',
  styleUrl: './ai-coach.css',
})
export class AiCoach implements OnInit {

  // Propiedades para el chat
  mensajeUsuario: string = '';
  chatHistory: Mensaje[] = [
    { texto: '¡Hola! Soy tu coach de Kinetic Gallery. ¿En qué músculo quieres trabajar hoy?', sender: 'ia' }
  ];
  cargando: boolean = false;

  constructor(private aiService: AICoachService) { }

  ngOnInit(): void {
    // Aquí podrías cargar un saludo inicial si quisieras
  }

  enviarConsulta() {
    if (!this.mensajeUsuario.trim() || this.cargando) return;

    // 1. Añadimos tu mensaje a la pantalla
    this.chatHistory.push({
      texto: this.mensajeUsuario,
      sender: 'user'
    });

    const consultaParaEnviar = this.mensajeUsuario;
    this.mensajeUsuario = ''; // Limpiamos el input inmediatamente
    this.cargando = true;

    // 2. Llamada al puente de C#
    this.aiService.enviarPregunta(consultaParaEnviar).subscribe({
      next: (res) => {
        this.chatHistory.push({
          texto: res.respuesta_ia,
          sender: 'ia'
        });
        this.cargando = false;
      },
      error: (err) => {
        console.error('Error en la conexión:', err);
        this.chatHistory.push({
          texto: 'Lo siento, he perdido la conexión con el servidor. Inténtalo de nuevo.',
          sender: 'ia'
        });
        this.cargando = false;
      }
    });
  }
}
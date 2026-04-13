import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AICoachService } from '../services/ai-coach.service';

interface Mensaje {
  texto: string;
  sender: 'user' | 'ia';
}

@Component({
  standalone: true,
  selector: 'app-ai-coach',
  imports: [RouterLink, RouterLinkActive, CommonModule, FormsModule],
  templateUrl: './ai-coach.html',
  styleUrl: './ai-coach.css',
})
export class AiCoach implements OnInit {
  mensajeUsuario: string = '';
  chatHistory: Mensaje[] = [
    { texto: '¡Hola! Soy tu coach de Kinetic Gallery. ¿En qué músculo quieres trabajar hoy?', sender: 'ia' }
  ];
  cargando: boolean = false;

  constructor(private aiService: AICoachService) { }

  ngOnInit(): void { }

  enviarConsulta() {
    if (!this.mensajeUsuario.trim() || this.cargando) return;

    const textoParaEnviar = this.mensajeUsuario.trim();

    // 1. Añadimos tu mensaje
    this.chatHistory.push({
      texto: textoParaEnviar,
      sender: 'user'
    });

    this.mensajeUsuario = '';
    this.cargando = true; // <--- Aquí activamos el "Escribiendo..."

    // 2. Llamada al servicio
    this.aiService.enviarPregunta(textoParaEnviar).subscribe({
      next: (res) => {
        console.log('Respuesta recibida de la IA:', res);

        // 3. Añadimos la respuesta usando el nombre exacto de tu consola: respuesta_ia
        this.chatHistory.push({
          texto: res.respuesta_ia,
          sender: 'ia'
        });

        // 4. APAGAMOS el estado de carga (esto quita el "Escribiendo...")
        this.cargando = false;
      },
      error: (err) => {
        console.error('Fallo en la comunicación:', err);
        this.chatHistory.push({
          texto: 'Lo siento, hubo un error al conectar con el servidor.',
          sender: 'ia'
        });
        this.cargando = false; // <--- También apagamos si hay error
      }
    });
  }
}
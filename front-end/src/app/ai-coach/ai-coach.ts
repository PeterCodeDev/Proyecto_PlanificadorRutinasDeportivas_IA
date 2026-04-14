import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AICoachService } from '../services/ai-coach.service';
import { MarkdownModule } from 'ngx-markdown';

interface Mensaje {
  texto: string;
  sender: 'user' | 'ia';
}

@Component({
  standalone: true,
  selector: 'app-ai-coach',
  imports: [RouterLink, RouterLinkActive, CommonModule, FormsModule, MarkdownModule],
  templateUrl: './ai-coach.html',
  styleUrl: './ai-coach.css',
})
export class AiCoach implements OnInit {
  mensajeUsuario: string = '';
  chatHistory: Mensaje[] = [
    { texto: '¡Hola! Soy tu coach de Kinetic Gallery. ¿En qué músculo quieres trabajar hoy?', sender: 'ia' }
  ];
  cargando: boolean = false;

  constructor(
    private aiService: AICoachService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void { }

  /**
   * Envía la consulta al backend procesando el historial acumulado
   */
  enviarConsulta() {
    // 1. Validaciones: no enviar vacío ni si ya está cargando
    if (!this.mensajeUsuario.trim() || this.cargando) return;

    const textoParaEnviar = this.mensajeUsuario.trim();

    // 2. CREAR EL HISTORIAL: Convertimos los últimos 10 mensajes en texto
    // Limitamos a 10 para ahorrar tokens y mejorar la velocidad de respuesta
    const historialParaBackend = this.chatHistory
      .slice(-10)
      .map(m => `${m.sender === 'user' ? 'Usuario' : 'IA'}: ${m.texto}`);

    // 3. Actualizar la interfaz con el mensaje del usuario inmediatamente
    this.chatHistory.push({
      texto: textoParaEnviar,
      sender: 'user'
    });

    // Limpiamos el input y activamos estado de carga
    this.mensajeUsuario = '';
    this.cargando = true;

    // Forzamos scroll hacia abajo para ver el nuevo mensaje
    this.scrollToBottom();
    this.cdr.detectChanges();

    // 4. Llamada al servicio
    this.aiService.enviarPregunta(textoParaEnviar, historialParaBackend).subscribe({
      next: (res: any) => {
        console.log('Respuesta recibida:', res);

        // Extraemos la respuesta del JSON que devuelve FastAPI
        const respuestaTexto = res.respuesta || res.respuesta_ia || "Lo siento, no he podido procesar la rutina.";

        // Añadimos la respuesta de la IA al chat
        this.chatHistory.push({
          texto: respuestaTexto,
          sender: 'ia'
        });

        this.cargando = false;
        this.scrollToBottom();
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error en la llamada:', err);
        this.chatHistory.push({
          texto: 'Error de conexión con el servicio de IA. Revisa que el servidor Python esté corriendo.',
          sender: 'ia'
        });

        this.cargando = false;
        this.scrollToBottom();
        this.cdr.detectChanges();
      }
    });
  }

  /**
   * Método para desplazar la ventana automáticamente hacia el último mensaje
   */
  private scrollToBottom() {
    setTimeout(() => {
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: 'smooth'
      });
    }, 100);
  }
}
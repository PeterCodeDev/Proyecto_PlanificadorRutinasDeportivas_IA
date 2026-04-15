<<<<<<< HEAD
import { Component, OnInit, ChangeDetectorRef } from '@angular/core'; // Importado ChangeDetectorRef
import { RouterLink, RouterLinkActive } from '@angular/router';
=======
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
>>>>>>> 57e8d12da78d0ba312f4a82134b5d7f5a51e048c
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
<<<<<<< HEAD
    { texto: '¡Hola! Soy tu coach de Kinetic Gallery. ¿En qué músculo quieres trabajar hoy?', sender: 'ia' }
  ];
  cargando: boolean = false;

  // Se inyecta el servicio y el detector de cambios
  constructor(
    private aiService: AICoachService,
    private cdr: ChangeDetectorRef
=======
    { texto: '¡Hola! Soy tu coach de Smart Workout. ¿Que quieres trabajar hoy?', sender: 'ia' }
  ];
  cargando: boolean = false;

  constructor(
    private aiService: AICoachService,
    private cdr: ChangeDetectorRef,
    private router: Router
>>>>>>> 57e8d12da78d0ba312f4a82134b5d7f5a51e048c
  ) { }

  ngOnInit(): void { }

<<<<<<< HEAD
  enviarConsulta() {
    // Validamos que haya texto y no estemos ya cargando
=======
  /**
   * Envía la consulta al backend procesando el historial acumulado
   */
  enviarConsulta() {
    // 1. Validaciones: no enviar vacío ni si ya está cargando
>>>>>>> 57e8d12da78d0ba312f4a82134b5d7f5a51e048c
    if (!this.mensajeUsuario.trim() || this.cargando) return;

    const textoParaEnviar = this.mensajeUsuario.trim();

<<<<<<< HEAD
    // 1. Añadimos el mensaje del usuario al chat
=======
    // 2. CREAR EL HISTORIAL: Convertimos los últimos 10 mensajes en texto
    // Limitamos a 10 para ahorrar tokens y mejorar la velocidad de respuesta
    const historialParaBackend = this.chatHistory
      .slice(-10)
      .map(m => `${m.sender === 'user' ? 'Usuario' : 'IA'}: ${m.texto}`);

    // 3. Actualizar la interfaz con el mensaje del usuario inmediatamente
>>>>>>> 57e8d12da78d0ba312f4a82134b5d7f5a51e048c
    this.chatHistory.push({
      texto: textoParaEnviar,
      sender: 'user'
    });

<<<<<<< HEAD
    this.mensajeUsuario = '';
    this.cargando = true; // Activa el estado visual "Escribiendo..."

    // 2. Llamada al servicio hacia el puente C#
    this.aiService.enviarPregunta(textoParaEnviar).subscribe({
      next: (res: any) => {
        console.log('Respuesta recibida:', res); // Verifica que llega el objeto respuesta_ia

        // 3. Mapeamos la respuesta según lo que vemos en la consola
        const respuestaTexto = res.respuesta_ia || res.respuesta || "La IA no devolvió texto.";

=======
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
>>>>>>> 57e8d12da78d0ba312f4a82134b5d7f5a51e048c
        this.chatHistory.push({
          texto: respuestaTexto,
          sender: 'ia'
        });

<<<<<<< HEAD
        // 4. Finalizamos el estado de carga
        this.cargando = false;

        // 5. FORZAR ACTUALIZACIÓN: Esto soluciona que el mensaje no salga hasta hacer clic
=======
        this.cargando = false;
        this.scrollToBottom();
>>>>>>> 57e8d12da78d0ba312f4a82134b5d7f5a51e048c
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error en la llamada:', err);
        this.chatHistory.push({
<<<<<<< HEAD
          texto: 'Error de conexión. Revisa que el puente C# esté en ejecución.',
=======
          texto: 'Error de conexión con el servicio de IA. Revisa que el servidor Python esté corriendo.',
>>>>>>> 57e8d12da78d0ba312f4a82134b5d7f5a51e048c
          sender: 'ia'
        });

        this.cargando = false;
<<<<<<< HEAD
        this.cdr.detectChanges(); // Refrescamos también en caso de error
      }
    });
  }
}
=======
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

  logout() {
    localStorage.removeItem('usuarioNombre'); 
    this.router.navigate(['/login']); 
  }
}

>>>>>>> 57e8d12da78d0ba312f4a82134b5d7f5a51e048c

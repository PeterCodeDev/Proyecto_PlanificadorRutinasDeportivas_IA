import { Component, OnInit, ChangeDetectorRef } from '@angular/core'; // Importado ChangeDetectorRef
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

  // Se inyecta el servicio y el detector de cambios
  constructor(
    private aiService: AICoachService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void { }

  enviarConsulta() {
    // Validamos que haya texto y no estemos ya cargando
    if (!this.mensajeUsuario.trim() || this.cargando) return;

    const textoParaEnviar = this.mensajeUsuario.trim();

    // 1. Añadimos el mensaje del usuario al chat
    this.chatHistory.push({
      texto: textoParaEnviar,
      sender: 'user'
    });

    this.mensajeUsuario = '';
    this.cargando = true; // Activa el estado visual "Escribiendo..."

    // 2. Llamada al servicio hacia el puente C#
    this.aiService.enviarPregunta(textoParaEnviar).subscribe({
      next: (res: any) => {
        console.log('Respuesta recibida:', res); // Verifica que llega el objeto respuesta_ia

        // 3. Mapeamos la respuesta según lo que vemos en la consola
        const respuestaTexto = res.respuesta_ia || res.respuesta || "La IA no devolvió texto.";

        this.chatHistory.push({
          texto: respuestaTexto,
          sender: 'ia'
        });

        // 4. Finalizamos el estado de carga
        this.cargando = false;

        // 5. FORZAR ACTUALIZACIÓN: Esto soluciona que el mensaje no salga hasta hacer clic
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error en la llamada:', err);
        this.chatHistory.push({
          texto: 'Error de conexión. Revisa que el puente C# esté en ejecución.',
          sender: 'ia'
        });

        this.cargando = false;
        this.cdr.detectChanges(); // Refrescamos también en caso de error
      }
    });
  }
}
<<<<<<< HEAD
=======
import os
>>>>>>> 57e8d12da78d0ba312f4a82134b5d7f5a51e048c
from fastapi import FastAPI
from pydantic import BaseModel
from transformers import pipeline
from fastapi.middleware.cors import CORSMiddleware
<<<<<<< HEAD

app = FastAPI()

=======
from dotenv import load_dotenv

# Imports para implementar crewai en nuestro proyecto
from crewai import Agent, Task, Crew, Process
from langchain_openai import ChatOpenAI
from langchain_community.tools import DuckDuckGoSearchRun
from crewai.tools import tool

load_dotenv()
api_key = os.getenv("OPENAI_API_KEY")
if not api_key:
    print("ERROR: No se encontró la OPENAI_API_KEY en el archivo .env")

# 2. DEFINICIÓN DE HERRAMIENTA (Formato nativo de CrewAI para evitar errores de Pydantic)
@tool("Buscador de Internet")
def buscador_web(consulta: str) -> str:
    """Útil para buscar información actual en internet como el clima, noticias o datos en tiempo real."""
    buscador = DuckDuckGoSearchRun()
    return buscador.run(consulta)

app = FastAPI()

# 3. Configurar Middlewares (CORS)
>>>>>>> 57e8d12da78d0ba312f4a82134b5d7f5a51e048c
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

<<<<<<< HEAD
print("Cargando modelos de Inteligencia Artificial. Por favor, espera...")

# Modelo A: Generador de texto para el AI Coach (en español)
coach_generator = pipeline(
    "text-generation", 
    model="Qwen/Qwen2.5-1.5B-Instruct",
    token="hf_aQuI_tU_tOkEn_LaRgUiSiMo" 
)# Modelo B: Análisis de sentimiento para el Tracker (para cumplir la rúbrica al 100%)
sentiment_analyzer = pipeline("sentiment-analysis", model="pysentimiento/robertuito-sentiment-analysis")

print("¡Modelos cargados con éxito!")

class CoachRequest(BaseModel):
    mensaje_usuario: str
=======
# 4. Carga de Modelos de Sentimiento
print("Cargando modelos de Inteligencia Artificial. Por favor, espera...")
sentiment_analyzer = pipeline("sentiment-analysis", model="pysentimiento/robertuito-sentiment-analysis")
print("¡Modelos cargados con éxito!")

# 5. MODELOS DE DATOS (Pydantic)
class CoachRequest(BaseModel):
    mensaje_usuario: str
    historial: list = []  # <--- Añadido para recibir la memoria desde Angular
>>>>>>> 57e8d12da78d0ba312f4a82134b5d7f5a51e048c

class EntrenamientoRequest(BaseModel):
    ejercicio: str
    peso: float
    reps: int
<<<<<<< HEAD
    comentario: str = "" # Opcional: Para analizar cómo se sintió

@app.get("/")
def home():
    return {"estado": "Servicio IA Operativo", "tecnologia": "FastAPI + HuggingFace"}

# --- ENDPOINT PARA LA PANTALLA "AI COACH" ---
@app.post("/generar-rutina")
def generar_rutina(data: CoachRequest):
    # Le damos vida al asistente de "The Kinetic Gallery"
    mensajes = [
        {
            "role": "system", 
            "content": """Eres el asistente virtual experto en fitness de 'The Kinetic Gallery'. 
Tu objetivo es ayudar a los usuarios a planificar sus entrenamientos de forma amable, motivadora y profesional.
Reglas:
- Siempre indica un numero de series y repeticiones
- Sé conversacional y cercano, pero directo.
- Adapta tus respuestas al material o nivel que te indique el usuario.
- Termina siempre tus sugerencias con una pregunta interactiva (ej: '¿Empezamos?', '¿Qué te parece?').
- Responde siempre en español y mantén tus respuestas en un máximo de un párrafo corto."""
        },
        {
            "role": "user", 
            "content": data.mensaje_usuario
        }
    ]
    
    # Subimos la temperatura a 0.6 o 0.7. Al ser un modelo más listo, 
    # esta creatividad le hará sonar más humano y menos robótico.
    resultado = coach_generator(
        mensajes, 
        max_new_tokens=150, # Le damos más espacio para conversar  
        temperature=0.6,  
        do_sample=True
    )
    
    respuesta_ia = resultado[0]['generated_text'][-1]['content']

    return {
        "respuesta": respuesta_ia
    }

# --- ENDPOINT PARA LA PANTALLA "TRACK" ---
@app.post("/predecir")
def predecir_progresion(data: EntrenamientoRequest):
    # Lógica base (tu código original)
=======
    comentario: str = ""

@app.get("/")
def home():
    return {"estado": "Servicio IA Operativo", "tecnologia": "FastAPI + HuggingFace + CrewAI"}

# --- ENDPOINT 1: AI COACH CON MEMORIA MANUAL ---
@app.post("/generar-rutina")
def generar_rutina(data: CoachRequest):
    
    # Preparamos el contexto previo para que la IA "recuerde"
    contexto_previo = "\n".join(data.historial)

    entrenador = Agent(
        role='Entrenador Personal Senior',
        goal='Diseñar una rutina de ejercicios precisa, segura y efectiva basada en la petición del usuario y su historial.',
        backstory='Eres el entrenador principal de The Kinetic Gallery. Eres experto en biomecánica y conoces perfectamente lo que el usuario ha dicho anteriormente.',
        verbose=True,
        allow_delegation=False,
        tools=[buscador_web],
        llm='gpt-4o-mini'
    )

    comunicador = Agent(
        role='Coach Motivacional y Especialista en Markdown',
        goal='Tomar la rutina del Entrenador, darle formato Markdown y añadirle motivación.',
        backstory='Eres la cara amable de The Kinetic Gallery. Transformas datos fríos en mensajes inspiradores.',
        verbose=True,
        allow_delegation=False,
        llm='gpt-4o-mini'
    )

    # Inyectamos el historial directamente en la descripción de la tarea
    tarea_rutina = Task(
        description=(
            f"HISTORIAL DE LA CONVERSACIÓN:\n{contexto_previo}\n\n"
            f"ÚLTIMA PETICIÓN DEL USUARIO: '{data.mensaje_usuario}'\n\n"
            "INSTRUCCIONES: Si el usuario pide información actual, usa el buscador. "
            "Si pide una rutina, créala basándote en su historial si existe. "
            "Si te saluda o pregunta algo personal, responde amablemente usando su nombre si lo conoces."
        ),
        expected_output='Una respuesta coherente que demuestre que recuerdas la conversación previa.',
        agent=entrenador
    )

    tarea_formato = Task(
        description='Toma el texto del Entrenador y dale formato Markdown limpio. NUNCA uses bloques de código (```).',
        expected_output='Texto en formato Markdown limpio listo para mostrar.',
        agent=comunicador
    )

    equipo_kinetic = Crew(
        agents=[entrenador, comunicador],
        tasks=[tarea_rutina, tarea_formato],
        verbose=True,
        process=Process.sequential,
        memory=False  # <--- IMPORTANTE: False para evitar errores de instalación de embedchain
    )

    resultado = equipo_kinetic.kickoff()

    # Limpieza de seguridad por si la IA añade bloques de código
    texto_limpio = str(resultado).replace("```markdown", "").replace("```html", "").replace("```", "").strip()

    return {
        "respuesta": texto_limpio
    }


# --- ENDPOINT 2: PANTALLA TRACK ---
@app.post("/predecir")
def predecir_progresion(data: EntrenamientoRequest):
>>>>>>> 57e8d12da78d0ba312f4a82134b5d7f5a51e048c
    sugerencia_peso = data.peso
    if data.reps >= 8:
        sugerencia_peso = data.peso * 1.05
    
<<<<<<< HEAD
    # IA: Análisis de sentimiento si el usuario escribe un comentario
    estado_animo = "Neutral"
    if data.comentario:
        analisis = sentiment_analyzer(data.comentario)[0]
        estado_animo = analisis['label'] # Devuelve POS, NEG o NEU
=======
    estado_animo = "Neutral"
    if data.comentario:
        analisis = sentiment_analyzer(data.comentario)[0]
        estado_animo = analisis['label']

>>>>>>> 57e8d12da78d0ba312f4a82134b5d7f5a51e048c
    return {
        "recomendacion_peso": round(sugerencia_peso, 1),
        "sentimiento_detectado": estado_animo,
        "mensaje": f"Excelente. Para la próxima sesión de {data.ejercicio}, intenta con {round(sugerencia_peso, 1)}kg."
    }
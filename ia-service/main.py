import os
from fastapi import FastAPI
from pydantic import BaseModel
from transformers import pipeline
from fastapi.middleware.cors import CORSMiddleware
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
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# 4. Carga de Modelos de Sentimiento
print("Cargando modelos de Inteligencia Artificial. Por favor, espera...")
sentiment_analyzer = pipeline("sentiment-analysis", model="pysentimiento/robertuito-sentiment-analysis")
print("¡Modelos cargados con éxito!")

# 5. MODELOS DE DATOS (Pydantic)
class CoachRequest(BaseModel):
    mensaje_usuario: str
    historial: list = []  # <--- Añadido para recibir la memoria desde Angular

class EntrenamientoRequest(BaseModel):
    ejercicio: str
    peso: float
    reps: int
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
    sugerencia_peso = data.peso
    if data.reps >= 8:
        sugerencia_peso = data.peso * 1.05
    
    estado_animo = "Neutral"
    if data.comentario:
        analisis = sentiment_analyzer(data.comentario)[0]
        estado_animo = analisis['label']

    return {
        "recomendacion_peso": round(sugerencia_peso, 1),
        "sentimiento_detectado": estado_animo,
        "mensaje": f"Excelente. Para la próxima sesión de {data.ejercicio}, intenta con {round(sugerencia_peso, 1)}kg."
    }
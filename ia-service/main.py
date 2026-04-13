from fastapi import FastAPI
from pydantic import BaseModel
from transformers import pipeline
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

print("Cargando modelos de Inteligencia Artificial. Por favor, espera...")

# Modelo A: Generador de texto para el AI Coach (en español)
coach_generator = pipeline("text-generation", model="DeepESP/gpt2-spanish")

# Modelo B: Análisis de sentimiento para el Tracker (para cumplir la rúbrica al 100%)
sentiment_analyzer = pipeline("sentiment-analysis", model="pysentimiento/robertuito-sentiment-analysis")

print("¡Modelos cargados con éxito!")

class CoachRequest(BaseModel):
    mensaje_usuario: str

class EntrenamientoRequest(BaseModel):
    ejercicio: str
    peso: float
    reps: int
    comentario: str = "" # Opcional: Para analizar cómo se sintió

@app.get("/")
def home():
    return {"estado": "Servicio IA Operativo", "tecnologia": "FastAPI + HuggingFace"}

# --- ENDPOINT PARA LA PANTALLA "AI COACH" ---
@app.post("/generar-rutina")
def generar_rutina(data: CoachRequest):
    # Damos contexto al modelo
    prompt = f"El atleta dice: '{data.mensaje_usuario}'. Sugerencia de ejercicio:\n"
    
    # Generamos la respuesta con el LLM
    resultado = coach_generator(prompt, max_new_tokens=40, num_return_sequences=1)
    texto_generado = resultado[0]['generated_text']
    
    # Limpiamos la respuesta para no repetir lo que dijo el usuario
    respuesta_limpia = texto_generado.replace(prompt, "").strip()

    return {
        "respuesta": respuesta_limpia
    }

# --- ENDPOINT PARA LA PANTALLA "TRACK" ---
@app.post("/predecir")
def predecir_progresion(data: EntrenamientoRequest):
    # Lógica base (tu código original)
    sugerencia_peso = data.peso
    if data.reps >= 8:
        sugerencia_peso = data.peso * 1.05
    
    # IA: Análisis de sentimiento si el usuario escribe un comentario
    estado_animo = "Neutral"
    if data.comentario:
        analisis = sentiment_analyzer(data.comentario)[0]
        estado_animo = analisis['label'] # Devuelve POS, NEG o NEU

    return {
        "recomendacion_peso": round(sugerencia_peso, 1),
        "sentimiento_detectado": estado_animo,
        "mensaje": f"Excelente. Para la próxima sesión de {data.ejercicio}, intenta con {round(sugerencia_peso, 1)}kg."
    }
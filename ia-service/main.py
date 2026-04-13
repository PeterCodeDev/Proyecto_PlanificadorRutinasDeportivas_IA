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
coach_generator = pipeline(
    "text-generation", 
    model="Qwen/Qwen2.5-1.5B-Instruct",
    token="hf_aQuI_tU_tOkEn_LaRgUiSiMo" 
)# Modelo B: Análisis de sentimiento para el Tracker (para cumplir la rúbrica al 100%)
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
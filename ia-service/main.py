from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

class Entrenamiento(BaseModel):
    ejercicio:str
    peso:float
    reps:int
    
@app.get("/")
def home():
    return {"mensaje":"IA SERVICE ONLINE"}

@app.post("/predecir")
def predecir_progresion(data: Entrenamiento):
    sugerencia_peso = data.peso
    mensaje = "Manten el peso para mejorar la tecnica"
    
    if data.peso >= 8:
        sugerencia_peso = data.peso *1.05
        mensaje = f"Excelente - Para la proxima sesion de {data.ejercicio}, intenta subir a {round(sugerencia_peso, 1)}kg"
        
    return{
        "recomendacion":mensaje,
        "nuevo_objetivo":round(sugerencia_peso,1)
    }
using System.Net.Http;
using System.Net.Http.Json;
using System.Threading.Tasks;

namespace SmartWorkoutApi.Services
{
    public class IAService
    {
        private readonly HttpClient _httpClient;

        //C# nos inyecta el httpclient automaticamente para hacer peticiones web
        public IAService(HttpClient httpClient)
        {
            _httpClient = httpClient;
        }

        public async Task<string> ConsultarRecomendacion(string nombreEjercicio, float peso, int reps)
        {
            var datosEntrenamiento = new { ejercicio = nombreEjercicio, peso = peso, reps = reps };

            try
            {
                var response = await _httpClient.PostAsJsonAsync("http://localhost:8000/predecir", datosEntrenamiento);

                if (response.IsSuccessStatusCode)
                {
                    var resultado = await response.Content.ReadFromJsonAsync<dynamic>();
                    return resultado.GetProperty("recomendacion").GetString();
                }
            }
            catch
            {
                return "Error: Asegurate de que el servicio de Python esta encendido";
            }
            return "Sin recomendacion disponible";
        }
        public async Task<string> ConsultarCoachIA(string mensajeUsuario)
        {
            var peticion = new { mensaje_usuario = mensajeUsuario };

            try
            {
                var response = await _httpClient.PostAsJsonAsync("http://localhost:8000/generar-rutina", peticion);
                if (response.IsSuccessStatusCode)
                {
                    var resultado = await response.Content.ReadFromJsonAsync<dynamic>();
                    return resultado.GetProperty("respuesta").GetString();
                }
            }
            catch
            {
                return "Error de conexion: El servicio de IA local no esta accesible";
            }
            return "No pude generar una rutina en este momento";
        }
    }
}

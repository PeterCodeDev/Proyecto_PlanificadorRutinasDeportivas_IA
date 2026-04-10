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
                return "Error: Asegurate de que el servicio de Python esta encendido"
            }
            return "Sin recomendacion disponible";
        }
    }
}

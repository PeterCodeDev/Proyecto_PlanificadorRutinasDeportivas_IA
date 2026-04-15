using Microsoft.AspNetCore.Mvc;
using System.Net.Http;
using System.Net.Http.Json;

namespace SmartWorkoutApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AiCoachController : ControllerBase
    {
        private readonly HttpClient _httpClient;

        public AiCoachController(IHttpClientFactory httpClientFactory)
        {
            _httpClient = httpClientFactory.CreateClient();
        }

        [HttpPost("generar-rutina")]
        public async Task<IActionResult> GetRoutine([FromBody] CoachRequest request)
        {
            // 1. Verificamos que el historial no sea nulo (si es la primera vez que hablamos, creamos una lista vacia)
            var historialSeguro = request.Historial ?? new List<string>();

            // 2. Construimos el Payload EXACTO que espera el Pydantic Model de FastAPI en Python
            var payloadParaPython = new
            {
                mensaje_usuario = request.Mensaje,
                historial = historialSeguro
            };

            try
            {
                // Llamamos a FastAPI (Puerto 8000)
                var response = await _httpClient.PostAsJsonAsync("http://localhost:8000/generar-rutina", payloadParaPython);

                if (response.IsSuccessStatusCode)
                {
                    var contenido = await response.Content.ReadFromJsonAsync<RespuestaIA>();
                    // Devolvemos a Angular el formato que su interfaz espera
                    return Ok(new { respuesta_ia = contenido.respuesta });
                }

                return StatusCode((int)response.StatusCode, "Error desde el servicio de Python");
            }
            catch (Exception ex)
            {
                return BadRequest($"Error de conexión con la IA: {ex.Message}");
            }
        }
    }

    // --- CLASES DE SOPORTE ---

    // Lo que recibimos de Angular
    public class CoachRequest
    {
        public string Mensaje { get; set; }
        public List<string> Historial { get; set; }
    }

    // Lo que esperamos recibir de Python
    public class RespuestaIA
    {
        public string respuesta { get; set; }
    }
}
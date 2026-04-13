using Microsoft.AspNetCore.Mvc;
using SmartWorkoutApi.Services;

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
            // TRADUCCIÓN CRÍTICA: Angular envía "Mensaje", Python espera "mensaje_usuario"
            // Al crear este objeto anónimo, evitamos el error 'dynamic' de Visual Studio
            var payloadParaPython = new
            {
                mensaje_usuario = request.Mensaje
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

    // Clases de soporte para evitar el uso de 'dynamic'
    public class CoachRequest { public string Mensaje { get; set; } }
    public class RespuestaIA { public string respuesta { get; set; } }
}
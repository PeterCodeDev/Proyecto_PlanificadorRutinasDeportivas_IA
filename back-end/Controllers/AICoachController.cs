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
            // IMPORTANTE: Creamos el objeto con el nombre exacto que espera Python
            var payloadParaPython = new
            {
                mensaje_usuario = request.Mensaje
            };

            // Enviamos el payload corregido
            var response = await _httpClient.PostAsJsonAsync("http://localhost:8000/generar-rutina", payloadParaPython);

            if (response.IsSuccessStatusCode)
            {
                // Python devuelve {"respuesta": "..."}. Lo leemos dinámicamente o con una clase.
                var content = await response.Content.ReadFromJsonAsync<dynamic>();
                return Ok(new { respuesta_ia = content.GetProperty("respuesta").GetString() });
            }

            return BadRequest("La IA no respondió correctamente.");
        }
    }

    // Clases de apoyo para evitar el error de 'dynamic'
    public class CoachRequest { public string Mensaje { get; set; } }
    public class RespuestaIA { public string respuesta { get; set; } }
}
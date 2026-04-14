using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SmartWorkoutApi.Data;
using SmartWorkoutApi.Models;

namespace SmartWorkoutApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsuariosController : ControllerBase
    {
        private readonly AppDbContext _context;

        public UsuariosController(AppDbContext context)
        {
            _context = context;
        }

        // 1. REGISTRO: Para crear la cuenta
        [HttpPost("registrar")]
        public async Task<ActionResult<Usuario>> Registrar(Usuario usuario)
        {
            // Comprobamos si el correo ya está en la base de datos
            var existe = await _context.Usuarios.AnyAsync(u => u.Email == usuario.Email);
            if (existe)
            {
                return BadRequest("El correo ya está registrado.");
            }

            _context.Usuarios.Add(usuario);
            await _context.SaveChangesAsync();
            return Ok(usuario);
        }

        // 2. LOGIN: Para entrar en la aplicación
        [HttpPost("login")]
        public async Task<ActionResult> Login([FromBody] LoginRequest request)
        {
            var usuario = await _context.Usuarios
                .FirstOrDefaultAsync(u => u.Email == request.Email);

            if (usuario == null || usuario.Password != request.Password)
            {
                return BadRequest("Correo o contraseña incorrectos");
            }

            // ENVIAMOS EL NOMBRE REAL DE LA BASE DE DATOS
            return Ok(new { nombre = usuario.Nombre });
        }
    }
    // Clase auxiliar para recibir los datos del Login
    public class LoginRequest
    {
        public string Email { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
    }
}
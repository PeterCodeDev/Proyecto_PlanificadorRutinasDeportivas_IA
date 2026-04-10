using Microsoft.EntityFrameworkCore;
using SmartWorkoutApi.Data; // Esto importa tu AppDbContext

var builder = WebApplication.CreateBuilder(args);

// 1. CONFIGURACIÓN DE LA BASE DE DATOS (SQL Server)
// Esto busca la cadena "DefaultConnection" en tu archivo appsettings.json
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// 2. CONFIGURACIÓN DE CORS (Para que Angular pueda conectarse sin errores)
builder.Services.AddCors(options =>
{
    options.AddPolicy("PermitirAngular", policy =>
    {
        policy.WithOrigins("http://localhost:4200") // Puerto por defecto de Angular
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

// 3. AÑADIR CONTROLADORES
builder.Services.AddControllers();

var app = builder.Build();

// 4. ACTIVAR CORS (Siempre antes del MapControllers)
app.UseCors("PermitirAngular");

// 5. MAPEAR LAS RUTAS Y ARRANCAR
app.MapControllers();
app.Run();
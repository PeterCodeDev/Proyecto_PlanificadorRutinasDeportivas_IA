using Microsoft.EntityFrameworkCore;
using SmartWorkoutApi.Data;
using SmartWorkoutApi.Services; // Esto importa tu AppDbContext

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
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

//El puente hacia python
<<<<<<< HEAD
builder.Services.AddHttpClient();
=======
builder.Services.AddHttpClient<IAService>();
>>>>>>> 57e8d12da78d0ba312f4a82134b5d7f5a51e048c

var app = builder.Build();

    app.UseSwagger();
    app.UseSwaggerUI();


// 4. ACTIVAR CORS (Siempre antes del MapControllers)
app.UseCors("PermitirAngular");

// 5. MAPEAR LAS RUTAS Y ARRANCAR
app.MapControllers();
app.Run();
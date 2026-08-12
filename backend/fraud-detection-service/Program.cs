using System.Text.Json.Serialization;
using FraudDetectionService.AI.Clients;
using FraudDetectionService.AI.Interfaces;
using FraudDetectionService.Configuration;
using FraudDetectionService.Data;
using FraudDetectionService.Services;
using FraudDetectionService.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter());
    });

var connectionString = builder.Configuration.GetConnectionString("FraudDb");

builder.Services.Configure<GeminiSettings>(
    builder.Configuration.GetSection("Gemini"));

builder.Services.AddHttpClient();

builder.Services.AddScoped<IGeminiClient, GeminiClient>();

builder.Services.AddScoped<IAIExplanationService, AIExplanationService>();

builder.Services.AddScoped<IChatAssistantService, ChatAssistantService>();

builder.Services.AddDbContext<FraudDbContext>(options =>
    options.UseMySql(
        connectionString,
        ServerVersion.AutoDetect(connectionString)
    ));

builder.Services.AddScoped<IFraudService, FraudService>();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy.SetIsOriginAllowed(origin => true)
              .AllowAnyHeader()
              .AllowAnyMethod()
              .AllowCredentials();
    });
});

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

app.UseCors("AllowFrontend");

using (var scope = app.Services.CreateScope())
{
    var dbContext = scope.ServiceProvider.GetRequiredService<FraudDbContext>();
    try
    {
        dbContext.Database.EnsureCreated();
        Console.WriteLine("Fraud Detection Service: Database schema verified/created successfully.");
    }
    catch (Exception ex)
    {
        Console.WriteLine("Fraud Detection Service: EnsureCreated error: " + ex.Message);
    }
}

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.MapControllers();

app.Run();
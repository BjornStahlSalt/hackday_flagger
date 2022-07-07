using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Net.Http.Headers;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddDbContext<PlayerContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("PlayerContext") ?? throw new InvalidOperationException("Connection string 'PlayerContext' not found.")));

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddCors(options =>
{
  options.AddPolicy("highscore", policy =>
  {
    policy.WithOrigins("http://localhost:3000")
    .WithHeaders(
    HeaderNames.ContentType,
    HeaderNames.AccessControlAllowHeaders,
    HeaderNames.AccessControlAllowMethods
    );
  });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
  app.UseSwagger();
  app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors();

app.UseAuthorization();

app.MapControllers();

app.Run();

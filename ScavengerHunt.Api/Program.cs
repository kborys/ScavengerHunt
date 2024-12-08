var builder = WebApplication.CreateBuilder(args);

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.MapGet("/quests/{id:Guid}", (Guid id) => $"This is a single quest {id}")
    .WithName("GetQuest")
    .WithOpenApi();

app.MapGet("/quests", () => "These are all the quests")
    .WithName("GetQuests")
    .WithOpenApi();

app.Run();
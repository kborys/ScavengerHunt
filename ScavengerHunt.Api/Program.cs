using ScavengerHunt.Api.Services;

var builder = WebApplication.CreateBuilder(args);

builder.WebHost.ConfigureKestrel(options =>
{
    options.Listen(System.Net.IPAddress.Any, 5062); // Bindujemy się do wszystkich, żeby móc łatwo zmienić środowisko
});

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAllOrigins", policy =>
    {
        policy.AllowAnyOrigin()  // Allows all origins
            .AllowAnyMethod()  // Allows all HTTP methods (GET, POST, PUT, etc.)
            .AllowAnyHeader(); // Allows all headers
    });
});

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
    
    // Enable CORS for all origins
    app.UseCors("AllowAllOrigins");
}

app.UseHttpsRedirection();

app.MapGet("/quests", async () =>
{
    var quests = await QuestService.GetAllQuestsAsync();
    return Results.Ok(quests);
});

app.MapGet("/quests/{id}", async (string id) =>
{
    var quest = await QuestService.GetQuestByIdAsync(id);
    return quest != null ? Results.Ok(quest) : Results.NotFound();
});

app.MapPut("/quests/{id}/status", async (string id, bool isCompleted) =>
{
    var updatedQuest = await QuestService.UpdateQuestStatusAsync(id, isCompleted);
    return updatedQuest != null ? Results.Ok(updatedQuest) : Results.NotFound();
});

app.MapPut("/quests/{questId}/waypoints/{waypointId}/complete", async (string questId, string waypointId) =>
{
    var updatedQuest = await QuestService.UpdateWaypointStatusAsync(questId, waypointId, true);
    return updatedQuest != null ? Results.Ok(updatedQuest) : Results.NotFound();
});
app.Run();
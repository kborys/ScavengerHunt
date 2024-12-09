using ScavengerHunt.Api.Models;

namespace ScavengerHunt.Api.Services;

public static class QuestService
{
    private static readonly List<Quest> MockQuests =
    [
        new()
        {
            Id = "1",
            Name = "Odkryj Stare Miasto",
            Description = "Fascynująca wycieczka po zabytkach Starego Miasta",
            Difficulty = "medium",
            EstimatedTime = 120,
            IsActive = false,
            IsCompleted = false,
            CreatedAt = DateTime.UtcNow,
            Waypoints =
            [
                new Waypoint
                {
                    Id = "w1",
                    Name = "Rynek Główny",
                    Description = "Znajdź fontannę na środku rynku",
                    Position = new LatLng { Lat = 52.2297, Lng = 21.0122 },
                    Order = 1,
                    IsCompleted = false,
                },
                new Waypoint
                {
                    Id = "w2",
                    Name = "Kościół Mariacki",
                    Description = "Posłuchaj hejnału z wieży",
                    Position = new LatLng { Lat = 52.2299, Lng = 21.0125 },
                    Order = 2,
                    IsCompleted = false,
                }
            ]
        },
        new()
        {
            Id = "2",
            Name = "Szlakiem Parków",
            Description = "Poznaj najpiękniejsze parki w mieście",
            Difficulty = "easy",
            EstimatedTime = 90,
            IsActive = false,
            IsCompleted = false,
            CreatedAt = DateTime.UtcNow,
            Waypoints =
            [
                new Waypoint
                {
                    Id = "w3",
                    Name = "Park Łazienkowski",
                    Description = "Znajdź pomnik Chopina",
                    Position = new LatLng { Lat = 52.2151, Lng = 21.0353 },
                    Order = 1,
                    IsCompleted = false,
                },
                new Waypoint
                {
                    Id = "w4",
                    Name = "Park Ujazdowski",
                    Description = "Odwiedź starą fontannę",
                    Position = new LatLng { Lat = 52.2229, Lng = 21.0279 },
                    Order = 2,
                    IsCompleted = false,
                }
            ]
        }
    ];

    public static Task<List<Quest>> GetAllQuestsAsync() =>
        Task.FromResult(MockQuests);

    public static Task<Quest?> GetQuestByIdAsync(string id) =>
        Task.FromResult(MockQuests.FirstOrDefault(q => q.Id == id));

    public static Task<Quest?> UpdateQuestStatusAsync(string questId, bool isCompleted)
    {
        var quest = MockQuests.FirstOrDefault(q => q.Id == questId);
        if (quest != null) quest.IsCompleted = isCompleted;
        return Task.FromResult(quest);
    }

    public static Task<Quest?> UpdateWaypointStatusAsync(string questId, string waypointId, bool isCompleted)
    {
        var quest = MockQuests.FirstOrDefault(q => q.Id == questId);
        var waypoint = quest?.Waypoints.FirstOrDefault(w => w.Id == waypointId);
        if (waypoint != null) waypoint.IsCompleted = isCompleted;
        return Task.FromResult(quest);
    }
}

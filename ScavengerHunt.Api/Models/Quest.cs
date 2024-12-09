namespace ScavengerHunt.Api.Models;

public class Quest
{
    public string Id { get; set; }
    public string Name { get; set; }
    public string Description { get; set; }
    public string Difficulty { get; set; } // "easy", "medium", "hard"
    public int EstimatedTime { get; set; } // in minutes
    public List<Waypoint> Waypoints { get; set; }
    public bool IsActive { get; set; }
    public bool IsCompleted { get; set; }
    public DateTime CreatedAt { get; set; }
}
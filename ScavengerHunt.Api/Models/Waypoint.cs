namespace ScavengerHunt.Api.Models;

public class Waypoint
{
    public string Id { get; set; }
    public string Name { get; set; }
    public string Description { get; set; }
    public LatLng Position { get; set; }
    public int Order { get; set; }
    public bool IsCompleted { get; set; }
}
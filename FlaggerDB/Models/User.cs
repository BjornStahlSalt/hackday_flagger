using System.ComponentModel.DataAnnotations;

public class Player
{
  public int Id { get; set; }
  public string? Name { get; set; }
  public int? Wins { get; set; }
  public int? GamesPlayed { get; set; }
  public GameHistory[]? DuelHistory { get; set; }
}

public class GameHistory
{
  public string? Player1 { get; set; }
  public string? Player2 { get; set; }

  [DataType(DataType.Date)]
  public DateTime PlayedAt { get; set; }
  public bool Player1Won { get; set; }
}
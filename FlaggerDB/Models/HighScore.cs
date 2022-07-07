using System.ComponentModel.DataAnnotations;

public class HighScore
{
  public int Id { get; set; }
  public string? Name { get; set; }
  public int? CorrectAnswers { get; set; }

  [DataType(DataType.Date)]
  public DateTime? PlayedAt { get; set; }
}
using System.ComponentModel.DataAnnotations;

public class HighScore
{
  public int Id { get; set; }

  [StringLength(60, MinimumLength = 3)]
  public string? Name { get; set; }
  public int? CorrectAnswers { get; set; }

  [DataType(DataType.Date)]
  public DateTime? PlayedAt { get; set; }
}
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

public class PlayerContext : DbContext
{
  public PlayerContext(DbContextOptions<PlayerContext> options)
      : base(options)
  {
  }

  public DbSet<Player>? Player { get; set; }
  public DbSet<HighScore>? HighScore { get; set; }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;

namespace FlaggerDB.Controllers;

[ApiController]
[Route("db/[controller]")]
public class HighScoresController : Controller
{
  private readonly PlayerContext _context;

  public HighScoresController(PlayerContext context)
  {
    _context = context;
  }

  [EnableCors("highscore")]
  [HttpGet]
  public async Task<IActionResult> Index()
  {
    if (_context.HighScore == null)
      return Problem("Entity set 'PlayerContext.Player'  is null.");

    var response = await _context.HighScore.ToListAsync();
    return Ok(response.Select(h => new { Name = h.Name, CorrectAnswers = h.CorrectAnswers, PlayedAt = h.PlayedAt?.ToShortDateString() }));
  }

  [EnableCors("highscore")]
  [HttpGet("{id}")]
  public async Task<ActionResult> HighScore(string id)
  {
    if (_context.HighScore == null)
      return Problem("Entity set 'PlayerContext.Player'  is null.");

    var highScores = await _context.HighScore.ToListAsync();
    var highScore = highScores.First(h => h.Id == int.Parse(id));
    return highScore != null ? Ok(highScores) : NotFound();
  }

  // POST: HighScores/Create
  // To protect from overposting attacks, enable the specific properties you want to bind to.
  // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
  [EnableCors("highscore")]
  [HttpPost]
  // [ValidateAntiForgeryToken]
  public async Task<IActionResult> Create([Bind("Id,Name,CorrectAnswers")] HighScore highscore)
  {
    highscore.PlayedAt = DateTime.Now.Date;
    if (ModelState.IsValid)
    {
      _context.Add(highscore);
      await _context.SaveChangesAsync();
    }

    return CreatedAtAction(nameof(HighScore), new { id = highscore.Id }, highscore);
  }
}

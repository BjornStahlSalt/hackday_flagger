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

  // GET: HighScores\
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

  // GET: HighScores/Create
  // [HttpGet]
  // public IActionResult Create()
  // {
  //   return View();
  // }

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
      // return RedirectToAction(nameof(Index));
    }
    // return View(player);
    return CreatedAtAction(nameof(HighScore), new { id = highscore.Id }, highscore);
  }

  // GET: Players/Delete/5
  // [HttpGet, ActionName("Delete")]
  // public async Task<IActionResult> Delete(int? id)
  // {
  //   if (id == null || _context.Player == null)
  //   {
  //     return NotFound();
  //   }

  //   var player = await _context.Player
  //       .FirstOrDefaultAsync(m => m.Id == id);
  //   if (player == null)
  //   {
  //     return NotFound();
  //   }

  //   return View(player);
  // }

  // POST: Players/Delete/5
  // [HttpPost, ActionName("Delete")]
  // [ValidateAntiForgeryToken]
  // public async Task<IActionResult> DeleteConfirmed(int id)
  // {
  //   if (_context.Player == null)
  //   {
  //     return Problem("Entity set 'PlayerContext.Player'  is null.");
  //   }
  //   var player = await _context.Player.FindAsync(id);
  //   if (player != null)
  //   {
  //     _context.Player.Remove(player);
  //   }

  //   await _context.SaveChangesAsync();
  //   return RedirectToAction(nameof(Index));
  // }

  // private bool PlayerExists(int id)
  // {
  //   return (_context.Player?.Any(e => e.Id == id)).GetValueOrDefault();
  // }
}

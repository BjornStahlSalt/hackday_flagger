using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Cors;
using FlagAPI.Models;
using FlagAPI.Data;

namespace FlagAPI.Controllers;

[ApiController]
[Route("api/[controller]")]
public class FlagsController : ControllerBase
{
  private Random _random;
  public FlagsController()
  {
    _random = new Random(DateTime.Now.Millisecond);

  }

  [EnableCors("flagger")]
  [HttpGet]
  public ActionResult<FlagResponse> RandomFlag()
  {
    var country = CountryData.Countries[_random.Next(0, CountryData.Countries.Length)];
    var response = new FlagResponse()
    {
      Name = country.Name,
      Url = $"https://countryflagsapi.com/svg/{country.Url}"
    };

    return Ok(response);
  }
}
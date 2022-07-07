using Microsoft.AspNetCore.Mvc;
using FlagAPI.Models;

namespace FlagAPI.Controllers;

[ApiController]
[Route("api/[controller]")]
public class FlagsController : ControllerBase
{
  public FlagsController()
  {

  }

  [HttpGet]
  public ActionResult<FlagResponse> Flag()
  {
    var response = new FlagResponse()
    {
      Name = "Andorra",
      Url = "https://countryflagsapi.com/svg/020"
    };

    return Ok(response);
  }
}
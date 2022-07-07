using Microsoft.AspNetCore.Mvc;
using FlagAPI.Models;
using Microsoft.AspNetCore.Cors;

namespace FlagAPI.Controllers;

[ApiController]
[Route("api/[controller]")]
public class FlagsController : ControllerBase
{
  public FlagsController()
  {

  }

  [EnableCors("flagger")]
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
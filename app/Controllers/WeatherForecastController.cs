using Microsoft.AspNetCore.Mvc;
using System;
namespace ComplimentGeneratorAPI.Controllers
{
  [ApiController]
  [Route("api/[controller]")]
  public class ComplimentController : ControllerBase
  {
    private static readonly string[] Compliments = new[]
    {
      "You're a shining star!",
      "Your smile is contagious.",
      "You're an inspiration to others.",
      "You have a heart of gold.",
      "You light up the room.",
      "You're a superhero without a cape.",
      "You bring joy wherever you go."
    };

  [HttpGet]
  public ActionResult<string> GetRandomCompliment()
  {
    Random random = new Random();
    int index = random.Next(Compliments.Length);
     return Ok(Compliments[index]);
   }
  }
}
using DataAccessLayer.Interfaces;
using Discord;
using Discord.WebSocket;
using Helpers.DiscordSuggestions;
using Helpers.RequestObjects;
using Microsoft.AspNetCore.Mvc;
using Services.YoutubeAPI;

namespace server.Controllers;

[Route("api/[controller]")]
[ApiController]
public class DiscordController : ControllerBase
{
    private readonly ulong _channelId;
    private readonly DiscordSocketClient _client = new();

    private readonly IConfiguration _config;
    private readonly IYoutuberRepository _ytRepository;
    private readonly IYoutubeService _ytService;
    private readonly string _token = "";

    public DiscordController(IConfiguration config, IYoutubeService ytService, IYoutuberRepository ytRepository)
    {
        _ytService = ytService;
        _ytRepository = ytRepository;
        _config = config;
        _token = config["Discord:BotToken"];
        _channelId = ulong.Parse(config["Discord:ChannelId"]);
    }

    [HttpPost]
    public async Task<IActionResult> Message([FromBody] DiscordMsgBodyObject requestObject)
    {
        if (string.IsNullOrWhiteSpace(requestObject.Message))
            return BadRequest(new { message = "Pasiūlymo laukas yra privalomas." });
        if (requestObject.Categories?.Count() > 5)
            return BadRequest(new { message = "Maksimalus kategorijų skaičius yra 5." });

        if (DiscordSuggestion.isURL(requestObject.Message))
        {
            var handle = DiscordSuggestion.getHandleFromUrl(requestObject.Message);
            if (!await _ytService.ChannelExists(handle))
                return NotFound(new { message = "Pasiūlytas kanalas nerastas" });
            if (await _ytRepository.ChannelExists(handle))
                return Conflict(new { message = "Pasiūlytas kanalas jau egzistuoja mūsų sąraše." });
        }
        else
        {
            if (!requestObject.Message.StartsWith('@'))
            {
                requestObject.Message = "@" + requestObject.Message.Replace(" ", "");
            }

            if (!await _ytService.ChannelExists(requestObject.Message))
            {
                return NotFound(new { message = "Pasiūlytas kanalas nerastas" });
            }

            if (await _ytRepository.ChannelExists(requestObject.Message))
            {
                return Conflict(new { message = "Pasiūlytas kanalas jau egzistuoja mūsų sąraše." });
            }
        }


        var message = DiscordSuggestion.PrepMessage(requestObject);

        await _client.LoginAsync(TokenType.Bot, _token);
        await _client.StartAsync();

        var messageChannel = await _client.GetChannelAsync(_channelId) as IMessageChannel;

        var response = await messageChannel!.SendMessageAsync(message);

        await _client.DisposeAsync();
        if (response is not null)
            return Ok(new { message = "Pasiūlymas sėkmingai pateiktas." });
        return StatusCode(StatusCodes.Status500InternalServerError);
    }
}
using DataAccessLayer.Interfaces;
using Discord;
using Discord.WebSocket;
using Google.Apis.YouTube.v3.Data;
using Helpers.DiscordSuggestions;
using Helpers.RequestObjects;
using Helpers.Strings;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;
using Services.YoutubeAPI;
using System.Reflection.Metadata;

namespace server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DiscordController : ControllerBase
    {
        private readonly IYoutubeService _ytService;
        private readonly IYoutuberRepository _ytRepository;

        private readonly IConfiguration _config;
        private readonly string _token = "";
        private readonly ulong _channelId = 0;
        private readonly DiscordSocketClient _client = new DiscordSocketClient();
        public DiscordController(IConfiguration config, IYoutubeService ytService, IYoutuberRepository ytRepository)
        {
            _ytService = ytService;
            _ytRepository = ytRepository;
            _config = config;
            _token = config["Discord:BotToken"];
            _channelId = UInt64.Parse(config["Discord:ChannelId"]);
        }

        [HttpPost]
        public async Task<IActionResult> Message([FromBody] DiscordMsgBodyObject requestObject)
        {
            if (string.IsNullOrWhiteSpace(requestObject.Message))
            {
                return BadRequest(new { message = "Pasiūlymo laukas yra privalomas." });
            }
            if (requestObject.Categories?.Count() > 5)
            {
                return BadRequest(new { message = "Maksimalus kategorijų skaičius yra 5." });
            }

            if (DiscordSuggestion.isURL(requestObject.Message))
            {
                string handle = DiscordSuggestion.getHandleFromUrl(requestObject.Message);
                if (!await _ytService.ChannelExists(handle))
                {
                    return NotFound(new { message = "Pasiūlytas kanalas nerastas" });
                }
                if (await _ytRepository.ChannelExists(handle))
                {
                    return Conflict(new { message = "Pasiūlytas kanalas jau egzistuoja mūsų sąraše." });
                }
            }
            else
            {
                if (!await _ytService.ChannelExists(requestObject.Message))
                {
                    return NotFound(new { message = "Pasiūlytas kanalas nerastas" });
                }
                if (await _ytRepository.ChannelExists(requestObject.Message))
                {
                    return Conflict(new { message = "Pasiūlytas kanalas jau egzistuoja mūsų sąraše." });
                }
            }
           

            string message = DiscordSuggestion.PrepMessage(requestObject);

            await _client.LoginAsync(TokenType.Bot, _token);
            await _client.StartAsync();

            var messageChannel = await _client.GetChannelAsync(_channelId) as IMessageChannel;

            var response = await messageChannel!.SendMessageAsync(message);

            await _client.DisposeAsync();
            if (response is not null)
            {
                return Ok(new { message = "Pasiūlymas sėkmingai pateiktas." });
            }
            else
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }

    }
}

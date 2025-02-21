﻿using Domain.Models.Youtube;
using Services.YoutubeAPI.Helpers;
using Services.YoutubeAPI.Helpers.Wrappers;
using System.Diagnostics;

namespace Services.YoutubeAPI
{
    public class YoutubeService : IYoutubeService
    {
        public async Task<YoutubeChannel?> getChannelById(string channelId)
        {
            Result<YoutubeChannel> result = await Utils.GetChannelAsync(channelId);
            if (!result)
            {
                Debug.WriteLine("Failed fetching channel: " + result.Message);
                return null;
            }
            return result.Value;
        }
        public async Task<YoutubeChannel?> getChannelByHandle(string channelHandle)
        {
            Result<string> result = await Utils.GetChannelIdFromVanity(channelHandle);

            if (!result)
            {
                Debug.WriteLine("Failed fetching handle: " + result.Message);
                return null;
            }

            Result<YoutubeChannel> channelResult = await Utils.GetChannelAsync(result.Value);

            if (!channelResult)
            {
                Debug.WriteLine("Failed fetching channel: " + channelResult.Message);
                return null;
            }

            return channelResult.Value;
        }

        public async Task<YoutubeChannel?> getChannel(string identifier)
        {
            if (identifier.Trim().StartsWith('@'))
                return await getChannelByHandle(identifier);

            return await getChannelById(identifier);
        } 
        public async Task<bool> ChannelExists(string identifier)
        {
            var channel = await getChannel(identifier);

            if (channel is not null)
            {
                return true;
            }

            return false;
        }
    }
}

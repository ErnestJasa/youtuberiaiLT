﻿using Domain.Models.Youtube;
using Newtonsoft.Json.Linq;
using Services.YoutubeAPI.Helpers.Wrappers;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.YoutubeAPI.Helpers
{
    internal class Utils
    {
        public static async Task<Result<YoutubeChannel>> GetChannelAsync(string identifier)
        {
            Result<JObject> result = await RequestWrapper.GetInstance().BrowseAsync(identifier, null, "en", "US");

            if (!result)
                Result.Err<YoutubeChannel>(result.Message);

            JObject response = result.Value;

            if (response == null)
                return Result.Err<YoutubeChannel>("Youtube returned empty response");

            string id;
            string baseUrl;
            string name;
            string description;
            string thumbnail;
            string subscribers = "0 subscribers";
            string videos = "0 videos";
            try
            {
                id = (string)response["contents"]["twoColumnBrowseResultsRenderer"]["tabs"][0]["tabRenderer"]["endpoint"]["browseEndpoint"]["browseId"];
                baseUrl = (string)response["contents"]["twoColumnBrowseResultsRenderer"]["tabs"][0]["tabRenderer"]["endpoint"]["browseEndpoint"]["canonicalBaseUrl"];
                name = (string)response["header"]["pageHeaderRenderer"]["pageTitle"];
                description = (string)response["metadata"]["channelMetadataRenderer"]["description"];
                thumbnail = (string)response["metadata"]["channelMetadataRenderer"]["avatar"]["thumbnails"][0]["url"];

                JArray metaRows = (JArray)response["header"]["pageHeaderRenderer"]["content"]["pageHeaderViewModel"]["metadata"]["contentMetadataViewModel"]["metadataRows"];
                               
                if (metaRows != null && metaRows.Count > 0)
                {
                    var lastRow = metaRows.Last as JObject;
                    if (lastRow != null && lastRow["metadataParts"] is JArray metadataParts)
                    {
                        subscribers = (string)metadataParts.ElementAtOrDefault(0)?["text"]?["content"];
                        videos = (string)metadataParts.ElementAtOrDefault(1)?["text"]?["content"] ?? "0 videos";
                    }
                }         
            }
            catch (NullReferenceException)
            {
                return Result.Err<YoutubeChannel>("Youtube response format invalid");
            }

            Result<ulong> videoParseResult = ParseVideos(videos);
            Result<ulong> subscribersParseResult = ParseSubscribers(subscribers);

            if (!videoParseResult || !subscribersParseResult)
            {
                return Result.Err<YoutubeChannel>(videoParseResult.Message).Append(subscribersParseResult.Message);
            }

            YoutubeChannel channel = new YoutubeChannel() { CustomUrl = baseUrl, Description = description, Id = id, Title = name, Thumbnail = thumbnail, VideoCount = videoParseResult.Value, SubscriberCount = subscribersParseResult.Value };

            return Result.Ok(channel);
        }
        public static Result<ulong> ParseSubscribers(string textSubs)
        {
            textSubs = textSubs.Split(' ')[0];
            char subIdentifier = textSubs[textSubs.Length - 1];
            ulong mult = 1;
            switch (subIdentifier)
            {
                case 'M':
                    mult = 1000000;
                    textSubs = textSubs.Substring(0, textSubs.Length - 1);
                    break;
                case 'K':
                    mult = 1000;
                    textSubs = textSubs.Substring(0, textSubs.Length - 1);
                    break;
            }

            double subscriberCount;

            if (!double.TryParse(textSubs, CultureInfo.InvariantCulture, out subscriberCount))
            {
                return Result.Err<ulong>("Subscriber text line format invalid");
            }

            subscriberCount *= mult;
            return Result.Ok((ulong)subscriberCount);
        }
        public static Result<ulong> ParseVideos(string textVideos)
        {
            textVideos = textVideos.Split(' ')[0].Replace(",", string.Empty);
            char videosIdentifier = textVideos[textVideos.Length - 1];
            ulong mult = 1;
            switch (videosIdentifier)
            {
                case 'M':
                    mult = 1000000;
                    textVideos = textVideos.Substring(0, textVideos.Length - 1);
                    break;
                case 'K':
                    mult = 1000;
                    textVideos = textVideos.Substring(0, textVideos.Length - 1);
                    break;
            }

            double videosCount;
            if (!double.TryParse(textVideos, CultureInfo.InvariantCulture, out videosCount))
            {
                return Result.Err<ulong>("Video text line format invalid");
            }
            videosCount *= mult;
            return Result.Ok((ulong)videosCount);
        }
        public static async Task<Result<string>> GetChannelIdFromVanity(string vanity)
        {
            if (!vanity.StartsWith('@'))
                return Result.Err<string>("Wrong vanity string format");

            Result<string> result = await RequestWrapper.GetInstance().GetChannelIdFromVanity(vanity);

            return result;
        }
    }
}

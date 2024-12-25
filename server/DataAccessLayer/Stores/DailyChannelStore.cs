using Domain.Models.Youtube;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccessLayer.Stores
{
    public class DailyChannelStore
    {
        private object _lock = new object();
        public YoutubeChannel TodaysChannel { get; private set; } = new();
        public YoutubeChannel YesterdaysChannel { get; private set; } = new();

        public void SetSelectedChannel(YoutubeChannel selectedChannel)
        {
            lock (_lock)
            {
                YesterdaysChannel = TodaysChannel;
                TodaysChannel = selectedChannel;
            }
        }

        public void UpdateTodaysChannel(YoutubeChannel updatedChannel)
        {
            TodaysChannel.Title = updatedChannel.Title;
            TodaysChannel.Description = updatedChannel.CustomUrl;
            TodaysChannel.Description = updatedChannel.Description;
            TodaysChannel.Thumbnail = updatedChannel.Thumbnail;
            TodaysChannel.SubscriberCount = updatedChannel.SubscriberCount;
            TodaysChannel.VideoCount = updatedChannel.VideoCount;
            TodaysChannel.UpdateDate();
        }
    }
}
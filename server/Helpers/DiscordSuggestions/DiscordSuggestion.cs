using Helpers.RequestObjects;

namespace Helpers.DiscordSuggestions
{
    public class DiscordSuggestion
    {
        public static string PrepMessage(DiscordMsgBodyObject suggestion)
        {
            string categoriesString = "";
            if (suggestion.Categories is not null && suggestion.Categories.Count() != 0)
            {
                categoriesString = "\ntags: " + stringifyCategories(suggestion.Categories); ;
            }
            else
            {
                categoriesString = "No tags provided.";
            }

            string suggestionString = "pasiūlymas:   " + suggestion.Message;

            string completeMessage =
                suggestionString
                + "\n--------------------------"
                + categoriesString
                + "----------------------------";

            return completeMessage;
        }

        public static bool isURL(string url)
        {
            if (url.Trim().StartsWith("http") || url.Trim().Contains("youtu.be") || url.Trim().Contains("youtube.com"))
            {
               return true;
            }
            return false;
        }
        public static string getHandleFromUrl(string url)
        {
            if (url.StartsWith("http"))
            {
                Uri uri = new Uri(url);
                url = uri.Host + uri.PathAndQuery;
            }
            var splitURL = url.Split('/');
            var handle = splitURL[1];
            if (splitURL[1] == "c" || splitURL[1] == "channel")
            {
                handle = splitURL[2];
            }
            return handle;
        }

        private static string stringifyCategories(List<string> categories)
        {
            string stringyCategories = "";
            int index = 1;
            foreach (var category in categories)
            {
                if (index == 1)
                {
                    stringyCategories = stringyCategories + "       " + category + "\n";
                }
                else
                {
                    stringyCategories = stringyCategories + "                  " + category + "\n";
                }
                index++;
            }
            return stringyCategories;
        }
    }
}

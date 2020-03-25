namespace Domain
{
    public class Photo
    {
        public string Id { get; set; }

        public string Url { get; set; }

        public bool IsMain { get; set; }

        public string UserId { get; set; }
        public ReactivityUser User { get; set; }
    }
}
namespace Domain
{
    public class UserFollower
    {
        public string ObserverId { get; set; }
        public ReactivityUser Observer { get; set; }

        public string TargetId { get; set; }
        public ReactivityUser Target { get; set; }
    }
}
namespace Application.Common.DTOs.Auth
{
    public class FacebookUserInfo
    {
        public string Id { get; set; }

        public string Name { get; set; }

        public string Email { get; set; }

        public FacebookPictureInfo Picture { get; set; }
    }
}
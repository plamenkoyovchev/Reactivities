using System;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using Application.Common.DTOs.Auth;
using Application.Common.Interfaces;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;

namespace Infrastructure.Security
{
    public class FacebookAccessor : IFacebookAccessor
    {
        private readonly HttpClient httpClient;
        private readonly IOptions<FacebookAppSettings> fbConfig;
        public FacebookAccessor(IOptions<FacebookAppSettings> fbConfig)
        {
            this.fbConfig = fbConfig;
            this.httpClient = new HttpClient()
            {
                BaseAddress = new Uri("https://graph.facebook.com/")
            };
            this.httpClient
                .DefaultRequestHeaders
                .Accept
                .Add(new MediaTypeWithQualityHeaderValue("application/json"));
        }

        public async Task<FacebookUserInfo> FacebookLogin(string accessToken)
        {
            var verifyToken = await this.httpClient
                .GetAsync($"debug_token?input_token={accessToken}&accessToken={fbConfig.Value.AppId}|{fbConfig.Value.AppSecret}");
            if (!verifyToken.IsSuccessStatusCode)
            {
                return null;
            }

            return await GetAsync<FacebookUserInfo>(accessToken, "me", "fields=name,email,picture.width(100).height(100)");
        }

        private async Task<T> GetAsync<T>(string accessToken, string endpoint, string fields)
        {
            var response = await this.httpClient.GetAsync($"{endpoint}?access_token={accessToken}&{fields}");
            if (!response.IsSuccessStatusCode)
            {
                return default;
            }

            var result = await response.Content.ReadAsStringAsync();
            return JsonConvert.DeserializeObject<T>(result);
        }
    }
}
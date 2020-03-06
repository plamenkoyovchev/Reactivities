using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Application.Common.Interfaces;
using Domain;
using Microsoft.IdentityModel.Tokens;

namespace Infrastructure.Security
{
    public class JwtGenerator : IJwtGenerator
    {
        public string CreateToken(ReactivityUser user)
        {
            var claims = new List<Claim>()
            {
                new Claim(JwtRegisteredClaimNames.NameId, user.UserName)
            };

            var signingCredentials = CreateSigningCredentials();
            var tokenDescriptor = CreateTokenDescriptor(claims, signingCredentials);
            var token = GenerateToken(tokenDescriptor);

            return token;
        }

        private string GenerateToken(SecurityTokenDescriptor tokenDescriptor)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(tokenDescriptor);

            return tokenHandler.WriteToken(token);
        }

        private SigningCredentials CreateSigningCredentials()
        {
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("should be secret"));
            var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            return credentials;
        }

        private SecurityTokenDescriptor CreateTokenDescriptor(IEnumerable<Claim> claims, SigningCredentials credentials)
        {
            return new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.UtcNow.AddDays(1),
                SigningCredentials = credentials
            };
        }
    }
}
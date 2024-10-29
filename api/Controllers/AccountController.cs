﻿using api.Data;
using api.Interfaces;
using api.Models;
using api.Models.DTO;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography;
using System.Text;

namespace api.Controllers
{
    public class AccountController(DataContext context, ITokenService tokenService, IMapper mapper) : BaseApiController
    {
        [HttpPost("register")]
        public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto)
        {
            if (await UserExists(registerDto.UserName)) return BadRequest("Username is taken");

            using var hmac = new HMACSHA512();

            var user = mapper.Map<AppUser>(registerDto);

            user.UserName = registerDto.UserName.ToLower();
            user.PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(registerDto.Password));
            user.PasswordSalt = hmac.Key;

            context.Users.Add(user);

            await context.SaveChangesAsync();

            return Ok(new UserDto
            {
                Username = user.UserName,
                Token = tokenService.CreateToken(user),
                Gender = user.Gender,
                KnownAs = user.KnownAs
            });
        }

        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
        {
            var user = await context.Users.Include(u => u.Photos).FirstOrDefaultAsync(x => x.UserName == loginDto.Username.ToLower());

            if (user == null) return Unauthorized("Invalid login");

            using var hmac = new HMACSHA512(user.PasswordSalt);

            var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(loginDto.Password));

            for (int i = 0; i < computedHash.Length; i++)
            {
                if (computedHash[i] != user.PasswordHash[i]) return Unauthorized("Invalid password");
            }

            return Ok(new UserDto
            {
                Username = user.UserName,
                KnownAs = user.KnownAs,
                Gender = user.Gender,
                Token = tokenService.CreateToken(user),
                PhotoUrl = user.Photos.FirstOrDefault(photo => photo.IsMain)?.Url
            });
        }


        private async Task<bool> UserExists(string username)
        {
            return await context.Users.AnyAsync(x => x.UserName.ToLower() == username.ToLower());
        }
    }
}

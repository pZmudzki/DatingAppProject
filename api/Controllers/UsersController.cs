using api.Data;
using api.Extensions;
using api.Interfaces;
using api.Models;
using api.Models.DTO;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Reflection.Metadata.Ecma335;
using System.Security.Claims;

namespace api.Controllers
{
    [Authorize]
    public class UsersController(IUserRepository userRepository, IMapper mapper, IPhotoService photoService) : BaseApiController
    {
        [HttpGet]
        public async Task<ActionResult<IEnumerable<MemberDto>>> GetUsers()
        {
            var users = await userRepository.GetMembersAsync();

            return Ok(users);
        }

        [HttpGet("{username}")]
        public async Task<ActionResult<MemberDto>> GetUser(string username)
        {
            var user = await userRepository.GetMemberByUsernameAsync(username);

            if (user == null) return NotFound();

            return Ok(user);
        }

        [HttpPut]
        public async Task<ActionResult> UpdateUser(MemberUpdateDto memberUpdateDto)
        {
            

            var user = await userRepository.GetUserByUsernameAsync(User.GetUsername());

            if (user == null) return BadRequest("Could not find user");

            mapper.Map(memberUpdateDto, user);

            if(await userRepository.SaveAllAsync()) return NoContent();

            return BadRequest("Failed to update user");
        }

        [HttpPost("add-photo")]
        public async Task<ActionResult<PhotoDto>> AddPhoto(IFormFile file)
        {
            var user = await userRepository.GetUserByUsernameAsync(User.GetUsername());

            if (user == null) return BadRequest("Cannot update user");

            var result = await photoService.AddPhotoAsync(file);

            if(result.Error != null) return BadRequest(result.Error.Message);

            var photo = new Photo
            {
                Url = result.SecureUrl.AbsoluteUri,
                PublicId = result.PublicId,
            };

            user.Photos.Add(photo);

            if (await userRepository.SaveAllAsync()) 
                return CreatedAtAction(nameof(GetUser), new { username = user.UserName}, mapper.Map<PhotoDto>(photo))/*mapper.Map<PhotoDto>(photo)*/;

            return BadRequest("Cannot upload photo");
        }
    }
}

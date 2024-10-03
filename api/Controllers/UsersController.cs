using api.Data;
using api.Interfaces;
using api.Models;
using api.Models.DTO;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace api.Controllers
{
    [Authorize]
    public class UsersController(IUserRepository userRepository, IMapper mapper) : BaseApiController
    {
        [HttpGet]
        public async Task<ActionResult<IEnumerable<MemberDto>>> GetUsers()
        {
            var users = await userRepository.GetUsersAsync();

            var mappedUsers = mapper.Map<IEnumerable<MemberDto>>(users);

            return Ok(mappedUsers);
        }

        [HttpGet("{username}")]
        public async Task<ActionResult<MemberDto>> GetUser(string username)
        {
            var user = await userRepository.GetUserByUsernameAsync(username);

            var mappedUser = mapper.Map<MemberDto>(user);
            
            if(mappedUser == null) return NotFound();

            return Ok(mappedUser);
        }
    }
}

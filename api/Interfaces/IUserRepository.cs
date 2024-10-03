﻿using api.Models;

namespace api.Interfaces
{
    public interface IUserRepository
    {
        void Update(AppUser user);
        Task<bool> SaveAllAsync();
        Task<IEnumerable<AppUser>> GetUsersAsync();
        Task<AppUser?> GetUserAsync(int id);

        Task<AppUser?> GetUserByUsernameAsync(string username);

    }
}
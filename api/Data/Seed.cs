﻿using api.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.Text.Json;

namespace api.Data
{
    public static class Seed
    {
        public static async Task SeedUsers(UserManager<AppUser> userManager)
        {
            if (await userManager.Users.AnyAsync()) return;

            var userData = await File.ReadAllTextAsync("Data/UserSeedData.json");

            var options = new JsonSerializerOptions { PropertyNameCaseInsensitive = true };

            var users = JsonSerializer.Deserialize<List<AppUser>>(userData, options);

            if (users == null) return;

            foreach (var user in users)
            {
                await userManager.CreateAsync(user, "Pa$$word");
            }
        }
    }
}

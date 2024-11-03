using api.Extensions;
using api.Interfaces;
using Microsoft.AspNetCore.Mvc.Filters;

namespace api.Helpers
{
    public class LogUserActivity : IAsyncActionFilter
    {
        public async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
        { 
            var resultContext = await next();

            if (context.HttpContext.User.Identity?.IsAuthenticated != true) return;
            
            var username = resultContext.HttpContext.User.GetUsername();

            var repo = resultContext.HttpContext.RequestServices.GetRequiredService<IUserRepository>();
            var user = await repo.GetUserByUsernameAsync(username);
            if (user == null) return;

            user.LastActive = DateTime.UtcNow;
            await repo.SaveAllAsync();
        }
    }
}

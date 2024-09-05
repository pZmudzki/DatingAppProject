using api.Models;

namespace api.Interfaces
{
    public interface ITokenService
    {
        string CreareToken(AppUser user);
    }
}

using api.Models;
using api.Models.DTO;

namespace api.Interfaces
{
    public interface ILikesRepository
    {
        Task<UserLike?> GetUserLike(int sourceUserId, int targetUserId);
        Task<IEnumerable<MemberDto>> GetUserLikes(string predicate, int userId);
        Task<IEnumerable<int>> GetCurrentUserLikeIds(int currentUserId);
        void DeleteLike(UserLike like);
        void AddLike(UserLike like);

        Task<bool> SaveChanges();
    }
}

using System.ComponentModel.DataAnnotations;

namespace api.Models.DTO
{
    public class RegisterDto
    {
        [Required]
        public string UserName { get; set; } = string.Empty;

        [Required]
        public string? KnownAs { get; set; }

        [Required]
        public string? Gender { get; set; }

        [Required]
        public DateOnly? DateOfBirth { get; set; }

        [Required]
        public string? City { get; set; }

        [Required]
        public string? Country { get; set; }

        [Required]
        [StringLength(16, MinimumLength = 8)]
        public string Password { get; set; } = string.Empty;

    }
}

﻿namespace api.Models.DTO
{
    public class CreateMessageDto
    {
        public required string RecipientUsername { get; set; }
        public required string Content { get; set; }
    }
}

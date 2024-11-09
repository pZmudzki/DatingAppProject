﻿namespace api.Helpers
{
    public class PaginationParams
    {
        private const int MaxPageSize = 100;

        public int PageNumber { get; set; } = 1;

        public int _pageSize = 10;

        public int PageSize
        {
            get => _pageSize;
            set => _pageSize = (value > MaxPageSize) ? MaxPageSize : value;
        }
    }
}
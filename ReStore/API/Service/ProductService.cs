using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Service
{
    public class ProductService
    {
        private readonly StoreContext _context;
        public ProductService(StoreContext context)
        {
            _context = context;

        }
        public async Task<List<Product>> GetAllProducts()
        {
            return await _context.Products.ToListAsync();
        }
    }
}
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using API.Data;
using API.Entities;
using API.Extensions;
using API.RequestHelper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{

    public class ProductsController : BaseApiController
    {

        private readonly StoreContext _context;

        public ProductsController(StoreContext context)
        {
            this._context = context;


        }

        [HttpGet]
        public async Task<ActionResult<List<Product>>> GetProducts([FromQuery]ProductParams productParams)
        {
            var query = _context.Products
            .Sort(productParams.OrderBy)
            .Search(productParams.searchTerm)
            .Filter(productParams.Brands, productParams.Types)
            .AsQueryable();
        var products = await PagedList<Product>.ToPagedList(query,productParams.PageNumber,productParams.PageSize);

        // Response.Headers.Add("Pageination", JsonSerializer.Serialize(products.MetaData));
        Response.AddPaginationHeader(products.MetaData);

        return products;


        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Product>> GetProduct(int id)
        {
            var Product = await _context.Products.FindAsync(id);
            if (Product == null) return NotFound();
            return Product;
        }

        [HttpGet("filters")]
        public async Task<IActionResult> GetFilters(){
            var brands=await _context.Products.Select(p=>p.Brand).Distinct().ToListAsync();
            var types=await _context.Products.Select(p=>p.Type).Distinct().ToListAsync();

            return Ok(new {brands,types});
        }
    }
}
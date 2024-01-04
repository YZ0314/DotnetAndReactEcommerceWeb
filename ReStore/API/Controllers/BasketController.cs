using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.Dto;
using API.Entities;
using API.Extensions;
using API.Service;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{

    public class BasketController : BaseApiController
    {
        private readonly StoreContext _context;
        private readonly ProductService _productService;
        public BasketController(StoreContext context, ProductService productService)
        {
            _productService = productService;
            _context = context;

        }

        [HttpGet(Name = "GetBasket")]
        public async Task<ActionResult<BasketDto>> GetBasket()
        {
            var basket = await RetrieveBasketAsync(GetBuyerId());
            return basket.MapBasketToDto();
        }


        [HttpPost]
        public async Task<ActionResult<BasketDto>> AddItemToBasket(int productId, int quantity)
        {
            //get current basket
            var thisBasket = await RetrieveBasketAsync(GetBuyerId());
            Basket basket;
            basket = thisBasket;

            if (thisBasket == null)
            {
                basket = this.CreateBasket();
            }



            //get the product
            var products = await _productService.GetAllProducts();
            var foundProduct = products.FirstOrDefault(p => p.Id == productId);
            if (foundProduct == null)
            {
                return BadRequest(new ProblemDetails { Title = "Product Not Found" });
            }
            //add Item
            basket.AddItem(foundProduct, quantity);

            //save changes
            var result = await _context.SaveChangesAsync() > 0;
            if (result) return CreatedAtRoute("GetBasket", basket.MapBasketToDto());
            return BadRequest(new ProblemDetails { Title = "Problem saving item to basket" });
        }

        [HttpDelete]
        public async Task<ActionResult> RemoveBasketItem(int productId, int quantity)
        {

            var basket = await RetrieveBasketAsync(GetBuyerId());
            if (basket == null) return NotFound();
            basket.RemoveItem(productId, quantity);
            var result = await _context.SaveChangesAsync() > 0;
            if (result) return Ok();
            return BadRequest(new ProblemDetails { Title = "Problem removing item from basket" });
        }

        /// <summary>
        /// Create a new shopping basket.
        /// </summary>
        /// <remarks>
        /// This method first attempts to obtain the buyerId from the current user's identity. If not found (i.e. the user is not logged in or has no identity), it will generate a new GUID as the buyerId and store it in a cookie for 30 days.
        /// Then create a new Basket instance using the buyerId and add it to the context's Baskets collection.
        /// </remarks>
        /// <returns>Returns a new Basket instance containing the current user's buyerId.</returns>
        private Basket CreateBasket()
        {
            var buyerId = User.Identity?.Name;
            if (string.IsNullOrEmpty(buyerId))
            {
                buyerId = Guid.NewGuid().ToString();
                var cookieOptions = new CookieOptions { IsEssential = true, Expires = DateTime.Now.AddDays(30) };
                Response.Cookies.Append("buyerId", buyerId, cookieOptions);
            }

            var basket = new Basket { BuyerId = buyerId };
            _context.Baskets.Add(basket);
            return basket;
        }

        private async Task<Basket> RetrieveBasketAsync(string buyerId)
        {
            if (string.IsNullOrEmpty(buyerId))
            {
                Response.Cookies.Delete("buyerId");
                return null;
            }
            var basket = await _context.Baskets
            .Include(i => i.Items)
            .ThenInclude(p => p.Product)
            .FirstOrDefaultAsync(x => x.BuyerId == buyerId);
            return basket;
        }
        /// <summary>
        /// Get the user's BuyerId.
        /// </summary>
        /// <returns>Retrun a buyer Id from cookies if the user do not loged in </returns>
        private string GetBuyerId()
        {
            return User.Identity?.Name ?? Request.Cookies["buyerId"];
        }



    }
}
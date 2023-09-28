using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Entities
{
    public class Basket
    {
        public int Id { get; set; }
        public string BuyerId { get; set; }
        public List<BasketItem> Items { get; set; } = new List<BasketItem>();

        public void AddItem(Product product, int quantity)
        {
            if (Items.All(item => item.ProductId != product.Id))
            {
                Items.Add(new BasketItem { ProductId = product.Id, Quantity = quantity });
            }
            var existingItem = Items.FirstOrDefault(Item => Item.ProductId == product.Id);
            if (existingItem != null) existingItem.Quantity += quantity;
        }

        public void RemoveItem(int productId, int quantity)
        {
            var targetItem = Items.FirstOrDefault(Item => Item.ProductId == productId);
            if (targetItem != null)
            {
                if (targetItem.Quantity > quantity)
                {
                    targetItem.Quantity -= quantity;
                }
                else if (targetItem.Quantity <= quantity)
                {
                    targetItem.Quantity = 0;
                    Items.Remove(targetItem);
                }
            }
        }


    }

}
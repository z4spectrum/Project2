// Handle the "Buy Now" button click
document.querySelectorAll('.buy-now').forEach(button => {
    button.addEventListener('click', function(event) {
        // Get product details
        const product = {
            id: this.getAttribute('data-product-id'),
            name: this.getAttribute('data-product-name'),
            price: this.getAttribute('data-product-price')
        };

        // Retrieve cart from sessionStorage (or create an empty array if not found)
        let cart = JSON.parse(sessionStorage.getItem('cart')) || [];

        // Add the new product to the cart
        cart.push(product);

        // Save the updated cart to sessionStorage
        sessionStorage.setItem('cart', JSON.stringify(cart));
    });
});
    // Ensure "Go to Cart" button navigates to the cart page
    if (goToCartButton) {
        goToCartButton.addEventListener("click", function (event) {
            event.preventDefault();
            window.location.href = "cart.html"; // Navigate to cart page
        });
    }


    // Display Cart Items on cart.html
    // Retrieve the cart from sessionStorage
// Retrieve the cart from sessionStorage
let cart = JSON.parse(sessionStorage.getItem('cart')) || [];

const cartContainer = document.getElementById('cart-items');

// Check if the cart has items
if (cart.length === 0) {
    cartContainer.innerHTML = "<p>Your cart is empty.</p>";
} else {
    // Loop through cart items and display them
    cart.forEach(product => {
        const productElement = document.createElement('div');
        productElement.classList.add('cart-item');
        productElement.innerHTML = `
            <div>
                <h3>${product.name}</h3>
                <p>₹${product.price}</p>
            </div>
            <button class="remove-item" data-product-id="${product.id}">Remove</button>
        `;
        cartContainer.appendChild(productElement);
    });
}

// Handle the removal of items from the cart
document.querySelectorAll('.remove-item').forEach(button => {
    button.addEventListener('click', function() {
        const productId = this.getAttribute('data-product-id');
        
        // Filter out the product that was clicked for removal
        cart = cart.filter(product => product.id !== productId);

        // Update sessionStorage with the new cart
        sessionStorage.setItem('cart', JSON.stringify(cart));

        // Reload the cart page to reflect changes
        location.reload();
    });
});
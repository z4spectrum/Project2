document.addEventListener("DOMContentLoaded", function () {
    let cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    let cartContainer = document.getElementById("cart-items");

    function displayCart() {
        cartContainer.innerHTML = "";
        if (cartItems.length === 0) {
            cartContainer.innerHTML = "<p>Your cart is empty.</p>";
        } else {
            cartItems.forEach((item, index) => {
                let itemDiv = document.createElement("div");
                itemDiv.classList.add("cart-item");
                itemDiv.innerHTML = `
                    <img src="${item.image}" alt="${item.name}" class="cart-image">
                    <h3>${item.name}</h3>
                    <p>₹${item.price}</p>
                    <button class="remove-btn" data-index="${index}">Remove</button>
                `;
                cartContainer.appendChild(itemDiv);
            });

            document.querySelectorAll(".remove-btn").forEach(button => {
                button.addEventListener("click", function () {
                    let index = this.getAttribute("data-index");
                    cartItems.splice(index, 1);
                    localStorage.setItem("cart", JSON.stringify(cartItems));
                    displayCart();
                });
            });
        }
    }

    displayCart();

    document.getElementById("checkout-button").addEventListener("click", function () {
        window.location.href = "checkout.html";
    });
});
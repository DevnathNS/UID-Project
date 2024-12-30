// Cart functionality
let cart = JSON.parse(localStorage.getItem('cart')) || [];

function displayCart() {
    const cartContainer = document.getElementById('cart-items');
    const totalElement = document.getElementById('total-amount');
    let total = 0;

    if (cart.length === 0) {
        cartContainer.innerHTML = `
            <div class="empty-cart text-white">
                <h3>Your cart is empty</h3>
                <p>Go to the store to add items to your cart</p>
                <button onclick="location.href='store.html'" class="btn btn-warning mt-3">
                    Continue Shopping
                </button>
            </div>
        `;
        totalElement.textContent = '0';
        return;
    }

    cartContainer.innerHTML = cart.map((item, index) => {
        total += item.price;
        return `
            <div class="cart-item text-white d-flex align-items-center justify-content-between">
                <div class="d-flex align-items-center">
                    <img src="${item.image}" alt="${item.name}" class="me-3">
                    <div>
                        <h4>${item.name}</h4>
                        <p>Rs. ${item.price}</p>
                    </div>
                </div>
                <button onclick="removeFromCart(${index})" class="remove-btn">
                    Remove
                </button>
            </div>
        `;
    }).join('');

    totalElement.textContent = total;
}

function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCart();
}

// Add to cart function (to be called from store.html)
function addToCart(name, price, image) {
    cart.push({ name, price, image });
    localStorage.setItem('cart', JSON.stringify(cart));
    alert('Item added to cart!');
}

// Display cart when page loads
document.addEventListener('DOMContentLoaded', displayCart);
document.addEventListener('DOMContentLoaded', () => {
    const cartItems = document.querySelectorAll('.cart-item');
    const totalPriceElement = document.getElementById('total-price');

    const updateTotalPrice = () => {
        let total = 0;
        cartItems.forEach(item => {
            const quantity = parseInt(item.querySelector('.quantity').innerText);
            const price = parseFloat(item.querySelector('.item-price').innerText.replace('$', ''));
            const itemTotal = quantity * price;
            item.querySelector('.item-total').innerText = `$${itemTotal.toFixed(2)}`;
            total += itemTotal;
        });
        totalPriceElement.innerText = `$${total.toFixed(2)}`;
    };

    cartItems.forEach(item => {
        const quantityElement = item.querySelector('.quantity');
        const minusButton = item.querySelector('.minus');
        const plusButton = item.querySelector('.plus');
        const deleteButton = item.querySelector('.delete');
        const likeButton = item.querySelector('.like');

        plusButton.addEventListener('click', () => {
            quantityElement.innerText = parseInt(quantityElement.innerText) + 1;
            updateTotalPrice();
        });

        minusButton.addEventListener('click', () => {
            const currentQuantity = parseInt(quantityElement.innerText);
            if (currentQuantity > 1) {
                quantityElement.innerText = currentQuantity - 1;
                updateTotalPrice();
            }
        });

        deleteButton.addEventListener('click', (e) => {
            e.preventDefault();
            item.remove();
            updateTotalPrice();
        });

        likeButton.addEventListener('click', () => {
            likeButton.classList.toggle('text-red-500');
            likeButton.classList.toggle('text-gray-600');
        });
    });

    updateTotalPrice();
});

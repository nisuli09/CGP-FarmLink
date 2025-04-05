// Stock control functionality
const decreaseButton = document.getElementById('decrease');
const increaseButton = document.getElementById('increase');
const stockCount = document.getElementById('stock-count');

// Initial stock value
let stock = 2;

// Update stock count
function updateStock() {
    stockCount.textContent = stock < 10 ? `0${stock}` : stock;
}

// Decrease stock
decreaseButton.addEventListener('click', () => {
    if (stock > 1) {
        stock--;
        updateStock();
    }
});

// Increase stock
increaseButton.addEventListener('click', () => {
    stock++;
    updateStock();
});

// Image upload functionality
const imageUpload = document.getElementById('imageUpload');
const uploadBox = document.querySelector('.upload-box');
const plusButton = document.querySelector('.plus-button');

// Remove old image before adding a new one
function clearPreviousImage() {
    const existingImage = uploadBox.querySelector('img');
    if (existingImage) {
        existingImage.remove();
    }
}



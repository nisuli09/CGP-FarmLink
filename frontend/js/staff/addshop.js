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

// Handle image upload
imageUpload.addEventListener('change', function(event) {
    const file = event.target.files[0];
    
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            clearPreviousImage(); // Remove old image preview

            // Hide camera icon
            plusButton.style.display = 'none';

            // Create image element
            const imgPreview = document.createElement('img');
            imgPreview.src = e.target.result;
            imgPreview.alt = file.name;

            // Ensure the image fills the upload box
            imgPreview.style.width = '100%';
            imgPreview.style.height = '100%';
            imgPreview.style.objectFit = 'cover';
            imgPreview.style.borderRadius = '20px';
            imgPreview.style.position = 'absolute';
            imgPreview.style.top = '0';
            imgPreview.style.left = '0';

            uploadBox.appendChild(imgPreview);
        };
        reader.readAsDataURL(file);
    }
});

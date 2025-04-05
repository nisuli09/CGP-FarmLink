// 1. Toggle active class on navigation links
const navLinks = document.querySelectorAll('nav a');
navLinks.forEach(link => {
    link.addEventListener('click', function () {
        navLinks.forEach(link => link.classList.remove('active'));
        this.classList.add('active');
    });
});

// 2. Add new fertilizer card dynamically
const addButton = document.querySelector('.add-button');
const cardContainer = document.querySelector('.card-container');

addButton.addEventListener('click', function () {
    const card = document.createElement('div');
    card.classList.add('card');
    card.innerHTML = `
        <div class="card-header">
            <span class="id-no">ID: 123</span>
            <span class="description">New Fertilizer</span>
        </div>
        <img src="https://via.placeholder.com/250" alt="Fertilizer Image">
        <div class="card-content">
            <div class="stock-info">
                <div class="stock">In Stock: 50</div>
                <div class="rating">⭐ 4.5</div>
            </div>
            <div class="price">$25.00</div>
        </div>
        <div class="buttons">
            <button class="edit">Edit</button>
            <button class="delete">Delete</button>
        </div>
    `;
    
    // Append the new card to the card container
    cardContainer.appendChild(card);

    // Add event listeners for edit and delete buttons of the new card
    const editButton = card.querySelector('.edit');
    const deleteButton = card.querySelector('.delete');
    
    editButton.addEventListener('click', function () {
        alert('Edit Fertilizer: ID 123');
        // You can add your logic to edit the fertilizer here
    });

    deleteButton.addEventListener('click', function () {
        if (confirm('Are you sure you want to delete this fertilizer?')) {
            card.remove();
        }
    });
});

// 3. Edit and Delete buttons functionality
// (Already integrated inside the Add Button functionality, but can be expanded further)

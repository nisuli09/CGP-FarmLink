document.addEventListener("DOMContentLoaded", function () {
    const addButton = document.querySelector(".add-button");
    const cardContainer = document.querySelector(".card-container");

    // Sample data for new item creation
    let itemCount = document.querySelectorAll(".card").length;

    // Function to create a new card
    function createCard(id, imageUrl, title, description, price, stock, rating) {
        const card = document.createElement("div");
        card.classList.add("card");

        card.innerHTML = `
            <img src="${imageUrl}" alt="${title}">
            <div class="card-header">
                <span class="id-no">ID: ${id}</span>
            </div>
            <div class="card-content">
                <h3>${title}</h3>
                <p class="description">${description}</p>
                <span class="price">$${price}</span>
                <div class="stock-info">
                    <span class="stock">Stock: ${stock}</span>
                    <span class="rating">⭐ ${rating}/5</span>
                </div>
                <div class="buttons">
                    <button class="edit">Edit</button>
                    <button class="delete">Delete</button>
                </div>
            </div>
        `;

        // Add event listeners for buttons
        card.querySelector(".edit").addEventListener("click", () => editCard(card));
        card.querySelector(".delete").addEventListener("click", () => deleteCard(card));

        return card;
    }

    // Function to handle adding new items
    addButton.addEventListener("click", function () {
        itemCount++;
        const newCard = createCard(
            `FERT-${itemCount}`,
            "https://via.placeholder.com/250", // Placeholder image
            "New Fertilizer",
            "A high-quality fertilizer for better crop yield.",
            "25.99",
            "100",
            "4.5"
        );
        cardContainer.appendChild(newCard);
    });

    // Function to edit an item
    function editCard(card) {
        const title = card.querySelector("h3");
        const description = card.querySelector(".description");
        const price = card.querySelector(".price");
        const stock = card.querySelector(".stock");

        const newTitle = prompt("Enter new title:", title.innerText);
        const newDescription = prompt("Enter new description:", description.innerText);
        const newPrice = prompt("Enter new price:", price.innerText.replace("$", ""));
        const newStock = prompt("Enter new stock:", stock.innerText.replace("Stock: ", ""));

        if (newTitle) title.innerText = newTitle;
        if (newDescription) description.innerText = newDescription;
        if (newPrice) price.innerText = `$${newPrice}`;
        if (newStock) stock.innerText = `Stock: ${newStock}`;
    }

    // Function to delete an item
    function deleteCard(card) {
        if (confirm("Are you sure you want to delete this item?")) {
            card.remove();
        }
    }
});

document.addEventListener('DOMContentLoaded', function () {
    const buyersData = [
        { id: "B001", name: "Alice Green", contact: "123-456-7890", mail: "alice@example.com", itemId: "I001", productName: "Rice", price: 10, totalAmount: 100 },
        { id: "B002", name: "Bob White", contact: "987-654-3210", mail: "bob@example.com", itemId: "I002", productName: "Wheat", price: 8, totalAmount: 80 },
        { id: "B003", name: "Charlie Black", contact: "555-123-4567", mail: "charlie@example.com", itemId: "I003", productName: "Corn", price: 12, totalAmount: 120 },
        // Add more data as needed
    ];

    const buyerTableBody = document.getElementById('farmerTableBody');

    function displayData() {
        buyerTableBody.innerHTML = "";
        buyersData.forEach((data) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${data.id}</td>
                <td>${data.name}</td>
                <td>${data.contact}</td>
                <td>${data.mail}</td>
                <td>${data.itemId}</td>
                <td>${data.productName}</td>
                <td>${data.price} USD</td>
                <td>${data.totalAmount} USD</td>
            `;
            buyerTableBody.appendChild(row);
        });
    }

    document.querySelector(".pdf-button").addEventListener("click", function() {
        alert("PDF download feature is not implemented yet!");
    });

    displayData();
});

document.addEventListener("DOMContentLoaded", function () {
    const farmerTableBody = document.getElementById("farmerTableBody");

    // Sample farmer data
    const farmers = [
        { id: 1, name: "John Doe", email: "john@example.com", contact: "0771234567", nic: "982345678V", acc: "1234567890", location: "Village A", acres: "5", compost: "Yes", harvest: "50kg" },
        { id: 2, name: "Jane Smith", email: "jane@example.com", contact: "0719876543", nic: "981234567V", acc: "0987654321", location: "Village B", acres: "3", compost: "No", harvest: "30kg" },
        { id: 3, name: "Michael Brown", email: "michael@example.com", contact: "0765678901", nic: "983456789V", acc: "1122334455", location: "Village C", acres: "7", compost: "Yes", harvest: "70kg" },
        { id: 4, name: "John Doe", email: "john@example.com", contact: "0771234567", nic: "982345678V", acc: "1234567890", location: "Village A", acres: "5", compost: "Yes", harvest: "50kg" },
        { id: 5, name: "Jane Smith", email: "jane@example.com", contact: "0719876543", nic: "981234567V", acc: "0987654321", location: "Village B", acres: "3", compost: "No", harvest: "30kg" },
        { id: 6, name: "Michael Brown", email: "michael@example.com", contact: "0765678901", nic: "983456789V", acc: "1122334455", location: "Village C", acres: "7", compost: "Yes", harvest: "70kg" }
    ];

    function loadFarmers() {
        farmerTableBody.innerHTML = ""; // Clear existing rows before inserting new ones

        farmers.forEach((farmer) => {
            const row = document.createElement("tr");

            row.innerHTML = `
                <td>${farmer.id}</td>
                <td>${farmer.name}</td>
                <td>${farmer.email}</td>
                <td>${farmer.contact}</td>
                <td>${farmer.nic}</td>
                <td>${farmer.acc}</td>
                <td>${farmer.location}</td>
                <td>${farmer.acres}</td>
                <td>${farmer.compost}</td>
                <td>${farmer.harvest}</td>
                <td><button class="delete-button" onclick="deleteFarmer(${farmer.id})">Delete</button></td>
            `;

            farmerTableBody.appendChild(row);
        });
    }

    // Function to delete a farmer row
    window.deleteFarmer = function (id) {
        const isConfirmed = window.confirm("Are you sure you want to delete this farmer?");
        
        if (isConfirmed) {
            const index = farmers.findIndex((farmer) => farmer.id === id);
            if (index !== -1) {
                farmers.splice(index, 1); // Remove farmer from the array
                loadFarmers(); // Refresh table
            }
        }
    };

    // Load the farmer details when the page loads
    loadFarmers();

    // Add event listener to the "Download PDF" button
    document.querySelector(".pdf-button").addEventListener("click", function () {
        const { jsPDF } = window.jspdf;  // Ensure this is correct
        const doc = new jsPDF();

        let table = document.querySelector("table"); // Get the table
        let rows = table.querySelectorAll("tr");  // Get all rows of the table

        let tableContent = [];

        // Loop through each row of the table and get the text content of each cell
        rows.forEach((row, rowIndex) => {
            let rowData = [];
            row.querySelectorAll("td, th").forEach((cell) => {
                rowData.push(cell.innerText);  // Push cell content to the rowData array
            });
            tableContent.push(rowData);  // Push the rowData to the tableContent
        });

        // Now, let's use autoTable to create a table in the PDF
        doc.autoTable({
            head: [tableContent[0]], // First row as headers
            body: tableContent.slice(1), // Remaining rows as body
        });

        // Save the PDF file
        doc.save("farmer_data.pdf");
    });
});

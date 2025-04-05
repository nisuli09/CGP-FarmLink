document.addEventListener('DOMContentLoaded', function () {
    const harvestData = [
        { farmerID: "F001", name: "John Doe", contact: "123-456-7890", location: "Farm 1", totalHarvest: 100, unitPrice: 5 },
        { farmerID: "F002", name: "Jane Smith", contact: "987-654-3210", location: "Farm 2", totalHarvest: 150, unitPrice: 6 },
        { farmerID: "F003", name: "Michael Brown", contact: "555-123-4567", location: "Farm 3", totalHarvest: 200, unitPrice: 4 }
    ];

    const farmerTableBody = document.getElementById('farmerTableBody');

    function displayData() {
        farmerTableBody.innerHTML = "";
        harvestData.forEach((data) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${data.farmerID}</td>
                <td>${data.name}</td>
                <td>${data.contact}</td>
                <td>${data.location}</td>
                <td>${data.totalHarvest} kg</td>
                <td>${data.unitPrice} USD</td>
                <td>${(data.totalHarvest * data.unitPrice).toFixed(2)} USD</td>
            `;
            farmerTableBody.appendChild(row);
        });
    }

    // PDF download functionality (using jsPDF library)
    document.querySelector(".pdf-button").addEventListener("click", function() {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
        doc.text("Harvest Data", 14, 16);
        let y = 30;
        harvestData.forEach((data) => {
            doc.text(`Farmer ID: ${data.farmerID} | Name: ${data.name} | Harvest: ${data.totalHarvest} kg | Total Value: ${(data.totalHarvest * data.unitPrice).toFixed(2)} USD`, 14, y);
            y += 10;
        });
        doc.save('harvest-data.pdf');
    });

    displayData();
});

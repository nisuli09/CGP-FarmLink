// Toggle edit mode for fields
function toggleEdit(elementId, icon) {
    const element = document.getElementById(elementId);
    const isEditable = element.getAttribute("contenteditable") === "true";

    if (isEditable) {
        element.setAttribute("contenteditable", "false");
        icon.classList.remove("fa-check");
        icon.classList.add("fa-edit");
    } else {
        element.setAttribute("contenteditable", "true");
        element.focus();
        icon.classList.remove("fa-edit");
        icon.classList.add("fa-check");
    }
}

// Stock control
function updateStock(value) {
    const stockInput = document.getElementById("stock");
    let stock = parseInt(stockInput.value, 10);

    if (!isNaN(stock)) {
        stock = Math.max(1, stock + value); // Ensure stock doesn't go below 1
        stockInput.value = stock < 10 ? `0${stock}` : stock;
    }
}

// Save function (placeholder)
function saveChanges() {
    alert("Changes saved!");
}

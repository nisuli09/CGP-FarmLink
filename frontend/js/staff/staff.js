//Card section

             // Function to format the date as "Monday, 28 January"
             function formatDate() {
                const now = new Date();
                
                const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
                
                const monthsOfYear = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
                
                const dayOfWeek = daysOfWeek[now.getDay()];
                const dayOfMonth = now.getDate();
                const month = monthsOfYear[now.getMonth()];
                
                const dateString = `${dayOfWeek}, ${dayOfMonth} ${month}`;
                document.getElementById("date").textContent = dateString;
            }
            
                         // Function to update the current time
            function updateTime() {
                const now = new Date();
                const hours = now.getHours();
                const minutes = now.getMinutes();
                const seconds = now.getSeconds();
                const ampm = hours >= 12 ? 'PM' : 'AM';
                const formattedHours = hours % 12 || 12;
                const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
                const formattedSeconds = seconds < 10 ? '0' + seconds : seconds;
                
                const timeString = `${formattedHours}:${formattedMinutes}:${formattedSeconds} ${ampm}`;
                document.getElementById("time").textContent = timeString;
            }
            
                         // Simulated weather data update
            function updateWeather() {
                const weatherData = {
                    temperature: "30°C",
                    condition: "Mostly Cloudy",
                    iconClass: "fas fa-cloud" 
                };
                
                document.getElementById("temperature").textContent = weatherData.temperature;
                document.getElementById("weather-condition").textContent = weatherData.condition;
                document.getElementById("weather-icon").className = weatherData.iconClass;
            }
            
                         // Simulated statistics data update
            function updateStats() {
                const statsData = {
                    staffCount: "259",
                    farmersCount: "1,110",
                    harvestCount: "45,000kg",
                    buyersCount: "134"
                };
                
                document.getElementById("staff-count").textContent = statsData.staffCount;
                document.getElementById("farmers-count").textContent = statsData.farmersCount;
                document.getElementById("harvest-count").textContent = statsData.harvestCount;
                document.getElementById("buyers-count").textContent = statsData.buyersCount;
            }
            
                         // Update all data
            function updateData() {
                formatDate();
                updateTime();
                updateWeather();
                updateStats();
            }
            
                         // Call updateData every second to keep the time updated
            setInterval(updateData, 1000); 
            updateData();


            // Navbar Section 
document.addEventListener("DOMContentLoaded", function () {
    function showSection(sectionId) {
        // Hide all sections
        document.querySelectorAll(".content-section").forEach(section => {
            section.style.display = "none";
        });

        // Show the clicked section
        document.getElementById(sectionId).style.display = "block";

        // Update active tab
        document.querySelectorAll(".tabs button").forEach(button => {
            button.classList.remove("active");
        });

        document.querySelector(`.tabs button[data-section='${sectionId}']`).classList.add("active");
    }

    // Attach event listeners to tabs
    document.querySelectorAll(".tabs button").forEach(button => {
        button.addEventListener("click", function () {
            let sectionId = this.getAttribute("data-section");
            showSection(sectionId);
        });
    });

    // Show the default section (Register Farmer)
    showSection("register-farmer");
});


//Register Farmer section
function openregisterPopup() {
    let form = document.querySelector(".content-section form");

    if (form.checkValidity()) {
        let popup = document.getElementById("registerpopup");
        popup.classList.add("open-register-popup");
        popup.style.visibility = "visible";
        popup.style.transform = "translateX(-50%) scale(1)";
    } else {
        form.reportValidity(); 
    }
}

function closeregisterPopup() {
    let popup = document.getElementById("registerpopup");
    popup.classList.remove("open-register-popup");
    popup.style.visibility = "hidden";
    popup.style.transform = "translateX(-50%) scale(0)";
}

function openDiscardPopup() {
    let form = document.querySelector(".content-section form");
    let inputs = form.querySelectorAll("input[required], select[required]");
    let isEmpty = true;

    inputs.forEach(input => {
        if (input.value.trim()) {
            isEmpty = false;
        }
    });

    if (!isEmpty) {
        let discardPopup = document.getElementById("discardPopup");
        discardPopup.style.visibility = "visible";
        discardPopup.style.transform = "translateX(-50%) scale(1)";
    } else {
              // Focus on the first required field and trigger validation tooltip
        let firstRequiredField = document.querySelector("input[required]");
        if (firstRequiredField) {
            firstRequiredField.reportValidity();
            firstRequiredField.focus();
        }
    }
}

function closeDiscardPopup() {
    let discardPopup = document.getElementById("discardPopup");
    discardPopup.style.visibility = "hidden";
    discardPopup.style.transform = "translateX(-50%) scale(0)";
}

function discardChanges() {
    let form = document.querySelector(".content-section form");
    form.reset();
    closeDiscardPopup();
}

document.addEventListener("DOMContentLoaded", function () {
    // Function to allow only letters (First Name, Last Name)
    function validateLetters(input) {
        input.addEventListener("input", function () {
            this.value = this.value.replace(/[^A-Za-z ]/g, ''); // Remove any non-letter character
        });
    }

    // Function to allow only numbers (Contact No, NIC, Account No)
    function validateNumbers(input) {
        input.addEventListener("input", function () {
            this.value = this.value.replace(/\D/g, ''); // Remove any non-digit character
        });
    }

    // Contact Number formatting
    function formatContactNumber(input) {
        input.addEventListener("input", function () {
            let cleaned = this.value.replace(/\D/g, ""); // Remove non-numeric characters
            if (cleaned.length > 10) cleaned = cleaned.slice(0, 10); 
            
            let formatted = cleaned.replace(/^(\d{4})(\d{3})?(\d{3})?$/, function (_, p1, p2, p3) {
                return p3 ? `${p1} ${p2} ${p3}` : p2 ? `${p1} ${p2}` : p1;
            });

            this.value = formatted;
        });
    }

    // Apply validation to specific fields
    validateLetters(document.querySelector("input[placeholder='']")); 
    validateLetters(document.querySelectorAll("input[placeholder='']")[1]); 
    
    let contactInput = document.querySelector("input[placeholder='0XXX XXX XXX']");
    validateNumbers(contactInput);
    formatContactNumber(contactInput);

    validateNumbers(document.querySelector("input[placeholder='NIC']"));
    validateNumbers(document.querySelector("input[placeholder='Acc No']"));
});



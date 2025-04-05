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

//View section


//View Shop section
document.addEventListener("DOMContentLoaded", function () {
    const customShape = document.querySelector(".custom-shape");

    let isFertilizerVisible = false; 

    document.addEventListener("click", function (event) {
        // If "Fertilizer" is clicked
        if (event.target.closest(".fertilizer-tag") && !isFertilizerVisible) {
            customShape.innerHTML = `
                <div class="fertilizer-tag">Fertilizer
                    <button class="add-button" onclick="openPopup()"><i class="fas fa-plus"></i></button>
                </div>
                <div class="rent-tag">
                    <h2 class="section-title">Rent Items</h2>
                </div>

<!-- add Popup -->
<div id="popup-overlay"></div>

<div id="popup">
    <div class="product-container">
        <!-- Upload Box -->
        <div class="upload-box">
            <input type="file" id="imageUpload" accept="image/*" hidden>
            <button class="plus-button" onclick="document.getElementById('imageUpload').click();" aria-label="Upload image">
                <i class="fas fa-camera"></i>
            </button>
        </div>

        <div class="product-card">
            <label for="productTitle">Product Name</label>
            <input type="text" id="productTitle" placeholder="Enter product name">

            <label for="productDescription">Product Description</label>
            <textarea id="productDescription" placeholder="Add Detailed Description"></textarea>

            <label for="productPrice">Price</label>
            <input type="text" id="productPrice" placeholder="Enter price">

            <label for="stock">Stock</label>
            <div class="stock-control">
                <button id="decrease">−</button>
                <span id="stock-count">02</span>
                <button id="increase">+</button>
            </div>

            <button class="add-to-shop" onclick="closePopup()">Add to shop</button>
        </div>
    </div>
</div>
<!-- add Popup -->

                <div class="card-container">
                    <div class="card">
                        <img src="../assets/image_13.png" alt="Urea">
                        <div class="card-content">
                            <div class="card-header">
                                <h3 class="title">Urea</h3>
                                <span class="id-no">201</span>
                            </div>
                            <p class="description">Urea is a widely used nitrogen-based fertilizer.</p>
                            <span class="price">Rs 990.00</span>
                            <div class="stock-info">
                                <span class="stock"><b>30KG In Stock</b></span>
                                <span class="rating">
                                    <i class="fas fa-star"></i>
                                    <i class="fas fa-star"></i>
                                    <i class="fas fa-star"></i>
                                    <i class="fas fa-star"></i>
                                    <i class="far fa-star"></i>
                                    <span>4.0</span>
                                </span>
                            </div>
                            <div class="buttons">
                                <button class="edit" onclick="openEditPopup(this)">Edit</button>
                                <button class="delete" onclick="openDeletePopup(this)">Delete</button>
                            </div> 
                        </div>
                    </div>
                    <div class="card">
                        <img src="../assets/image_14.png" alt="Ammonium Sulfate">
                        <div class="card-content">
                            <div class="card-header">
                                <h3 class="title">Ammonium Sulfate</h3>
                                <span class="id-no">202</span>
                            </div>
                            <p class="description">Ammonium Sulfate – Provides nitrogen and sulfur.</p>
                            <span class="price">Rs 1000.00</span>
                            <div class="stock-info">
                                <span class="stock"><b>30KG In Stock</b></span>
                                <span class="rating">
                                    <i class="fas fa-star"></i>
                                    <i class="fas fa-star"></i>
                                    <i class="fas fa-star"></i>
                                    <i class="fas fa-star"></i>
                                    <i class="far fa-star"></i>
                                    <span>4.0</span>
                                </span>
                            </div>
                            <div class="buttons">
                                <button class="edit" onclick="openEditPopup(this)">Edit</button>
                                <button class="delete" onclick="openDeletePopup(this)">Delete</button>
                            </div> 
                        </div>
                    </div>

                       <div class="card">
                    <img src="../assets/image_15.png" alt="calciumammoniumnitrate">
                    <div class="card-content">
                        <div class="card-header">
                            <h3 class="title">calcium ammonium nitrate</h3>
                            <span class="id-no">203</span>
                        </div>
                        <p class="description">Calcium Ammonium Nitrate – A slow-release nitrogen fertilizer.</p>
                        <span class="price">Rs 1200.00</span>
                        <div class="stock-info">
                            <span class="stock"><b>35KG In Stock</b></span>
                            <span class="rating">
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="far fa-star"></i>
                                <span>4.0</span>
                            </span>
                        </div>
                        <div class="buttons">
                            <button class="edit" onclick="openEditPopup(this)">edit</button>
                            <button class="delete" onclick="openDeletePopup(this)">delete</button>
                        </div>
                    </div>
                </div>
                <div class="card">
                    <img src="../assets/image_16.png" alt="SingleSuperPhosphate">
                    <div class="card-content">
                        <div class="card-header">
                            <h3 class="title">Single Super Phosphate</h3>
                            <span class="id-no">204</span>
                        </div>
                        <p class="description">Machines combine harvesters used to cut and gather rice.</p>
                        <span class="price">Rs 900.00</span>
                        <div class="stock-info">
                            <span class="stock"><b>20KG In Stock</b></span>
                            <span class="rating">
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="far fa-star"></i>
                                <span>4.0</span>
                            </span>
                        </div>
                        <div class="buttons">
                            <button class="edit" onclick="openEditPopup(this)">edit</button>
                            <button class="delete" onclick="openDeletePopup(this)">delete</button>
                        </div>
                    </div>
                </div>
            </div>
    
            <div class="card-container">
                <div class="card">
                    <img src="../assets/image_17.png" alt="TripleSuperPhosphate">
                    <div class="card-content">
                        <div class="card-header">
                            <h3 class="title">Triple Super Phosphate</h3>
                            <span class="id-no">205</span>
                        </div>
                        <p class="description">Triple Super Phosphate – A concentrated source of phosphorus.</p>
                        <span class="price">Rs 1100.00</span>
                        <div class="stock-info">
                            <span class="stock"><b>10KG In Stock</b></span>
                            <span class="rating">
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="far fa-star"></i>
                                <span>4.0</span>
                            </span>
                        </div>
                        <div class="buttons">
                            <button class="edit" onclick="openEditPopup(this)">edit</button>
                            <button class="delete" onclick="openDeletePopup(this)">delete</button>
                        </div>
                    </div>
                </div>
                <div class="card">
                    <img src="../assets/image_18.png" alt="Di-Ammonium Phosphate">
                    <div class="card-content">
                        <div class="card-header">
                            <h3 class="title">Di-Ammonium Phosphate</h3>
                            <span class="id-no">206</span>
                        </div>
                        <p class="description">Di-Ammonium Phosphate –Provides both nitrogen and phosphorus.</p>
                        <span class="price">Rs 850.00</span>
                        <div class="stock-info">
                            <span class="stock"><b>20KG In Stock</b></span>
                            <span class="rating">
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="far fa-star"></i>
                                <span>4.0</span>
                            </span>
                        </div>
                        <div class="buttons">
                            <button class="edit" onclick="openEditPopup(this)">edit</button>
                            <button class="delete" onclick="openDeletePopup(this)">delete</button>
                        </div>
                    </div>
                </div>
                <div class="card">
                    <img src="../assets/image_19.png" alt="LiquidPhosphoricAcid">
                    <div class="card-content">
                        <div class="card-header">
                            <h3 class="title">Liquid Phosphoric Acid</h3>
                            <span class="id-no">207</span>
                        </div>
                        <p class="description">Liquid Phosphoric Acid – Promotes strong roots and early flowering.</p>
                        <span class="price">Rs 750.00</span>
                        <div class="stock-info">
                            <span class="stock"><b>15 In Stock</b></span>
                            <span class="rating">
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="far fa-star"></i>
                                <span>4.0</span>
                            </span>
                        </div>
                        <div class="buttons">
                            <button class="edit" onclick="openEditPopup(this)">edit</button>
                            <button class="delete" onclick="openDeletePopup(this)">delete</button>
                        </div>
                    </div>
                </div>
                <div class="card">
                    <img src="../assets/image_20.png" alt="Mono-Ammonium Phosphate">
                    <div class="card-content">
                        <div class="card-header">
                            <h3 class="title">Mono-Ammonium Phosphate</h3>
                            <span class="id-no">208</span>
                        </div>
                        <p class="description">MonoAmmonium Phosphate – Provide nitrogen and phosphorus.</p>
                        <span class="price">Rs 1250.00</span>
                        <div class="stock-info">
                            <span class="stock"><b>15KG In Stock</b></span>
                            <span class="rating">
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="far fa-star"></i>
                                <span>4.0</span>
                            </span>
                        </div>
                        <div class="buttons">
                            <button class="edit" onclick="openEditPopup(this)">edit</button>
                            <button class="delete" onclick="openDeletePopup(this)">delete</button>
                        </div>
                    </div>
                </div>
            </div>
    
            <div class="card-container">
                <div class="card">
                    <img src="../assets/image_21.png" alt="FoliarSpray">
                    <div class="card-content">
                        <div class="card-header">
                            <h3 class="title">Foliar Spray</h3>
                            <span class="id-no">209</span>
                        </div>
                        <p class="description">Foliar Spray – Directly sprayed onto leaves for quick absorption .</p>
                        <span class="price">Rs 950.00</span>
                        <div class="stock-info">
                            <span class="stock"><b>19 In Stock</b></span>
                            <span class="rating">
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="far fa-star"></i>
                                <span>4.0</span>
                            </span>
                        </div>
                        <div class="buttons">
                            <button class="edit" onclick="openEditPopup(this)">edit</button>
                            <button class="delete" onclick="openDeletePopup(this)">delete</button>
                        </div>
                    </div>
                </div>
                <div class="card">
                    <img src="../assets/image_22.png" alt="Silicon-BasedFertilizers">
                    <div class="card-content">
                        <div class="card-header">
                            <h3 class="title">Silicon-Based Fertilizers</h3>
                            <span class="id-no">210</span>
                        </div>
                        <p class="description">Silicon-Based Fertilizers – Improves disease resistance and strengthens rice plants.</p>
                        <span class="price">Rs 980.00</span>
                        <div class="stock-info">
                            <span class="stock"><b>30KG In Stock</b></span>
                            <span class="rating">
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="far fa-star"></i>
                                <span>4.0</span>
                            </span>
                        </div>
                        <div class="buttons">
                            <button class="edit" onclick="openEditPopup(this)">edit</button>
                            <button class="delete" onclick="openDeletePopup(this)">delete</button>
                        </div>
                    </div>
                </div>
                <div class="card">
                    <img src="../assets/image_23.png" alt="LiquidNPKFertilizers">
                    <div class="card-content">
                        <div class="card-header">
                            <h3 class="title">Liquid NPK Fertilizers</h3>
                            <span class="id-no">211</span>
                        </div>
                        <p class="description">Liquid NPK Fertilizers – Balanced nutrient supply through leaves.</p>
                        <span class="price">Rs 1750.00</span>
                        <div class="stock-info">
                            <span class="stock"><b>25 In Stock</b></span>
                            <span class="rating">
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="far fa-star"></i>
                                <span>4.0</span>
                            </span>
                        </div>
                        <div class="buttons">
                            <button class="edit" onclick="openEditPopup(this)">edit</button>
                            <button class="delete" onclick="openDeletePopup(this)">delete</button>
                        </div>
                    </div>
                </div>
                <div class="card">
                    <img src="../assets/image_24.png" alt="Compost">
                    <div class="card-content">
                        <div class="card-header">
                            <h3 class="title">Compost</h3>
                            <span class="id-no">212</span>
                        </div>
                        <p class="description">Compost – Improves soil structure and microbial activity.</p>
                        <span class="price">Rs 700.00</span>
                        <div class="stock-info">
                            <span class="stock"><b>30KG In Stock</b></span>
                            <span class="rating">
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="far fa-star"></i>
                                <span>4.0</span>
                            </span>
                        </div>
                        <div class="buttons">
                            <button class="edit" onclick="openEditPopup(this)">edit</button>
                            <button class="delete" onclick="openDeletePopup(this)">delete</button>
                        </div>
                    </div>
                </div>
            </div>

            <div class="card-container">
                <div class="card">
                    <img src="../assets/image_25.png" alt="ZincSulfate">
                    <div class="card-content">
                        <div class="card-header">
                            <h3 class="title">ZincSulfate</h3>
                            <span class="id-no">213</span>
                        </div>
                        <p class="description">Zinc Sulfate – Prevents zinc deficiency (common in paddy).</p>
                        <span class="price">Rs 970.00</span>
                        <div class="stock-info">
                            <span class="stock"><b>25KG In Stock</b></span>
                            <span class="rating">
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="far fa-star"></i>
                                <span>4.0</span>
                            </span>
                        </div>
                        <div class="buttons">
                            <button class="edit" onclick="openEditPopup(this)">edit</button>
                            <button class="delete" onclick="openDeletePopup(this)">delete</button>
                        </div>
                    </div>
                </div>
                <div class="card">
                    <img src="../assets/image_26.png" alt="Humic&FulvicAcidFertilizers">
                    <div class="card-content">
                        <div class="card-header">
                            <h3 class="title">Humic & Fulvic Acid Fertilizers</h3>
                            <span class="id-no">214</span>
                        </div>
                        <p class="description">Humic & Fulvic Acid – Improves soil structure and nutrient uptake.</p>
                        <span class="price">Rs 1000.00</span>
                        <div class="stock-info">
                            <span class="stock"><b>17 In Stock</b></span>
                            <span class="rating">
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="far fa-star"></i>
                                <span>4.0</span>
                            </span>
                        </div>
                        <div class="buttons">
                            <button class="edit" onclick="openEditPopup(this)">edit</button>
                            <button class="delete" onclick="openDeletePopup(this)">delete</button>
                        </div>
                    </div>
                </div>
                <div class="card">
                    <img src="../assets/image_27.png" alt="FerrousSulfate">
                    <div class="card-content">
                        <div class="card-header">
                            <h3 class="title">Ferrous Sulfate</h3>
                            <span class="id-no">215</span>
                        </div>
                        <p class="description">Ferrous Sulfate – Supplies iron to prevent iron chlorosis.</p>
                        <span class="price">Rs 880.00</span>
                        <div class="stock-info">
                            <span class="stock"><b>23KG In Stock</b></span>
                            <span class="rating">
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="far fa-star"></i>
                                <span>4.0</span>
                            </span>
                        </div>
                        <div class="buttons">
                            <button class="edit" onclick="openEditPopup(this)">edit</button>
                            <button class="delete" onclick="openDeletePopup(this)">delete</button>
                        </div>
                    </div>
                </div>
                <div class="card">
                    <img src="../assets/image_28.png" alt="PotassiumSilicate">
                    <div class="card-content">
                        <div class="card-header">
                            <h3 class="title">Potassium Silicate</h3>
                            <span class="id-no">216</span>
                        </div>
                        <p class="description">Potassium Silicate – Strengthens cell walls and improves resistance to diseases.</p>
                        <span class="price">Rs 1150.00</span>
                        <div class="stock-info">
                            <span class="stock"><b>14 In Stock</b></span>
                            <span class="rating">
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="far fa-star"></i>
                                <span>4.0</span>
                            </span>
                        </div>
                        <div class="buttons">
                            <button class="edit" onclick="openEditPopup(this)">edit</button>
                            <button class="delete" onclick="openDeletePopup(this)">delete</button>
                        </div>
                    </div>
                </div>
            </div>
         </div>

<div id="popup-overlay"></div>

<div id="edit-popup">
    <span class="close-btn" onclick="closeEditPopup()">&times;</span>
    <div class="product-container">
        <div class="upload-box">
            <input type="file" id="editImageUpload" accept="image/*" hidden>
            <button class="plus-button" onclick="document.getElementById('editImageUpload').click();" aria-label="Upload image">
                <i class="fas fa-camera"></i>
            </button>
        </div>

        <div class="product-card">
            <label for="editProductTitle">Product Name</label>
            <input type="text" id="editProductTitle" placeholder="Enter product name">

            <label for="editProductDescription">Product Description</label>
            <textarea id="editProductDescription" placeholder="Add Detailed Description"></textarea>

            <label for="editProductPrice">Price</label>
            <input type="text" id="editProductPrice" placeholder="Enter price">

            <label for="editStock">Stock</label>
            <div class="stock-control">
                <button id="editDecrease">−</button>
                <span id="editStockCount">0</span>
                <button id="editIncrease">+</button>
            </div>

            <button class="add-to-shop" onclick="saveEditChanges()">Save Changes</button>
        </div>
    </div>
</div>

<div class="Delete-Popup" id="Delete-Popup">
    <p>Do you want to delete this?</p>
    <div class="buttons">
        <button class="no-btn" onclick="handleNo()">No</button>
        <button class="delete-btn" onclick="handleDelete()">Delete</button>
    </div>
</div>
         
            `;
            isFertilizerVisible = true;
        }
        // If "Rent Items" is clicked
        else if (event.target.closest(".rent-tag") && isFertilizerVisible) {
            customShape.innerHTML = `
                    <div class="fertilizer-tag">Fertilizer</div>
                    <div class="rent-tag">
                         <h2 class="section-title">
                         Rent Items
                         <button class="add-button" onclick="openPopup()"><i class="fas fa-plus"></i></button>
                         </h2>
                     </div>


<div id="popup-overlay"></div>

<div id="popup">
    <div class="product-container">
        <!-- Upload Box -->
        <div class="upload-box">
            <input type="file" id="imageUpload" accept="image/*" hidden>
            <button class="plus-button" onclick="document.getElementById('imageUpload').click();" aria-label="Upload image">
                <i class="fas fa-camera"></i>
            </button>
        </div>

        <div class="product-card">
            <label for="productTitle">Product Name</label>
            <input type="text" id="productTitle" placeholder="Enter product name">

            <label for="productDescription">Product Description</label>
            <textarea id="productDescription" placeholder="Add Detailed Description"></textarea>

            <label for="productPrice">Price</label>
            <input type="text" id="productPrice" placeholder="Enter price">

            <label for="stock">Stock</label>
            <div class="stock-control">
                <button id="decrease">−</button>
                <span id="stock-count">02</span>
                <button id="increase">+</button>
            </div>

            <button class="add-to-shop" onclick="closePopup()">Add to shop</button>
        </div>
    </div>
</div>
                 
            
          <div class="card-container">
            <div class="card">
                <img src="../assets/image_1.png" alt="Tractor">
                <div class="card-content">
                    <div class="card-header">
                        <h3 class="title">Tractor</h3>
                        <span class="id-no">101</span>
                    </div>
                    <p class="description">Used For Plowing, Tilling, And Sometimes Transporting Paddy.</p>
                    <span class="price">Rs 5000.00</span>
                    <div class="stock-info">
                        <span class="stock"><b>3 In Stock</b></span>
                        <span class="rating">
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="far fa-star"></i>
                            <span>4.0</span>
                        </span>
                    </div>
                    <div class="action-buttons">
                        <button class="btn-edit" onclick="openEditPopup(this)">Edit</button>
                        <button class="btn-delete" onclick="openDeletePopup(this)">Delete</button>
                    </div>                    
                </div>
            </div>
            <div class="card">
                <img src="../assets/image_2.png" alt="Plows">
                <div class="card-content">
                    <div class="card-header">
                        <h3 class="title">Plows</h3>
                        <span class="id-no">102</span>
                    </div>
                    <p class="description">Traditional tools for breaking the soil before planting.</p>
                    <span class="price">Rs 6000.00</span>
                    <div class="stock-info">
                        <span class="stock"><b>3 In Stock</b></span>
                        <span class="rating">
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="far fa-star"></i>
                            <span>4.0</span>
                        </span>
                    </div>
                    <div class="action-buttons">
                        <button class="btn-edit" onclick="openEditPopup(this)">Edit</button>
                        <button class="btn-delete" onclick="openDeletePopup(this)">Delete</button>
                    </div>                    
                </div>
            </div>
            <div class="card">
                <img src="../assets/image_3.png" alt="RiceTransplanters">
                <div class="card-content">
                    <div class="card-header">
                        <h3 class="title">Rice Transplanters</h3>
                        <span class="id-no">103</span>
                    </div>
                    <p class="description">Machines transplant rice seedings nurseries to the field.</p>
                    <span class="price">Rs 3000.00</span>
                    <div class="stock-info">
                        <span class="stock"><b>2 In Stock</b></span>
                        <span class="rating">
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="far fa-star"></i>
                            <span>4.0</span>
                        </span>
                    </div>
                    <div class="action-buttons">
                        <button class="btn-edit" onclick="openEditPopup(this)">Edit</button>
                        <button class="btn-delete" onclick="openDeletePopup(this)">Delete</button>
                    </div>                    
                </div>
            </div>
            <div class="card">
                <img src="../assets/image_4.png" alt="Harvesters">
                <div class="card-content">
                    <div class="card-header">
                        <h3 class="title">Harvesters</h3>
                        <span class="id-no">104</span>
                    </div>
                    <p class="description">Machines combine harvesters used to cut and gather rice.</p>
                    <span class="price">Rs 5000.00</span>
                    <div class="stock-info">
                        <span class="stock"><b>3 In Stock</b></span>
                        <span class="rating">
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="far fa-star"></i>
                            <span>4.0</span>
                        </span>
                    </div>
                    <div class="action-buttons">
                        <button class="btn-edit" onclick="openEditPopup(this)">Edit</button>
                        <button class="btn-delete" onclick="openDeletePopup(this)">Delete</button>
                    </div> 
                </div>
            </div>
        </div>

        <div class="card-container">
            <div class="card">
                <img src="../assets/image_5.png" alt="Water Pumps">
                <div class="card-content">
                    <div class="card-header">
                        <h3 class="title">Water Pumps</h3>
                        <span class="id-no">105</span>
                    </div>
                    <p class="description">Used for irrigation and draining water from the field.</p>
                    <span class="price">Rs 2000.00</span>
                    <div class="stock-info">
                        <span class="stock"><b>5 In Stock</b></span>
                        <span class="rating">
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="far fa-star"></i>
                            <span>4.0</span>
                        </span>
                    </div>
                    <div class="action-buttons">
                        <button class="btn-edit" onclick="openEditPopup(this)">Edit</button>
                        <button class="btn-delete" onclick="openDeletePopup(this)">Delete</button>
                    </div> 
                </div>
            </div>
            <div class="card">
                <img src="../assets/image_6.png" alt="Rotary Tillers">
                <div class="card-content">
                    <div class="card-header">
                        <h3 class="title">Rotary Tillers</h3>
                        <span class="id-no">106</span>
                    </div>
                    <p class="description">Used for preparing the soil and breaking down clumps.</p>
                    <span class="price">Rs 5000.00</span>
                    <div class="stock-info">
                        <span class="stock"><b>4 In Stock</b></span>
                        <span class="rating">
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="far fa-star"></i>
                            <span>4.0</span>
                        </span>
                    </div>
                    <div class="action-buttons">
                        <button class="btn-edit" onclick="openEditPopup(this)">Edit</button>
                        <button class="btn-delete" onclick="openDeletePopup(this)">Delete</button>
                    </div> 
                </div>
            </div>
            <div class="card">
                <img src="../assets/image_7.png" alt="Threshers">
                <div class="card-content">
                    <div class="card-header">
                        <h3 class="title">Threshers</h3>
                        <span class="id-no">107</span>
                    </div>
                    <p class="description">Separate the rice grain from the husk after harvest.</p>
                    <span class="price">Rs 4000.00</span>
                    <div class="stock-info">
                        <span class="stock"><b>3 In Stock</b></span>
                        <span class="rating">
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="far fa-star"></i>
                            <span>4.0</span>
                        </span>
                    </div>
                    <div class="action-buttons">
                        <button class="btn-edit" onclick="openEditPopup(this)">Edit</button>
                        <button class="btn-delete" onclick="openDeletePopup(this)">Delete</button>
                    </div> 
                </div>
            </div>
            <div class="card">
                <img src="../assets/image_8.png" alt="Sprayers">
                <div class="card-content">
                    <div class="card-header">
                        <h3 class="title">Sprayers</h3>
                        <span class="id-no">108</span>
                    </div>
                    <p class="description">Used for applying pesticides and fertilizers to protect crops.</p>
                    <span class="price">Rs 2000.00</span>
                    <div class="stock-info">
                        <span class="stock"><b>6 In Stock</b></span>
                        <span class="rating">
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="far fa-star"></i>
                            <span>4.0</span>
                        </span>
                    </div>
                    <div class="action-buttons">
                        <button class="btn-edit" onclick="openEditPopup(this)">Edit</button>
                        <button class="btn-delete" onclick="openDeletePopup(this)">Delete</button>
                    </div> 
                </div>
            </div>
        </div>
        
        <div class="card-container">
            <div class="card">
                <img src="../assets/image_9.png" alt="DiskHarrow">
                <div class="card-content">
                    <div class="card-header">
                        <h3 class="title">Disk Harrow</h3>
                        <span class="id-no">109</span>
                    </div>
                    <p class="description">Breaks up soil clumps after plowing for better aeration.</p>
                    <span class="price">Rs 5000.00</span>
                    <div class="stock-info">
                        <span class="stock"><b>4 In Stock</b></span>
                        <span class="rating">
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="far fa-star"></i>
                            <span>4.0</span>
                        </span>
                    </div>
                    <div class="action-buttons">
                        <button class="btn-edit" onclick="openEditPopup(this)">Edit</button>
                        <button class="btn-delete" onclick="openDeletePopup(this)">Delete</button>
                    </div> 
                </div>
            </div>
            <div class="card">
                <img src="../assets/image_10.png" alt="Sickle">
                <div class="card-content">
                    <div class="card-header">
                        <h3 class="title">Sickle</h3>
                        <span class="id-no">110</span>
                    </div>
                    <p class="description">A traditional hand tool for cutting rice stalks.</p>
                    <span class="price">Rs 1000.00</span>
                    <div class="stock-info">
                        <span class="stock"><b>8 In Stock</b></span>
                        <span class="rating">
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="far fa-star"></i>
                            <span>4.0</span>
                        </span>
                    </div>
                    <div class="action-buttons">
                        <button class="btn-edit" onclick="openEditPopup(this)">Edit</button>
                        <button class="btn-delete" onclick="openDeletePopup(this)">Delete</button>
                    </div> 
                </div>
            </div>
            <div class="card">
                <img src="../assets/image_11.png" alt="WinnowingMachine">
                <div class="card-content">
                    <div class="card-header">
                        <h3 class="title">Winnowing Machine</h3>
                        <span class="id-no">111</span>
                    </div>
                    <p class="description">Helps remove husk and impurities from rice grains.</p>
                    <span class="price">Rs 2500.00</span>
                    <div class="stock-info">
                        <span class="stock"><b>7 In Stock</b></span>
                        <span class="rating">
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="far fa-star"></i>
                            <span>4.0</span>
                        </span>
                    </div>
                    <div class="action-buttons">
                        <button class="btn-edit" onclick="openEditPopup(this)">Edit</button>
                        <button class="btn-delete" onclick="openDeletePopup(this)">Delete</button>
                    </div> 
                </div>
            </div>
            <div class="card">
                <img src="../assets/image_12.png" alt="CombineHarvester">
                <div class="card-content">
                    <div class="card-header">
                        <h3 class="title">Combine Harvester</h3>
                        <span class="id-no">112</span>
                    </div>
                    <p class="description">Multi-functional machine cuts, threshes, and cleans the grains.</p>
                    <span class="price">Rs 6000.00</span>
                    <div class="stock-info">
                        <span class="stock"><b>4 In Stock</b></span>
                        <span class="rating">
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="far fa-star"></i>
                            <span>4.0</span>
                        </span>
                    </div>
                    <div class="action-buttons">
                        <button class="btn-edit" onclick="openEditPopup(this)">Edit</button>
                        <button class="btn-delete" onclick="openDeletePopup(this)">Delete</button>
                    </div> 
                </div>
            </div>
        </div>

        <div id="popup-overlay"></div>

<div id="edit-popup">
    <span class="close-btn" onclick="closeEditPopup()">&times;</span>
    <div class="product-container">
        <div class="upload-box">
            <input type="file" id="editImageUpload" accept="image/*" hidden>
            <button class="plus-button" onclick="document.getElementById('editImageUpload').click();" aria-label="Upload image">
                <i class="fas fa-camera"></i>
            </button>
        </div>

        <div class="product-card">
            <label for="editProductTitle">Product Name</label>
            <input type="text" id="editProductTitle" placeholder="Enter product name">

            <label for="editProductDescription">Product Description</label>
            <textarea id="editProductDescription" placeholder="Add Detailed Description"></textarea>

            <label for="editProductPrice">Price</label>
            <input type="text" id="editProductPrice" placeholder="Enter price">

            <label for="editStock">Stock</label>
            <div class="stock-control">
                <button id="editDecrease">−</button>
                <span id="editStockCount">0</span>
                <button id="editIncrease">+</button>
            </div>

            <button class="add-to-shop" onclick="saveEditChanges()">Save Changes</button>
        </div>
    </div>
</div>

<div class="Delete-Popup" id="Delete-Popup">
    <p>Do you want to delete this?</p>
    <div class="buttons">
        <button class="no-btn" onclick="handleNo()">No</button>
        <button class="delete-btn" onclick="handleDelete()">Delete</button>
    </div>
</div>
            `;
            isFertilizerVisible = false;
        }
    });
});


//Add Shop Popup
// Stock control functionality
const decreaseButton = document.getElementById('decrease');
const increaseButton = document.getElementById('increase');
const stockCount = document.getElementById('stock-count');

let stock = 2;

function updateStock() {
    stockCount.textContent = stock < 10 ? `0${stock}` : stock;
}

decreaseButton.addEventListener('click', () => {
    if (stock > 1) {
        stock--;
        updateStock();
    }
});

increaseButton.addEventListener('click', () => {
    stock++;
    updateStock();
});

// Image upload functionality
const imageUpload = document.getElementById('imageUpload');
const uploadBox = document.querySelector('.upload-box');
const plusButton = document.querySelector('.plus-button');
let uploadedImage = null;

function clearPreviousImage() {
    const existingImage = uploadBox.querySelector('img');
    if (existingImage) {
        existingImage.remove();
    }
}

imageUpload.addEventListener('change', function(event) {
    const file = event.target.files[0];
    
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            clearPreviousImage(); 

            plusButton.style.display = 'none';

            const imgPreview = document.createElement('img');
            imgPreview.src = e.target.result;
            imgPreview.alt = file.name;

            imgPreview.style.width = '100%';
            imgPreview.style.height = '100%';
            imgPreview.style.objectFit = 'cover';
            imgPreview.style.borderRadius = '20px';
            imgPreview.style.position = 'absolute';
            imgPreview.style.top = '0';
            imgPreview.style.left = '0';

            uploadBox.appendChild(imgPreview);
            uploadedImage = imgPreview.src; // Store image URL for later use
        };
        reader.readAsDataURL(file);
    }
});

// Open Popup
function openPopup() {
    document.getElementById("popup").style.display = "block";
    document.getElementById("popup-overlay").style.display = "block";
    document.body.classList.add("popup-open"); 
}

// Close Popup
function closePopup() {
    document.getElementById("popup").style.display = "none";
    document.getElementById("popup-overlay").style.display = "none";
    document.body.classList.remove("popup-open"); 
}

// Close popup when clicking outside of it
document.getElementById("popup-overlay").addEventListener("click", closePopup);

// Add to Shop functionality
function addToShop() {
    const productTitle = document.getElementById('productTitle').value;
    const productDescription = document.getElementById('productDescription').value;
    const productPrice = document.getElementById('productPrice').value;
    const productStock = stock;

    // Validate form data
    if (!productTitle || !productDescription || !productPrice || !uploadedImage) {
        alert("Please fill in all the fields and upload an image.");
        return;
    }

    // Create a new card for the product
    const card = document.createElement('div');
    card.classList.add('card');

    card.innerHTML = `
        <img src="${uploadedImage}" alt="${productTitle}">
        <div class="card-content">
            <div class="card-header">
                <h3 class="title">${productTitle}</h3>
                <span class="id-no">${Math.floor(Math.random() * 1000)}</span>
            </div>
            <p class="description">${productDescription}</p>
            <span class="price">Rs ${productPrice}</span>
            <div class="stock-info">
                <span class="stock"><b>${productStock} In Stock</b></span>
                <span class="rating">
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="far fa-star"></i>
                    <span>4.0</span>
                </span>
            </div>
            <div class="action-buttons">
                <button class="btn-edit" onclick="openEditPopup(this)">Edit</button>
                <button class="btn-delete" onclick="openPopup()">Delete</button>
            </div> 
        </div>
    `;

    // Log for debugging
    console.log('Product Added:', {
        productTitle,
        productDescription,
        productPrice,
        uploadedImage,
        productStock
    });

    // Append the new card to the shop container
    const shopContainer = document.getElementById('shop');  // Ensure the shop container exists in your HTML
    if (shopContainer) {
        shopContainer.appendChild(card);
    } else {
        console.log("Shop container not found.");
    }

    // Close the popup
    closePopup();

    // Reset form fields
    document.getElementById('productTitle').value = '';
    document.getElementById('productDescription').value = '';
    document.getElementById('productPrice').value = '';
    stock = 2; // Reset stock to default value
    updateStock();
}




//Edit Popup 


let currentCard = null; // Track the card being edited

function openEditPopup(button) {
    currentCard = button.closest('.card'); // Store the card being edited

    // Extract product details
    document.getElementById('editProductTitle').value = currentCard.querySelector('.title').innerText;
    document.getElementById('editProductDescription').value = currentCard.querySelector('.description').innerText;
    document.getElementById('editProductPrice').value = currentCard.querySelector('.price').innerText.replace('Rs ', '');
    document.getElementById('editStockCount').innerText = currentCard.querySelector('.stock').innerText.split(' ')[0];
    
    // Extract and display image
    const imageSrc = currentCard.querySelector('img').src;
    document.getElementById('editImagePreview').src = imageSrc;

    // Show popup
    document.getElementById('popup-overlay').style.display = 'block';
    document.getElementById('edit-popup').style.display = 'block';
}

function saveEditChanges() {
    if (!currentCard) return; // Ensure a card is selected

    // Update card values
    currentCard.querySelector('.title').innerText = document.getElementById('editProductTitle').value;
    currentCard.querySelector('.description').innerText = document.getElementById('editProductDescription').value;
    currentCard.querySelector('.price').innerText = `Rs ${document.getElementById('editProductPrice').value}`;
    currentCard.querySelector('.stock').innerText = `${document.getElementById('editStockCount').innerText} in stock`;

    // Update image if a new one is uploaded
    const imageInput = document.getElementById('editImageUpload');
    if (imageInput.files && imageInput.files[0]) {
        const reader = new FileReader();
        reader.onload = function (e) {
            currentCard.querySelector('img').src = e.target.result;
        };
        reader.readAsDataURL(imageInput.files[0]);
    }

    // Close popup
    document.getElementById('popup-overlay').style.display = 'none';
    document.getElementById('edit-popup').style.display = 'none';
    currentCard = null; // Reset card
}

// Handle Stock Count Buttons
document.getElementById('editIncrease').addEventListener('click', function() {
    const stockCountElement = document.getElementById('editStockCount');
    let stockCount = parseInt(stockCountElement.innerText);
    stockCountElement.innerText = stockCount + 1;
});

document.getElementById('editDecrease').addEventListener('click', function() {
    const stockCountElement = document.getElementById('editStockCount');
    let stockCount = parseInt(stockCountElement.innerText);
    if (stockCount > 0) {
        stockCountElement.innerText = stockCount - 1;
    }
});


// Delete Popup

// Function to open the delete popup near the card
function openDeletePopup(button) {
    // Get the card associated with the clicked delete button
    const card = button.closest('.card'); 
    
    // Store the card element in a global variable for later use
    window.cardToDelete = card;

    // Get the popup element
    let popup = document.getElementById("Delete-Popup");

    // Get the card's position relative to the page
    let cardRect = card.getBoundingClientRect();

    // Set the popup's position next to the card (e.g., to the right of the card)
    popup.style.left = cardRect.right + window.scrollX + 10 + 'px'; // Right of the card with a 10px offset
    popup.style.top = cardRect.top + window.scrollY + 'px'; // Align it vertically with the top of the card

    // Show the delete popup near the card
    popup.style.visibility = "visible";
    popup.style.transform = "scale(1)"; // Show the popup with a scaling transition
}

// Function to close the delete popup (when "No" is clicked)
function handleNo() {
    closeDeletePopup(); // Close the delete popup
}

// Function to close the delete popup
function closeDeletePopup() {
    let popup = document.getElementById("Delete-Popup");
    popup.style.visibility = "hidden";
    popup.style.transform = "scale(0)"; // Hide the popup
}

// Function to handle the "Delete" button click (remove the card)
function handleDelete() {
    // If a card is stored, remove it from the DOM
    if (window.cardToDelete) {
        window.cardToDelete.remove(); // Remove the card from the page
    }
    closeDeletePopup(); // Close the popup after deleting
}

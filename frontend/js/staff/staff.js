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
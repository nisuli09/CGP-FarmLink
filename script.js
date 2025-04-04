// === Register Farmer ===
async function registerFarmer() {
    const farmerData = {
      FirstName: document.getElementById("FirstName").value,
      LastName: document.getElementById("LastName").value,
      Email: document.getElementById("Email").value,
      Contact: document.getElementById("Contact").value,
      Address: document.getElementById("Address").value,
      NIC: document.getElementById("NIC").value,
      Gender: document.getElementById("Gender").value,
      AccNumber: document.getElementById("AccNumber").value,
      Location: document.getElementById("Location").value,
      Acres: parseFloat(document.getElementById("Acres").value),
      Compost: parseFloat(document.getElementById("Compost").value),
      Harvest: parseFloat(document.getElementById("Harvest").value),
    };
  
    try {
      const res = await fetch("http://localhost:5000/api/staff/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(farmerData),
      });
      const result = await res.json();
      if (res.ok) {
        alert("✅ Farmer Registered! ID: " + result.StaffID);
        document.getElementById("farmerForm").reset();
      } else {
        alert("❌ " + result.error);
      }
    } catch (error) {
      alert("❌ Failed to connect server");
      console.error(error);
    }
  }
  
  // === Load Farmers ===
  async function loadFarmers() {
    try {
      const res = await fetch("http://localhost:5000/api/staff/getFarmers");
      const farmers = await res.json();
      const tableBody = document.getElementById("farmerTableBody");
      tableBody.innerHTML = "";
  
      farmers.forEach(farmer => {
        tableBody.innerHTML += `
          <tr>
            <td>${farmer.FarmerID}</td>
            <td>${farmer.FirstName} ${farmer.LastName}</td>
            <td>${farmer.Email}</td>
            <td>${farmer.Contact}</td>
            <td>${farmer.NIC}</td>
            <td>${farmer.AccNumber}</td>
            <td>${farmer.Location}</td>
            <td>${farmer.Acres}</td>
            <td>${farmer.Compost}</td>
            <td>${farmer.Harvest}</td>
          </tr>`;
      });
    } catch (error) {
      console.error("Error loading farmers:", error);
    }
  }






  window.onload = () => {
    registerFarmer();
    loadFarmers()

  }
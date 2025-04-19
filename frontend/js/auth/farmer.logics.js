 import { createRequest } from "./api.requests.js";

const register = async() => {
    try {
        const firstName = document.getElementById("firstName").value;
        const lastName = document.getElementById("lastName").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        const contactNo = document.getElementById("contactNo").value;
        const route = document.getElementById("route").value;
        const city = document.getElementById("city").value;
        const state = document.getElementById("state").value;
        const nic = document.getElementById("nic").value;
        const gender = document.getElementById("gender").value;
        const accNo = document.getElementById("accNo").value;
        const location = document.getElementById("location").value;
        const acres = document.getElementById("acres").value;
        const compost = document.getElementById("compost").value;
        const harvest = document.getElementById("harvest").value;
        const termsAccepted = document.getElementById("terms").checked;

        console.log("Farmer registration attempt with data:", { firstName, lastName, email, contactNo, location, acres });

        if (!firstName || !lastName || !email || !password || !contactNo || !route || !city || !state || !nic || !gender || !accNo || !location || !acres || !compost || !harvest) {
            alert("All fields are required");
            return;
        }

        if (!termsAccepted) {
            alert("Terms should be accepted");
            return;
        }

        const requestBody = {
            first_name: firstName,
            last_name: lastName,
            email,
            password,
            phone: contactNo,
            route,
            city,
            state,
            nic,
            gender,
            acc_no: accNo,
            location,
            acres,
            compost,
            harvest,
            terms_accepted: termsAccepted
        };

        const result = await createRequest('farmer/register', requestBody);

        if (result.success) {
            console.log("Farmer registration successful:", result);
            alert("Registration successful! You can now login.");
            // Redirect to login page or clear form
            window.location.href = "/farmer?registered=true"; // Redirect with query parameter
        } else {
            console.log("Farmer registration failed:", result);
            alert(result.message || "Registration failed. Please try again.");
        }
    } catch (error) {
        console.error("Farmer registration error:", error);
        alert("An error occurred during registration. Please try again.");
    }
};

document.addEventListener('DOMContentLoaded', () => {
    console.log("Farmer page initialized");
    const login_btn = document.getElementById("login-btn");
    const register_btn = document.getElementById("register-btn");

    if (login_btn) {
        console.log("Farmer login button found, attaching event listener");
        login_btn.addEventListener('click', login);
    }

    if (register_btn) {
        console.log("Farmer register button found, attaching event listener");
        register_btn.addEventListener('click', register);
    }
})
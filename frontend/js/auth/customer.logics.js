import { createRequest } from "./api.requests.js";

const register = async() => {
    try {
        const firstName = document.getElementById("firstName").value;
        const lastName = document.getElementById("lastName").value;
        const email = document.getElementById("email").value;
        const contactNo = document.getElementById("contactNo").value;
        const route = document.getElementById("route").value;
        const city = document.getElementById("city").value;
        const state = document.getElementById("state").value;
        const nic = document.getElementById("nic").value;
        const password = document.getElementById("password").value;
        const gender = document.getElementById("gender").value;
        const termsAccepted = document.getElementById("terms").checked;

        console.log("Registration attempt with data:", { firstName, lastName, email, contactNo });

        if (!firstName || !lastName || !contactNo || !email || !route || !city || !state || !nic || !gender || !password) {
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
            phone: contactNo,
            route,
            city,
            state,
            nic,
            gender,
            password,
            terms_accepted: termsAccepted
        };

        const result = await createRequest('customer/register', requestBody);

        if (result.success) {
            console.log("Registration successful:", result);
            alert("Registration successful! You can now login.");
            // Redirect to login page or clear form
            window.location.href = "/customer?registered=true"; // Redirect with query parameter
        } else {
            console.log("Registration failed:", result);
            alert(result.message || "Registration failed. Please try again.");
        }
    } catch (error) {
        console.error("Registration error:", error);
        alert("An error occurred during registration. Please try again.");
    }
};

document.addEventListener('DOMContentLoaded', () => {
    console.log("Customer page initialized");
    const login_btn = document.getElementById("login-btn");
    const register_btn = document.getElementById("register-btn");

    if (login_btn) {
        console.log("Login button found, attaching event listener");
        login_btn.addEventListener('click', (e) => {
            e.preventDefault(); // Prevent form submission
            console.log("Login button clicked");
            login();
        });
    } else {
        console.log("Login button not found on this page");
    }

    if (register_btn) {
        console.log("Register button found, attaching event listener");
        register_btn.addEventListener('click', register);
    }
})
import { createRequest } from "../api.requests.js";

const login = async() => {
    try {
        const email = document.getElementById("mail").value;
        const password = document.getElementById("password").value;

        console.log("Attempting login with email:", email);
        
        if (!email || !password) {
            alert("Please enter both email and password");
            return;
        }

        const result = await createRequest('auth/login', {
            email: email,
            password: password
        });

        if (result && result.success) {
            console.log("Login successful:", result);
            
            // Store user info in localStorage
            if (result.result) {
                localStorage.setItem('userFirstName', result.result.firstName || 'User');
                localStorage.setItem('userLastName', result.result.lastName || '');
                localStorage.setItem('userEmail', result.result.email || '');
                localStorage.setItem('userType', result.result.type || '');
                localStorage.setItem('userNic', result.result.nic || '');
            }
            
            // check user type and redirect 
            const userType = result.result?.type?.toLowerCase() || '';
            console.log("User type:", userType);
            
            switch(userType) {
                case 'customer':
                    alert("Login successful! Redirecting to customer dashboard...");
                    window.location.href = "/customer-dashboard";
                    break;
                case 'farmer':
                    alert("Login successful! Redirecting to farmer dashboard...");
                    window.location.href = "/farmer-dashboard";
                    break;
                case 'staff':
                    alert("Login successful! Redirecting to staff dashboard...");
                    window.location.href = "/staff-dashboard";
                    break;
                default:
                    alert("Login successful!");
                    window.location.href = "/";
                    break;
            }
        } else {
            console.log("Login failed:", result);
            alert("Login failed. Please check your credentials.");
        }
    } catch (error) {
        console.error("Login error:", error);
        alert("An error occurred during login. Please try again.");
    }
}

document.addEventListener('DOMContentLoaded', () => {
    console.log("Login page initialized");
    const login_btn = document.getElementById("login-btn");

    if (login_btn) {
        console.log("Login button found, attaching event listener");
        login_btn.addEventListener('click', (e) => {
            e.preventDefault();
            console.log("Login button clicked");
            login();
        });
    } else {
        console.log("Login button not found on this page");
    }
});
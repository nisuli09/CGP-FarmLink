import { connection, db } from "../login/db.functions.js";

export const user_login = (req, res) => {
    console.log("Login attempt:", req.body.email);
    
    if (!connection) {
        console.error("Database connection failed");
        return res.status(500).send({
            code: 500,
            success: false,
            message: "Database connection failed"
        });
    }

    const { email, password } = req.body;

    if (!email || !password) {
        console.log("Login attempt missing email or password");
        return res.status(400).send({
            code: 400,
            success: false,
            message: "Email and password are required"
        });
    }

    //  user type 
    db.query(`SELECT * FROM users WHERE email = ? AND password = ?`, [email, password], function(error, result, fields) {
        if (error) {
            console.error("Database error during login:", error);
            return res.status(500).send({
                code: 500,
                success: false,
                message: "Database error occurred"
            });
        }
        
        if (result.length > 0) {
            const userType = result[0].type;
            console.log(`User login successful for ${userType}:`, email);
            
            res.send({
                code: 200,
                success: true,
                message: "Login successful",
                result: {
                    email: result[0].email,
                    firstName: result[0].first_name,
                    lastName: result[0].last_name,
                    type: userType,
                    nic: result[0].nic
                }
            });
        } else {
            console.log("Login failed - invalid credentials:", email);
            res.send({
                code: 401,
                success: false,
                message: "Invalid email or password"
            });
        }
    });
};
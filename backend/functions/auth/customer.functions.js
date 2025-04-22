import { connection, db } from "./db.functions.js"

export const customer_signup = (req, res) => {
    console.log("Customer registration attempt:", req.body.email);
    
    if (!connection) {
        console.error("Database connection failed");
        return res.status(500).send({ 
            code: 500,
            success: false,
            message: "Database connection failed" 
        });
    }

    const { first_name, last_name, email, phone, route, city, state, nic, gender, password } = req.body;

    console.log("Registration details:", { first_name, last_name, email, phone });

    if (!first_name || !last_name || !email || !phone || !route || !city || !state || !nic || !gender || !password) {
        console.log("Registration failed - missing fields");
        return res.status(400).send({ 
            code: 400,
            success: false,
            message: "All fields are required" 
        });
    }

    const checkEmailQuery = 'SELECT email FROM users WHERE email = ?';
    const checkNicQuery = 'SELECT nic FROM users WHERE nic = ?';

    db.query(checkEmailQuery, [email], (error, emailResult) => {
        if (error) {
            console.error('Database error during email check:', error);
            return res.status(500).send({ 
                code: 500,
                success: false,
                message: 'Server error' 
            });
        }

        if (emailResult.length > 0) {
            console.log("Registration failed - email already exists:", email);
            return res.status(409).send({ 
                code: 409,
                success: false,
                message: 'Email is already in use' 
            });
        }

        db.query(checkNicQuery, [nic], (error, nicResult) => {
            if (error) {
                console.error('Database error during NIC check:', error);
                return res.status(500).send({ 
                    code: 500,
                    success: false,
                    message: 'Server error' 
                });
            }

            if (nicResult.length > 0) {
                console.log("Registration failed - NIC already exists:", nic);
                return res.status(409).send({ 
                    code: 409,
                    success: false,
                    message: 'NIC is already in use' 
                });
            }

            const insertQuery = `
    INSERT INTO users (first_name, last_name, email, phone, nic, gender, password, type)
    VALUES (?, ?, ?, ?, ?, ?, ?, 'customer');

    INSERT INTO address (nic, route, city, state) 
    VALUES (?, ?, ?, ?);
`;

            const values = [
                first_name, last_name, email, phone, nic, gender === "male", password,
                nic, route, city, state
            ];

            db.query(insertQuery, values, (error, result) => {
                if (error) {
                    console.error('Database error during user insertion:', error);
                    return res.status(500).send({ 
                        code: 500,
                        success: false,
                        message: 'Server error during user creation' 
                    });
                }

                console.log("Customer registration successful:", email);
                res.status(201).send({
                    code: 201,
                    success: true,
                    message: 'User registered successfully',
                    userId: result.insertId
                });
            });
        });
    });
};
import { connection, db } from "./db.functions.js";

export const farmer_signup = (req, res) => {
    console.log("Farmer registration attempt:", req.body.email);

    if (!connection) {
        console.error("Database connection failed");
        return res.status(500).send({
            code: 500,
            success: false,
            message: "Database connection failed"
        });
    }

    const { first_name, last_name, email, password, phone, route, city, state, nic, gender, acc_no, location, acres, compost, harvest } = req.body;

    console.log("Farmer registration details:", { first_name, last_name, email, phone, location, acres });

    if (!first_name || !last_name || !email || !password || !phone || !route || !city || !state || !nic || !gender || !acc_no || !location || !acres || !compost || !harvest) {
        console.log("Farmer registration failed - missing fields");
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
            console.log("Farmer registration failed - email already exists:", email);
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
                console.log("Farmer registration failed - NIC already exists:", nic);
                return res.status(409).send({
                    code: 409,
                    success: false,
                    message: 'NIC is already in use'
                });
            }

            // Begin transaction
            db.beginTransaction(err => {
                if (err) {
                    console.error('Transaction error:', err);
                    return res.status(500).send({
                        code: 500,
                        success: false,
                        message: 'Server error starting transaction'
                    });
                }

                // Insert into users table
                const userInsertQuery = `INSERT INTO users (first_name, last_name, email, phone, nic, gender, password, type) 
                                        VALUES (?, ?, ?, ?, ?, ?, ?, 'Farmer')`;

                db.query(userInsertQuery, [first_name, last_name, email, phone, nic, gender === "male", password],
                    (error, userResult) => {
                        if (error) {
                            console.error('Database error during user insertion:', error);
                            return db.rollback(() => {
                                res.status(500).send({
                                    code: 500,
                                    success: false,
                                    message: 'Error creating user record'
                                });
                            });
                        }

                        // Insert into address table
                        const addressInsertQuery = `INSERT INTO address (nic, route, city, state) VALUES (?, ?, ?, ?)`;

                        db.query(addressInsertQuery, [nic, route, city, state],
                            (error, addressResult) => {
                                if (error) {
                                    console.error('Database error during address insertion:', error);
                                    return db.rollback(() => {
                                        res.status(500).send({
                                            code: 500,
                                            success: false,
                                            message: 'Error creating address record'
                                        });
                                    });
                                }

                                // Insert into farmer table
                                const farmerInsertQuery = `INSERT INTO farmer (nic, acc_no, location, acres, compost, harvest) 
                                                        VALUES (?, ?, ?, ?, ?, ?)`;

                                db.query(farmerInsertQuery, [nic, acc_no, location, acres, compost, harvest],
                                    (error, farmerResult) => {
                                        if (error) {
                                            console.error('Database error during farmer insertion:', error);
                                            return db.rollback(() => {
                                                res.status(500).send({
                                                    code: 500,
                                                    success: false,
                                                    message: 'Error creating farmer record'
                                                });
                                            });
                                        }

                                        // Commit the transaction
                                        db.commit(err => {
                                            if (err) {
                                                console.error('Transaction commit error:', err);
                                                return db.rollback(() => {
                                                    res.status(500).send({
                                                        code: 500,
                                                        success: false,
                                                        message: 'Error finalizing registration'
                                                    });
                                                });
                                            }

                                            console.log("Farmer registration successful:", email);
                                            res.status(201).send({
                                                code: 201,
                                                success: true,
                                                message: 'Farmer registered successfully',
                                                userId: userResult.insertId
                                            });
                                        });
                                    }
                                );
                            }
                        );
                    }
                );
            });
        });
    });
};
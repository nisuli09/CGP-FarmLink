// server.js
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mysql = require('mysql2');
const multer = require('multer');
const fs = require('fs');

const app = express();
const PORT = 3000;

// Set up multer for file uploads
const storage = multer.memoryStorage(); // Store files in memory as buffers
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024, // 5MB max file size
    },
    fileFilter: (req, file, cb) => {
        // Accept only image files
        if (file.mimetype.startsWith('image/')) {
            cb(null, true);
        } else {
            cb(new Error('Only image files are allowed!'), false);
        }
    }
});

// Middleware
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Database Connection
const db = mysql.createConnection({
    host: 'mysql-farmlinkdb.alwaysdata.net',
    user: '406199_farmlink',
    password: 'cD4LCNjt4pOl4ZU',
    database: 'farmlinkdb_host'
});

// Connect to database
db.connect(err => {
    if (err) {
        console.error('Error connecting to database:', err);
        console.log('Running in fallback mode with in-memory data');
        return;
    }
    console.log('Connected to MySQL database');

    // Create table if not exists
    const createTableQuery = `
    CREATE TABLE IF NOT EXISTS harvest_cards (
        card_id INT(11) PRIMARY KEY AUTO_INCREMENT,
        image VARCHAR(255),
        name VARCHAR(100),
        price DECIMAL(10,2),
        phone_no VARCHAR(15),
        location VARCHAR(100),
        description TEXT,
        rating DECIMAL(2,1),
        item_details TEXT,
        category VARCHAR(50),
        stock INT(11),
        days INT(11)
    )`;

    db.query(createTableQuery, (err) => {
        if (err) {
            console.error('Error creating table:', err);
            return;
        }
        console.log('Table checked/created successfully');
    });
});

// Fallback products array in case database connection fails
let fallbackProducts = [];

// API Routes
// Get all products
app.get('/api/products', (req, res) => {
    // Check if database is connected
    if (db.state === 'disconnected') {
        return res.json(fallbackProducts);
    }

    const query = 'SELECT * FROM harvest_cards';

    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching products:', err);
            return res.status(500).json({ error: 'Failed to fetch products' });
        }

        // Convert BLOB image data to base64 for easy transport
        const products = results.map(product => {
            const processedProduct = { ...product };
            if (product.image) {
                // Convert binary image data to Base64 string
                processedProduct.image = `data:image/jpeg;base64,${Buffer.from(product.image).toString('base64')}`;
            }
            return processedProduct;
        });

        res.json(products);
    });
});

// Get a single product
app.get('/api/products/:id', (req, res) => {
    const productId = req.params.id;

    // Check if database is connected
    if (db.state === 'disconnected') {
        const product = fallbackProducts.find(p => p.card_id === parseInt(productId));

        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        return res.json(product);
    }

    const query = 'SELECT * FROM harvest_cards WHERE card_id = ?';

    db.query(query, [productId], (err, results) => {
        if (err) {
            console.error('Error fetching product:', err);
            return res.status(500).json({ error: 'Failed to fetch product' });
        }

        if (results.length === 0) {
            return res.status(404).json({ error: 'Product not found' });
        }

        // Convert BLOB image data to base64
        const product = { ...results[0] };
        if (product.image) {
            product.image = `data:image/jpeg;base64,${Buffer.from(product.image).toString('base64')}`;
        }

        res.json(product);
    });
});

// Add a new product
// Add a new product
app.post('/api/products', upload.single('image'), (req, res) => {
    try {
        const {
            name, price, phone_no, location, description,
            category, item_details, stock, days
        } = req.body;

        // Check if required fields are present
        if (!name || !price) {
            return res.status(400).json({ error: 'Missing required fields: name and price are required' });
        }

        // Get the image data from the uploaded file
        const imageBuffer = req.file ? req.file.buffer : null;

        // Set a default rating for new products
        const rating = 5.0;

        // Set a default location if not provided
        const productLocation = location || 'Local Farm';

        // Check if database is connected
        if (db.state === 'disconnected') {
            console.log('Database disconnected, using fallback storage');
            const maxId = fallbackProducts.length > 0 ?
                fallbackProducts.reduce((max, product) => Math.max(max, product.card_id), 0) : 0;
            const newId = maxId + 1;

            // For fallback mode, convert image buffer to base64
            let imageData = null;
            if (imageBuffer) {
                imageData = `data:image/jpeg;base64,${imageBuffer.toString('base64')}`;
            }

            const newProduct = {
                card_id: newId,
                name,
                price,
                phone_no,
                location: productLocation,
                description,
                category,
                item_details,
                stock: stock || 1,
                days: days || 1,
                image: imageData,
                rating
            };

            fallbackProducts.push(newProduct);
            return res.status(201).json(newProduct);
        }

        console.log('Adding product to database:', {
            name, price, phone_no, location: productLocation,
            description, category, item_details, stock, days
        });

        // With database connected, insert the product
        const query = `
INSERT INTO harvest_cards 
(name, price, phone_no, location, description, category, item_details, stock, days, image, rating) 
VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

        db.query(
            query,
            [name, price, phone_no, productLocation, description, category, item_details, stock || 1, days || 1, imageBuffer, rating],
            (err, result) => {
                if (err) {
                    console.error('Error adding product:', err);
                    return res.status(500).json({ error: `Failed to add product: ${err.message}` });
                }

                // Return the created product with the new ID
                const createdProduct = {
                    card_id: result.insertId,  // This will be the auto-generated ID
                    name,
                    price,
                    phone_no,
                    location: productLocation,
                    description,
                    category,
                    item_details,
                    stock: stock || 1,
                    days: days || 1,
                    image: imageBuffer ? `data:image/jpeg;base64,${imageBuffer.toString('base64')}` : null,
                    rating
                };

                res.status(201).json(createdProduct);
            }
        );
    } catch (error) {
        console.error('Error processing request:', error);
        res.status(500).json({ error: `Server error: ${error.message}` });
    }
});

// Update a product
app.put('/api/products/:id', upload.single('image'), (req, res) => {
    try {
        const productId = req.params.id;
        const {
            name, price, phone_no, location, description,
            category, item_details, stock, days
        } = req.body;

        // Check if required fields are present
        if (!name || !price) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        // Get the image data from the uploaded file
        const imageBuffer = req.file ? req.file.buffer : null;

        // Set a default rating if not provided
        const rating = 5.0;

        // Check if database is connected
        if (db.state === 'disconnected') {
            const productIndex = fallbackProducts.findIndex(p => p.card_id === parseInt(productId));

            if (productIndex === -1) {
                return res.status(404).json({ error: 'Product not found' });
            }

            // For fallback mode, convert image buffer to base64 or keep existing image
            let imageData = fallbackProducts[productIndex].image;
            if (imageBuffer) {
                imageData = `data:image/jpeg;base64,${imageBuffer.toString('base64')}`;
            }

            const updatedProduct = {
                card_id: parseInt(productId),
                name,
                price,
                phone_no,
                location,
                description,
                category,
                item_details,
                stock: stock || fallbackProducts[productIndex].stock,
                days: days || fallbackProducts[productIndex].days,
                image: imageData,
                rating: fallbackProducts[productIndex].rating
            };

            fallbackProducts[productIndex] = updatedProduct;
            return res.json(updatedProduct);
        }

        // If a new image was uploaded, update it too; otherwise, just update the other fields
        let query, queryParams;

        if (imageBuffer) {
            query = `
            UPDATE harvest_cards 
            SET name = ?, price = ?, phone_no = ?, location = ?, description = ?, 
            category = ?, item_details = ?, stock = ?, days = ?, image = ?, rating = ? 
            WHERE card_id = ?`;

            queryParams = [name, price, phone_no, location, description,
                category, item_details, stock || 1, days || 1, imageBuffer, rating, productId];
        } else {
            query = `
            UPDATE harvest_cards 
            SET name = ?, price = ?, phone_no = ?, location = ?, description = ?, 
            category = ?, item_details = ?, stock = ?, days = ?, rating = ? 
            WHERE card_id = ?`;

            queryParams = [name, price, phone_no, location, description,
                category, item_details, stock || 1, days || 1, rating, productId];
        }

        db.query(query, queryParams, (err, result) => {
            if (err) {
                console.error('Error updating product:', err);
                return res.status(500).json({ error: 'Failed to update product' });
            }

            if (result.affectedRows === 0) {
                return res.status(404).json({ error: 'Product not found' });
            }

            // Get the updated product to return
            db.query('SELECT * FROM harvest_cards WHERE card_id = ?', [productId], (err, results) => {
                if (err || results.length === 0) {
                    return res.json({
                        card_id: parseInt(productId),
                        name,
                        price,
                        phone_no,
                        location,
                        description,
                        category,
                        item_details,
                        stock: stock || 1,
                        days: days || 1
                    });
                }

                // Convert BLOB image data to base64
                const product = { ...results[0] };
                if (product.image) {
                    product.image = `data:image/jpeg;base64,${Buffer.from(product.image).toString('base64')}`;
                }

                res.json(product);
            });
        });
    } catch (error) {
        console.error('Error processing request:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Delete a product
app.delete('/api/products/:id', (req, res) => {
    const productId = req.params.id;

    // Check if database is connected
    if (db.state === 'disconnected') {
        const productIndex = fallbackProducts.findIndex(p => p.card_id === parseInt(productId));

        if (productIndex === -1) {
            return res.status(404).json({ error: 'Product not found' });
        }

        fallbackProducts.splice(productIndex, 1);
        return res.json({ message: 'Product deleted successfully' });
    }

    const query = 'DELETE FROM harvest_cards WHERE card_id = ?';

    db.query(query, [productId], (err, result) => {
        if (err) {
            console.error('Error deleting product:', err);
            return res.status(500).json({ error: 'Failed to delete product' });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Product not found' });
        }

        res.json({ message: 'Product deleted successfully' });
    });
});

// Handle product details page
app.get('/product-details.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'product-details.html'));
});

// Handle cart page
app.get('/cart', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'cart.html'));
});

// Serve the HTML files
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'admin.html'));
});

// Error handler for multer file upload errors
app.use((err, req, res, next) => {
    if (err instanceof multer.MulterError) {
        // A Multer error occurred when uploading
        if (err.code === 'LIMIT_FILE_SIZE') {
            return res.status(400).json({ error: 'File too large. Maximum size is 5MB.' });
        }
        return res.status(400).json({ error: `Upload error: ${err.message}` });
    } else if (err) {
        // An unknown error occurred
        return res.status(500).json({ error: err.message });
    }
    next();
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Access the app at http://localhost:${PORT}`);
    console.log(`Access the admin panel at http://localhost:${PORT}/admin`);
    console.log(`Access the cart at http://localhost:${PORT}/cart`);
});
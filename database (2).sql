-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 21, 2025 at 04:53 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.1.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `database`
--

-- --------------------------------------------------------

--
-- Table structure for table `admindashboard`
--

CREATE TABLE `admindashboard` (
  `dashboard_id` int(11) NOT NULL,
  `number_of_staff` int(11) DEFAULT 0,
  `number_of_farmers` int(11) DEFAULT 0,
  `total_harvest` decimal(10,2) DEFAULT 0.00,
  `active_buyers` int(11) DEFAULT 0,
  `last_updated` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `buyers`
--

CREATE TABLE `buyers` (
  `buyer_id` int(11) NOT NULL,
  `buyer_name` varchar(255) NOT NULL,
  `address` text NOT NULL,
  `email` varchar(255) NOT NULL,
  `contact_number` varchar(20) NOT NULL,
  `nic` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `buy_cards`
--

CREATE TABLE `buy_cards` (
  `card_id` int(11) NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `name` varchar(100) DEFAULT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  `phone_no` varchar(15) DEFAULT NULL,
  `location` varchar(100) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `rating` decimal(2,1) DEFAULT NULL,
  `item_details` text DEFAULT NULL,
  `category` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `buy_items`
--

CREATE TABLE `buy_items` (
  `item_id` int(11) NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `name` varchar(100) DEFAULT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL,
  `total` decimal(10,2) DEFAULT NULL,
  `subtotal` decimal(10,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `fertilizer`
--

CREATE TABLE `fertilizer` (
  `fertilizer_id` int(11) NOT NULL,
  `fertilizer_name` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `price` decimal(10,2) NOT NULL,
  `stock` int(11) NOT NULL,
  `rating` decimal(3,2) DEFAULT NULL CHECK (`rating` >= 0 and `rating` <= 5),
  `category` varchar(100) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `harvest`
--

CREATE TABLE `harvest` (
  `harvest_id` int(11) NOT NULL,
  `farmer_id` int(11) NOT NULL,
  `contact_number` varchar(20) NOT NULL,
  `total_harvest` decimal(10,2) NOT NULL,
  `unit_price` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `harvest_cards`
--

CREATE TABLE `harvest_cards` (
  `card_id` int(11) NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `name` varchar(100) DEFAULT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  `phone_no` varchar(15) DEFAULT NULL,
  `location` varchar(100) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `rating` decimal(2,1) DEFAULT NULL,
  `item_details` text DEFAULT NULL,
  `category` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `harvest_cart`
--

CREATE TABLE `harvest_cart` (
  `cart_id` int(11) NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `name` varchar(100) DEFAULT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL,
  `total` decimal(10,2) DEFAULT NULL,
  `subtotal` decimal(10,2) DEFAULT NULL,
  `days` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `registration`
--

CREATE TABLE `registration` (
  `id` int(11) NOT NULL,
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `contact_no` varchar(10) NOT NULL,
  `address` varchar(255) NOT NULL,
  `city` varchar(50) NOT NULL,
  `state` varchar(50) NOT NULL,
  `nic` varchar(20) NOT NULL,
  `gender` enum('male','female') NOT NULL,
  `acc_no` varchar(20) NOT NULL,
  `location` varchar(100) NOT NULL,
  `acres` decimal(5,2) NOT NULL,
  `compost` varchar(100) NOT NULL,
  `harvest` varchar(100) NOT NULL,
  `terms_accepted` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `registration`
--

INSERT INTO `registration` (`id`, `first_name`, `last_name`, `email`, `contact_no`, `address`, `city`, `state`, `nic`, `gender`, `acc_no`, `location`, `acres`, `compost`, `harvest`, `terms_accepted`) VALUES
(1, 'John', 'Doe', 'john.doe@example.com', '0712345678', '123 Main St', 'Colombo', 'Western', '123456789V', 'male', 'ACC123456', 'Kurunegala', 5.50, 'Organic', '2500 kg', 1),
(2, 'Jane', 'Smith', 'jane.smith@example.com', '0723456789', '456 Elm St', 'Kandy', 'Central', '987654321V', 'female', 'ACC789012', 'Polonnaruwa', 3.25, 'Chemical', '1800 kg', 1),
(3, 'David', 'Perera', 'david.perera@example.com', '0734567890', '789 Pine St', 'Galle', 'Southern', '456123789V', 'male', 'ACC456789', 'Anuradhapura', 7.75, 'Mixed', '3200 kg', 1),
(7, 'aaaaaaaaaaaa', 'aaaaaa', 'dnwpathiraja@students.nsbm.ac.lk', '1111111111', 'aaaaaaaaaaaaaaaaa', 'aaaaaaaaaa', 'aaaaaaaaaa', '234567890', 'male', '567890', 'aaaaaaaaa', 0.00, 'aaaaaaaa', 'aaaaaaaaa', 0),
(8, 'lllllllllllllllllll', 'lllllllllllllllllll', 'asdfghjkl@gmail.com', '1345678457', 'fghjklljh', 'llllllllllll', 'lllllllllllllllllllll', '123456789000000', 'male', '2345678', 'llllllllllllll', 0.00, 'llllllllllllllll', 'lllllllllllllll', 0);

-- --------------------------------------------------------

--
-- Table structure for table `rent_cards`
--

CREATE TABLE `rent_cards` (
  `card_id` int(11) NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `name` varchar(100) DEFAULT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  `phone_no` varchar(15) DEFAULT NULL,
  `location` varchar(100) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `rating` decimal(2,1) DEFAULT NULL,
  `item_details` text DEFAULT NULL,
  `category` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `rent_items`
--

CREATE TABLE `rent_items` (
  `item_id` int(11) NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `name` varchar(100) DEFAULT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL,
  `total` decimal(10,2) DEFAULT NULL,
  `subtotal` decimal(10,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `shops`
--

CREATE TABLE `shops` (
  `item_id` int(11) NOT NULL,
  `item_name` varchar(255) NOT NULL,
  `item_price` decimal(10,2) NOT NULL,
  `quantity` int(11) NOT NULL,
  `description` text DEFAULT NULL,
  `product_img` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `staff`
--

CREATE TABLE `staff` (
  `staff_id` int(11) NOT NULL,
  `first_name` varchar(100) NOT NULL,
  `last_name` varchar(100) NOT NULL,
  `contact_number` varchar(20) NOT NULL,
  `position` varchar(100) NOT NULL,
  `gender` enum('Male','Female','Other') NOT NULL,
  `joined_date` date NOT NULL,
  `nic` varchar(20) NOT NULL,
  `email` varchar(255) NOT NULL,
  `username` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `contact_no` varchar(10) NOT NULL,
  `address` varchar(255) NOT NULL,
  `city` varchar(50) NOT NULL,
  `state` varchar(50) NOT NULL,
  `nic` varchar(20) NOT NULL,
  `gender` enum('male','female') NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(100) NOT NULL,
  `terms_accepted` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `first_name`, `last_name`, `email`, `contact_no`, `address`, `city`, `state`, `nic`, `gender`, `username`, `password`, `terms_accepted`) VALUES
(1, 'John', 'Doe', 'john.doe@example.com', '0712345678', '123 Main St', 'Colombo', 'Western', '123456789V', 'male', 'johndoe', '$2y$10$abcdefghij1234567890', 1),
(2, 'Jane', 'Smith', 'jane.smith@example.com', '0723456789', '456 Elm St', 'Kandy', 'Central', '987654321V', 'female', 'janesmith', '$2y$10$klmnopqrst1234567890', 1),
(3, 'David', 'Perera', 'david.perera@example.com', '0734567890', '789 Pine St', 'Galle', 'Southern', '456123789V', 'male', 'davidp', '$2y$10$uvwxyzabcd1234567890', 1),
(7, 'aaaaaaaaaaaa', 'aaaaaa', 'senud417@gmail.com', '23456789', 'aaaaaaaaaa', 'aaaaaa', 'aaaaaaaaaaa', '234567890', 'male', 'aaaaaaaaa', 'aaaaaaaaaaa', 0),
(8, 'ssssssssssssss', 'sssssssssss', 'senud418@gmail.com', '1234567890', 'asdfghjkl', 'zxcvbnm,', 'ghjkl;pjugyv', '1234567890', 'male', 'ssssssssss', 'gggggh57f5d4', 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admindashboard`
--
ALTER TABLE `admindashboard`
  ADD PRIMARY KEY (`dashboard_id`);

--
-- Indexes for table `buyers`
--
ALTER TABLE `buyers`
  ADD PRIMARY KEY (`buyer_id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `nic` (`nic`);

--
-- Indexes for table `buy_cards`
--
ALTER TABLE `buy_cards`
  ADD PRIMARY KEY (`card_id`);

--
-- Indexes for table `buy_items`
--
ALTER TABLE `buy_items`
  ADD PRIMARY KEY (`item_id`);

--
-- Indexes for table `fertilizer`
--
ALTER TABLE `fertilizer`
  ADD PRIMARY KEY (`fertilizer_id`);

--
-- Indexes for table `harvest`
--
ALTER TABLE `harvest`
  ADD PRIMARY KEY (`harvest_id`);

--
-- Indexes for table `harvest_cards`
--
ALTER TABLE `harvest_cards`
  ADD PRIMARY KEY (`card_id`);

--
-- Indexes for table `harvest_cart`
--
ALTER TABLE `harvest_cart`
  ADD PRIMARY KEY (`cart_id`);

--
-- Indexes for table `registration`
--
ALTER TABLE `registration`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `nic` (`nic`);

--
-- Indexes for table `rent_cards`
--
ALTER TABLE `rent_cards`
  ADD PRIMARY KEY (`card_id`);

--
-- Indexes for table `rent_items`
--
ALTER TABLE `rent_items`
  ADD PRIMARY KEY (`item_id`);

--
-- Indexes for table `shops`
--
ALTER TABLE `shops`
  ADD PRIMARY KEY (`item_id`);

--
-- Indexes for table `staff`
--
ALTER TABLE `staff`
  ADD PRIMARY KEY (`staff_id`),
  ADD UNIQUE KEY `nic` (`nic`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `username` (`username`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `nic` (`nic`),
  ADD UNIQUE KEY `username` (`username`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admindashboard`
--
ALTER TABLE `admindashboard`
  MODIFY `dashboard_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `buyers`
--
ALTER TABLE `buyers`
  MODIFY `buyer_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `buy_cards`
--
ALTER TABLE `buy_cards`
  MODIFY `card_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `buy_items`
--
ALTER TABLE `buy_items`
  MODIFY `item_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `fertilizer`
--
ALTER TABLE `fertilizer`
  MODIFY `fertilizer_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `harvest`
--
ALTER TABLE `harvest`
  MODIFY `harvest_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `harvest_cards`
--
ALTER TABLE `harvest_cards`
  MODIFY `card_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `harvest_cart`
--
ALTER TABLE `harvest_cart`
  MODIFY `cart_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `registration`
--
ALTER TABLE `registration`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `rent_cards`
--
ALTER TABLE `rent_cards`
  MODIFY `card_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `rent_items`
--
ALTER TABLE `rent_items`
  MODIFY `item_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `shops`
--
ALTER TABLE `shops`
  MODIFY `item_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `staff`
--
ALTER TABLE `staff`
  MODIFY `staff_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 08, 2023 at 07:52 AM
-- Server version: 10.4.22-MariaDB
-- PHP Version: 8.1.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `loanprediction`
--

-- --------------------------------------------------------

--
-- Table structure for table `bank`
--

CREATE TABLE `bank` (
  `bank_id` int(11) NOT NULL,
  `bank_name` varchar(255) DEFAULT NULL,
  `shortform` varchar(255) DEFAULT NULL,
  `interest_rate` varchar(255) DEFAULT NULL,
  `tenure` varchar(255) DEFAULT NULL,
  `processing_fee` varchar(255) DEFAULT NULL,
  `loan_name` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `bank`
--

INSERT INTO `bank` (`bank_id`, `bank_name`, `shortform`, `interest_rate`, `tenure`, `processing_fee`, `loan_name`) VALUES
(7, 'Laxmi Sunrise', 'LS', '12.99% -14.99%', '15 years', '0', 'Personal-Loan Fixed Rate'),
(8, 'Nepal Bank Nepal Bank Ltd', 'NBL', '13.05% -14.05%', '10 years', '0', 'Personal Term loan'),
(9, 'Nepal SBI Nepal SBI Bank', 'SBI', '15.50%-15.50%', '10 years', '0', 'Personal TL-Fixed'),
(10, 'RBB Rastriya Baya Bank', 'RBB', '13.50% -13.50%', '10 years', '0', 'Personal-Loan Fixed Rate'),
(11, 'NIC Asia', 'NIC', '10.76% -16.76%', '5 years', '0', 'Personal Loan'),
(12, 'TOCASIA Bank', 'TOCASIA', 'Base Date Update', '5 years', '0', 'Personal Term loan'),
(13, 'Nepal Bank Nepal Bank Ltd.', 'NBL', '12.55% 13.55%', '5 years', '0', 'Personal Term loan'),
(14, 'NIC ASIA Bank', 'NIC', '14.99% -14.99%', '5 years', '0', 'Personal Loan Fixer'),
(15, 'Nepal Bank Nepal Bank Ltd', 'NBL', '13.50% - 14.50%', '5 years', '0', 'Personal Term Loan-Fixed Rate'),
(16, 'Nepal SBI Nepal 581 Bank', 'SBI', '14.50% -14.50%', '5 years', '0', 'Personal TL-Fixed'),
(17, 'SCB Standard Chartered task', 'SCB', '13.25% -13,25%', '5 years', '0', 'Personal Loan Fixed Rate'),
(18, 'Nepal SBI Nepal SBI Bank', 'SBI', '13.50% -13.50%', '3 years', '0', 'Personal TL-Fixed'),
(19, 'Krishi Bikas Agriculture Dev. Bank', 'KBADB', '10.34% -15.34%', '0', '0', 'Overdraft-individual'),
(20, 'RBB Rastriya Baya Bank', 'RBB', '11.77% -12.02%', '0', '0', 'Personal Loan'),
(21, 'Sanima Bank', 'SB', '10.06% -15.06%', '0', '0', 'Personal Overdraft/Loan'),
(22, 'Prabhu Bank', 'PB', '10.18%-15.18%', '0', '0', 'Other Personal Loan');

-- --------------------------------------------------------

--
-- Table structure for table `blogs`
--

CREATE TABLE `blogs` (
  `blog_id` int(11) NOT NULL,
  `blog_name` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `date` varchar(255) DEFAULT NULL,
  `slug` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `blogs`
--

INSERT INTO `blogs` (`blog_id`, `blog_name`, `description`, `image`, `date`, `slug`) VALUES
(4, 'hello hai ok', '<p>comming soon</p>', 'image-1695915668238.png', '2023-09-28', 'hello-hai-ok'),
(5, 'aa as asd', '<p><strong><em>aaa</em></strong></p>', 'image-1696685059918.png', '2023-10-07', 'aa-as-asd'),
(6, 'asd', '<p>laptop</p>', 'image-1696685075675.jpg', '2023-10-07', 'asd'),
(7, 'a', '<p>asdx</p>', 'image-1696685092929.jpg', '2023-10-07', 'a'),
(8, 'hello hai', '<p>aa</p>', 'image-1696685133879.png', '2023-10-07', 'hello-hai');

-- --------------------------------------------------------

--
-- Table structure for table `feedback`
--

CREATE TABLE `feedback` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `description` longtext DEFAULT NULL,
  `date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `feedback`
--

INSERT INTO `feedback` (`id`, `user_id`, `description`, `date`) VALUES
(1, 9, 'aa aa', '2023-10-07'),
(2, 9, 'aa aa', '2023-10-07'),
(3, 9, 'bb', '2023-10-07'),
(4, 9, 'bb', '2023-10-07'),
(5, 9, 'aa', '2023-10-07'),
(6, 9, 'bb', '2023-10-07'),
(7, 10, 'test', '2023-10-08');

-- --------------------------------------------------------

--
-- Table structure for table `prediction`
--

CREATE TABLE `prediction` (
  `predict_id` int(11) NOT NULL,
  `Education` varchar(255) DEFAULT NULL,
  `Self_Employed` varchar(255) DEFAULT NULL,
  `Married` varchar(255) DEFAULT NULL,
  `Gender` varchar(255) DEFAULT NULL,
  `ApplicantIncome` varchar(255) DEFAULT NULL,
  `Dependents` varchar(255) DEFAULT NULL,
  `CoapplicantIncome` varchar(255) DEFAULT NULL,
  `Credit_History` varchar(255) DEFAULT NULL,
  `Loan_Amount_Term` varchar(255) DEFAULT NULL,
  `LoanAmount` varchar(255) DEFAULT NULL,
  `Property_Area` varchar(255) DEFAULT NULL,
  `Result` varchar(255) DEFAULT NULL,
  `userid` int(11) DEFAULT NULL,
  `date` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `prediction`
--

INSERT INTO `prediction` (`predict_id`, `Education`, `Self_Employed`, `Married`, `Gender`, `ApplicantIncome`, `Dependents`, `CoapplicantIncome`, `Credit_History`, `Loan_Amount_Term`, `LoanAmount`, `Property_Area`, `Result`, `userid`, `date`) VALUES
(6, 'Ungraduated', 'Yes', 'No', 'Male', '0', '0', '0', '0', '0', '0', 'Urban', 'No', 9, NULL),
(35, 'Graduated', 'Yes', 'Yes', 'Male', '1', '1', '1', '1', '1', '1', 'SemiUrban', 'Yes', 9, '2023-10-04'),
(36, 'Graduated', 'Yes', 'No', 'Male', '20000', '1', '30000', '1', '360', '100000', 'SemiUrban', 'Yes', 9, '2023-10-06');

-- --------------------------------------------------------

--
-- Table structure for table `registration`
--

CREATE TABLE `registration` (
  `registration_id` int(11) NOT NULL,
  `firstName` varchar(255) DEFAULT NULL,
  `lastName` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `role` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `registration`
--

INSERT INTO `registration` (`registration_id`, `firstName`, `lastName`, `email`, `password`, `created_at`, `role`) VALUES
(4, 'anup', 'kasula', 'ak@gmail.com', '$2b$10$LaMxmCJuOUdAKmCkyG1v1OUu3XRXaNad3JokM1My446sURVrYvFzS', NULL, NULL),
(5, 'anup', 'kasula', 'aka@gmail.com', '$2b$10$sUpMfwx/gZX4F4uhf65Gx.2qsG74gHyQmYZXVyUSyZrCS/fHT4LCi', '2023-07-15 11:46:09', NULL),
(6, 'aa', 'nn', 'admin@softsaro.com', '$2b$10$tlPIqlW1Ni3bANpya3osE.h2jcRg.CYJl8Xi7GNL4uCzE6H1BXUau', '2023-07-15 12:12:28', NULL),
(7, 'a', 'aa', 'freelancer@gmail.com', '$2b$10$YLZmdu/0EG5/F2iBdejMpuCtrYTXgMXDw5sdu/y5dHt7F623bTt/i', '2023-07-15 12:24:53', NULL),
(8, 'aa', 'bb', 'anup@adsaro.com', '$2b$10$s4k30m4UOhsHSWVBrX8tiOoLq9yW3gdMelPgyUfZRidWXN5bI1QHW', '2023-07-15 12:25:30', NULL),
(9, 'aa', 'kk', 'anup@softsaro.com', '$2b$10$eYOgM0Vx0ZwVDXg9.6e4nuPhL4Dl42GA8M1s1pti0PIeYnNN5VTFm', '2023-07-15 12:34:51', NULL),
(10, 'Admin', 'Admin', 'admin@gmail.com', '$2b$10$nFPVJ/6Sn5JWJNB9iXZfEuRzB4kznMhvZOm6TaYDNWvsR7HRsDCAO', '2023-07-22 13:05:36', 'ADMIN'),
(11, 'test', 'me', 'test@gmail.com', '$2b$10$p1idB0nxM1v6L/N70la9b.TufXvVkIXnhl8VjR5bTfPzLDFqRyUCK', '2023-08-31 18:40:26', NULL),
(12, 'hello', 'hello', 'hellos@gmail.com', '$2b$10$eAUVHXVcuRMyaf7riEN7IeUxyaVTU57fuYcfKjsB6OFS0t54a1SxW', '2023-09-26 11:53:44', NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `bank`
--
ALTER TABLE `bank`
  ADD PRIMARY KEY (`bank_id`);

--
-- Indexes for table `blogs`
--
ALTER TABLE `blogs`
  ADD PRIMARY KEY (`blog_id`);

--
-- Indexes for table `feedback`
--
ALTER TABLE `feedback`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `prediction`
--
ALTER TABLE `prediction`
  ADD PRIMARY KEY (`predict_id`);

--
-- Indexes for table `registration`
--
ALTER TABLE `registration`
  ADD PRIMARY KEY (`registration_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `bank`
--
ALTER TABLE `bank`
  MODIFY `bank_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `blogs`
--
ALTER TABLE `blogs`
  MODIFY `blog_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `feedback`
--
ALTER TABLE `feedback`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `prediction`
--
ALTER TABLE `prediction`
  MODIFY `predict_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;

--
-- AUTO_INCREMENT for table `registration`
--
ALTER TABLE `registration`
  MODIFY `registration_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

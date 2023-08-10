-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 10, 2023 at 03:45 PM
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
  `userid` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `prediction`
--

INSERT INTO `prediction` (`predict_id`, `Education`, `Self_Employed`, `Married`, `Gender`, `ApplicantIncome`, `Dependents`, `CoapplicantIncome`, `Credit_History`, `Loan_Amount_Term`, `LoanAmount`, `Property_Area`, `Result`, `userid`) VALUES
(6, 'Ungraduated', 'Yes', 'No', 'Male', '0', '0', '0', '0', '0', '0', 'Urban', 'No', 9),
(7, 'Graduated', 'Yes', 'Yes', 'Male', '1', '1', '1', '1', '1', '1', 'SemiUrban', 'No', 9),
(8, 'Graduated', 'Yes', 'No', 'Male', '1', '1', '1', '1', '1', '1', 'SemiUrban', 'No', 10),
(9, 'Graduated', 'Yes', 'No', 'Male', '1', '1', '1', '1', '1', '1', 'SemiUrban', 'No', 10),
(10, 'Graduated', 'Yes', 'No', 'Male', '1', '1', '1', '1', '1', '1', 'SemiUrban', 'Yes', 10);

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
(10, 'Admin', 'Admin', 'admin@gmail.com', '$2b$10$nFPVJ/6Sn5JWJNB9iXZfEuRzB4kznMhvZOm6TaYDNWvsR7HRsDCAO', '2023-07-22 13:05:36', 'ADMIN');

--
-- Indexes for dumped tables
--

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
-- AUTO_INCREMENT for table `prediction`
--
ALTER TABLE `prediction`
  MODIFY `predict_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `registration`
--
ALTER TABLE `registration`
  MODIFY `registration_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

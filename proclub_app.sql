-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               8.0.28 - MySQL Community Server - GPL
-- Server OS:                    Win64
-- HeidiSQL Version:             11.2.0.6213
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Dumping database structure for proclub_app
CREATE DATABASE IF NOT EXISTS `proclub_app` /*!40100 DEFAULT CHARACTER SET latin1 */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `proclub_app`;

-- Dumping structure for table proclub_app.paymentships
CREATE TABLE IF NOT EXISTS `paymentships` (
  `id` int NOT NULL AUTO_INCREMENT,
  `transaction_id` int NOT NULL,
  `amount` int NOT NULL,
  `user_id` int NOT NULL,
  `method` varchar(255) NOT NULL,
  `type` enum('in','out') NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

-- Dumping data for table proclub_app.paymentships: ~1 rows (approximately)
/*!40000 ALTER TABLE `paymentships` DISABLE KEYS */;
INSERT INTO `paymentships` (`id`, `transaction_id`, `amount`, `user_id`, `method`, `type`, `created_at`, `updated_at`) VALUES
	(1, 1, 2500000, 1, 'gopay', 'in', '2023-05-18 07:46:19', '2023-05-18 07:46:19');
/*!40000 ALTER TABLE `paymentships` ENABLE KEYS */;

-- Dumping structure for table proclub_app.products
CREATE TABLE IF NOT EXISTS `products` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `price` decimal(10,0) NOT NULL,
  `category` varchar(255) NOT NULL,
  `desc` varchar(255) NOT NULL,
  `images` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

-- Dumping data for table proclub_app.products: ~2 rows (approximately)
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` (`id`, `name`, `price`, `category`, `desc`, `images`, `created_at`, `updated_at`) VALUES
	(1, 'HP Samsung A05s', 2500000, 'fisik', 'Samsung A05s 4/64 minus pemakaian', './images/test.png', '2023-05-18 07:23:54', '2023-05-18 07:23:54'),
	(2, 'HP Samsung A05s', 2500000, 'fisik', 'Samsung A05s 4/64 minus pemakaian', './images/test.png', '2023-05-18 07:23:58', '2023-05-18 07:23:58');
/*!40000 ALTER TABLE `products` ENABLE KEYS */;

-- Dumping structure for table proclub_app.rooms
CREATE TABLE IF NOT EXISTS `rooms` (
  `id` char(36) CHARACTER SET latin1 COLLATE latin1_bin NOT NULL,
  `seller_id` int NOT NULL,
  `buyer_id` int DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Dumping data for table proclub_app.rooms: ~2 rows (approximately)
/*!40000 ALTER TABLE `rooms` DISABLE KEYS */;
INSERT INTO `rooms` (`id`, `seller_id`, `buyer_id`, `created_at`, `updated_at`) VALUES
	('4b2f5c44-c995-4cbd-9914-f4afadbcde7d', 1, NULL, '2023-05-18 07:23:58', '2023-05-18 07:23:58'),
	('d3cf60d8-d7de-4544-82f7-389fd1f7eed7', 1, NULL, '2023-05-18 07:23:54', '2023-05-18 07:23:54');
/*!40000 ALTER TABLE `rooms` ENABLE KEYS */;

-- Dumping structure for table proclub_app.sequelizemeta
CREATE TABLE IF NOT EXISTS `sequelizemeta` (
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`name`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8_unicode_ci;

-- Dumping data for table proclub_app.sequelizemeta: ~6 rows (approximately)
/*!40000 ALTER TABLE `sequelizemeta` DISABLE KEYS */;
INSERT INTO `sequelizemeta` (`name`) VALUES
	('20230508095846-create-user.js'),
	('20230508162711-create-user.js'),
	('20230513095757-create-transaction.js'),
	('20230513180123-create-product.js'),
	('20230513180753-create-transaction.js'),
	('20230513180942-create-room.js');
/*!40000 ALTER TABLE `sequelizemeta` ENABLE KEYS */;

-- Dumping structure for table proclub_app.transactions
CREATE TABLE IF NOT EXISTS `transactions` (
  `id` int NOT NULL AUTO_INCREMENT,
  `product_id` int DEFAULT NULL,
  `room_id` char(36) CHARACTER SET latin1 COLLATE latin1_bin DEFAULT NULL,
  `tax` decimal(10,0) NOT NULL,
  `shipping_fee` int NOT NULL DEFAULT '0',
  `negotiable` tinyint(1) DEFAULT '0',
  `status` enum('JOIN','DIBAYAR','DIPROSES','DIKIRIM','SELESAI','DIBATALKAN') DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `product_id` (`product_id`),
  KEY `room_id` (`room_id`),
  CONSTRAINT `transactions_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `transactions_ibfk_2` FOREIGN KEY (`room_id`) REFERENCES `rooms` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

-- Dumping data for table proclub_app.transactions: ~2 rows (approximately)
/*!40000 ALTER TABLE `transactions` DISABLE KEYS */;
INSERT INTO `transactions` (`id`, `product_id`, `room_id`, `tax`, `shipping_fee`, `negotiable`, `status`, `created_at`, `updated_at`) VALUES
	(1, 1, 'd3cf60d8-d7de-4544-82f7-389fd1f7eed7', 10000, 0, 0, NULL, '2023-05-18 07:23:54', '2023-05-18 07:23:54'),
	(2, 2, '4b2f5c44-c995-4cbd-9914-f4afadbcde7d', 10000, 0, 0, NULL, '2023-05-18 07:23:58', '2023-05-18 07:23:58');
/*!40000 ALTER TABLE `transactions` ENABLE KEYS */;

-- Dumping structure for table proclub_app.users
CREATE TABLE IF NOT EXISTS `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `phone_number` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `address` varchar(255) DEFAULT NULL,
  `balance` decimal(10,0) NOT NULL DEFAULT '0',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Dumping data for table proclub_app.users: ~0 rows (approximately)
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
/*!40000 ALTER TABLE `users` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;

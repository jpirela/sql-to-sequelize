-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Versión del servidor:         9.0.1 - MySQL Community Server - GPL
-- SO del servidor:              Win64
-- HeidiSQL Versión:             12.10.0.7000
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Volcando estructura de base de datos para lawebe_propuesta
CREATE DATABASE IF NOT EXISTS `lawebe_propuesta` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `lawebe_propuesta`;

-- Volcando estructura para tabla lawebe_propuesta.admin_accounts
CREATE TABLE IF NOT EXISTS `admin_accounts` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(250) NOT NULL,
  `id_store` bigint NOT NULL,
  `user` varchar(70) NOT NULL,
  `password` varchar(70) NOT NULL,
  `email` varchar(250) DEFAULT '',
  `admin` tinyint(1) NOT NULL DEFAULT '0',
  `super_admin` tinyint(1) NOT NULL DEFAULT '0',
  `active` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `fk_id_store_admin_account` (`id_store`),
  CONSTRAINT `fk_id_store_admin_account` FOREIGN KEY (`id_store`) REFERENCES `stores` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=45 DEFAULT CHARSET=utf8mb3;

-- La exportación de datos fue deseleccionada.

-- Volcando estructura para tabla lawebe_propuesta.affiliates
CREATE TABLE IF NOT EXISTS `affiliates` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(250) NOT NULL,
  `type` varchar(20) NOT NULL,
  `commissions` decimal(4,2) NOT NULL,
  `web_link` varchar(250) NOT NULL,
  `tax_code` varchar(250) NOT NULL,
  `email` varchar(250) NOT NULL,
  `phone` varchar(250) NOT NULL,
  `mobile` varchar(250) NOT NULL,
  `payment_method` varchar(100) NOT NULL,
  `payment_entity` varchar(100) NOT NULL,
  `payment_data` varchar(100) NOT NULL,
  `address` longtext NOT NULL,
  `zipcode` varchar(250) NOT NULL,
  `city` varchar(250) NOT NULL,
  `country` varchar(150) NOT NULL,
  `user` varchar(64) NOT NULL,
  `password` varchar(64) NOT NULL,
  `active` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unq_user_affiliates` (`user`) USING BTREE,
  UNIQUE KEY `unq_email_affiliates` (`email`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- La exportación de datos fue deseleccionada.

-- Volcando estructura para tabla lawebe_propuesta.affiliates_contacts
CREATE TABLE IF NOT EXISTS `affiliates_contacts` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `id_affiliate` bigint NOT NULL,
  `type_biz` varchar(50) NOT NULL,
  `name` varchar(255) NOT NULL,
  `web_link` varchar(250) DEFAULT NULL,
  `email` varchar(250) NOT NULL,
  `address` longtext NOT NULL,
  `zipcode` varchar(20) NOT NULL,
  `city` varchar(250) NOT NULL,
  `country` varchar(150) NOT NULL,
  `lat` varchar(45) NOT NULL,
  `lng` varchar(45) NOT NULL,
  `phone` varchar(250) NOT NULL,
  `mobile` varchar(250) NOT NULL,
  `contact` varchar(255) DEFAULT NULL,
  `contact_dept` varchar(255) DEFAULT NULL,
  `contact_email` varchar(255) DEFAULT NULL,
  `contact_phone` varchar(50) DEFAULT NULL,
  `contact_mobile` varchar(50) DEFAULT NULL,
  `status_visit` tinyint NOT NULL DEFAULT '33',
  `active` tinyint(1) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `fk_id_affiliate_affiliates_contacts` (`id_affiliate`),
  CONSTRAINT `fk_id_affiliate_affiliates_contacts` FOREIGN KEY (`id_affiliate`) REFERENCES `affiliates` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- La exportación de datos fue deseleccionada.

-- Volcando estructura para tabla lawebe_propuesta.affiliates_zones
CREATE TABLE IF NOT EXISTS `affiliates_zones` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `id_affiliate` bigint NOT NULL,
  `comunidad` varchar(250) NOT NULL,
  `provincia` varchar(250) NOT NULL,
  `poblacion` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `fk_id_affiliate_affiliates_zones` (`id_affiliate`),
  CONSTRAINT `fk_id_affiliate_affiliates_zones` FOREIGN KEY (`id_affiliate`) REFERENCES `affiliates` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- La exportación de datos fue deseleccionada.

-- Volcando estructura para tabla lawebe_propuesta.attributes
CREATE TABLE IF NOT EXISTS `attributes` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(250) NOT NULL,
  `utilities` varchar(250) NOT NULL,
  `caption` varchar(100) DEFAULT NULL,
  `id_category` bigint DEFAULT NULL,
  `level` tinyint(1) NOT NULL DEFAULT '1',
  `parent` bigint DEFAULT NULL,
  `visible` tinyint(1) NOT NULL DEFAULT '1',
  `active` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `fk_parent_attribute` (`parent`) USING BTREE,
  KEY `fk_id_category_attribute` (`id_category`) USING BTREE,
  CONSTRAINT `fk_id_category_attribute` FOREIGN KEY (`id_category`) REFERENCES `categories` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `fk_parent_attribute` FOREIGN KEY (`parent`) REFERENCES `attributes` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=68 DEFAULT CHARSET=utf8mb3;

-- La exportación de datos fue deseleccionada.

-- Volcando estructura para tabla lawebe_propuesta.attributes_tags
CREATE TABLE IF NOT EXISTS `attributes_tags` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `id_product` bigint DEFAULT NULL,
  `id_attribute_value` bigint DEFAULT NULL,
  `id_attr_tag` bigint NOT NULL,
  `show_tag` tinyint(1) NOT NULL DEFAULT '1',
  `show_pral` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `fk_id_product_attributes_tags` (`id_product`),
  CONSTRAINT `fk_id_product_attributes_tags` FOREIGN KEY (`id_product`) REFERENCES `products` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=86255 DEFAULT CHARSET=utf8mb3;

-- La exportación de datos fue deseleccionada.

-- Volcando estructura para tabla lawebe_propuesta.attributes_values
CREATE TABLE IF NOT EXISTS `attributes_values` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `id_attribute` bigint NOT NULL,
  `value` varchar(150) NOT NULL,
  `parent` bigint DEFAULT NULL,
  `active` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `fk_id_attribute_attributes_values` (`id_attribute`) USING BTREE,
  KEY `fk_parent_attributes_values` (`parent`) USING BTREE,
  CONSTRAINT `fk_id_attribute_attributes_values` FOREIGN KEY (`id_attribute`) REFERENCES `attributes` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `fk_parent_attributes_values` FOREIGN KEY (`parent`) REFERENCES `attributes_values` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=20414 DEFAULT CHARSET=utf8mb3;

-- La exportación de datos fue deseleccionada.

-- Volcando estructura para tabla lawebe_propuesta.attr_tags
CREATE TABLE IF NOT EXISTS `attr_tags` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `title` varchar(100) NOT NULL,
  `utilities` varchar(250) NOT NULL,
  `id_category` bigint DEFAULT NULL,
  `value` varchar(100) NOT NULL,
  `description` text NOT NULL,
  `color` varchar(10) NOT NULL,
  `img` varchar(250) NOT NULL,
  `url` varchar(250) DEFAULT '',
  `position` tinyint NOT NULL,
  `show` tinyint(1) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `fk_id_category_attr_tags` (`id_category`),
  CONSTRAINT `fk_id_category_attr_tags` FOREIGN KEY (`id_category`) REFERENCES `categories` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=1714 DEFAULT CHARSET=utf8mb3;

-- La exportación de datos fue deseleccionada.

-- Volcando estructura para tabla lawebe_propuesta.carriers
CREATE TABLE IF NOT EXISTS `carriers` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `is_company` tinyint(1) NOT NULL,
  `name` varchar(250) NOT NULL,
  `short_name` varchar(60) NOT NULL,
  `tax_code` varchar(30) NOT NULL,
  `email` varchar(250) NOT NULL,
  `phone` varchar(250) NOT NULL,
  `fax` varchar(250) NOT NULL,
  `address` longtext NOT NULL,
  `zipcode` varchar(250) NOT NULL,
  `city` varchar(250) NOT NULL,
  `url_tracking` varchar(250) DEFAULT NULL,
  `url_logo` varchar(250) DEFAULT '',
  `active` tinyint(1) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb3;

-- La exportación de datos fue deseleccionada.

-- Volcando estructura para tabla lawebe_propuesta.carriers_rates
CREATE TABLE IF NOT EXISTS `carriers_rates` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `id_carrier` bigint NOT NULL,
  `id_zone_type` bigint NOT NULL,
  `id_zone_rate` bigint NOT NULL,
  `up_to` decimal(10,2) NOT NULL,
  `subprice` decimal(10,2) NOT NULL,
  `fuel` decimal(10,2) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_id_carrier_carriers_rates` (`id_carrier`) USING BTREE,
  KEY `fk_id_zone_type_carriers_rates` (`id_zone_type`) USING BTREE,
  KEY `fk_id_zone_rate_carriers_rates` (`id_zone_rate`) USING BTREE,
  CONSTRAINT `fk_id_carrier_carriers_rates` FOREIGN KEY (`id_carrier`) REFERENCES `carriers` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `fk_id_zone_rate_carriers_rates` FOREIGN KEY (`id_zone_rate`) REFERENCES `zone_rates` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `fk_id_zone_type_carriers_rates` FOREIGN KEY (`id_zone_type`) REFERENCES `zones_types` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- La exportación de datos fue deseleccionada.

-- Volcando estructura para tabla lawebe_propuesta.carriers_zones
CREATE TABLE IF NOT EXISTS `carriers_zones` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `id_zone_type` bigint NOT NULL,
  `id_carrier` bigint NOT NULL,
  `id_zone_rate` bigint NOT NULL,
  `id_location` bigint DEFAULT NULL,
  `zone_location` varchar(75) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- La exportación de datos fue deseleccionada.

-- Volcando estructura para tabla lawebe_propuesta.carts
CREATE TABLE IF NOT EXISTS `carts` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `id_client` bigint NOT NULL,
  `id_product_variant` bigint NOT NULL,
  `id_store` bigint NOT NULL,
  `packages` tinyint NOT NULL,
  `disc` tinyint NOT NULL,
  `quantity` int NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `offert` decimal(10,2) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `fk_id_client_cart` (`id_client`),
  KEY `fk_id_store_cart` (`id_store`),
  KEY `fk_id_product_variant_cart` (`id_product_variant`),
  CONSTRAINT `fk_id_client_cart` FOREIGN KEY (`id_client`) REFERENCES `clients` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `fk_id_product_variant_cart` FOREIGN KEY (`id_product_variant`) REFERENCES `products_primes` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `fk_id_store_cart` FOREIGN KEY (`id_store`) REFERENCES `stores` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- La exportación de datos fue deseleccionada.

-- Volcando estructura para tabla lawebe_propuesta.carts_options
CREATE TABLE IF NOT EXISTS `carts_options` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `id_cart` bigint NOT NULL,
  `id_product_option` bigint NOT NULL,
  `quantity` int NOT NULL DEFAULT '1',
  `price_extra` decimal(10,2) NOT NULL DEFAULT '0.00',
  PRIMARY KEY (`id`),
  KEY `id_cart` (`id_cart`),
  KEY `id_product_option` (`id_product_option`),
  CONSTRAINT `fk_id_cart_carts_options` FOREIGN KEY (`id_cart`) REFERENCES `carts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_id_product_option_carts_options` FOREIGN KEY (`id_product_option`) REFERENCES `products_options` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- La exportación de datos fue deseleccionada.

-- Volcando estructura para tabla lawebe_propuesta.categories
CREATE TABLE IF NOT EXISTS `categories` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(250) NOT NULL,
  `sx` bigint NOT NULL,
  `dx` bigint NOT NULL,
  `id_attribute_first` bigint NOT NULL,
  `id_attribute_second` bigint NOT NULL,
  `meta_keywords` longtext NOT NULL,
  `meta_description` longtext NOT NULL,
  `parent` bigint DEFAULT NULL,
  `position` tinyint NOT NULL,
  `visible` tinyint(1) NOT NULL,
  `active` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `fk_parent_categorie` (`parent`) USING BTREE,
  KEY `fk_id_attribute_first_categorie` (`id_attribute_first`),
  KEY `fk_id_attribute_second_categorie` (`id_attribute_second`),
  CONSTRAINT `fk_parent_categorie` FOREIGN KEY (`parent`) REFERENCES `categories` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=283 DEFAULT CHARSET=utf8mb3;

-- La exportación de datos fue deseleccionada.

-- Volcando estructura para tabla lawebe_propuesta.clients
CREATE TABLE IF NOT EXISTS `clients` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `id_affiliate` bigint DEFAULT NULL,
  `id_store` bigint NOT NULL,
  `via` varchar(50) DEFAULT NULL,
  `accounting_plan` int DEFAULT NULL,
  `is_company` tinyint(1) NOT NULL,
  `name` varchar(250) NOT NULL,
  `lastname` varchar(250) NOT NULL,
  `tax_code` varchar(250) NOT NULL,
  `email` varchar(250) NOT NULL,
  `amz_email` varchar(250) NOT NULL,
  `phone` varchar(250) NOT NULL,
  `fax` varchar(250) NOT NULL,
  `road` varchar(50) NOT NULL,
  `address` longtext NOT NULL,
  `zipcode` varchar(250) NOT NULL,
  `idcity` int DEFAULT NULL,
  `city` varchar(250) NOT NULL,
  `user` varchar(84) NOT NULL,
  `password` varchar(64) NOT NULL,
  `enabled` tinyint(1) NOT NULL,
  `level` tinyint(1) NOT NULL,
  `date_client` datetime NOT NULL,
  `privacy` tinyint(1) NOT NULL,
  `advertising` tinyint(1) NOT NULL DEFAULT '0',
  `send` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unq_id_store_user` (`id_store`,`user`) USING BTREE,
  UNIQUE KEY `unq_id_store_email` (`id_store`,`email`) USING BTREE,
  KEY `fK_id_affiliate_clients` (`id_affiliate`),
  CONSTRAINT `fK_id_affiliate_clients` FOREIGN KEY (`id_affiliate`) REFERENCES `clients` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `fk_id_store_clients` FOREIGN KEY (`id_store`) REFERENCES `stores` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- La exportación de datos fue deseleccionada.

-- Volcando estructura para tabla lawebe_propuesta.clients_address
CREATE TABLE IF NOT EXISTS `clients_address` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `id_client` bigint NOT NULL,
  `phone` varchar(250) NOT NULL,
  `fax` varchar(250) NOT NULL,
  `address` longtext NOT NULL,
  `zipcode` varchar(250) NOT NULL,
  `city` varchar(250) NOT NULL,
  `main` tinyint(1) NOT NULL,
  `active` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  KEY `fk_id_client_clients_address` (`id_client`),
  CONSTRAINT `fk_id_client_clients_address` FOREIGN KEY (`id_client`) REFERENCES `clients` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- La exportación de datos fue deseleccionada.

-- Volcando estructura para tabla lawebe_propuesta.invoices
CREATE TABLE IF NOT EXISTS `invoices` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `serie` varchar(6) NOT NULL DEFAULT 'D13000',
  `number` int NOT NULL,
  `products_list` longtext NOT NULL,
  `data` date NOT NULL,
  `schedule` datetime NOT NULL,
  `id_client` bigint NOT NULL,
  `session_client` varchar(20) NOT NULL,
  `subtotal` decimal(65,10) NOT NULL,
  `grandtotal` decimal(65,2) NOT NULL,
  `tax` decimal(65,10) NOT NULL,
  `shipping_price` decimal(65,10) NOT NULL,
  `payment_method` text NOT NULL,
  `paypal_status` varchar(250) NOT NULL,
  `paypal_id_transaction` varchar(250) NOT NULL,
  `paypal_email_client` varchar(250) NOT NULL,
  `paypal_array` longtext NOT NULL,
  `payment_price` decimal(65,10) NOT NULL,
  `payment_advance` decimal(65,10) NOT NULL,
  `discount_cupon` decimal(20,2) NOT NULL,
  `billing_address` longtext NOT NULL,
  `shipping_address` longtext NOT NULL,
  `code_order` varchar(10) NOT NULL,
  `payed` tinyint(1) NOT NULL,
  `processed` tinyint(1) NOT NULL,
  `process_date` datetime NOT NULL,
  `status_order` tinyint NOT NULL DEFAULT '5',
  `carrier` varchar(250) NOT NULL,
  `carrier_link` varchar(250) NOT NULL,
  `carrier_tracking` varchar(250) NOT NULL,
  `platform` varchar(50) NOT NULL,
  `order_platform` varchar(50) NOT NULL,
  `guest` tinyint(1) NOT NULL,
  `pl_multitax_array` longtext NOT NULL,
  PRIMARY KEY (`id`),
  KEY `idx_code_order` (`code_order`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- La exportación de datos fue deseleccionada.

-- Volcando estructura para tabla lawebe_propuesta.invoices_return
CREATE TABLE IF NOT EXISTS `invoices_return` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `serie` varchar(6) NOT NULL DEFAULT 'A13000',
  `number` int NOT NULL,
  `number_invoice` varchar(12) NOT NULL,
  `date_invoice` date NOT NULL,
  `products_list` longtext NOT NULL,
  `data` date NOT NULL,
  `data_order` date NOT NULL,
  `id_client` bigint NOT NULL,
  `session_client` varchar(20) NOT NULL,
  `subtotal` decimal(65,10) NOT NULL,
  `grandtotal` decimal(65,10) NOT NULL,
  `tax` decimal(65,10) NOT NULL,
  `shipping_price` decimal(65,10) NOT NULL,
  `payment_method` text NOT NULL,
  `paypal_status` varchar(250) NOT NULL,
  `paypal_id_transaction` varchar(250) NOT NULL,
  `paypal_email_client` varchar(250) NOT NULL,
  `paypal_array` longtext NOT NULL,
  `payment_price` decimal(65,10) NOT NULL,
  `payment_advance` decimal(65,10) NOT NULL,
  `billing_address` longtext NOT NULL,
  `shipping_address` longtext NOT NULL,
  `coupon` varchar(15) DEFAULT NULL,
  `discount_coupon` decimal(20,2) DEFAULT NULL,
  `code_order` varchar(10) NOT NULL,
  `payed` tinyint(1) NOT NULL,
  `processed` tinyint(1) NOT NULL,
  `process_date` datetime NOT NULL,
  `status_order` tinyint NOT NULL DEFAULT '5',
  `carrier` varchar(250) NOT NULL,
  `carrier_link` varchar(250) NOT NULL,
  `carrier_tracking` varchar(250) NOT NULL,
  `guest` tinyint(1) NOT NULL,
  `pl_multitax_array` longtext NOT NULL,
  PRIMARY KEY (`id`),
  KEY `code_order` (`code_order`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- La exportación de datos fue deseleccionada.

-- Volcando estructura para tabla lawebe_propuesta.invoice_detail
CREATE TABLE IF NOT EXISTS `invoice_detail` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `code_union` int NOT NULL,
  `id_supplier` int NOT NULL,
  `name_supplier` varchar(100) NOT NULL,
  `code_order` varchar(13) NOT NULL,
  `code_supp` varchar(13) NOT NULL,
  `date_order` date NOT NULL,
  `date_schedule` date NOT NULL,
  `line_supp` int NOT NULL,
  `name_line` varchar(250) NOT NULL,
  `notes_line` varchar(250) NOT NULL,
  `model_line` varchar(250) NOT NULL,
  `qta_line` decimal(10,2) NOT NULL,
  `price_line` decimal(10,2) NOT NULL,
  `subtotal_line` decimal(10,2) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- La exportación de datos fue deseleccionada.

-- Volcando estructura para tabla lawebe_propuesta.options
CREATE TABLE IF NOT EXISTS `options` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(250) NOT NULL,
  `utilities` varchar(250) NOT NULL,
  `caption` varchar(100) NOT NULL,
  `observations` varchar(450) NOT NULL,
  `id_category` bigint DEFAULT NULL,
  `position` tinyint NOT NULL,
  `active` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `fk_id_categorie_option` (`id_category`),
  CONSTRAINT `fk_id_categorie_option` FOREIGN KEY (`id_category`) REFERENCES `categories` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=165 DEFAULT CHARSET=utf8mb3;

-- La exportación de datos fue deseleccionada.

-- Volcando estructura para tabla lawebe_propuesta.options_values
CREATE TABLE IF NOT EXISTS `options_values` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `id_option` bigint NOT NULL,
  `value` varchar(150) NOT NULL,
  `extra_price` decimal(10,2) NOT NULL DEFAULT '0.00',
  `position` tinyint NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `fk_id_option_options_values` (`id_option`) USING BTREE,
  CONSTRAINT `fk_id_option_options_values` FOREIGN KEY (`id_option`) REFERENCES `options` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3014 DEFAULT CHARSET=utf8mb3;

-- La exportación de datos fue deseleccionada.

-- Volcando estructura para tabla lawebe_propuesta.orders
CREATE TABLE IF NOT EXISTS `orders` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `id_client` bigint NOT NULL,
  `id_store` bigint NOT NULL,
  `id_platform` bigint DEFAULT NULL,
  `date` datetime NOT NULL,
  `schedule` datetime NOT NULL,
  `session_client` varchar(20) DEFAULT NULL,
  `ip_client` varchar(20) DEFAULT NULL,
  `subtotal` decimal(65,10) NOT NULL,
  `grandtotal` decimal(65,10) NOT NULL,
  `tax` decimal(65,10) NOT NULL,
  `shipping_price` decimal(65,10) NOT NULL,
  `payment_method` text NOT NULL,
  `paypal_status` varchar(250) NOT NULL,
  `paypal_id_transaction` varchar(250) NOT NULL,
  `amazon_id_order` varchar(100) NOT NULL,
  `paypal_email_client` varchar(250) NOT NULL,
  `paypal_array` longtext NOT NULL,
  `payment_price` decimal(65,10) NOT NULL,
  `payment_advance` decimal(65,10) NOT NULL,
  `billing_address` longtext NOT NULL,
  `shipping_address` longtext NOT NULL,
  `notes` varchar(1000) DEFAULT NULL,
  `coupon` varchar(15) NOT NULL,
  `discount_coupon` decimal(20,2) NOT NULL,
  `code_order` varchar(10) NOT NULL,
  `payed` tinyint(1) NOT NULL,
  `processed` tinyint(1) NOT NULL,
  `commission` tinyint(1) NOT NULL,
  `invoiced` tinyint(1) NOT NULL DEFAULT '0',
  `process_date` datetime NOT NULL,
  `status_order` tinyint NOT NULL DEFAULT '5',
  `carrier` varchar(250) NOT NULL,
  `carrier_link` varchar(250) NOT NULL,
  `carrier_tracking` varchar(250) NOT NULL,
  `platform` varchar(50) DEFAULT NULL,
  `order_platform` varchar(50) DEFAULT NULL,
  `is_prime` varchar(25) DEFAULT NULL,
  `promise_date` datetime NOT NULL,
  `guest` tinyint(1) NOT NULL,
  `pl_multitax_array` longtext NOT NULL,
  `revised` tinyint(1) NOT NULL DEFAULT '0',
  `followup_date` date NOT NULL,
  `followup_notes` varchar(200) NOT NULL DEFAULT '',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_code_order_ord` (`code_order`),
  KEY `idx_order_platform` (`order_platform`),
  KEY `fk_id_client_orders` (`id_client`),
  KEY `fk_id_store_orders` (`id_store`),
  KEY `fk_id_platform_orders` (`id_platform`),
  CONSTRAINT `fk_id_client_orders` FOREIGN KEY (`id_client`) REFERENCES `clients` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `fk_id_platform_orders` FOREIGN KEY (`id_platform`) REFERENCES `platforms` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `fk_id_store_orders` FOREIGN KEY (`id_store`) REFERENCES `stores` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- La exportación de datos fue deseleccionada.

-- Volcando estructura para tabla lawebe_propuesta.orders_canceled
CREATE TABLE IF NOT EXISTS `orders_canceled` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `products_list` longtext NOT NULL,
  `data` datetime NOT NULL,
  `schedule` datetime NOT NULL,
  `id_client` bigint NOT NULL,
  `session_client` varchar(20) NOT NULL,
  `subtotal` decimal(65,10) NOT NULL,
  `grandtotal` decimal(65,10) NOT NULL,
  `tax` decimal(65,10) NOT NULL,
  `shipping_price` decimal(65,10) NOT NULL,
  `payment_method` text NOT NULL,
  `paypal_status` varchar(250) NOT NULL,
  `paypal_id_transaction` varchar(250) NOT NULL,
  `amazon_id_order` varchar(100) NOT NULL,
  `paypal_email_client` varchar(250) NOT NULL,
  `paypal_array` longtext NOT NULL,
  `payment_price` decimal(65,10) NOT NULL,
  `payment_advance` decimal(65,10) NOT NULL,
  `billing_address` longtext NOT NULL,
  `shipping_address` longtext NOT NULL,
  `notes` varchar(1000) DEFAULT NULL,
  `coupon` varchar(15) NOT NULL,
  `discount_coupon` decimal(20,2) NOT NULL,
  `code_order` varchar(10) NOT NULL,
  `payed` tinyint(1) NOT NULL,
  `processed` tinyint(1) NOT NULL,
  `commission` tinyint(1) NOT NULL,
  `invoiced` tinyint(1) NOT NULL DEFAULT '0',
  `process_date` datetime NOT NULL,
  `status_order` tinyint NOT NULL DEFAULT '5',
  `carrier` varchar(250) NOT NULL,
  `carrier_link` varchar(250) NOT NULL,
  `carrier_tracking` varchar(250) NOT NULL,
  `platform` varchar(50) NOT NULL,
  `order_platform` varchar(50) DEFAULT NULL,
  `is_prime` varchar(25) DEFAULT NULL,
  `promise_date` datetime NOT NULL,
  `guest` tinyint(1) NOT NULL,
  `pl_multitax_array` longtext NOT NULL,
  `revised` int NOT NULL DEFAULT '0',
  `followup_date` date NOT NULL,
  `followup_notes` varchar(200) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- La exportación de datos fue deseleccionada.

-- Volcando estructura para tabla lawebe_propuesta.orders_charged
CREATE TABLE IF NOT EXISTS `orders_charged` (
  `id` int NOT NULL AUTO_INCREMENT,
  `date_process` varchar(180) NOT NULL,
  `date_movement` varchar(180) NOT NULL,
  `u_from` int NOT NULL,
  `id_order` int NOT NULL,
  `method_charged` varchar(180) NOT NULL,
  `amount` decimal(65,10) NOT NULL,
  `notes` text,
  `url_file` varchar(250) DEFAULT NULL,
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- La exportación de datos fue deseleccionada.

-- Volcando estructura para tabla lawebe_propuesta.orders_products
CREATE TABLE IF NOT EXISTS `orders_products` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `id_order` bigint DEFAULT NULL,
  `id_product_variant` bigint NOT NULL,
  `packages` tinyint NOT NULL,
  `disc` tinyint NOT NULL,
  `quantity` int NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `offert` decimal(10,2) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `fk_id_product_variant_cart` (`id_product_variant`),
  KEY `fk_id_order_orders_products` (`id_order`),
  CONSTRAINT `fk_id_order_orders_products` FOREIGN KEY (`id_order`) REFERENCES `orders` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `fk_id_product_variant_orders_products` FOREIGN KEY (`id_product_variant`) REFERENCES `products_primes` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- La exportación de datos fue deseleccionada.

-- Volcando estructura para tabla lawebe_propuesta.orders_products_options
CREATE TABLE IF NOT EXISTS `orders_products_options` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `id_order_product` bigint NOT NULL,
  `id_product_option` bigint NOT NULL,
  `quantity` int NOT NULL DEFAULT '1',
  `price_extra` decimal(10,2) NOT NULL DEFAULT '0.00',
  PRIMARY KEY (`id`),
  KEY `fk_id_order_product_orders_products_options` (`id_order_product`) USING BTREE,
  KEY `fk_id_product_opction_orders_products_options` (`id_product_option`) USING BTREE,
  CONSTRAINT `fk_id_order_product_orders_products_options` FOREIGN KEY (`id_order_product`) REFERENCES `orders_products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_id_product_opction_orders_products_options` FOREIGN KEY (`id_product_option`) REFERENCES `products_options` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- La exportación de datos fue deseleccionada.

-- Volcando estructura para tabla lawebe_propuesta.orders_return
CREATE TABLE IF NOT EXISTS `orders_return` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `products_list` longtext NOT NULL,
  `data` datetime NOT NULL,
  `data_order` datetime NOT NULL,
  `id_client` bigint NOT NULL,
  `session_client` varchar(20) NOT NULL,
  `subtotal` decimal(65,10) NOT NULL,
  `grandtotal` decimal(65,10) NOT NULL,
  `tax` decimal(65,10) NOT NULL,
  `shipping_price` decimal(65,10) NOT NULL,
  `payment_method` text NOT NULL,
  `paypal_status` varchar(250) NOT NULL,
  `paypal_id_transaction` varchar(250) NOT NULL,
  `paypal_email_client` varchar(250) NOT NULL,
  `paypal_array` longtext NOT NULL,
  `payment_price` decimal(65,10) NOT NULL,
  `payment_advance` decimal(65,10) NOT NULL,
  `billing_address` longtext NOT NULL,
  `shipping_address` longtext NOT NULL,
  `notes` varchar(1000) DEFAULT NULL,
  `coupon` varchar(15) DEFAULT NULL,
  `discount_coupon` decimal(20,2) DEFAULT NULL,
  `code_order` varchar(10) NOT NULL,
  `number_invoice` varchar(12) NOT NULL,
  `date_invoice` date NOT NULL,
  `payed` tinyint(1) NOT NULL,
  `processed` tinyint(1) NOT NULL,
  `process_date` datetime NOT NULL,
  `status_order` tinyint NOT NULL DEFAULT '5',
  `carrier` varchar(250) NOT NULL,
  `carrier_link` varchar(250) NOT NULL,
  `carrier_tracking` varchar(250) NOT NULL,
  `guest` tinyint(1) NOT NULL,
  `pl_multitax_array` longtext NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- La exportación de datos fue deseleccionada.

-- Volcando estructura para tabla lawebe_propuesta.orders_return_charged
CREATE TABLE IF NOT EXISTS `orders_return_charged` (
  `id` int NOT NULL AUTO_INCREMENT,
  `date_process` varchar(50) NOT NULL,
  `date_movement` varchar(50) NOT NULL,
  `u_from` int NOT NULL,
  `id_order` int NOT NULL,
  `method_charged` varchar(180) NOT NULL,
  `amount` decimal(65,10) NOT NULL,
  `notes` text,
  `url_file` varchar(250) DEFAULT NULL,
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- La exportación de datos fue deseleccionada.

-- Volcando estructura para tabla lawebe_propuesta.orders_suppliers
CREATE TABLE IF NOT EXISTS `orders_suppliers` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `id_supplier` bigint NOT NULL,
  `code_sup_order` varchar(10) NOT NULL,
  `id_order_client` bigint NOT NULL,
  `id_product` bigint NOT NULL,
  `id_attribute` bigint NOT NULL,
  `id_option` bigint NOT NULL,
  `qta` int NOT NULL,
  `data` datetime NOT NULL,
  `data_client` datetime NOT NULL,
  `schedule` datetime NOT NULL,
  `id_client` bigint NOT NULL,
  `session_client` varchar(20) NOT NULL,
  `subtotal` decimal(65,10) NOT NULL,
  `grandtotal` decimal(65,10) NOT NULL,
  `tax` decimal(65,10) NOT NULL,
  `shipping_price` decimal(65,10) NOT NULL,
  `payment_method` text NOT NULL,
  `paypal_status` varchar(250) NOT NULL,
  `paypal_id_transaction` varchar(250) NOT NULL,
  `paypal_email_client` varchar(250) NOT NULL,
  `paypal_array` longtext NOT NULL,
  `payment_price` decimal(65,10) NOT NULL,
  `billing_address` longtext NOT NULL,
  `shipping_address` longtext NOT NULL,
  `code_order` varchar(10) NOT NULL,
  `payed` tinyint(1) NOT NULL,
  `processed` tinyint(1) NOT NULL,
  `shipped` tinyint(1) NOT NULL,
  `ordered` tinyint(1) NOT NULL DEFAULT '1',
  `process_date` datetime NOT NULL,
  `shipping_date` datetime NOT NULL,
  `id_carrier` varchar(10) NOT NULL DEFAULT '',
  `carrier` varchar(250) NOT NULL,
  `carrier_link` varchar(250) NOT NULL,
  `carrier_tracking` varchar(250) NOT NULL,
  `guest` tinyint(1) NOT NULL,
  `pl_multitax_array` longtext NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- La exportación de datos fue deseleccionada.

-- Volcando estructura para tabla lawebe_propuesta.orders_suppliers_charged
CREATE TABLE IF NOT EXISTS `orders_suppliers_charged` (
  `id` int NOT NULL AUTO_INCREMENT,
  `date_process` varchar(180) NOT NULL,
  `date_movement` varchar(180) NOT NULL,
  `u_from` int NOT NULL,
  `id_order` int NOT NULL,
  `method_charged` varchar(180) NOT NULL,
  `amount` decimal(65,10) NOT NULL,
  `notes` text,
  `url_file` varchar(250) DEFAULT NULL,
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- La exportación de datos fue deseleccionada.

-- Volcando estructura para tabla lawebe_propuesta.orders_suppliers_prov
CREATE TABLE IF NOT EXISTS `orders_suppliers_prov` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `id_supplier` bigint NOT NULL,
  `code_sup_order` varchar(10) NOT NULL,
  `id_order_client` bigint NOT NULL,
  `products_list` longtext NOT NULL,
  `data` datetime NOT NULL,
  `data_client` datetime NOT NULL,
  `schedule` datetime NOT NULL,
  `id_client` bigint NOT NULL,
  `session_client` varchar(20) NOT NULL,
  `subtotal` decimal(65,10) NOT NULL,
  `grandtotal` decimal(65,10) NOT NULL,
  `tax` decimal(65,10) NOT NULL,
  `shipping_price` decimal(65,10) NOT NULL,
  `payment_method` text NOT NULL,
  `paypal_status` varchar(250) NOT NULL,
  `paypal_id_transaction` varchar(250) NOT NULL,
  `paypal_email_client` varchar(250) NOT NULL,
  `paypal_array` longtext NOT NULL,
  `payment_price` decimal(65,10) NOT NULL,
  `billing_address` longtext NOT NULL,
  `shipping_address` longtext NOT NULL,
  `code_order` varchar(10) NOT NULL,
  `payed` tinyint(1) NOT NULL,
  `processed` tinyint(1) NOT NULL,
  `shipped` tinyint(1) NOT NULL,
  `ordered` tinyint(1) NOT NULL DEFAULT '1',
  `process_date` datetime NOT NULL,
  `shipping_date` datetime NOT NULL,
  `id_carrier` varchar(15) NOT NULL DEFAULT '',
  `carrier` varchar(250) NOT NULL,
  `carrier_link` varchar(250) NOT NULL,
  `carrier_tracking` varchar(250) NOT NULL,
  `guest` tinyint(1) NOT NULL,
  `pl_multitax_array` longtext NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- La exportación de datos fue deseleccionada.

-- Volcando estructura para tabla lawebe_propuesta.platforms
CREATE TABLE IF NOT EXISTS `platforms` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `code` varchar(50) DEFAULT NULL,
  `name` varchar(100) NOT NULL,
  `description` text,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb3;

-- La exportación de datos fue deseleccionada.

-- Volcando estructura para tabla lawebe_propuesta.products
CREATE TABLE IF NOT EXISTS `products` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(250) NOT NULL,
  `tag_extra` varchar(250) NOT NULL,
  `tag_extra_name` varchar(50) NOT NULL,
  `url_image` varchar(250) NOT NULL,
  `description` text NOT NULL,
  `id_category` bigint NOT NULL,
  `code` varchar(100) NOT NULL,
  `tax` decimal(65,10) NOT NULL,
  `units` varchar(50) NOT NULL,
  `comments` longtext,
  `meta_title` varchar(250) NOT NULL,
  `meta_keywords` text NOT NULL,
  `meta_description` text NOT NULL,
  `marked` tinyint(1) NOT NULL DEFAULT '0',
  `visible` tinyint(1) NOT NULL,
  `active` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `fk_id_category_products` (`id_category`) USING BTREE,
  CONSTRAINT `fk_id_category_products` FOREIGN KEY (`id_category`) REFERENCES `categories` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=729 DEFAULT CHARSET=utf8mb3;

-- La exportación de datos fue deseleccionada.

-- Volcando estructura para tabla lawebe_propuesta.products_attributes
CREATE TABLE IF NOT EXISTS `products_attributes` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `id_product` bigint NOT NULL,
  `id_attribute_value1` bigint NOT NULL,
  `id_attribute_value2` bigint NOT NULL,
  `img_index1` tinyint NOT NULL DEFAULT '0',
  `img_index2` tinyint NOT NULL DEFAULT '0',
  `weight` decimal(10,2) NOT NULL,
  `weight_2` decimal(10,2) NOT NULL,
  `weight_pack` decimal(10,2) NOT NULL,
  `width` decimal(10,2) NOT NULL,
  `width_pack` decimal(10,2) NOT NULL,
  `length` decimal(10,2) NOT NULL,
  `length_pack` decimal(10,2) NOT NULL,
  `height` decimal(10,2) NOT NULL,
  `height_pack` decimal(10,2) NOT NULL,
  `packages` decimal(10,2) NOT NULL,
  `supplier` bigint NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `margin` decimal(10,5) DEFAULT NULL,
  `offer` decimal(10,2) NOT NULL,
  `materials` decimal(10,2) NOT NULL,
  `cost` decimal(10,2) NOT NULL,
  `point` decimal(10,3) NOT NULL,
  `point_val` decimal(10,3) NOT NULL,
  `disc` tinyint NOT NULL,
  `price_with_tax` tinyint(1) NOT NULL,
  `cost_with_tax` tinyint(1) NOT NULL,
  `notes_att` varchar(250) DEFAULT NULL,
  `filter_left` tinyint(1) NOT NULL,
  `as_filter` tinyint(1) NOT NULL,
  `filter_body` tinyint(1) NOT NULL,
  `porte` decimal(10,2) NOT NULL DEFAULT '0.00',
  `coste_pub` decimal(10,2) NOT NULL DEFAULT '0.00',
  `active` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `fk_id_attribute_value2_products_attributes` (`id_attribute_value2`),
  KEY `fk_id_attribute_value1_products_attributes` (`id_attribute_value1`),
  KEY `uk_products_attributes` (`id_product`,`id_attribute_value1`,`id_attribute_value2`),
  CONSTRAINT `fk_id_attribute_value1_products_attributes` FOREIGN KEY (`id_attribute_value1`) REFERENCES `attributes_values` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `fk_id_attribute_value2_products_attributes` FOREIGN KEY (`id_attribute_value2`) REFERENCES `attributes_values` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `fk_id_product_products_attributes` FOREIGN KEY (`id_product`) REFERENCES `products` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=101666 DEFAULT CHARSET=utf8mb3;

-- La exportación de datos fue deseleccionada.

-- Volcando estructura para tabla lawebe_propuesta.products_img
CREATE TABLE IF NOT EXISTS `products_img` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `id_product` bigint NOT NULL,
  `img` varchar(250) NOT NULL,
  `rank` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_id_product_products_img` (`id_product`),
  CONSTRAINT `fk_id_product_products_img` FOREIGN KEY (`id_product`) REFERENCES `products` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- La exportación de datos fue deseleccionada.

-- Volcando estructura para tabla lawebe_propuesta.products_market
CREATE TABLE IF NOT EXISTS `products_market` (
  `id_o` bigint NOT NULL AUTO_INCREMENT,
  `id_category` bigint NOT NULL,
  `id_product` bigint NOT NULL,
  `id_attribute` bigint NOT NULL,
  `id_option` bigint NOT NULL,
  `sku` bigint NOT NULL,
  `sku_parent` varchar(50) NOT NULL,
  `sku_lwc` varchar(30) NOT NULL,
  `attribute_name` varchar(250) NOT NULL,
  `attribute_value` varchar(250) NOT NULL,
  `export` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`id_o`),
  UNIQUE KEY `sku` (`sku`)
) ENGINE=MyISAM AUTO_INCREMENT=54124 DEFAULT CHARSET=utf8mb3;

-- La exportación de datos fue deseleccionada.

-- Volcando estructura para tabla lawebe_propuesta.products_options
CREATE TABLE IF NOT EXISTS `products_options` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `id_product` bigint NOT NULL,
  `id_option_value` bigint NOT NULL,
  `id_supplier` bigint DEFAULT NULL,
  `weight` decimal(10,2) NOT NULL,
  `width` decimal(10,2) NOT NULL,
  `length` decimal(10,2) NOT NULL,
  `height` decimal(10,2) NOT NULL,
  `packages` decimal(10,2) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `offer` decimal(10,2) NOT NULL,
  `material` decimal(10,2) NOT NULL,
  `cost` decimal(10,2) NOT NULL,
  `point` decimal(10,3) NOT NULL,
  `val` decimal(10,3) NOT NULL,
  `disc` tinyint NOT NULL,
  `price_with_tax` tinyint(1) NOT NULL,
  `cost_with_tax` tinyint(1) NOT NULL,
  `filter_left` tinyint(1) NOT NULL,
  `as_filter` tinyint(1) NOT NULL,
  `filter_body` tinyint(1) NOT NULL,
  `t_elabora` int NOT NULL DEFAULT '0',
  `tipo_prime` varchar(50) NOT NULL DEFAULT '',
  `is_prime` tinyint(1) NOT NULL,
  `stock` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `fk_id_supplier_products_options` (`id_supplier`),
  KEY `fk_id_option_value_products_options` (`id_option_value`),
  KEY `uk_products_options` (`id_product`,`id_option_value`),
  CONSTRAINT `fk_id_option_value_products_options` FOREIGN KEY (`id_option_value`) REFERENCES `options_values` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `fk_id_product_products_options` FOREIGN KEY (`id_product`) REFERENCES `products` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `fk_id_supplier_products_options` FOREIGN KEY (`id_supplier`) REFERENCES `suppliers` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=356361 DEFAULT CHARSET=utf8mb3;

-- La exportación de datos fue deseleccionada.

-- Volcando estructura para tabla lawebe_propuesta.products_primes
CREATE TABLE IF NOT EXISTS `products_primes` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `id_product` bigint NOT NULL,
  `id_product_attribute` bigint DEFAULT NULL,
  `id_product_option` bigint DEFAULT NULL,
  `ean_code` varchar(30) DEFAULT NULL,
  `export` int NOT NULL DEFAULT '0',
  `manufacture` tinyint(1) NOT NULL DEFAULT '1',
  `final` tinyint(1) NOT NULL DEFAULT '1',
  `visible` tinyint(1) NOT NULL DEFAULT '1',
  `active` tinyint(1) NOT NULL DEFAULT '1',
  `parent` bigint DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `fk_id_product_attribute_products_primes` (`id_product_attribute`),
  KEY `fk_id_product_option_products_primes` (`id_product_option`),
  KEY `uk_products_primes` (`id_product`,`id_product_attribute`,`id_product_option`) USING BTREE,
  CONSTRAINT `fk_id_product_attribute_products_primes` FOREIGN KEY (`id_product_attribute`) REFERENCES `products_attributes` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `fk_id_product_option_products_primes` FOREIGN KEY (`id_product_option`) REFERENCES `products_options` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `fk_id_product_products_primes` FOREIGN KEY (`id_product`) REFERENCES `products` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=54124 DEFAULT CHARSET=utf8mb3;

-- La exportación de datos fue deseleccionada.

-- Volcando estructura para tabla lawebe_propuesta.products_rename
CREATE TABLE IF NOT EXISTS `products_rename` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `id_product` bigint NOT NULL,
  `re_name` varchar(250) NOT NULL,
  `file_name` varchar(250) NOT NULL,
  `images` longtext NOT NULL,
  `url_image` varchar(250) NOT NULL,
  `description` longtext NOT NULL,
  `categories` longtext NOT NULL,
  `price_with_tax` tinyint(1) NOT NULL,
  `comments` longtext,
  `add_data` datetime NOT NULL,
  `by_exposure` tinyint(1) NOT NULL,
  `meta_title` varchar(250) NOT NULL,
  `meta_keywords` text NOT NULL,
  `meta_description` varchar(250) NOT NULL,
  `price_catalog` decimal(4,2) NOT NULL DEFAULT '1.00',
  `marked` tinyint(1) NOT NULL DEFAULT '0',
  `visible` tinyint(1) NOT NULL,
  `active` tinyint(1) NOT NULL DEFAULT '1',
  `showcase` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- La exportación de datos fue deseleccionada.

-- Volcando estructura para tabla lawebe_propuesta.products_suppliers
CREATE TABLE IF NOT EXISTS `products_suppliers` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `id_product` bigint NOT NULL,
  `id_supplier` bigint NOT NULL,
  `description` varchar(150) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `by_asign` tinyint NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `fk_id_product_products_suppliers` (`id_product`) USING BTREE,
  KEY `fk_id_supplier_products_suppliers` (`id_supplier`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=698 DEFAULT CHARSET=utf8mb3;

-- La exportación de datos fue deseleccionada.

-- Volcando estructura para tabla lawebe_propuesta.reviews
CREATE TABLE IF NOT EXISTS `reviews` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `id_product` bigint NOT NULL,
  `id_client` bigint DEFAULT NULL,
  `name` varchar(64) NOT NULL,
  `email` varchar(150) NOT NULL,
  `location` varchar(250) DEFAULT '',
  `reviews_rating` int DEFAULT NULL,
  `reviews_text` text NOT NULL,
  `approved` tinyint NOT NULL DEFAULT '0',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `fk_id_products_reviews` (`id_product`) USING BTREE,
  KEY `fk_id_client_reviews` (`id_client`) USING BTREE,
  CONSTRAINT `fk_id_client_reviews` FOREIGN KEY (`id_client`) REFERENCES `clients` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `fk_id_product_reviews` FOREIGN KEY (`id_product`) REFERENCES `products` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- La exportación de datos fue deseleccionada.

-- Volcando estructura para tabla lawebe_propuesta.settings
CREATE TABLE IF NOT EXISTS `settings` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `type` enum('System','Company Data','Payment','Seo') NOT NULL,
  `key` varchar(50) NOT NULL,
  `value` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_setting` (`type`,`key`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb3;

-- La exportación de datos fue deseleccionada.

-- Volcando estructura para tabla lawebe_propuesta.sku_asin
CREATE TABLE IF NOT EXISTS `sku_asin` (
  `sku` varchar(25) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `asin` varchar(25) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;

-- La exportación de datos fue deseleccionada.

-- Volcando estructura para tabla lawebe_propuesta.stores
CREATE TABLE IF NOT EXISTS `stores` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(250) NOT NULL,
  `short_name` varchar(30) NOT NULL,
  `is_company` tinyint(1) NOT NULL DEFAULT '1',
  `tax_code` varchar(250) NOT NULL,
  `code_shipping` varchar(10) NOT NULL,
  `code_control` varchar(25) NOT NULL,
  `email` varchar(250) NOT NULL,
  `phone` varchar(250) NOT NULL,
  `fax` varchar(250) NOT NULL,
  `address` text NOT NULL,
  `zipcode` varchar(250) NOT NULL,
  `city` varchar(250) NOT NULL,
  `active` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8mb3;

-- La exportación de datos fue deseleccionada.

-- Volcando estructura para tabla lawebe_propuesta.stores_settings
CREATE TABLE IF NOT EXISTS `stores_settings` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `id_store` bigint NOT NULL,
  `type` enum('System','Company Data','Payment','Cart','Order','Seo') NOT NULL,
  `key` varchar(50) NOT NULL,
  `value` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_setting` (`id_store`,`type`,`key`) USING BTREE,
  CONSTRAINT `fk_id_store_stores_settings` FOREIGN KEY (`id_store`) REFERENCES `stores` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb3;

-- La exportación de datos fue deseleccionada.

-- Volcando estructura para tabla lawebe_propuesta.suppliers
CREATE TABLE IF NOT EXISTS `suppliers` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `is_company` tinyint(1) NOT NULL,
  `name` varchar(250) NOT NULL,
  `tax_code` varchar(30) NOT NULL,
  `code_shipping` varchar(10) NOT NULL,
  `code_control` varchar(25) NOT NULL,
  `email` varchar(250) NOT NULL,
  `phone` varchar(250) NOT NULL,
  `fax` varchar(250) NOT NULL,
  `address` longtext NOT NULL,
  `zipcode` varchar(250) NOT NULL,
  `city` varchar(250) NOT NULL,
  `active` tinyint(1) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=92 DEFAULT CHARSET=utf8mb3;

-- La exportación de datos fue deseleccionada.

-- Volcando estructura para tabla lawebe_propuesta.suppliers_codes
CREATE TABLE IF NOT EXISTS `suppliers_codes` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `id_supplier` bigint NOT NULL,
  `id_carrier` bigint NOT NULL,
  `description` varchar(100) NOT NULL,
  `code_shipping` varchar(10) NOT NULL,
  `code_control` int NOT NULL,
  `code_franchise` varchar(10) NOT NULL,
  `image_url` varchar(250) DEFAULT NULL,
  `html_url` varchar(250) DEFAULT NULL,
  `active` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `fk_id_carrier_suppliers_codes` (`id_carrier`),
  KEY `fk_id_supplier_suppliers_codes` (`id_supplier`) USING BTREE,
  CONSTRAINT `fk_id_carrier_suppliers_codes` FOREIGN KEY (`id_carrier`) REFERENCES `carriers` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `fk_id_supplier_suppliers_codes` FOREIGN KEY (`id_supplier`) REFERENCES `suppliers` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- La exportación de datos fue deseleccionada.

-- Volcando estructura para tabla lawebe_propuesta.zones_types
CREATE TABLE IF NOT EXISTS `zones_types` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `id_carrier` bigint NOT NULL,
  `id_zone_rate` bigint NOT NULL,
  `surcharge_fuel` decimal(5,2) NOT NULL,
  `insurance` decimal(5,2) NOT NULL,
  `cash_on_delivery` decimal(5,2) NOT NULL,
  `cash_on_delivery_min` decimal(5,2) NOT NULL,
  `borders_costs` decimal(10,2) NOT NULL,
  `kg_cubic_meter` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_id_carrier_zones_types` (`id_carrier`),
  KEY `fk_id_zone_rate_zones_types` (`id_zone_rate`),
  CONSTRAINT `fk_id_carrier_zones_types` FOREIGN KEY (`id_carrier`) REFERENCES `carriers` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `fk_id_zone_rate_zones_types` FOREIGN KEY (`id_zone_rate`) REFERENCES `zone_rates` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- La exportación de datos fue deseleccionada.

-- Volcando estructura para tabla lawebe_propuesta.zone_rates
CREATE TABLE IF NOT EXISTS `zone_rates` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `table_zone` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- La exportación de datos fue deseleccionada.

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;

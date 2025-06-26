-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Máy chủ: mariadb
-- Thời gian đã tạo: Th6 23, 2025 lúc 02:02 PM
-- Phiên bản máy phục vụ: 11.4.2-MariaDB-ubu2404
-- Phiên bản PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `provinces`
--
DROP TABLE IF EXISTS `provinces`;
CREATE TABLE `provinces` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `province_code` varchar(2) NOT NULL,
  `name` varchar(255) NOT NULL,
  `short_name` varchar(255) NOT NULL,
  `code` varchar(5) NOT NULL,
  `place_type` varchar(255) NOT NULL,
  `country` varchar(10) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `provinces`
--

INSERT INTO `provinces` (`id`, `province_code`, `name`, `short_name`, `code`, `place_type`, `country`, `created_at`, `updated_at`) VALUES
(1, '01', 'Thành phố Hà Nội', 'Thành phố Hà Nội', 'HNI', 'Thành phố Trung Ương', 'VN', NULL, NULL),
(2, '04', 'Cao Bằng', 'Cao Bằng', 'CBG', 'Tỉnh', 'VN', NULL, NULL),
(3, '08', 'Tuyên Quang', 'Tuyên Quang', 'TGQ', 'Tỉnh', 'VN', NULL, NULL),
(4, '11', 'Điện Biên', 'Điện Biên', 'DBN', 'Tỉnh', 'VN', NULL, NULL),
(5, '12', 'Lai Châu', 'Lai Châu', 'LCU', 'Tỉnh', 'VN', NULL, NULL),
(6, '14', 'Sơn La', 'Sơn La', 'SLA', 'Tỉnh', 'VN', NULL, NULL),
(7, '15', 'Lào Cai', 'Lào Cai', 'LCI', 'Tỉnh', 'VN', NULL, NULL),
(8, '19', 'Thái Nguyên', 'Thái Nguyên', 'TNN', 'Tỉnh', 'VN', NULL, NULL),
(9, '20', 'Lạng Sơn', 'Lạng Sơn', 'LSN', 'Tỉnh', 'VN', NULL, NULL),
(10, '22', 'Quảng Ninh', 'Quảng Ninh', 'QNH', 'Tỉnh', 'VN', NULL, NULL),
(11, '24', 'Bắc Ninh', 'Bắc Ninh', 'BNH', 'Tỉnh', 'VN', NULL, NULL),
(12, '25', 'Phú Thọ', 'Phú Thọ', 'PTO', 'Tỉnh', 'VN', NULL, NULL),
(13, '31', 'Thành phố Hải Phòng', 'Thành phố Hải Phòng', 'HPG', 'Thành phố Trung Ương', 'VN', NULL, NULL),
(14, '33', 'Hưng Yên', 'Hưng Yên', 'HYN', 'Tỉnh', 'VN', NULL, NULL),
(15, '37', 'Ninh Bình', 'Ninh Bình', 'NBH', 'Tỉnh', 'VN', NULL, NULL),
(16, '38', 'Thanh Hóa', 'Thanh Hóa', 'THA', 'Tỉnh', 'VN', NULL, NULL),
(17, '40', 'Nghệ An', 'Nghệ An', 'NAN', 'Tỉnh', 'VN', NULL, NULL),
(18, '42', 'Hà Tĩnh', 'Hà Tĩnh', 'HTH', 'Tỉnh', 'VN', NULL, NULL),
(19, '44', 'Quảng Trị', 'Quảng Trị', 'QTI', 'Tỉnh', 'VN', NULL, NULL),
(20, '46', 'Thành phố Huế', 'Thành phố Huế', 'TTH', 'Thành phố Trung Ương', 'VN', NULL, NULL),
(21, '48', 'Thành phố Đà Nẵng', 'Thành phố Đà Nẵng', 'DNG', 'Thành phố Trung Ương', 'VN', NULL, NULL),
(22, '51', 'Quảng Ngãi', 'Quảng Ngãi', 'QNI', 'Tỉnh', 'VN', NULL, NULL),
(23, '52', 'Gia Lai', 'Gia Lai', 'GLI', 'Tỉnh', 'VN', NULL, NULL),
(24, '56', 'Khánh Hòa', 'Khánh Hòa', 'KHA', 'Tỉnh', 'VN', NULL, NULL),
(25, '66', 'Đắk Lắk', 'Đắk Lắk', 'DLK', 'Tỉnh', 'VN', NULL, NULL),
(26, '68', 'Lâm Đồng', 'Lâm Đồng', 'LDG', 'Tỉnh', 'VN', NULL, NULL),
(27, '75', 'Đồng Nai', 'Đồng Nai', 'DNI', 'Tỉnh', 'VN', NULL, NULL),
(28, '79', 'Thành phố Hồ Chí Minh', 'Thành phố Hồ Chí Minh', 'HCM', 'Thành phố Trung Ương', 'VN', NULL, NULL),
(29, '80', 'Tây Ninh', 'Tây Ninh', 'TNH', 'Tỉnh', 'VN', NULL, NULL),
(30, '82', 'Đồng Tháp', 'Đồng Tháp', 'DTP', 'Tỉnh', 'VN', NULL, NULL),
(31, '86', 'Vĩnh Long', 'Vĩnh Long', 'VLG', 'Tỉnh', 'VN', NULL, NULL),
(32, '91', 'An Giang', 'An Giang', 'AGG', 'Tỉnh', 'VN', NULL, NULL),
(33, '92', 'Thành phố Cần Thơ', 'Thành phố Cần Thơ', 'CTO', 'Thành phố Trung Ương', 'VN', NULL, NULL),
(34, '96', 'Cà Mau', 'Cà Mau', 'CMU', 'Tỉnh', 'VN', NULL, NULL);

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `provinces`
--
ALTER TABLE `provinces`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `provinces_province_code_unique` (`province_code`),
  ADD UNIQUE KEY `provinces_code_unique` (`code`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `provinces`
--
ALTER TABLE `provinces`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

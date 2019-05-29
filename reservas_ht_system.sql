-- phpMyAdmin SQL Dump
-- version 4.4.9
-- http://www.phpmyadmin.net
--
-- Host: 50.62.209.151:3306
-- Generation Time: Jun 24, 2015 at 08:05 PM
-- Server version: 5.5.43-37.2-log
-- PHP Version: 5.5.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `reservas_ht_system`
--

CREATE DATABASE IF NOT EXISTS reservas_ht_system;

-- --------------------------------------------------------

--
-- Table structure for table `t_admin`
--

CREATE TABLE IF NOT EXISTS `t_admin` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `name` varchar(50) NOT NULL,
  `rol` int(11) NOT NULL,
  `id_group` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `t_groups`
--

CREATE TABLE IF NOT EXISTS `t_groups` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `group_name` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `t_groups`
--

INSERT INTO `t_groups` (`id`, `group_name`) VALUES
(1, 'complejo1'),
(2, 'complejo2');

-- --------------------------------------------------------

--
-- Table structure for table `t_pitchs`
--

CREATE TABLE IF NOT EXISTS `t_pitchs` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `detail` varchar(100) NOT NULL,
  `id_group` int(11) NOT NULL,
  `id_pitch` int(11) NOT NULL,
  `active` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `t_pitchs`
--

INSERT INTO `t_pitchs` (`id`, `detail`, `id_group`, `id_pitch`, `active`) VALUES
(1, 'complejo1', 1, 1, 1),
(2, 'complejo2', 2, 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `t_rates`
--

CREATE TABLE IF NOT EXISTS `t_rates` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `cancha_completa` double NOT NULL,
  `arbitro` double NOT NULL,
  `cancha_fija_completa_deposito` double NOT NULL,
  `cancha_fija_reto_deposito` double NOT NULL,
  `weekend` tinyint(1) NOT NULL,
  `hora_inicio` int(11) NOT NULL,
  `hora_final` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `t_rates`
--

INSERT INTO `t_rates` (`id`, `cancha_completa`, `arbitro`, `cancha_fija_completa_deposito`, `cancha_fija_reto_deposito`, `weekend`, `hora_inicio`, `hora_final`) VALUES
(1, 17000, 2000, 17000, 9500, 1, 8, 23),
(2, 10000, 2000, 17000, 9500, 0, 8, 12),
(3, 13000, 2000, 17000, 9500, 0, 13, 16),
(4, 17000, 2000, 17000, 9500, 0, 17, 23);

-- --------------------------------------------------------

--
-- Table structure for table `t_reservations`
--

CREATE TABLE IF NOT EXISTS `t_reservations` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `lastname` varchar(100) NOT NULL,
  `phone` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `team_id` tinyint(4) NOT NULL,
  `type_reservation` tinyint(4) NOT NULL,
  `referee_required` tinyint(1) NOT NULL,
  `reservation_time` varchar(100) NOT NULL,
  `reservation_year` smallint(6) NOT NULL,
  `reservation_month` tinyint(4) NOT NULL,
  `reservation_day` tinyint(4) NOT NULL,
  `reservation_made_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `reservation_price` float NOT NULL,
  `pitch_id` smallint(6) NOT NULL,
  `group_id` smallint(6) NOT NULL,
  `active` tinyint(1) NOT NULL,
  `id_user` int(11) NOT NULL,
  `id_group_all_weeks` varchar(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `t_rol`
--

CREATE TABLE IF NOT EXISTS `t_rol` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `rol_name` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `t_rol`
--

INSERT INTO `t_rol` (`id`, `rol_name`) VALUES
(1, 'Admin'),
(2, 'Dependiente');

-- --------------------------------------------------------

--
-- Table structure for table `t_temporary_schedule`
--

CREATE TABLE IF NOT EXISTS `t_temporary_schedule` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `team_id` tinyint(4) NOT NULL,
  `reservation_time` varchar(100) NOT NULL,
  `reservation_year` smallint(6) NOT NULL,
  `reservation_month` tinyint(4) NOT NULL,
  `reservation_day` tinyint(4) NOT NULL,
  `pitch_id` smallint(6) NOT NULL,
  `group_id` smallint(6) NOT NULL,
  `state` tinyint(4) NOT NULL,
  `temporary_date_made` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;

/* INSERT TEST ADMIN USER*/

INSERT INTO `t_admin`(`id`, `user`, `password`, `name`, `rol`, `id_group`) VALUES (1,'ccamposcr',MD5('12345'),'Christian',1,1)
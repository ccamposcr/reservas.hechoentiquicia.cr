-- phpMyAdmin SQL Dump
-- version 4.1.12
-- http://www.phpmyadmin.net
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 18-12-2014 a las 15:26:37
-- Versión del servidor: 5.6.16
-- Versión de PHP: 5.5.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Base de datos: `cdcol`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cds`
--

CREATE TABLE IF NOT EXISTS `cds` (
  `titel` varchar(200) COLLATE latin1_general_ci DEFAULT NULL,
  `interpret` varchar(200) COLLATE latin1_general_ci DEFAULT NULL,
  `jahr` int(11) DEFAULT NULL,
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 COLLATE=latin1_general_ci AUTO_INCREMENT=7 ;

--
-- Volcado de datos para la tabla `cds`
--

INSERT INTO `cds` (`titel`, `interpret`, `jahr`, `id`) VALUES
('Beauty', 'Ryuichi Sakamoto', 1990, 1),
('Goodbye Country (Hello Nightclub)', 'Groove Armada', 2001, 4),
('Glee', 'Bran Van 3000', 1997, 5);
--
-- Base de datos: `f5_system`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `t_admin`
--

CREATE TABLE IF NOT EXISTS `t_admin` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `name` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=2 ;

--
-- Volcado de datos para la tabla `t_admin`
--

INSERT INTO `t_admin` (`id`, `user`, `password`, `name`) VALUES
(1, 'test', '16d7a4fca7442dda3ad93c9a726597e4', '');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `t_groups`
--

CREATE TABLE IF NOT EXISTS `t_groups` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `group_name` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=3 ;

--
-- Volcado de datos para la tabla `t_groups`
--

INSERT INTO `t_groups` (`id`, `group_name`) VALUES
(1, 'Escazu'),
(2, 'Desamparados');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `t_pitchs`
--

CREATE TABLE IF NOT EXISTS `t_pitchs` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `detail` varchar(100) NOT NULL,
  `id_group` int(11) NOT NULL,
  `id_pitch` int(11) NOT NULL,
  `active` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=5 ;

--
-- Volcado de datos para la tabla `t_pitchs`
--

INSERT INTO `t_pitchs` (`id`, `detail`, `id_group`, `id_pitch`, `active`) VALUES
(1, 'Escazu 1', 1, 1, 1),
(2, 'Desamparados 1', 2, 1, 1),
(3, 'Desamparados 2', 2, 2, 1),
(4, 'Desamparados 3', 2, 3, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `t_reservations`
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
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=930 ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `t_temporary_schedule`
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
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1175 ;

DELIMITER $$
--
-- Eventos
--
CREATE DEFINER=`root`@`localhost` EVENT `generateFalseReservations` ON SCHEDULE EVERY 10 SECOND STARTS '2014-11-22 00:43:04' ON COMPLETION NOT PRESERVE DISABLE DO BEGIN
	
		INSERT INTO `t_temporary_schedule`(`team_id`, `reservation_time`, `reservation_year`, `reservation_month`, `reservation_day`, `pitch_id`, `group_id`, `state`) VALUES ('1','09-10','2014','04','01','1','2','1');
	    
	END$$

CREATE DEFINER=`root`@`localhost` EVENT `checkExpiredReservations` ON SCHEDULE EVERY 10 SECOND STARTS '2014-11-22 23:39:39' ON COMPLETION NOT PRESERVE ENABLE DO BEGIN

		UPDATE `t_temporary_schedule` SET `state`='3' WHERE temporary_date_made < DATE_SUB(NOW(),INTERVAL 10 MINUTE) AND `state`!='3' AND `state`!='4' AND `state`!='5';

	END$$

DELIMITER ;
--
-- Base de datos: `phpmyadmin`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pma_bookmark`
--

CREATE TABLE IF NOT EXISTS `pma_bookmark` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `dbase` varchar(255) COLLATE utf8_bin NOT NULL DEFAULT '',
  `user` varchar(255) COLLATE utf8_bin NOT NULL DEFAULT '',
  `label` varchar(255) CHARACTER SET utf8 NOT NULL DEFAULT '',
  `query` text COLLATE utf8_bin NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='Bookmarks' AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pma_column_info`
--

CREATE TABLE IF NOT EXISTS `pma_column_info` (
  `id` int(5) unsigned NOT NULL AUTO_INCREMENT,
  `db_name` varchar(64) COLLATE utf8_bin NOT NULL DEFAULT '',
  `table_name` varchar(64) COLLATE utf8_bin NOT NULL DEFAULT '',
  `column_name` varchar(64) COLLATE utf8_bin NOT NULL DEFAULT '',
  `comment` varchar(255) CHARACTER SET utf8 NOT NULL DEFAULT '',
  `mimetype` varchar(255) CHARACTER SET utf8 NOT NULL DEFAULT '',
  `transformation` varchar(255) COLLATE utf8_bin NOT NULL DEFAULT '',
  `transformation_options` varchar(255) COLLATE utf8_bin NOT NULL DEFAULT '',
  PRIMARY KEY (`id`),
  UNIQUE KEY `db_name` (`db_name`,`table_name`,`column_name`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='Column information for phpMyAdmin' AUTO_INCREMENT=47 ;

--
-- Volcado de datos para la tabla `pma_column_info`
--

INSERT INTO `pma_column_info` (`id`, `db_name`, `table_name`, `column_name`, `comment`, `mimetype`, `transformation`, `transformation_options`) VALUES
(1, 'proyectos', 'tprojecttrabajo', 'id', '', '', '_', ''),
(2, 'f5_system', 't_reservations', 'id', '', '', '_', ''),
(3, 'f5_system', 't_reservations', 'name', '', '', '_', ''),
(4, 'f5_system', 't_reservations', 'lastname', '', '', '_', ''),
(5, 'f5_system', 't_reservations', 'phone', '', '', '_', ''),
(6, 'f5_system', 't_reservations', 'email', '', '', '_', ''),
(7, 'f5_system', 't_reservations', 'type_reservation', '', '', '_', ''),
(8, 'f5_system', 't_reservations', 'referee_required', '', '', '_', ''),
(9, 'f5_system', 't_reservations', 'team_id', '', '', '_', ''),
(10, 'f5_system', 't_reservations', 'reservation_time', '', '', '_', ''),
(11, 'f5_system', 't_reservations', 'reservation_year', '', '', '_', ''),
(12, 'f5_system', 't_reservations', 'reservation_month', '', '', '_', ''),
(13, 'f5_system', 't_reservations', 'reservation_day', '', '', '_', ''),
(14, 'f5_system', 't_reservations', 'reservation_made_time', '', '', '_', ''),
(15, 'f5_system', 't_reservations', 'reservation_price', '', '', '_', ''),
(16, 'f5_system', 't_reservations', 'id_pitch', '', '', '_', ''),
(17, 'f5_system', 't_reservations', 'active', '', '', '_', ''),
(37, 'f5_system', 't_temporary_schedule', 'id', '', '', '_', ''),
(30, 'f5_system', 't_reservations', 'group_id', '', '', '_', ''),
(20, 'f5_system', 't_reservations', 'pitch_id', '', '', '_', ''),
(21, 'f5_system', 't_admin', 'id', '', '', '_', ''),
(22, 'f5_system', 't_admin', 'user', '', '', '_', ''),
(23, 'f5_system', 't_admin', 'password', '', '', '_', ''),
(24, 'f5_system', 't_admin', 'name', '', '', '_', ''),
(25, 'f5_system', 't_pitchs', 'id', '', '', '_', ''),
(26, 'f5_system', 't_pitchs', 'pitch', '', '', '_', ''),
(27, 'f5_system', 't_pitchs', 'active', '', '', '_', ''),
(35, 'f5_system', 't_pitchs', 'id_group', '', '', '_', ''),
(29, 'f5_system', 't_pitchs', 'id_pitch', '', '', '_', ''),
(31, 'f5_system', 't_pitchs', 'detail', '', '', '_', ''),
(32, 'f5_system', 't_groups', 'id', '', '', '_', ''),
(33, 'f5_system', 't_groups', 'group', '', '', '_', ''),
(36, 'f5_system', 't_groups', 'group_name', '', '', '_', ''),
(38, 'f5_system', 't_temporary_schedule', 'reservation_time', '', '', '_', ''),
(39, 'f5_system', 't_temporary_schedule', 'reservation_year', '', '', '_', ''),
(40, 'f5_system', 't_temporary_schedule', 'reservation_month', '', '', '_', ''),
(41, 'f5_system', 't_temporary_schedule', 'reservation_day', '', '', '_', ''),
(42, 'f5_system', 't_temporary_schedule', 'pitch_id', '', '', '_', ''),
(43, 'f5_system', 't_temporary_schedule', 'group_id', '', '', '_', ''),
(44, 'f5_system', 't_temporary_schedule', 'state', '', '', '_', ''),
(45, 'f5_system', 't_temporary_schedule', 'temporary_date_made', '', '', '_', ''),
(46, 'f5_system', 't_temporary_schedule', 'team_id', '', '', '_', '');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pma_designer_coords`
--

CREATE TABLE IF NOT EXISTS `pma_designer_coords` (
  `db_name` varchar(64) COLLATE utf8_bin NOT NULL DEFAULT '',
  `table_name` varchar(64) COLLATE utf8_bin NOT NULL DEFAULT '',
  `x` int(11) DEFAULT NULL,
  `y` int(11) DEFAULT NULL,
  `v` tinyint(4) DEFAULT NULL,
  `h` tinyint(4) DEFAULT NULL,
  PRIMARY KEY (`db_name`,`table_name`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='Table coordinates for Designer';

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pma_history`
--

CREATE TABLE IF NOT EXISTS `pma_history` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(64) COLLATE utf8_bin NOT NULL DEFAULT '',
  `db` varchar(64) COLLATE utf8_bin NOT NULL DEFAULT '',
  `table` varchar(64) COLLATE utf8_bin NOT NULL DEFAULT '',
  `timevalue` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `sqlquery` text COLLATE utf8_bin NOT NULL,
  PRIMARY KEY (`id`),
  KEY `username` (`username`,`db`,`table`,`timevalue`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='SQL history for phpMyAdmin' AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pma_pdf_pages`
--

CREATE TABLE IF NOT EXISTS `pma_pdf_pages` (
  `db_name` varchar(64) COLLATE utf8_bin NOT NULL DEFAULT '',
  `page_nr` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `page_descr` varchar(50) CHARACTER SET utf8 NOT NULL DEFAULT '',
  PRIMARY KEY (`page_nr`),
  KEY `db_name` (`db_name`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='PDF relation pages for phpMyAdmin' AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pma_recent`
--

CREATE TABLE IF NOT EXISTS `pma_recent` (
  `username` varchar(64) COLLATE utf8_bin NOT NULL,
  `tables` text COLLATE utf8_bin NOT NULL,
  PRIMARY KEY (`username`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='Recently accessed tables';

--
-- Volcado de datos para la tabla `pma_recent`
--

INSERT INTO `pma_recent` (`username`, `tables`) VALUES
('root', '[{"db":"f5_system","table":"t_temporary_schedule"},{"db":"f5_system","table":"t_reservations"},{"db":"f5_booking_system","table":"phpmyreservation_reservations"},{"db":"f5_system","table":"t_groups"},{"db":"f5_system","table":"t_pitchs"},{"db":"f5_system","table":"t_admin"},{"db":"phpmyreservation","table":"phpmyreservation_reservations"},{"db":"f5_booking_system","table":"reservations"},{"db":"phpmyreservation","table":"phpmyreservation_users"},{"db":"phpmyreservation","table":"phpmyreservation_configuration"}]');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pma_relation`
--

CREATE TABLE IF NOT EXISTS `pma_relation` (
  `master_db` varchar(64) COLLATE utf8_bin NOT NULL DEFAULT '',
  `master_table` varchar(64) COLLATE utf8_bin NOT NULL DEFAULT '',
  `master_field` varchar(64) COLLATE utf8_bin NOT NULL DEFAULT '',
  `foreign_db` varchar(64) COLLATE utf8_bin NOT NULL DEFAULT '',
  `foreign_table` varchar(64) COLLATE utf8_bin NOT NULL DEFAULT '',
  `foreign_field` varchar(64) COLLATE utf8_bin NOT NULL DEFAULT '',
  PRIMARY KEY (`master_db`,`master_table`,`master_field`),
  KEY `foreign_field` (`foreign_db`,`foreign_table`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='Relation table';

--
-- Volcado de datos para la tabla `pma_relation`
--

INSERT INTO `pma_relation` (`master_db`, `master_table`, `master_field`, `foreign_db`, `foreign_table`, `foreign_field`) VALUES
('f5_system', 't_pitchs', 'id_group', 'f5_system', 't_groups', 'id');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pma_table_coords`
--

CREATE TABLE IF NOT EXISTS `pma_table_coords` (
  `db_name` varchar(64) COLLATE utf8_bin NOT NULL DEFAULT '',
  `table_name` varchar(64) COLLATE utf8_bin NOT NULL DEFAULT '',
  `pdf_page_number` int(11) NOT NULL DEFAULT '0',
  `x` float unsigned NOT NULL DEFAULT '0',
  `y` float unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`db_name`,`table_name`,`pdf_page_number`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='Table coordinates for phpMyAdmin PDF output';

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pma_table_info`
--

CREATE TABLE IF NOT EXISTS `pma_table_info` (
  `db_name` varchar(64) COLLATE utf8_bin NOT NULL DEFAULT '',
  `table_name` varchar(64) COLLATE utf8_bin NOT NULL DEFAULT '',
  `display_field` varchar(64) COLLATE utf8_bin NOT NULL DEFAULT '',
  PRIMARY KEY (`db_name`,`table_name`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='Table information for phpMyAdmin';

--
-- Volcado de datos para la tabla `pma_table_info`
--

INSERT INTO `pma_table_info` (`db_name`, `table_name`, `display_field`) VALUES
('f5_system', 't_pitchs', 'id_group');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pma_table_uiprefs`
--

CREATE TABLE IF NOT EXISTS `pma_table_uiprefs` (
  `username` varchar(64) COLLATE utf8_bin NOT NULL,
  `db_name` varchar(64) COLLATE utf8_bin NOT NULL,
  `table_name` varchar(64) COLLATE utf8_bin NOT NULL,
  `prefs` text COLLATE utf8_bin NOT NULL,
  `last_update` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`username`,`db_name`,`table_name`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='Tables'' UI preferences';

--
-- Volcado de datos para la tabla `pma_table_uiprefs`
--

INSERT INTO `pma_table_uiprefs` (`username`, `db_name`, `table_name`, `prefs`, `last_update`) VALUES
('root', 'f5_system', 't_reservations', '{"sorted_col":"`pitch_id` ASC"}', '2014-12-18 21:23:38'),
('root', 'f5_system', 't_pitchs', '{"sorted_col":"`t_pitchs`.`id` ASC"}', '2014-11-02 05:53:13'),
('root', 'f5_system', 't_temporary_schedule', '{"sorted_col":"`state` ASC"}', '2014-12-18 21:23:45');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pma_tracking`
--

CREATE TABLE IF NOT EXISTS `pma_tracking` (
  `db_name` varchar(64) COLLATE utf8_bin NOT NULL,
  `table_name` varchar(64) COLLATE utf8_bin NOT NULL,
  `version` int(10) unsigned NOT NULL,
  `date_created` datetime NOT NULL,
  `date_updated` datetime NOT NULL,
  `schema_snapshot` text COLLATE utf8_bin NOT NULL,
  `schema_sql` text COLLATE utf8_bin,
  `data_sql` longtext COLLATE utf8_bin,
  `tracking` set('UPDATE','REPLACE','INSERT','DELETE','TRUNCATE','CREATE DATABASE','ALTER DATABASE','DROP DATABASE','CREATE TABLE','ALTER TABLE','RENAME TABLE','DROP TABLE','CREATE INDEX','DROP INDEX','CREATE VIEW','ALTER VIEW','DROP VIEW') COLLATE utf8_bin DEFAULT NULL,
  `tracking_active` int(1) unsigned NOT NULL DEFAULT '1',
  PRIMARY KEY (`db_name`,`table_name`,`version`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_bin ROW_FORMAT=COMPACT COMMENT='Database changes tracking for phpMyAdmin';

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pma_userconfig`
--

CREATE TABLE IF NOT EXISTS `pma_userconfig` (
  `username` varchar(64) COLLATE utf8_bin NOT NULL,
  `timevalue` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `config_data` text COLLATE utf8_bin NOT NULL,
  PRIMARY KEY (`username`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='User preferences storage for phpMyAdmin';

--
-- Volcado de datos para la tabla `pma_userconfig`
--

INSERT INTO `pma_userconfig` (`username`, `timevalue`, `config_data`) VALUES
('root', '2014-07-03 02:57:19', '{"lang":"es","collation_connection":"utf8mb4_general_ci"}');
--
-- Base de datos: `phpmyreservation`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `phpmyreservation_configuration`
--

CREATE TABLE IF NOT EXISTS `phpmyreservation_configuration` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `price` float NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=2 ;

--
-- Volcado de datos para la tabla `phpmyreservation_configuration`
--

INSERT INTO `phpmyreservation_configuration` (`id`, `price`) VALUES
(1, 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `phpmyreservation_reservations`
--

CREATE TABLE IF NOT EXISTS `phpmyreservation_reservations` (
  `reservation_id` int(10) NOT NULL AUTO_INCREMENT,
  `reservation_made_time` datetime NOT NULL,
  `reservation_year` smallint(4) NOT NULL,
  `reservation_week` tinyint(2) NOT NULL,
  `reservation_day` tinyint(1) NOT NULL,
  `reservation_time` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `reservation_price` float NOT NULL,
  `reservation_user_id` int(10) NOT NULL,
  `reservation_user_email` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `reservation_user_name` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`reservation_id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=4 ;

--
-- Volcado de datos para la tabla `phpmyreservation_reservations`
--

INSERT INTO `phpmyreservation_reservations` (`reservation_id`, `reservation_made_time`, `reservation_year`, `reservation_week`, `reservation_day`, `reservation_time`, `reservation_price`, `reservation_user_id`, `reservation_user_email`, `reservation_user_name`) VALUES
(1, '2014-08-27 22:35:15', 2014, 35, 4, '09-10', 2, 1, 'test@test.com', 'testeo'),
(2, '2014-08-27 22:36:25', 2014, 35, 4, '15-16', 2, 1, 'test@test.com', 'testeo'),
(3, '2014-08-27 22:36:25', 2014, 35, 3, '14-15', 2, 1, 'test@test.com', 'testeo');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `phpmyreservation_users`
--

CREATE TABLE IF NOT EXISTS `phpmyreservation_users` (
  `user_id` int(10) NOT NULL AUTO_INCREMENT,
  `user_is_admin` tinyint(1) NOT NULL,
  `user_email` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `user_password` varchar(1000) COLLATE utf8_unicode_ci NOT NULL,
  `user_name` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `user_reservation_reminder` tinyint(1) NOT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=2 ;

--
-- Volcado de datos para la tabla `phpmyreservation_users`
--

INSERT INTO `phpmyreservation_users` (`user_id`, `user_is_admin`, `user_email`, `user_password`, `user_name`, `user_reservation_reminder`) VALUES
(1, 1, 'test@test.com', '$1$k4i8pa2m$0/ic6R/tvvy8NO9Zj93iD.', 'testeo', 0);
--
-- Base de datos: `proyectos`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tprojecttrabajo`
--

CREATE TABLE IF NOT EXISTS `tprojecttrabajo` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` text NOT NULL,
  `detail` text NOT NULL,
  `status` tinyint(1) NOT NULL,
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=13 ;

--
-- Volcado de datos para la tabla `tprojecttrabajo`
--

INSERT INTO `tprojecttrabajo` (`id`, `title`, `detail`, `status`, `date`) VALUES
(7, 'test', 'test', 0, '2014-07-04 06:59:09'),
(8, 'test', 'test', 0, '2014-07-04 06:59:13'),
(12, 'Proyecto T', 'proyecto 1', 0, '2014-08-12 01:29:27');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tprojectuniversidad`
--

CREATE TABLE IF NOT EXISTS `tprojectuniversidad` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` text NOT NULL,
  `detail` text NOT NULL,
  `status` tinyint(1) NOT NULL,
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=19 ;

--
-- Volcado de datos para la tabla `tprojectuniversidad`
--

INSERT INTO `tprojectuniversidad` (`id`, `title`, `detail`, `status`, `date`) VALUES
(15, 'test', 'test', 0, '2014-07-04 06:58:56'),
(16, 'test', 'test', 0, '2014-07-04 06:59:06'),
(18, 'das', 'dasdasd', 0, '2014-07-06 03:23:39');
--
-- Base de datos: `test`
--
--
-- Base de datos: `webauth`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `user_pwd`
--

CREATE TABLE IF NOT EXISTS `user_pwd` (
  `name` char(30) COLLATE latin1_general_ci NOT NULL DEFAULT '',
  `pass` char(32) COLLATE latin1_general_ci NOT NULL DEFAULT '',
  PRIMARY KEY (`name`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COLLATE=latin1_general_ci;

--
-- Volcado de datos para la tabla `user_pwd`
--

INSERT INTO `user_pwd` (`name`, `pass`) VALUES
('xampp', 'wampp');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

-- phpMyAdmin SQL Dump
-- version 4.1.14
-- http://www.phpmyadmin.net
--
-- Client :  127.0.0.1
-- Généré le :  Lun 02 Janvier 2017 à 15:02
-- Version du serveur :  5.6.17
-- Version de PHP :  5.5.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Base de données :  `daily_planet`
--

-- --------------------------------------------------------

--
-- Structure de la table `news`
--

CREATE TABLE IF NOT EXISTS `news` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `theme` varchar(50) NOT NULL,
  `content` text NOT NULL,
  `title` varchar(50) NOT NULL,
  `date` date NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=4 ;

--
-- Contenu de la table `news`
--

INSERT INTO `news` (`id`, `theme`, `content`, `title`, `date`) VALUES
(1, 'people', 'Lady Gaga a encore fait des siennes, apres la robe de viande, la voila avec un string concombre !', 'Is Lady Gaga vegan ?', '2017-01-02'),
(2, 'politique', 'Donald Trump défie les pronostics, \r\naprès son investiture, il prévoit de redonner de casser la Barack !', 'Donald Trump, humoriste incompris ?', '2017-01-02'),
(3, 'Sport', '		Johann a tenu 48h sans s''arreter !', 'Johann, une bete de s*xe', '2017-01-02');

-- --------------------------------------------------------

--
-- Structure de la table `reporters`
--

CREATE TABLE IF NOT EXISTS `reporters` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `login` varchar(50) NOT NULL,
  `passwd` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=3 ;

--
-- Contenu de la table `reporters`
--

INSERT INTO `reporters` (`id`, `login`, `passwd`) VALUES
(1, 'Lois', '1002f92e1077330246579d9a9a151624'),
(2, 'Clark', 'de78239fb5d2cf89a4df9cf5bba4f21b');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

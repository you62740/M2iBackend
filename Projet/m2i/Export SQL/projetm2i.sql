-- phpMyAdmin SQL Dump
-- version 4.6.4
-- https://www.phpmyadmin.net/
--
-- Client :  127.0.0.1
-- Généré le :  Mer 01 Février 2017 à 08:54
-- Version du serveur :  5.7.14
-- Version de PHP :  5.6.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données :  `projetm2i`
--

-- --------------------------------------------------------

--
-- Structure de la table `articles`
--

CREATE TABLE `articles` (
  `id` int(11) NOT NULL,
  `category` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `title` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `content` longtext COLLATE utf8_unicode_ci NOT NULL,
  `creation_date` datetime NOT NULL,
  `modification_date` datetime NOT NULL,
  `id_user` int(11) NOT NULL,
  `img` text COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Contenu de la table `articles`
--

INSERT INTO `articles` (`id`, `category`, `title`, `content`, `creation_date`, `modification_date`, `id_user`, `img`) VALUES
(1, 'description', 'm2i', 'Le Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page avant impression. Le Lorem Ipsum est le faux texte standard de l\'imprimerie depuis les années 1500, quand un peintre anonyme assembla ensemble des morceaux de texte pour réaliser un livre spécimen de polices de texte. Il n\'a pas fait que survivre cinq siècles, mais s\'est aussi adapté à la bureautique informatique, sans que son contenu n\'en soit modifié. Il a été popularisé dans les années 1960 grâce à la vente de feuilles Letraset contenant des passages du Lorem Ipsum, et, plus récemment, par son inclusion dans des applications de mise en page de texte, comme Aldus PageMaker.', '2017-01-19 00:00:00', '2017-01-19 00:00:00', 5, 'images/descriptionm2i1485781168.jpeg'),
(2, 'participant', 'liste', 'Et interdum acciderat, ut siquid in penetrali secreto nullo citerioris vitae ministro praesente paterfamilias uxori susurrasset in aurem, velut Amphiarao referente aut Marcio, quondam vatibus inclitis, postridie disceret imperator. ideoque etiam parietes arcanorum soli conscii timebantur.', '2017-01-18 00:00:00', '2017-01-19 00:00:00', 5, 'images/participantliste1485787059.jpeg'),
(3, 'description', 'programme', 'Alios autem dicere aiunt multo etiam inhumanius (quem locum breviter paulo ante perstrinxi) praesidii adiumentique causa, non benevolentiae neque caritatis, amicitias esse expetendas; itaque, ut quisque minimum firmitatis haberet minimumque virium, ita amicitias appetere maxime; ex eo fieri ut mulierculae magis amicitiarum praesidia quaerant quam viri et inopes quam opulenti et calamitosi quam ii qui putentur beati.', '2017-01-17 00:00:00', '2017-01-19 00:00:00', 5, 'images/descriptionprogramme1485786512.jpeg'),
(4, 'description', 'test', 'Denique Antiochensis ordinis vertices sub uno elogio iussit occidi ideo efferatus, quod ei celebrari vilitatem intempestivam urgenti, cum inpenderet inopia, gravius rationabili responderunt; et perissent ad unum ni comes orientis tunc Honoratus fixa constantia restitisset.', '2017-01-13 00:00:00', '2017-01-20 00:00:00', 5, 'images/descriptiontest1485786791.jpeg'),
(5, 'journeetype', 'Nos etudiants', 'Ergo ego senator inimicus, si ita vultis, homini, amicus esse, sicut semper fui, rei publicae debeo. Quid? si ipsas inimicitias, depono rei publicae causa, quis me tandem iure reprehendet, praesertim cum ego omnium meorum consiliorum atque factorum exempla semper ex summorum hominum consiliis atque factis mihi censuerim petenda.', '2017-01-19 04:00:00', '2017-01-20 10:00:00', 5, 'images/journeetypeNos etudiants1485787022.jpeg'),
(6, 'journeetype', 'jounee type', 'Oportunum est, ut arbitror, explanare nunc causam, quae ad exitium praecipitem Aginatium inpulit iam inde a priscis maioribus nobilem, ut locuta est pertinacior fama. nec enim super hoc ulla documentorum rata est fides.', '2017-01-20 00:00:00', '2017-01-20 00:00:00', 5, 'images/journeetypejounee type1485787001.jpeg'),
(7, 'programmeformation', 'Notre formation', 'Unde Rufinus ea tempestate praefectus praetorio ad discrimen trusus est ultimum. ire enim ipse compellebatur ad militem, quem exagitabat inopia simul et feritas, et alioqui coalito more in ordinarias dignitates asperum semper et saevum, ut satisfaceret atque monstraret, quam ob causam annonae convectio sit impedita.', '2017-01-20 00:00:00', '2017-01-20 00:00:00', 5, 'images/programmeformationNotre formation1485787073.jpeg'),
(8, 'journeetype', 'Suivi de formation', 'Inter haec Orfitus praefecti potestate regebat urbem aeternam ultra modum delatae dignitatis sese efferens insolenter, vir quidem prudens et forensium negotiorum oppido gnarus, sed splendore liberalium doctrinarum minus quam nobilem decuerat institutus, quo administrante seditiones sunt concitatae graves ob inopiam vini: huius avidis usibus vulgus intentum ad motus asperos excitatur et crebros.', '2017-01-20 00:00:00', '2017-01-20 00:00:00', 5, 'images/journeetypeSuivi de formation1485787036.jpeg'),
(9, 'programmeformation', 'Objectifs', 'Inter has ruinarum varietates a Nisibi quam tuebatur accitus Vrsicinus, cui nos obsecuturos iunxerat imperiale praeceptum, dispicere litis exitialis certamina cogebatur abnuens et reclamans, adulatorum oblatrantibus turmis, bellicosus sane milesque semper et militum ductor sed forensibus iurgiis longe discretus, qui metu sui discriminis anxius cum accusatores quaesitoresque subditivos sibi consociatos ex isdem foveis cerneret emergentes, quae clam palamve agitabantur, occultis Constantium litteris edocebat inplorans subsidia, quorum metu tumor notissimus Caesaris exhalaret.', '2017-01-18 00:00:00', '2017-01-20 00:00:00', 5, 'images/programmeformationObjectifs1485787086.jpeg'),
(10, 'description', 'PHP', 'Duplexque isdem diebus acciderat malum, quod et Theophilum insontem atrox interceperat casus, et Serenianus dignus exsecratione cunctorum, innoxius, modo non reclamante publico vigore, discessit.', '2017-01-11 00:00:00', '2017-01-19 00:00:00', 5, 'images/descriptionPHP1485849364.jpeg'),
(11, 'description', 'Javascript', 'Hae duae provinciae bello quondam piratico catervis mixtae praedonum a Servilio pro consule missae sub iugum factae sunt vectigales. et hae quidem regiones velut in prominenti terrarum lingua positae ob orbe eoo monte Amano disparantur.', '2017-01-19 00:00:00', '2017-01-19 00:00:00', 5, 'images/descriptionJavascript1485788919.png'),
(12, 'detailprogrammeformation', 'symfony', 'Et prima post Osdroenam quam, ut dictum est, ab hac descriptione discrevimus, Commagena, nunc Euphratensis, clementer adsurgit, Hierapoli, vetere Nino et Samosata civitatibus amplis inlustris.', '2017-01-10 00:00:00', '2017-01-18 00:00:00', 21, 'images/descriptiontest image1485773471.png'),
(13, 'description', 'objectifs professionnels', 'A l\'issue de ce stage,  le développeur Back-End est en mesure de gérér la partie non-visible et cependant essentielle au bon fonctionnement d\'une application web :  l\'administration du site.\r\nLe développeur bac-end conçoit et crée le back-office, gère le coté serveur, les interactions de bases de données, la sécurité et les pereformances du site grâce aux langages de programmation.\r\nIl s\'occupe de la mise en place, de la configuration, du développement et de la maintenance du serveur, de la base de données et de l\'application web en général. Un "développeur de l\'ombre" sans lequel les sites Internet et les applications ne pourraient tout simplement pas exister !\r\nLa formation permettra également de développer le savoir être et sens du service en entreprise.', '2017-01-20 00:00:00', '2017-01-20 00:00:00', 5, 'images/descriptionobjectifs professionnels1485786761.jpeg'),
(14, 'test', 'test', 'kjghkhjgkghhj', '2012-01-01 00:00:00', '2012-01-01 00:00:00', 1, 'images/descriptiontest image1485773471.png'),
(15, 'test', 'test', 'xwxwcxcvwxxv', '2012-01-01 00:00:00', '2012-01-01 00:00:00', 1, 'images/descriptiontest image1485773471.png'),
(19, 'description', 'test image', 'sffgfgg', '2012-01-01 00:00:00', '2012-01-01 00:00:00', 5, 'images/descriptiontest image1485786806.jpeg'),
(21, 'description', 'test johann', 'gtreyutuiiiyyyuuiiiuuyi', '2012-01-01 00:00:00', '2012-01-01 00:00:00', 7, 'images/participanttest johann1485854612.jpeg');

-- --------------------------------------------------------

--
-- Structure de la table `pictures`
--

CREATE TABLE `pictures` (
  `id` int(11) NOT NULL,
  `img` longtext COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Contenu de la table `pictures`
--

INSERT INTO `pictures` (`id`, `img`) VALUES
(1, 'image 1 / 3'),
(2, 'image 2 / 3'),
(3, 'image 3 / 3'),
(4, 'image 4'),
(5, 'image 5');

-- --------------------------------------------------------

--
-- Structure de la table `testimony`
--

CREATE TABLE `testimony` (
  `id` int(11) NOT NULL,
  `context` varchar(1) COLLATE utf8_unicode_ci NOT NULL,
  `msg` longtext COLLATE utf8_unicode_ci NOT NULL,
  `creation_date` datetime NOT NULL,
  `modification_date` datetime NOT NULL,
  `id_user` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Contenu de la table `testimony`
--

INSERT INTO `testimony` (`id`, `context`, `msg`, `creation_date`, `modification_date`, `id_user`) VALUES
(1, 'f', 'salut', '2017-01-24 00:00:00', '2017-01-24 00:00:00', 6),
(2, 'f', 'bonjour', '2017-01-24 00:00:00', '2017-01-24 00:00:00', 9),
(3, 'f', 'salut tout le monde', '2017-01-24 00:00:00', '2017-01-24 00:00:00', 11),
(4, 't', 'super !', '2017-01-26 00:00:00', '2017-01-26 00:00:00', 6),
(5, 't', 'vraiment bien...', '2017-01-27 00:00:00', '2017-01-27 00:00:00', 12),
(6, 't', 'strrsyysysrsys', '2012-01-01 00:00:00', '2012-01-01 00:00:00', 5),
(8, 'f', 'test', '2017-01-31 09:50:19', '2017-01-31 09:50:19', 7),
(9, 'f', 'sddfsddsdffsdsffsdffsdfsfss\r\ndsfsdsd\r\nfsfsdf\r\ndfd\r\nff\r\ndsdfsfd', '2017-01-31 09:52:49', '2017-01-31 09:52:49', 6),
(10, 'f', 'gfgfsdgdssfgsd\r\nggsdgsdfgdg\r\ngdfgfvcxwcvwxcvc\r\nvwcxvcxvcwxv\r\nvxcwvc', '2017-01-31 13:59:07', '2017-01-31 13:59:07', 5);

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `firstname` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `lastname` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `avatar` longtext COLLATE utf8_unicode_ci NOT NULL,
  `age` int(11) DEFAULT NULL,
  `sex` varchar(1) COLLATE utf8_unicode_ci NOT NULL,
  `mail` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `login` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `password` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `status` varchar(1) COLLATE utf8_unicode_ci NOT NULL,
  `cv` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Contenu de la table `users`
--

INSERT INTO `users` (`id`, `firstname`, `lastname`, `avatar`, `age`, `sex`, `mail`, `login`, `password`, `status`, `cv`) VALUES
(5, 'frederic', 'leclercq', 'images/fredericleclercq1485434977.jpeg', 47, 'm', 'fredmail', 'frederic', 'frederic', 'E', 'images/fredericleclercq1485434977.docx'),
(6, 'melissa', 'duthoit', 'images/melissaduthoit1485435161.jpeg', 25, 'f', 'melissamail', 'melissa', 'melissa', 'E', 'images/melissaduthoit1485435161.pdf'),
(7, 'johan', 'alborelli', 'images/johanalborelli1485435292.jpeg', 40, 'm', 'johannmail', 'johann', 'johann', 'E', 'images/johanalborelli1485435292.pdf'),
(8, 'farid', 'bouchikhi', 'images/faridbouchikhi1485435399.jpeg', 28, 'm', 'faridmail', 'farid', 'farid', 'E', 'images/faridbouchikhi1485435399.pdf'),
(9, 'rudy', 'carton', 'images/rudycarton1485435465.jpeg', 25, 'm', 'rudymail', 'rudy', 'rudy', 'E', 'images/rudycarton1485435465.pdf'),
(10, 'Abderrahmane', 'lamri', 'images/abderrahmanelamri1485435539.jpeg', 38, 'm', 'abderrahmanemail', 'abderrahmane', 'abderrahmane', 'E', 'images/abderrahmanelamri1485435539.pdf'),
(11, 'richard', 'Kaczmarek', 'images/richardKaczmarek1485435608.jpeg', 56, 'm', 'richardmail', 'richard', 'richard', 'E', 'images/richardKaczmarek1485435608.pdf'),
(12, 'serge', 'roy', 'images/sergeroy1485435677.jpeg', 28, 'm', 'sergemail', 'serge', 'serge', 'E', 'images/sergeroy1485435677.pdf'),
(13, 'alexandre', 'milanese', 'images/alexandremilanese1485435763.jpeg', 36, 'm', 'alexandremail', 'alexandre', 'alexandre', 'E', 'images/alexandremilanese1485435763.pdf'),
(14, 'mohamed', 'ait ben ahmed', 'images/mohamedait ben ahmed1485435838.jpeg', 25, 'm', 'mohamedmail', 'mohamed', 'mohamed', 'E', 'images/mohamedait ben ahmed1485435838.pdf'),
(15, 'jean-mickael', 'coppin', 'images/jean-mickaelcoppin1485436374.jpeg', 26, 'm', 'jean-mickaëlmail', 'jean-mickaël', 'jean-mickaël', 'E', 'images/jean-mickaelcoppin1485436374.pdf'),
(16, 'thomas', 'sanctorum', 'images/thomassanctorum1485436428.jpeg', 23, 'm', 'thomasmail', 'thomas', 'thomas', 'E', 'images/thomassanctorum1485436026.pdf'),
(17, 'younes', 'el ouahmani', 'images/younesel ouahmani1485436106.jpeg', 25, 'm', 'younesmail', 'younes', 'younes', 'E', 'images/younesel ouahmani1485436106.pdf'),
(18, 'nicolas', 'patte', 'images/nicolaspatte1485436189.jpeg', 23, 'm', 'nicolaspmail', 'nicolasp', 'nicolasp', 'E', 'images/nicolaspatte1485436189.pdf'),
(19, 'christophe', 'rochut', 'images/christopherochut1485436259.jpeg', 23, 'm', 'christophemail', 'christophe', 'christophe', 'E', 'images/christopherochut1485436259.pdf'),
(20, 'nicolas', 'legrand', 'images/nicolaslegrand1485436337.jpeg', 30, 'm', 'nicolasmail', 'nicolas', 'nicolas', 'F', 'images/nicolaslegrand1485436337.pdf');

--
-- Index pour les tables exportées
--

--
-- Index pour la table `articles`
--
ALTER TABLE `articles`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `pictures`
--
ALTER TABLE `pictures`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `testimony`
--
ALTER TABLE `testimony`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `UNIQ_1483A5E95126AC48` (`mail`),
  ADD UNIQUE KEY `UNIQ_1483A5E9AA08CB10` (`login`),
  ADD UNIQUE KEY `UNIQ_1483A5E9B66FFE92` (`cv`);

--
-- AUTO_INCREMENT pour les tables exportées
--

--
-- AUTO_INCREMENT pour la table `articles`
--
ALTER TABLE `articles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;
--
-- AUTO_INCREMENT pour la table `pictures`
--
ALTER TABLE `pictures`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT pour la table `testimony`
--
ALTER TABLE `testimony`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
--
-- AUTO_INCREMENT pour la table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

-- MySQL dump 10.13  Distrib 5.6.33, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: blog
-- ------------------------------------------------------
-- Server version	5.6.33-0ubuntu0.14.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `admins`
--

DROP TABLE IF EXISTS `admins`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `admins` (
  `admin_id` int(11) NOT NULL AUTO_INCREMENT,
  `admin_email` varchar(64) NOT NULL,
  `admin_created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `admin_status` varchar(16) NOT NULL,
  `admin_resetpwd_token` varchar(64) NOT NULL,
  `admin_password` varchar(128) NOT NULL,
  PRIMARY KEY (`admin_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admins`
--

LOCK TABLES `admins` WRITE;
/*!40000 ALTER TABLE `admins` DISABLE KEYS */;
INSERT INTO `admins` VALUES (1,'konstantinbulatovic1@gmail.com','2018-01-02 15:11:16','','','$2y$10$9ga8FgdD49Bz2bS3kH.IZONZ/f.7vbaFOZxVSBQSM1d2pwz/7uEJW');
/*!40000 ALTER TABLE `admins` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `comments`
--

DROP TABLE IF EXISTS `comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `comments` (
  `comment_id` int(11) NOT NULL AUTO_INCREMENT,
  `comment_post_id` int(11) NOT NULL,
  `comment_email` varchar(100) NOT NULL,
  `comment_name` varchar(64) NOT NULL,
  `comment_body` varchar(355) NOT NULL,
  `comment_created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`comment_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comments`
--

LOCK TABLES `comments` WRITE;
/*!40000 ALTER TABLE `comments` DISABLE KEYS */;
INSERT INTO `comments` VALUES (1,33,'','Mufladin','Gde je moja lampa?','2018-01-15 21:01:16'),(2,33,'','Stonoga','Mrc mrc','2018-01-15 21:01:28'),(3,33,'','','Great stuff bro!','2018-01-16 07:03:50'),(4,33,'','Mr mister','Great stufff i have to say i\'am a little bit suprised cause of the lack in the insight of the stuff i write. So the deail is to get supised!\n\nGreat stufff i have to say i\'am a littl','2018-01-16 10:59:39'),(5,33,'','234t32t23','t23t23t23t23t23t','2018-01-16 10:59:55');
/*!40000 ALTER TABLE `comments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `comments_flags`
--

DROP TABLE IF EXISTS `comments_flags`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `comments_flags` (
  `flag_id` int(11) NOT NULL AUTO_INCREMENT,
  `flag_comment_id` int(11) NOT NULL,
  `flag_reasons` varchar(1000) NOT NULL,
  PRIMARY KEY (`flag_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comments_flags`
--

LOCK TABLES `comments_flags` WRITE;
/*!40000 ALTER TABLE `comments_flags` DISABLE KEYS */;
/*!40000 ALTER TABLE `comments_flags` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `posts`
--

DROP TABLE IF EXISTS `posts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `posts` (
  `post_id` int(11) NOT NULL AUTO_INCREMENT,
  `post_title` varchar(64) NOT NULL,
  `post_content` varchar(15000) NOT NULL,
  `post_attachments` varchar(25000) NOT NULL,
  `post_created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `post_desc` varchar(255) NOT NULL,
  `post_allow_comments` tinyint(1) NOT NULL,
  `post_url_slug` varchar(255) NOT NULL,
  `post_writer` varchar(100) NOT NULL,
  `post_visible` tinyint(4) NOT NULL,
  PRIMARY KEY (`post_id`)
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `posts`
--

LOCK TABLES `posts` WRITE;
/*!40000 ALTER TABLE `posts` DISABLE KEYS */;
INSERT INTO `posts` VALUES (23,'Zdravko kurvetine! sta se rad!','Zdravko kurvetine! sta se rad!Zdravko kurvetine! sta se rad!','','2018-01-15 22:42:24','qwrqwtqwtqwtqwtqwt',1,'zdravko-kurvetine-sta-se-rad-','konstantinbulatovic1@gmail.com',1),(32,'Foreach examples wih ease','<p>Yes its easy, says the lord and our savior. But somethimes is hard!Yes its easy, says the lord and our savior. But somethimes is hard!Yes its easy, says the lord and our savior. But somethimes is hard!wqrqwtqwt</p>','','2018-01-14 16:47:47','Yes its easy, says the lord and our savior. But somethimes is hard!',1,'foreach-examples-wih-ease','konstantinbulatovic1@gmail.com',1),(33,'Hello world to everybody','<p>Yes its true.</p><br><p>I started doing this stuff for 2 reasons:</p><p><ol><li>To make money</li><li>And to fuck bitches</li></ol><br><p>Some might say thats a dumb thing to do. But honnestly i dont give a uck. The main purpose of life is to jerk off so why should i care. The manifest of destiny is to accomlish your goals, and thats hard. You need lifetime of sucking up to corporate bosses.</p><p>Well today is a new day. And its hard to think otherwise so i set up a little goals</p><h2>Repeat everything</h2><p>This may sound silly bu its true and i trully hate it. TRULLY!</p></p>','','2018-01-14 17:21:12','This is some post i write about stuff',1,'hello-world-to-everybody','konstantinbulatovic1@gmail.com',1),(35,'Saying random title','<p>This is random stuff that i post to test stuff out la la la</p><br><p>Helooo</p>','','2018-01-16 09:36:45','Random stuff right here',1,'saying-random-title','konstantinbulatovic1@gmail.com',1);
/*!40000 ALTER TABLE `posts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(128) NOT NULL,
  `full_name` varchar(512) NOT NULL,
  `password` varchar(256) NOT NULL,
  `status` int(11) NOT NULL,
  `date_created` datetime NOT NULL,
  `pwd_reset_token` varchar(32) DEFAULT NULL,
  `pwd_reset_token_creation_date` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email_idx` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-01-17  9:02:31

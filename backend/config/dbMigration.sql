-- MySQL dump 10.13 Distrib 8.0.25
-- Server version 8.0.18-google

SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT;
SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS;
SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION;
SET NAMES utf8;
SET @OLD_TIME_ZONE=@@TIME_ZONE;
SET TIME_ZONE='+00:00';
SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS;
SET UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS;
SET FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE;
SET SQL_MODE='NO_AUTO_VALUE_ON_ZERO';
SET @OLD_SQL_NOTES=@@SQL_NOTES;
SET SQL_NOTES=0;
SET @MYSQLDUMP_TEMP_LOG_BIN = @@SESSION.SQL_LOG_BIN;
SET @@SESSION.SQL_LOG_BIN=0;

SET @@GLOBAL.GTID_PURGED='0c8a4418-601d-11ec-8f02-42010a800003:1-428990';

-- Table structure for `hm_chat`
DROP TABLE IF EXISTS `hm_chat`;
CREATE TABLE `hm_chat` (
  `id` int NOT NULL,
  `fromUserId` int NOT NULL,
  `toUserId` int NOT NULL,
  `text` varchar(75) NOT NULL,
  `createdDate` date DEFAULT NULL,
  `msgStatus` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Table structure for `hm_course`
DROP TABLE IF EXISTS `hm_course`;
CREATE TABLE `hm_course` (
  `id` int NOT NULL AUTO_INCREMENT,
  `courseCode` varchar(45) NOT NULL,
  `courseName` varchar(75) NOT NULL,
  `departmentId` int NOT NULL,
  `level` varchar(45) NOT NULL,
  `status` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Table structure for `hm_department`
DROP TABLE IF EXISTS `hm_department`;
CREATE TABLE `hm_department` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Table structure for `hm_file`
DROP TABLE IF EXISTS `hm_file`;
CREATE TABLE `hm_file` (
  `id` int NOT NULL,
  `tutorProfileId` int NOT NULL,
  `fileName` varchar(75) NOT NULL,
  `fileType` int NOT NULL,
  `fileExtension` varchar(15) NOT NULL,
  `filePath` varchar(175) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Table structure for `hm_post`
DROP TABLE IF EXISTS `hm_post`;
CREATE TABLE `hm_post` (
  `id` int NOT NULL AUTO_INCREMENT,
  `description` varchar(50) DEFAULT NULL,
  `tutorProfileId` int NOT NULL,
  `status` int NOT NULL,
  `language` varchar(55) DEFAULT NULL,
  `subjectName` varchar(1000) NOT NULL,
  `ratePerHour` float NOT NULL,
  `createdDateTime` date NOT NULL,
  `modifiedDateTime` date NOT NULL,
  `experienceYears` int DEFAULT NULL,
  `isActive` int DEFAULT NULL,
  `availableTime` varchar(75) DEFAULT NULL,
  FULLTEXT(`subjectName`),
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Table structure for `hm_qualification`
DROP TABLE IF EXISTS `hm_qualification`;
CREATE TABLE `hm_qualification` (
  `id` int NOT NULL AUTO_INCREMENT,
  `subjectName` varchar(1000) NOT NULL,
  `description` varchar(80) NOT NULL,
  `grade` varchar(45) DEFAULT NULL,
  `tutorProfileId` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Table structure for `hm_review`
DROP TABLE IF EXISTS `hm_review`;
CREATE TABLE `hm_review` (
  `id` int NOT NULL AUTO_INCREMENT,
  `text` varchar(250) DEFAULT NULL,
  `rating` float DEFAULT NULL,
  `createdDateTime` date NOT NULL,
  `modifiedDateTime` date NOT NULL,
  `userId` int NOT NULL,
  `tutorProfileId` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Table structure for `hm_tutor_profile`
DROP TABLE IF EXISTS `hm_tutor_profile`;
CREATE TABLE `hm_tutor_profile` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` int NOT NULL,
  `about` varchar(250) NULL,
  `age` int NULL,
  `rating` float NULL,
  `picPath` varchar(180) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Table structure for `hm_user`
DROP TABLE IF EXISTS `hm_user`;
CREATE TABLE `hm_user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `firstName` varchar(50) DEFAULT NULL,
  `lastName` varchar(50) DEFAULT NULL,
  `usertype` int NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(145) NOT NULL,
  `status` int NOT NULL,
  `gender` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Table structure for `hm_feedback`
DROP TABLE IF EXISTS `hm_feedback`;
CREATE TABLE `hm_feedback` (
  `id` int NOT NULL AUTO_INCREMENT,
  `subject` varchar(100) NOT NULL,
  `description` varchar(250) NOT NULL,
  `createdDateTime` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `userId` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

SET @@SESSION.SQL_LOG_BIN = @MYSQLDUMP_TEMP_LOG_BIN;
SET TIME_ZONE=@OLD_TIME_ZONE;
SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT;
SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS;
SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION;
SET SQL_NOTES=@OLD_SQL_NOTES;
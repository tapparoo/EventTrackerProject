-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema eventtracker
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `eventtracker` ;

-- -----------------------------------------------------
-- Schema eventtracker
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `eventtracker` DEFAULT CHARACTER SET utf8 ;
USE `eventtracker` ;

-- -----------------------------------------------------
-- Table `user`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `user` ;

CREATE TABLE IF NOT EXISTS `user` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `first_name` VARCHAR(45) NOT NULL,
  `last_name` VARCHAR(45) NOT NULL,
  `username` VARCHAR(25) NOT NULL,
  `password` VARCHAR(200) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `height_in_inches` DECIMAL(3,1) NULL,
  `weight_in_pounds` DECIMAL(4,1) NULL,
  `age` INT NULL,
  `bmi` DECIMAL(3,1) NULL,
  `active` TINYINT UNSIGNED NOT NULL DEFAULT 1,
  `admin` TINYINT UNSIGNED NOT NULL DEFAULT 0,
  `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  `last_login` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `username_UNIQUE` (`username` ASC),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `group`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `group` ;

CREATE TABLE IF NOT EXISTS `group` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `user_id` INT UNSIGNED NOT NULL,
  `name` VARCHAR(255) NOT NULL,
  `description` TEXT NULL,
  `active` TINYINT UNSIGNED NOT NULL DEFAULT 1,
  `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `fk_user_idx` (`user_id` ASC),
  CONSTRAINT `fk_user_group`
    FOREIGN KEY (`user_id`)
    REFERENCES `user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `event`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `event` ;

CREATE TABLE IF NOT EXISTS `event` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `user_id` INT UNSIGNED NULL,
  `name` VARCHAR(45) NOT NULL,
  `description` TEXT NULL,
  `active` TINYINT UNSIGNED NOT NULL DEFAULT 1,
  `date` DATETIME NULL,
  `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `fk_user_idx` (`user_id` ASC),
  CONSTRAINT `fk_event_user`
    FOREIGN KEY (`user_id`)
    REFERENCES `user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `comment`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `comment` ;

CREATE TABLE IF NOT EXISTS `comment` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `user_id` INT UNSIGNED NULL,
  `comment` TEXT NOT NULL,
  `active` TINYINT NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`),
  INDEX `fk_user_idx` (`user_id` ASC),
  CONSTRAINT `fk_user_comment`
    FOREIGN KEY (`user_id`)
    REFERENCES `user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `user_group`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `user_group` ;

CREATE TABLE IF NOT EXISTS `user_group` (
  `user_id` INT UNSIGNED NOT NULL,
  `group_id` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`user_id`, `group_id`),
  INDEX `fk_group_idx` (`group_id` ASC),
  CONSTRAINT `fk_user_group_user`
    FOREIGN KEY (`user_id`)
    REFERENCES `user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_user_group_group`
    FOREIGN KEY (`group_id`)
    REFERENCES `group` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `group_event`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `group_event` ;

CREATE TABLE IF NOT EXISTS `group_event` (
  `group_id` INT UNSIGNED NOT NULL,
  `event_id` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`group_id`, `event_id`),
  INDEX `fk_event_idx` (`event_id` ASC),
  CONSTRAINT `fk_group_event_group`
    FOREIGN KEY (`group_id`)
    REFERENCES `group` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_group_event_event`
    FOREIGN KEY (`event_id`)
    REFERENCES `event` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `group_comment`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `group_comment` ;

CREATE TABLE IF NOT EXISTS `group_comment` (
  `group_id` INT UNSIGNED NOT NULL,
  `comment_id` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`group_id`, `comment_id`),
  INDEX `fk_comment_idx` (`comment_id` ASC),
  CONSTRAINT `fk_group_comment_group`
    FOREIGN KEY (`group_id`)
    REFERENCES `group` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_group_comment_comment`
    FOREIGN KEY (`comment_id`)
    REFERENCES `comment` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `event_comment`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `event_comment` ;

CREATE TABLE IF NOT EXISTS `event_comment` (
  `event_id` INT UNSIGNED NOT NULL,
  `comment_id` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`event_id`, `comment_id`),
  INDEX `fk_comment_idx` (`comment_id` ASC),
  CONSTRAINT `fk_event_comment_event`
    FOREIGN KEY (`event_id`)
    REFERENCES `event` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_event_comment_comment`
    FOREIGN KEY (`comment_id`)
    REFERENCES `comment` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

-- -----------------------------------------------------
-- Data for table `user`
-- -----------------------------------------------------
START TRANSACTION;
USE `eventtracker`;
INSERT INTO `user` (`id`, `first_name`, `last_name`, `username`, `password`, `email`, `height_in_inches`, `weight_in_pounds`, `age`, `bmi`, `active`, `admin`, `created_at`, `updated_at`, `last_login`) VALUES (DEFAULT, 'Adam', 'Tappy', 'admin', 'admin', 'wut@wut@gmail.com', 69, 169, 69, NULL, 1, 1, '2019-03-20 14:33:58', '2019-03-20 14:33:58', '2019-03-20 14:33:58');
INSERT INTO `user` (`id`, `first_name`, `last_name`, `username`, `password`, `email`, `height_in_inches`, `weight_in_pounds`, `age`, `bmi`, `active`, `admin`, `created_at`, `updated_at`, `last_login`) VALUES (DEFAULT, 'Some', 'Guy', 'sumguy', 'heythere', 'sum@guy.com', 75, 175, 55, NULL, 1, 0, '2019-03-20 14:33:58', '2019-03-20 14:33:58', '2019-03-20 14:33:58');
INSERT INTO `user` (`id`, `first_name`, `last_name`, `username`, `password`, `email`, `height_in_inches`, `weight_in_pounds`, `age`, `bmi`, `active`, `admin`, `created_at`, `updated_at`, `last_login`) VALUES (DEFAULT, 'Some', 'Gal', 'sumgal', 'heyback', 'sum@gal.com', 88, 288, 44, NULL, 1, 0, '2019-03-20 14:33:58', '2019-03-20 14:33:58', '2019-03-20 14:33:58');
INSERT INTO `user` (`id`, `first_name`, `last_name`, `username`, `password`, `email`, `height_in_inches`, `weight_in_pounds`, `age`, `bmi`, `active`, `admin`, `created_at`, `updated_at`, `last_login`) VALUES (DEFAULT, 'Peter', 'Piper', 'PickedA', 'PeckOf', 'pickled@peppers.com', 87, 299, 33, NULL, 1, 0, '2019-03-20 14:33:58', '2019-03-20 14:33:58', '2019-03-20 14:33:58');
INSERT INTO `user` (`id`, `first_name`, `last_name`, `username`, `password`, `email`, `height_in_inches`, `weight_in_pounds`, `age`, `bmi`, `active`, `admin`, `created_at`, `updated_at`, `last_login`) VALUES (DEFAULT, 'Hickory', 'Dickory', 'Dock', 'themouse', 'wentup@theclock.com', NULL, NULL, 22, NULL, 1, 0, '2019-03-20 14:33:58', '2019-03-20 14:33:58', '2019-03-20 14:33:58');
INSERT INTO `user` (`id`, `first_name`, `last_name`, `username`, `password`, `email`, `height_in_inches`, `weight_in_pounds`, `age`, `bmi`, `active`, `admin`, `created_at`, `updated_at`, `last_login`) VALUES (DEFAULT, 'Three', 'Blind', 'Mice', 'seeHow', 'they@run.com', NULL, NULL, 21, NULL, 1, 0, '2019-03-20 14:33:58', '2019-03-20 14:33:58', '2019-03-20 14:33:58');
INSERT INTO `user` (`id`, `first_name`, `last_name`, `username`, `password`, `email`, `height_in_inches`, `weight_in_pounds`, `age`, `bmi`, `active`, `admin`, `created_at`, `updated_at`, `last_login`) VALUES (DEFAULT, 'There', 'WasAn', 'oldlady', 'wholived', 'ina@shoe.com', NULL, NULL, 20, NULL, 1, 0, '2019-03-20 14:33:58', '2019-03-20 14:33:58', '2019-03-20 14:33:58');

COMMIT;


-- -----------------------------------------------------
-- Data for table `group`
-- -----------------------------------------------------
START TRANSACTION;
USE `eventtracker`;
INSERT INTO `group` (`id`, `user_id`, `name`, `description`, `active`, `created_at`, `updated_at`) VALUES (DEFAULT, 2, 'The Dream Team', 'We can do it!', 1, '2019-03-20 14:33:58', '2019-03-20 14:33:58');
INSERT INTO `group` (`id`, `user_id`, `name`, `description`, `active`, `created_at`, `updated_at`) VALUES (DEFAULT, 3, 'Big Boyz', '(Soon to be \'Not So Big Boyz\')', 1, '2019-03-20 14:33:58', '2019-03-20 14:33:58');
INSERT INTO `group` (`id`, `user_id`, `name`, `description`, `active`, `created_at`, `updated_at`) VALUES (DEFAULT, 4, 'Cupcakes', 'J/K.  Fat/sugar-free cupcakes only....', 1, '2019-03-20 14:33:58', '2019-03-20 14:33:58');
INSERT INTO `group` (`id`, `user_id`, `name`, `description`, `active`, `created_at`, `updated_at`) VALUES (DEFAULT, 5, 'Army of One', 'I don\'t need no teammates', 1, '2019-03-20 14:33:58', '2019-03-20 14:33:58');

COMMIT;


-- -----------------------------------------------------
-- Data for table `event`
-- -----------------------------------------------------
START TRANSACTION;
USE `eventtracker`;
INSERT INTO `event` (`id`, `user_id`, `name`, `description`, `active`, `date`, `created_at`, `updated_at`) VALUES (DEFAULT, 2, 'Biggest Loser', '$100 to the Biggest Loser!  Competition ends on 5/1/19', 1, '2019-03-20 15:00:00', '2019-03-20 14:33:58', '2019-03-20 14:33:58');
INSERT INTO `event` (`id`, `user_id`, `name`, `description`, `active`, `date`, `created_at`, `updated_at`) VALUES (DEFAULT, 3, 'Casual Weight Loss', 'Come and go as you please.  This is not a competition!  Share your success/failures and help motivate others', 1, '2019-03-01 08:00:00', '2019-03-20 14:33:58', '2019-03-20 14:33:58');
INSERT INTO `event` (`id`, `user_id`, `name`, `description`, `active`, `date`, `created_at`, `updated_at`) VALUES (DEFAULT, 4, 'Run in the park', 'Come join us for a run/jog/walk in the park!', 1, '2019-04-15 06:30:00', '2019-03-20 14:33:58', '2019-03-20 14:33:58');

COMMIT;


-- -----------------------------------------------------
-- Data for table `comment`
-- -----------------------------------------------------
START TRANSACTION;
USE `eventtracker`;
INSERT INTO `comment` (`id`, `user_id`, `comment`, `active`) VALUES (DEFAULT, 1, 'Good luck everyone!', 1);
INSERT INTO `comment` (`id`, `user_id`, `comment`, `active`) VALUES (DEFAULT, 1, 'When is this starting again?', 1);
INSERT INTO `comment` (`id`, `user_id`, `comment`, `active`) VALUES (DEFAULT, 2, 'Lost 10 lbs in a week!', 1);
INSERT INTO `comment` (`id`, `user_id`, `comment`, `active`) VALUES (DEFAULT, 2, 'Nice job!', 1);
INSERT INTO `comment` (`id`, `user_id`, `comment`, `active`) VALUES (DEFAULT, 3, 'Let\'s go team!  35 lbs to go!', 1);
INSERT INTO `comment` (`id`, `user_id`, `comment`, `active`) VALUES (DEFAULT, 3, 'Motivational comment', DEFAULT);

COMMIT;


-- -----------------------------------------------------
-- Data for table `user_group`
-- -----------------------------------------------------
START TRANSACTION;
USE `eventtracker`;
INSERT INTO `user_group` (`user_id`, `group_id`) VALUES (2, 1);
INSERT INTO `user_group` (`user_id`, `group_id`) VALUES (3, 1);
INSERT INTO `user_group` (`user_id`, `group_id`) VALUES (4, 1);
INSERT INTO `user_group` (`user_id`, `group_id`) VALUES (4, 2);
INSERT INTO `user_group` (`user_id`, `group_id`) VALUES (5, 2);
INSERT INTO `user_group` (`user_id`, `group_id`) VALUES (3, 2);
INSERT INTO `user_group` (`user_id`, `group_id`) VALUES (4, 3);
INSERT INTO `user_group` (`user_id`, `group_id`) VALUES (5, 3);
INSERT INTO `user_group` (`user_id`, `group_id`) VALUES (6, 3);
INSERT INTO `user_group` (`user_id`, `group_id`) VALUES (7, 4);

COMMIT;


-- -----------------------------------------------------
-- Data for table `group_event`
-- -----------------------------------------------------
START TRANSACTION;
USE `eventtracker`;
INSERT INTO `group_event` (`group_id`, `event_id`) VALUES (1, 1);
INSERT INTO `group_event` (`group_id`, `event_id`) VALUES (2, 1);
INSERT INTO `group_event` (`group_id`, `event_id`) VALUES (2, 2);
INSERT INTO `group_event` (`group_id`, `event_id`) VALUES (3, 2);
INSERT INTO `group_event` (`group_id`, `event_id`) VALUES (4, 2);
INSERT INTO `group_event` (`group_id`, `event_id`) VALUES (1, 3);
INSERT INTO `group_event` (`group_id`, `event_id`) VALUES (3, 3);

COMMIT;


-- -----------------------------------------------------
-- Data for table `group_comment`
-- -----------------------------------------------------
START TRANSACTION;
USE `eventtracker`;
INSERT INTO `group_comment` (`group_id`, `comment_id`) VALUES (1, 2);

COMMIT;


-- -----------------------------------------------------
-- Data for table `event_comment`
-- -----------------------------------------------------
START TRANSACTION;
USE `eventtracker`;
INSERT INTO `event_comment` (`event_id`, `comment_id`) VALUES (1, 3);

COMMIT;


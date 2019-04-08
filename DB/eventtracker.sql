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
  `height_in_inches` DECIMAL(4,1) NULL DEFAULT 0,
  `weight_in_pounds` DECIMAL(4,1) NULL DEFAULT 0,
  `age` INT NULL,
  `active` TINYINT UNSIGNED NOT NULL DEFAULT 1,
  `admin` TINYINT UNSIGNED NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `username_UNIQUE` (`username` ASC),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `usergroup`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `usergroup` ;

CREATE TABLE IF NOT EXISTS `usergroup` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `description` TEXT NULL,
  `active` TINYINT UNSIGNED NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `event`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `event` ;

CREATE TABLE IF NOT EXISTS `event` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `description` TEXT NULL,
  `active` TINYINT UNSIGNED NOT NULL DEFAULT 1,
  `date` DATETIME NULL,
  PRIMARY KEY (`id`))
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
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `user_usergroup`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `user_usergroup` ;

CREATE TABLE IF NOT EXISTS `user_usergroup` (
  `user_id` INT UNSIGNED NOT NULL,
  `usergroup_id` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`user_id`, `usergroup_id`),
  INDEX `fk_group_idx` (`usergroup_id` ASC),
  CONSTRAINT `fk_user_group_user`
    FOREIGN KEY (`user_id`)
    REFERENCES `user` (`id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_user_usergroup_group`
    FOREIGN KEY (`usergroup_id`)
    REFERENCES `usergroup` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `usergroup_event`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `usergroup_event` ;

CREATE TABLE IF NOT EXISTS `usergroup_event` (
  `usergroup_id` INT UNSIGNED NOT NULL,
  `event_id` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`usergroup_id`, `event_id`),
  INDEX `fk_event_idx` (`event_id` ASC),
  CONSTRAINT `fk_usergroup_event_usergroup`
    FOREIGN KEY (`usergroup_id`)
    REFERENCES `usergroup` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_usergroup_event_event`
    FOREIGN KEY (`event_id`)
    REFERENCES `event` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `usergroup_comment`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `usergroup_comment` ;

CREATE TABLE IF NOT EXISTS `usergroup_comment` (
  `usergroup_id` INT UNSIGNED NOT NULL,
  `comment_id` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`usergroup_id`, `comment_id`),
  INDEX `fk_comment_idx` (`comment_id` ASC),
  CONSTRAINT `fk_usergroup_comment_usergroup`
    FOREIGN KEY (`usergroup_id`)
    REFERENCES `usergroup` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_usergroup_comment_comment`
    FOREIGN KEY (`comment_id`)
    REFERENCES `comment` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
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
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_event_comment_comment`
    FOREIGN KEY (`comment_id`)
    REFERENCES `comment` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;

SET SQL_MODE = '';
DROP USER IF EXISTS event_user@localhost;
SET SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';
CREATE USER 'event_user'@'localhost' IDENTIFIED BY 'event_user';

GRANT SELECT, INSERT, TRIGGER, UPDATE, DELETE ON TABLE * TO 'event_user'@'localhost';

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

-- -----------------------------------------------------
-- Data for table `user`
-- -----------------------------------------------------
START TRANSACTION;
USE `eventtracker`;
INSERT INTO `user` (`id`, `first_name`, `last_name`, `username`, `password`, `email`, `height_in_inches`, `weight_in_pounds`, `age`, `active`, `admin`) VALUES (DEFAULT, 'Adam', 'Tappy', 'admin', 'admin', 'wut@wut@gmail.com', 69, 169, 69, 1, 1);
INSERT INTO `user` (`id`, `first_name`, `last_name`, `username`, `password`, `email`, `height_in_inches`, `weight_in_pounds`, `age`, `active`, `admin`) VALUES (DEFAULT, 'Some', 'Guy', 'sumguy', 'heythere', 'sum@guy.com', 75, 175, 55, 1, 0);
INSERT INTO `user` (`id`, `first_name`, `last_name`, `username`, `password`, `email`, `height_in_inches`, `weight_in_pounds`, `age`, `active`, `admin`) VALUES (DEFAULT, 'Some', 'Gal', 'sumgal', 'heyback', 'sum@gal.com', 88, 288, 44, 1, 0);
INSERT INTO `user` (`id`, `first_name`, `last_name`, `username`, `password`, `email`, `height_in_inches`, `weight_in_pounds`, `age`, `active`, `admin`) VALUES (DEFAULT, 'Peter', 'Piper', 'PickedA', 'PeckOf', 'pickled@peppers.com', 87, 299, 33, 1, 0);
INSERT INTO `user` (`id`, `first_name`, `last_name`, `username`, `password`, `email`, `height_in_inches`, `weight_in_pounds`, `age`, `active`, `admin`) VALUES (DEFAULT, 'Hickory', 'Dickory', 'Dock', 'themouse', 'wentup@theclock.com', 0, 0, 22, 1, 0);
INSERT INTO `user` (`id`, `first_name`, `last_name`, `username`, `password`, `email`, `height_in_inches`, `weight_in_pounds`, `age`, `active`, `admin`) VALUES (DEFAULT, 'Three', 'Blind', 'Mice', 'seeHow', 'they@run.com', 0, 0, 21, 1, 0);
INSERT INTO `user` (`id`, `first_name`, `last_name`, `username`, `password`, `email`, `height_in_inches`, `weight_in_pounds`, `age`, `active`, `admin`) VALUES (DEFAULT, 'There', 'WasAn', 'oldlady', 'wholived', 'ina@shoe.com', 0, 0, 20, 1, 0);

COMMIT;


-- -----------------------------------------------------
-- Data for table `usergroup`
-- -----------------------------------------------------
START TRANSACTION;
USE `eventtracker`;
INSERT INTO `usergroup` (`id`, `name`, `description`, `active`) VALUES (DEFAULT, 'The Dream Team', 'We can do it!', 1);
INSERT INTO `usergroup` (`id`, `name`, `description`, `active`) VALUES (DEFAULT, 'Big Boyz', '(Soon to be \'Not So Big Boyz\')', 1);
INSERT INTO `usergroup` (`id`, `name`, `description`, `active`) VALUES (DEFAULT, 'Cupcakes', 'J/K.  Fat/sugar-free cupcakes only....', 1);
INSERT INTO `usergroup` (`id`, `name`, `description`, `active`) VALUES (DEFAULT, 'Army of One', 'I don\'t need no teammates', 1);

COMMIT;


-- -----------------------------------------------------
-- Data for table `event`
-- -----------------------------------------------------
START TRANSACTION;
USE `eventtracker`;
INSERT INTO `event` (`id`, `name`, `description`, `active`, `date`) VALUES (DEFAULT, 'Biggest Loser', '$100 to the Biggest Loser!  Competition ends on 5/1/19', 1, '2019-03-20 15:00:00');
INSERT INTO `event` (`id`, `name`, `description`, `active`, `date`) VALUES (DEFAULT, 'Casual Weight Loss', 'Come and go as you please.  This is not a competition!  Share your success/failures and help motivate others', 1, '2019-03-01 08:00:00');
INSERT INTO `event` (`id`, `name`, `description`, `active`, `date`) VALUES (DEFAULT, 'Run in the park', 'Come join us for a run/jog/walk in the park!', 1, '2019-04-15 06:30:00');

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
INSERT INTO `comment` (`id`, `user_id`, `comment`, `active`) VALUES (DEFAULT, 3, 'Motivational comment', 1);
INSERT INTO `comment` (`id`, `user_id`, `comment`, `active`) VALUES (DEFAULT, 4, 'Random Event Comment', 1);

COMMIT;


-- -----------------------------------------------------
-- Data for table `user_usergroup`
-- -----------------------------------------------------
START TRANSACTION;
USE `eventtracker`;
INSERT INTO `user_usergroup` (`user_id`, `usergroup_id`) VALUES (2, 1);
INSERT INTO `user_usergroup` (`user_id`, `usergroup_id`) VALUES (3, 1);
INSERT INTO `user_usergroup` (`user_id`, `usergroup_id`) VALUES (4, 1);
INSERT INTO `user_usergroup` (`user_id`, `usergroup_id`) VALUES (4, 2);
INSERT INTO `user_usergroup` (`user_id`, `usergroup_id`) VALUES (5, 2);
INSERT INTO `user_usergroup` (`user_id`, `usergroup_id`) VALUES (3, 2);
INSERT INTO `user_usergroup` (`user_id`, `usergroup_id`) VALUES (4, 3);
INSERT INTO `user_usergroup` (`user_id`, `usergroup_id`) VALUES (5, 3);
INSERT INTO `user_usergroup` (`user_id`, `usergroup_id`) VALUES (6, 3);
INSERT INTO `user_usergroup` (`user_id`, `usergroup_id`) VALUES (7, 4);

COMMIT;


-- -----------------------------------------------------
-- Data for table `usergroup_event`
-- -----------------------------------------------------
START TRANSACTION;
USE `eventtracker`;
INSERT INTO `usergroup_event` (`usergroup_id`, `event_id`) VALUES (1, 1);
INSERT INTO `usergroup_event` (`usergroup_id`, `event_id`) VALUES (2, 1);
INSERT INTO `usergroup_event` (`usergroup_id`, `event_id`) VALUES (2, 2);
INSERT INTO `usergroup_event` (`usergroup_id`, `event_id`) VALUES (3, 2);
INSERT INTO `usergroup_event` (`usergroup_id`, `event_id`) VALUES (4, 2);
INSERT INTO `usergroup_event` (`usergroup_id`, `event_id`) VALUES (1, 3);
INSERT INTO `usergroup_event` (`usergroup_id`, `event_id`) VALUES (3, 3);

COMMIT;


-- -----------------------------------------------------
-- Data for table `usergroup_comment`
-- -----------------------------------------------------
START TRANSACTION;
USE `eventtracker`;
INSERT INTO `usergroup_comment` (`usergroup_id`, `comment_id`) VALUES (1, 2);

COMMIT;


-- -----------------------------------------------------
-- Data for table `event_comment`
-- -----------------------------------------------------
START TRANSACTION;
USE `eventtracker`;
INSERT INTO `event_comment` (`event_id`, `comment_id`) VALUES (1, 3);
INSERT INTO `event_comment` (`event_id`, `comment_id`) VALUES (3, 7);

COMMIT;


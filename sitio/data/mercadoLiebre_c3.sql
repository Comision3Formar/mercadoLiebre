-- MySQL Script generated by MySQL Workbench
-- Fri Sep 25 16:47:40 2020
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema mercadoLiebre_c3
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema mercadoLiebre_c3
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `mercadoLiebre_c3` DEFAULT CHARACTER SET utf8 ;
USE `mercadoLiebre_c3` ;

-- -----------------------------------------------------
-- Table `mercadoLiebre_c3`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mercadoLiebre_c3`.`users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(45) NOT NULL,
  `apellido` VARCHAR(45) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `password` VARCHAR(100) NOT NULL,
  `avatar` VARCHAR(45) NOT NULL,
  `rol` VARCHAR(45) NOT NULL,
  `direccion` VARCHAR(100) NULL,
  `ciudad` VARCHAR(45) NULL,
  `provincia` VARCHAR(45) NULL,
  `fecha` DATE NULL,
  `created_at` TIMESTAMP NULL,
  `update_at` TIMESTAMP NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mercadoLiebre_c3`.`categories`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mercadoLiebre_c3`.`categories` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(45) NOT NULL,
  `imagen` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mercadoLiebre_c3`.`stores`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mercadoLiebre_c3`.`stores` (
  `id` INT NOT NULL,
  `nombre` VARCHAR(45) NOT NULL,
  `logo` VARCHAR(45) NOT NULL,
  `created_at` TIMESTAMP NULL,
  `updated_at` TIMESTAMP NULL,
  `id_usuario` INT NULL,
  PRIMARY KEY (`id`),
  INDEX `idUsuario_idx` (`id_usuario` ASC),
  CONSTRAINT `idUsuario`
    FOREIGN KEY (`id_usuario`)
    REFERENCES `mercadoLiebre_c3`.`users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mercadoLiebre_c3`.`products`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mercadoLiebre_c3`.`products` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(100) NOT NULL,
  `precio` DECIMAL(5,2) NOT NULL,
  `descuento` INT NOT NULL,
  `descripcion` VARCHAR(300) NOT NULL,
  `imagenes` VARCHAR(100) NOT NULL,
  `created_at` TIMESTAMP NULL,
  `updated_at` TIMESTAMP NULL,
  `id_categoria` INT NULL,
  `id_tienda` INT NULL,
  PRIMARY KEY (`id`),
  INDEX `idCategoria_idx` (`id_categoria` ASC),
  INDEX `idTienda_idx` (`id_tienda` ASC),
  CONSTRAINT `idCategoria`
    FOREIGN KEY (`id_categoria`)
    REFERENCES `mercadoLiebre_c3`.`categories` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `idTienda`
    FOREIGN KEY (`id_tienda`)
    REFERENCES `mercadoLiebre_c3`.`stores` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mercadoLiebre_c3`.`carts`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mercadoLiebre_c3`.`carts` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `id_usuario` INT NOT NULL,
  `id_producto` INT NOT NULL,
  `cantidad` INT NOT NULL,
  `remito` INT NOT NULL,
  `fecha` DATE NULL,
  PRIMARY KEY (`id`),
  INDEX `id_usuario_idx` (`id_usuario` ASC),
  INDEX `id_producto_idx` (`id_producto` ASC),
  CONSTRAINT `id_usuario`
    FOREIGN KEY (`id_usuario`)
    REFERENCES `mercadoLiebre_c3`.`users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `id_producto`
    FOREIGN KEY (`id_producto`)
    REFERENCES `mercadoLiebre_c3`.`products` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

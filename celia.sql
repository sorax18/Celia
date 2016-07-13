-- MySQL Script generated by MySQL Workbench
-- 07/11/16 15:37:27
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema celia
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema celia
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `celia` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci ;
USE `celia` ;

-- -----------------------------------------------------
-- Table `celia`.`Categoria`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `celia`.`Categoria` (
  `idCategoría` INT NOT NULL AUTO_INCREMENT COMMENT '',
  `nombreCategoria` VARCHAR(45) NULL COMMENT '',
  PRIMARY KEY (`idCategoría`)  COMMENT '')
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `celia`.`Marca`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `celia`.`Marca` (
  `idMarca` INT NOT NULL AUTO_INCREMENT COMMENT '',
  `nombreMarca` VARCHAR(45) NULL COMMENT '',
  PRIMARY KEY (`idMarca`)  COMMENT '')
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `celia`.`Producto`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `celia`.`Producto` (
  `idProducto` INT NOT NULL AUTO_INCREMENT COMMENT '',
  `nombreProducto` VARCHAR(45) NULL COMMENT '',
  `precio` INT NULL COMMENT '',
  `cantidad` INT NULL COMMENT '',
  `descripcion` VARCHAR(255) NULL COMMENT '',
  `Impuesto` FLOAT NULL COMMENT '',
  `idCategoría` INT NOT NULL COMMENT '',
  `idMarca` INT NOT NULL COMMENT '',
  PRIMARY KEY (`idProducto`, `idCategoría`, `idMarca`)  COMMENT '',
  INDEX `fk_Producto_Categoria1_idx` (`idCategoría` ASC)  COMMENT '',
  INDEX `fk_Producto_Marca1_idx` (`idMarca` ASC)  COMMENT '',
  CONSTRAINT `fk_Producto_Categoria1`
    FOREIGN KEY (`idCategoría`)
    REFERENCES `celia`.`Categoria` (`idCategoría`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Producto_Marca1`
    FOREIGN KEY (`idMarca`)
    REFERENCES `celia`.`Marca` (`idMarca`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `celia`.`Usuario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `celia`.`Usuario` (
  `idUsuario` INT NOT NULL COMMENT '',
  `correo` VARCHAR(70) NULL COMMENT '',
  `nombre1` VARCHAR(45) NULL COMMENT '',
  `nombre2` VARCHAR(45) NULL COMMENT '',
  `apellido1` VARCHAR(45) NULL COMMENT '',
  `apellido2` VARCHAR(45) NULL COMMENT '',
  `password` VARCHAR(255) NULL COMMENT '',
  `direccion` VARCHAR(45) NULL COMMENT '',
  `Telefono` VARCHAR(45) NULL COMMENT '',
  `ZIP` VARCHAR(45) NULL COMMENT '',
  `administrador` TINYINT(1) NULL DEFAULT 0 COMMENT '',
  `remember_token` VARCHAR(200) NULL COMMENT '',
  PRIMARY KEY (`idUsuario`)  COMMENT '')
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `celia`.`Factura`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `celia`.`Factura` (
  `codigo` INT NOT NULL AUTO_INCREMENT COMMENT '',
  `Fecha` DATETIME NULL COMMENT '',
  `Monto` INT NULL COMMENT '',
  `idUsuario` INT NOT NULL COMMENT '',
  PRIMARY KEY (`codigo`, `idUsuario`)  COMMENT '',
  INDEX `fk_Factura_Usuario1_idx` (`idUsuario` ASC)  COMMENT '',
  CONSTRAINT `fk_Factura_Usuario1`
    FOREIGN KEY (`idUsuario`)
    REFERENCES `celia`.`Usuario` (`idUsuario`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `celia`.`Vende`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `celia`.`Vende` (
  `Factura` INT NOT NULL COMMENT '',
  `Producto` INT NOT NULL COMMENT '',
  `Estado` VARCHAR(45) NULL COMMENT '',
  PRIMARY KEY (`Factura`, `Producto`)  COMMENT '',
  INDEX `fk_Factura_has_Producto_Producto1_idx` (`Producto` ASC)  COMMENT '',
  INDEX `fk_Factura_has_Producto_Factura_idx` (`Factura` ASC)  COMMENT '',
  CONSTRAINT `fk_Factura_has_Producto_Factura`
    FOREIGN KEY (`Factura`)
    REFERENCES `celia`.`Factura` (`codigo`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Factura_has_Producto_Producto1`
    FOREIGN KEY (`Producto`)
    REFERENCES `celia`.`Producto` (`idProducto`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

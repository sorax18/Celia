-- MySQL Script generated by MySQL Workbench
-- 07/06/16 20:56:22
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
  `Categoria_idCategoría` INT NOT NULL COMMENT '',
  `Marca_idMarca` INT NOT NULL COMMENT '',
  PRIMARY KEY (`idProducto`, `Categoria_idCategoría`, `Marca_idMarca`)  COMMENT '',
  INDEX `fk_Producto_Categoria1_idx` (`Categoria_idCategoría` ASC)  COMMENT '',
  INDEX `fk_Producto_Marca1_idx` (`Marca_idMarca` ASC)  COMMENT '',
  CONSTRAINT `fk_Producto_Categoria1`
    FOREIGN KEY (`Categoria_idCategoría`)
    REFERENCES `celia`.`Categoria` (`idCategoría`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Producto_Marca1`
    FOREIGN KEY (`Marca_idMarca`)
    REFERENCES `celia`.`Marca` (`idMarca`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `celia`.`Usuario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `celia`.`Usuario` (
  `idUsuario` INT NOT NULL AUTO_INCREMENT COMMENT '',
  `correo` VARCHAR(70) NULL COMMENT '',
  `nombre1` VARCHAR(45) NULL COMMENT '',
  `nombre2` VARCHAR(45) NULL COMMENT '',
  `apellido1` VARCHAR(45) NULL COMMENT '',
  `apellido2` VARCHAR(45) NULL COMMENT '',
  `password` VARCHAR(255) NULL COMMENT '',
  `direccion` VARCHAR(45) NULL COMMENT '',
  `Telefono` VARCHAR(45) NULL COMMENT '',
  `ZIP` VARCHAR(45) NULL COMMENT '',
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
  `Usuario_idUsuario` INT NOT NULL COMMENT '',
  PRIMARY KEY (`codigo`, `Usuario_idUsuario`)  COMMENT '',
  INDEX `fk_Factura_Usuario1_idx` (`Usuario_idUsuario` ASC)  COMMENT '',
  CONSTRAINT `fk_Factura_Usuario1`
    FOREIGN KEY (`Usuario_idUsuario`)
    REFERENCES `celia`.`Usuario` (`idUsuario`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `celia`.`Vende`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `celia`.`Vende` (
  `Factura_codigo` INT NOT NULL COMMENT '',
  `Producto_idProducto` INT NOT NULL COMMENT '',
  `Estado` VARCHAR(45) NULL COMMENT '',
  PRIMARY KEY (`Factura_codigo`, `Producto_idProducto`)  COMMENT '',
  INDEX `fk_Factura_has_Producto_Producto1_idx` (`Producto_idProducto` ASC)  COMMENT '',
  INDEX `fk_Factura_has_Producto_Factura_idx` (`Factura_codigo` ASC)  COMMENT '',
  CONSTRAINT `fk_Factura_has_Producto_Factura`
    FOREIGN KEY (`Factura_codigo`)
    REFERENCES `celia`.`Factura` (`codigo`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Factura_has_Producto_Producto1`
    FOREIGN KEY (`Producto_idProducto`)
    REFERENCES `celia`.`Producto` (`idProducto`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

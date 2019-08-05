DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
  item_id  INT NOT NULL AUTO_INCREMENT,
  product_name  VARCHAR(100) NULL,
  department_name VARCHAR(45) NULL ,
  price  DECIMAL(10,2) NULL,
  stock_quantity INT NOT NULL,
  PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Alexa TV Remote","Electronics", 29.99, 5000), ("Fujifilm Instax Camera","Camera & Photo", 51.99, 900), ("Donkey Kong Nintendo Switch Game","Video Games", 40.94, 5000), ("‘Magnolia Table: A Collection of Recipes for Gathering’","Books", 14.62, 800), ("NativeJefferson Slip-On Sneakers","Clothing, Shoes & Jewelry", 25.71, 9000), ("ODODOS High Waist Yoga Pants","Clothing, Shoes & Jewelry", 15.98, 4000), ("‘A higher Loyalty: Truth, Lies and Leadership’","Books", 9.99, 6000), ("Alexa Echo Dot Smart Speaker","Electronics", 49.99, 8000), ("Fujifilm INSTAX Mini Film","Camera & Photo", 12.00, 10000), ("Pokemon: Let's Go, Eevee!","Video Games", 44.80, 5000);

ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '';


-- ### Alternative way to insert more than one row
-- INSERT INTO products (flavor, price, quantity)
-- VALUES ("vanilla", 2.50, 100), ("chocolate", 3.10, 120), ("strawberry", 3.25, 75);
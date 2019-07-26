DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products(
    item_id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(100) NOT NULL,
    department_name VARCHAR(100),
    price NUMERIC(4,2),
    stock_quantity INTEGER,
    PRIMARY KEY (item_d)
);

INSERT INTO products (product_name, department_name, price, stock_quantity) 
VALUES ("strawberries", "fruit and vegetables", 3.50, 10),
        ("bananas", "fruit and vegetables", 2.90, 15),
        ("tennis shoes", "footwear", 43.90, 8),
        ("gray blazer", "clothing", 33.09, 2),
        ("mahi mahi filets", "fish", 7.80, 12),
        ("bok choy", "fruit and vegetables", 2.70, 8),
        ("colgate toothpaste", "toiletries", 4.20, 18),
        ("lavender soap", "toiletries", 3.70, 7),
        ("brioche bread", "bakery", 2.50, 2),
        ("chocolate croissants", "bakery", 4.50, 6);
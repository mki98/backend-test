SELECT * FROM products 
WHERE price BETWEEN 50 AND 200 
ORDER BY price ASC 
OFFSET (page_number - 1) * 10 
LIMIT 10;


--Add an index on price

CREATE INDEX idx_price ON products (price);
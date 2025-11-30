-- Agregar columna de precio a la tabla productos
-- Este script agrega la columna "precio" que se mostrará en la sección de Ofertas

ALTER TABLE productos 
ADD COLUMN precio DECIMAL(10, 2) DEFAULT 0;

-- Actualizar algunos productos de ejemplo con precios
-- Puedes modificar estos valores según tus necesidades

UPDATE productos SET precio = 1200 WHERE nombre = 'T-Bone';
UPDATE productos SET precio = 850 WHERE nombre = 'Ribeye Premium';
UPDATE productos SET precio = 650 WHERE nombre = 'Arrachera';
UPDATE productos SET precio = 750 WHERE nombre = 'Picaña';
UPDATE productos SET precio = 450 WHERE nombre = 'chorizo';
UPDATE productos SET precio = 320 WHERE nombre = 'leche';
UPDATE productos SET precio = 500 WHERE nombre = 'Costillas BBQ';
UPDATE productos SET precio = 600 WHERE nombre = 'carne cualquiera';

-- Verificar los cambios
SELECT id, nombre, precio, descuento FROM productos WHERE descuento > 0;

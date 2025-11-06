-- ============================================
-- SUPER CARNES GARCÍA - CONFIGURACIÓN DE BASE DE DATOS
-- ============================================
-- Ejecuta este script en el SQL Editor de Supabase
-- Dashboard → SQL Editor → New Query → Pega y Run

-- 1. CREAR TABLA DE PRODUCTOS
-- ============================================
CREATE TABLE IF NOT EXISTS public.productos (
    id BIGSERIAL PRIMARY KEY,
    nombre TEXT NOT NULL,
    descripcion TEXT,
    imagen_url TEXT,
    categoria TEXT NOT NULL CHECK (categoria IN ('carnes', 'productos', 'ofertas')),
    precio DECIMAL(10,2),
    descuento INTEGER DEFAULT 0 CHECK (descuento >= 0 AND descuento <= 100),
    activo BOOLEAN DEFAULT true,
    orden INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. CREAR ÍNDICES PARA OPTIMIZAR CONSULTAS
-- ============================================
CREATE INDEX IF NOT EXISTS idx_productos_categoria ON public.productos(categoria);
CREATE INDEX IF NOT EXISTS idx_productos_activo ON public.productos(activo);
CREATE INDEX IF NOT EXISTS idx_productos_orden ON public.productos(orden);
CREATE INDEX IF NOT EXISTS idx_productos_descuento ON public.productos(descuento) WHERE descuento > 0;

-- 3. CREAR FUNCIÓN PARA ACTUALIZAR updated_at AUTOMÁTICAMENTE
-- ============================================
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = timezone('utc'::text, now());
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 4. CREAR TRIGGER PARA updated_at
-- ============================================
DROP TRIGGER IF EXISTS set_updated_at ON public.productos;
CREATE TRIGGER set_updated_at
    BEFORE UPDATE ON public.productos
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();

-- 5. HABILITAR ROW LEVEL SECURITY (RLS)
-- ============================================
ALTER TABLE public.productos ENABLE ROW LEVEL SECURITY;

-- 6. POLÍTICAS DE SEGURIDAD
-- ============================================

-- Permitir lectura pública de productos activos
CREATE POLICY "Todos pueden ver productos activos"
    ON public.productos
    FOR SELECT
    USING (activo = true);

-- Solo usuarios autenticados pueden insertar productos
CREATE POLICY "Usuarios autenticados pueden insertar productos"
    ON public.productos
    FOR INSERT
    TO authenticated
    WITH CHECK (true);

-- Solo usuarios autenticados pueden actualizar productos
CREATE POLICY "Usuarios autenticados pueden actualizar productos"
    ON public.productos
    FOR UPDATE
    TO authenticated
    USING (true)
    WITH CHECK (true);

-- Solo usuarios autenticados pueden eliminar (soft delete: activo = false)
CREATE POLICY "Usuarios autenticados pueden eliminar productos"
    ON public.productos
    FOR DELETE
    TO authenticated
    USING (true);

-- 7. INSERTAR DATOS DE PRUEBA
-- ============================================
INSERT INTO public.productos (nombre, descripcion, imagen_url, categoria, precio, descuento, orden) VALUES
-- CARNES
('Ribeye Premium', 'Corte de res de primera calidad, jugoso y suave con marmoleo excepcional', '/images/carnes-frescas.jpeg', 'carnes', 350.00, 0, 1),
('T-Bone', 'Corte clásico americano con hueso en forma de T', '/images/carnes-frescas.jpeg', 'carnes', 320.00, 0, 2),
('Arrachera', 'Corte ideal para asar, marinado especial de la casa', '/images/carnes-frescas.jpeg', 'carnes', 280.00, 15, 3),
('Picaña', 'Corte brasileño premium, ideal para parrilla', '/images/carnes-frescas.jpeg', 'carnes', 290.00, 0, 4),

-- PRODUCTOS
('Chorizo Argentino', 'Chorizo artesanal con receta tradicional argentina', '/images/especialidades.jpg', 'productos', 120.00, 0, 1),
('Cecina Enchilada', 'Cecina de res marinada con chile', '/images/especialidades.jpg', 'productos', 200.00, 0, 2),
('Costillas BBQ', 'Costillas de cerdo con salsa BBQ especial', '/images/especialidades.jpg', 'productos', 250.00, 20, 3),

-- OFERTAS (productos con descuento)
('New York Strip', 'Corte americano de primera con 30% de descuento', '/images/ofertas.jpeg', 'carnes', 400.00, 30, 1),
('Paquete Familiar', 'Selección de cortes variados para toda la familia', '/images/ofertas.jpeg', 'productos', 800.00, 25, 2),
('Chuletas de Cerdo', 'Pack de 6 chuletas gruesas', '/images/ofertas.jpeg', 'productos', 180.00, 40, 3)
ON CONFLICT DO NOTHING;

-- ============================================
-- CONFIGURACIÓN COMPLETADA ✓
-- ============================================
-- Verifica que todo se creó correctamente:
SELECT 'Tabla productos creada' AS status, COUNT(*) AS total_productos FROM public.productos;

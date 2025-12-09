# PREGUNTAS Y RESPUESTAS - PRESENTACIÓN ESTANCIA 2
## Super Carnes García - Sistema Web

---

## PREGUNTAS TÉCNICAS

### 1. ¿Qué tecnologías utilizaron para desarrollar el sitio web?

**Respuesta:**
TypeScript para la lógica, Vite como framework de desarrollo, Tailwind CSS para los estilos, y Supabase para la base de datos y autenticación.

---

### 2. ¿Por qué eligieron Supabase como base de datos?

**Respuesta:**
Porque ofrece una base de datos PostgreSQL robusta, sistema de autenticación integrado, storage para imágenes, y es fácil de escalar. Además, reduce el tiempo de desarrollo al tener todo en una plataforma.

---

### 3. ¿Cómo funciona el sistema de búsqueda predictiva?

**Respuesta:**
Mientras el usuario escribe, se realizan consultas en tiempo real a la base de datos que filtran productos por nombre y categoría, mostrando los resultados instantáneamente sin necesidad de presionar enter.

---

## PREGUNTAS SOBRE EL PROYECTO

### 4. ¿Cuáles fueron los dos objetivos principales de la Estancia 2?

**Respuesta:**
Primero, crear un sitio web promocional para que los clientes vean los productos disponibles. Segundo, migrar del sistema Mr. Tienda al nuevo sistema debido a que tenía secciones inhabilitadas.

---

### 5. ¿Qué problemas tenía el sistema Mr. Tienda?

**Respuesta:**
Tenía secciones inhabilitadas, no permitía personalización, generaba costos recurrentes, y no se podía controlar las funcionalidades. Esto limitaba las operaciones del negocio.

---

### 6. ¿Cuánto tiempo tomó completar el proyecto?

**Respuesta:**
120 horas distribuidas en 3 semanas, con 40 horas por semana dedicadas al desarrollo.

---

## PREGUNTAS SOBRE FUNCIONALIDADES

### 7. ¿Cómo funciona el sistema de precios con ofertas?

**Respuesta:**
Cada producto tiene dos campos: precio normal y precio de oferta. Cuando hay oferta, se muestra el precio rebajado destacado visualmente y se calcula automáticamente el porcentaje de descuento.

---

### 8. ¿Qué es el eliminado lógico de productos?

**Respuesta:**
Es desactivar productos sin borrarlos de la base de datos. Los productos inactivos no aparecen en el sitio web público, pero se conservan en el sistema y pueden reactivarse cuando sea necesario.

---

### 9. ¿Cómo funciona el sistema de roles?

**Respuesta:**
Hay dos roles: Usuario normal que solo puede ver el catálogo, y Administrador que puede crear, editar, eliminar y gestionar todos los productos y configuraciones del sistema.

---

### 10. ¿Qué son las subcategorías múltiples?

**Respuesta:**
Es la capacidad de que un producto pertenezca a varias subcategorías simultáneamente. Por ejemplo, un producto puede estar en "Res", "Ofertas" y "Cortes Premium" al mismo tiempo.

---

## PREGUNTAS SOBRE BENEFICIOS

### 11. ¿Qué beneficios tiene el sitio web para los clientes?

**Respuesta:**
Los clientes pueden conocer los productos disponibles, ver precios y ofertas, buscar productos específicos, y planificar sus compras desde cualquier dispositivo antes de visitar la tienda.

---

### 12. ¿Qué beneficios obtiene el negocio con este sistema?

**Respuesta:**
Mayor presencia digital, alcance a más clientes, control total del sistema sin costos recurrentes, eliminación de restricciones, y flexibilidad para implementar mejoras futuras.

---

### 13. ¿El sitio web es responsivo?

**Respuesta:**
Sí, se adapta perfectamente a computadoras, tablets y smartphones, garantizando una experiencia óptima en cualquier dispositivo.

---

## PREGUNTAS SOBRE EL DESARROLLO

### 14. ¿Cuál fue el mayor desafío durante el desarrollo?

**Respuesta:**
Balancear las funcionalidades administrativas con la simplicidad de la vista pública, y asegurar que la migración de datos de Mr. Tienda fuera completa sin pérdida de información.

---

### 15. ¿Cómo se organizó el trabajo durante las tres semanas?

**Respuesta:**
Semana 1: Estructura base y autenticación. Semana 2: Funcionalidades administrativas y búsqueda. Semana 3: Optimizaciones, precios con ofertas y finalización de la migración.

---

### 16. ¿Cómo aseguran la seguridad del sistema?

**Respuesta:**
Mediante Row Level Security (RLS) en la base de datos, sistema de autenticación robusto, roles de usuario, y validación de datos tanto en frontend como backend.

---

## PREGUNTAS SOBRE RESULTADOS

### 17. ¿Se cumplieron todos los objetivos planteados?

**Respuesta:**
Sí, se cumplieron los dos objetivos al 100%: el sitio web promocional está completamente funcional y la migración del sistema se completó exitosamente con todas las secciones habilitadas.

---

### 18. ¿Cuántos productos puede manejar el sistema?

**Respuesta:**
El sistema está diseñado para ser escalable. Actualmente maneja el catálogo completo con paginación eficiente, y puede crecer sin problemas de rendimiento.

---

### 19. ¿El sistema está en producción?

**Respuesta:**
Sí, el sistema está completamente operativo y listo para uso en producción, con todas las funcionalidades implementadas y probadas.

---

## PREGUNTAS SOBRE MEJORAS FUTURAS

### 20. ¿Qué mejoras se podrían implementar a futuro?

**Respuesta:**
Sistema de carrito de compras para pedidos en línea, integración con métodos de pago, sistema de clientes registrados, reportes de ventas, y aplicación móvil nativa.

---

### 21. ¿El sistema permite agregar más funcionalidades?

**Respuesta:**
Sí, la arquitectura modular y escalable permite agregar nuevas funcionalidades sin necesidad de reestructurar el sistema completo.

---

## PREGUNTAS CONCEPTUALES

### 22. ¿Qué es una SPA (Single Page Application)?

**Respuesta:**
Es una aplicación web que carga una sola página HTML y actualiza el contenido dinámicamente sin recargar la página completa, lo que proporciona una experiencia más rápida y fluida.

---

### 23. ¿Qué competencias desarrollaron durante el proyecto?

**Respuesta:**
Desarrollo web frontend y backend, diseño de bases de datos, seguridad informática, UX/UI, gestión de proyectos, resolución de problemas y trabajo con tecnologías modernas.

---

### 24. ¿Cuál es la diferencia entre el sitio promocional y el panel administrativo?

**Respuesta:**
El sitio promocional es público y solo muestra productos para que los clientes los vean. El panel administrativo requiere autenticación y permite gestionar completamente todo el sistema.

---

### 25. ¿Por qué es importante tener presencia digital para un negocio?

**Respuesta:**
Porque aumenta la visibilidad, permite alcanzar más clientes potenciales, mejora la imagen corporativa, facilita la promoción de productos, y es esencial para competir en el mercado actual.

---

## PREGUNTAS SOBRE LA BASE DE DATOS

### 26. ¿Qué tipo de base de datos utilizaron?

**Respuesta:**
PostgreSQL, una base de datos relacional robusta y escalable que permite manejar grandes volúmenes de datos con consultas eficientes.

---

### 27. ¿Cómo se organizan los datos en la base de datos?

**Respuesta:**
En tablas relacionales: productos, categorías, subcategorías, usuarios y roles. Están conectadas mediante claves foráneas que mantienen la integridad de los datos.

---

### 28. ¿Qué es RLS (Row Level Security)?

**Respuesta:**
Es un sistema de seguridad que controla qué filas de datos puede ver o modificar cada usuario. Garantiza que solo los administradores puedan editar productos y que los usuarios públicos solo vean productos activos.

---

## PREGUNTAS SOBRE LA INTERFAZ

### 29. ¿Cómo organizaron la navegación del sitio?

**Respuesta:**
Con un menú principal que incluye: Inicio, Productos, Carnes y Ofertas. Cada sección está claramente identificada y es accesible con un solo clic desde cualquier página.

---

### 30. ¿Qué es Tailwind CSS y por qué lo usaron?

**Respuesta:**
Es un framework de CSS basado en clases utilitarias que permite diseñar interfaces rápidamente sin escribir CSS personalizado. Lo usamos porque acelera el desarrollo y garantiza consistencia visual.

---

### 31. ¿Cómo manejan las imágenes de los productos?

**Respuesta:**
Se almacenan en Supabase Storage. Cuando se agrega un producto, la imagen se sube al servidor y se guarda la URL en la base de datos para mostrarla en el sitio web.

---

## PREGUNTAS SOBRE MIGRACIÓN

### 32. ¿Cómo realizaron la migración de datos desde Mr. Tienda?

**Respuesta:**
Exportamos los datos del sistema anterior, los validamos, adaptamos al nuevo esquema de base de datos y los importamos verificando que no hubiera pérdida de información.

---

### 33. ¿Hubo pérdida de datos durante la migración?

**Respuesta:**
No, se validó la integridad de todos los datos antes y después de la migración, asegurando que toda la información se transfiriera correctamente.

---

### 34. ¿Cuánto tiempo tomó la migración completa?

**Respuesta:**
La migración se realizó gradualmente durante las tres semanas, finalizando en la semana 3. Se dedicaron aproximadamente 12 horas totales distribuidas en las actividades de cambio de sistema.

---

## PREGUNTAS SOBRE RENDIMIENTO

### 35. ¿Cómo optimizaron la velocidad del sitio?

**Respuesta:**
Mediante paginación de productos, consultas optimizadas a la base de datos, carga eficiente de imágenes, y diseño ligero con Tailwind CSS.

---

### 36. ¿Qué es la paginación y para qué sirve?

**Respuesta:**
Es dividir el catálogo en páginas de productos en lugar de cargar todos a la vez. Mejora la velocidad de carga y facilita la navegación cuando hay muchos productos.

---

### 37. ¿El sitio es rápido en dispositivos móviles?

**Respuesta:**
Sí, está optimizado para dispositivos móviles con diseño responsivo, carga rápida y consultas eficientes que funcionan bien incluso con conexiones lentas.

---

## PREGUNTAS SOBRE ADMINISTRACIÓN

### 38. ¿Cualquier persona puede agregar productos al sitio?

**Respuesta:**
No, solo usuarios autenticados con rol de Administrador pueden crear, editar o eliminar productos. El sitio público es solo de visualización.

---

### 39. ¿Cómo se agregan nuevos productos?

**Respuesta:**
El administrador inicia sesión, accede al panel administrativo, hace clic en "Agregar Producto", completa el formulario con imagen, nombre, precio y categorías, y el producto aparece inmediatamente en el sitio.

---

### 40. ¿Se pueden editar productos ya existentes?

**Respuesta:**
Sí, los administradores pueden editar cualquier información de un producto: imagen, nombre, precio, categoría, subcategorías, y activar o desactivar su visibilidad.

---

## PREGUNTAS SOBRE CATEGORÍAS

### 41. ¿Qué categorías principales tiene el sitio?

**Respuesta:**
Las categorías principales son: Carnes, Productos generales, y Ofertas. Cada una tiene su propia página para facilitar la navegación de los clientes.

---

### 42. ¿Cuál es la diferencia entre categoría y subcategoría?

**Respuesta:**
La categoría es la clasificación principal (ejemplo: Carnes). Las subcategorías son divisiones más específicas dentro de esa categoría (ejemplo: Res, Cerdo, Pollo).

---

### 43. ¿Se pueden crear nuevas categorías?

**Respuesta:**
Sí, el sistema está diseñado para ser flexible y permite agregar nuevas categorías y subcategorías según las necesidades del negocio.

---

## PREGUNTAS SOBRE EXPERIENCIA DE USUARIO

### 44. ¿Cómo saben los clientes que un producto está en oferta?

**Respuesta:**
Los productos en oferta se destacan visualmente con el precio rebajado en color diferente, el precio original tachado, y aparecen en la sección especial de "Ofertas".

---

### 45. ¿Qué pasa si un cliente busca un producto que no existe?

**Respuesta:**
El sistema muestra un mensaje indicando que no se encontraron resultados para esa búsqueda, invitando al cliente a intentar con otros términos.

---

### 46. ¿Los clientes pueden contactar a la tienda desde el sitio?

**Respuesta:**
Actualmente el sitio es informativo (catálogo de productos). Como mejora futura se podría agregar información de contacto, WhatsApp o formulario de contacto.

---

## PREGUNTAS SOBRE TESTING Y CALIDAD

### 47. ¿Cómo probaron que el sistema funciona correctamente?

**Respuesta:**
Realizamos pruebas funcionales de cada componente, verificamos que la búsqueda funcione, probamos la paginación, validamos el CRUD de productos y la autenticación en diferentes navegadores y dispositivos.

---

### 48. ¿Qué navegadores soporta el sitio web?

**Respuesta:**
Navegadores modernos como Chrome, Firefox, Edge y Safari. El código utiliza estándares web actuales que son compatibles con todos los navegadores principales.

---

### 49. ¿Validaron el sitio en dispositivos reales?

**Respuesta:**
Sí, se probó en computadoras de escritorio, laptops, tablets y smartphones para garantizar que la experiencia sea óptima en todos los dispositivos.

---

## PREGUNTAS SOBRE APRENDIZAJE

### 50. ¿Cuál fue el mayor aprendizaje técnico del proyecto?

**Respuesta:**
Integrar un sistema completo frontend-backend, manejar autenticación segura, diseñar bases de datos relacionales, y crear interfaces responsivas y atractivas.

---

### 51. ¿Qué harían diferente si empezaran el proyecto de nuevo?

**Respuesta:**
Planificaríamos con más detalle la estructura de base de datos desde el inicio y documentaríamos mejor el código durante el desarrollo en lugar de al final.

---

### 52. ¿Recomendarían este stack tecnológico para otros proyectos?

**Respuesta:**
Sí, especialmente para proyectos que necesitan desarrollo rápido, escalabilidad y no requieren un backend muy complejo. TypeScript + Vite + Supabase es una combinación muy eficiente.

---

*Documento preparado para la presentación de Estancia 2*
*Super Carnes García - 8 de diciembre de 2025*

# 🌐 Cómo Subir Tu Proyecto a Internet

## 🎯 Objetivo
Que cuando alguien busque en Google **"Super Carnes García"**, encuentre tu sitio web.

---

## 📍 Paso a Paso COMPLETO

### Opción 1: GitHub Pages (GRATIS) ⭐ Recomendado para empezar

#### ✅ Lo que ya tienes configurado:
- ✅ Proyecto en GitHub
- ✅ Vite configurado para GitHub Pages
- ✅ Base de datos Supabase funcionando

#### 🚀 Pasos para publicar:

```bash
# 1. Compilar el proyecto
npm run build

# 2. Subir cambios a GitHub
git add .
git commit -m "Publicar sitio web"
git push origin main
```

#### 🔧 Activar GitHub Pages:

1. Ve a tu repositorio en GitHub: `https://github.com/202300015-coder/Super-Carnes-Garc-a`
2. Haz clic en **Settings** (Configuración)
3. En el menú lateral, busca **Pages**
4. En **Source**, selecciona:
   - Branch: `main`
   - Folder: `/docs` o `/` (según donde esté tu `index.html`)
5. Clic en **Save**
6. Espera 2-5 minutos

#### 🌐 Tu sitio estará en:
```
https://202300015-coder.github.io/Super-Carnes-Garc-a/
```

#### ⚠️ Problema: NO aparecerá en Google como "Super Carnes García"
- Solo aparecerá si buscas la URL completa
- **Necesitas un dominio personalizado** (siguiente opción)

---

### Opción 2: Dominio Personalizado (Recomendado) 💰

#### 🛒 Comprar un dominio

**Opciones de proveedores en México:**

1. **GoDaddy México** - https://www.godaddy.com/es-mx
   - Costo: ~$200-400 MXN/año
   - Dominio: `supercarnesgarcia.com` o `.mx`

2. **Hostinger México** - https://www.hostinger.mx
   - Costo: ~$150-300 MXN/año
   - Incluye email profesional

3. **Akky** - https://www.akky.mx
   - Costo: ~$300-500 MXN/año
   - Proveedor mexicano

4. **Namecheap** - https://www.namecheap.com
   - Costo: ~$10-15 USD/año
   - Internacional

#### 📝 Pasos para comprar:

1. Ve al sitio del proveedor
2. Busca: `supercarnesgarcia.com`
3. Si está disponible, agrégalo al carrito
4. Completa el pago
5. Guarda tu usuario y contraseña

#### 🔗 Conectar dominio con GitHub Pages:

**En tu proveedor de dominio (ejemplo: GoDaddy):**

1. Inicia sesión
2. Ve a **Mis Dominios**
3. Clic en tu dominio
4. Busca **DNS** o **Administrar DNS**
5. Agrega estos registros:

```
Tipo: A
Nombre: @
Valor: 185.199.108.153
TTL: 600

Tipo: A
Nombre: @
Valor: 185.199.109.153
TTL: 600

Tipo: A
Nombre: @
Valor: 185.199.110.153
TTL: 600

Tipo: A
Nombre: @
Valor: 185.199.111.153
TTL: 600

Tipo: CNAME
Nombre: www
Valor: 202300015-coder.github.io
TTL: 600
```

**En GitHub:**

1. Ve a tu repositorio
2. **Settings** > **Pages**
3. En **Custom domain**, escribe: `supercarnesgarcia.com`
4. Clic en **Save**
5. Marca la casilla **Enforce HTTPS**

#### ⏰ Tiempo de espera:
- Puede tardar 24-48 horas en propagarse
- Después, tu sitio será: `https://supercarnesgarcia.com`

---

### Opción 3: Netlify (GRATIS + Fácil) 🎈

#### ✅ Ventajas:
- Despliegue automático desde GitHub
- Dominio gratis: `supercarnesgarcia.netlify.app`
- SSL gratis (HTTPS)
- Más rápido que GitHub Pages

#### 🚀 Pasos:

1. **Regístrate en Netlify**
   - Ve a: https://www.netlify.com
   - Clic en **Sign Up**
   - Selecciona **GitHub** para conectar tu cuenta

2. **Importar proyecto**
   - Clic en **Add new site** > **Import an existing project**
   - Selecciona **GitHub**
   - Busca: `Super-Carnes-Garc-a`
   - Clic en tu repositorio

3. **Configurar build**
   ```
   Build command: npm run build
   Publish directory: dist
   ```

4. **Deploy**
   - Clic en **Deploy site**
   - Espera 2-3 minutos

5. **Cambiar nombre del sitio**
   - Ve a **Site settings** > **Change site name**
   - Escribe: `supercarnesgarcia`
   - Tu sitio será: `https://supercarnesgarcia.netlify.app`

#### 🔗 Conectar dominio propio (opcional):
1. En Netlify: **Domain settings** > **Add custom domain**
2. Sigue las instrucciones para conectar tu dominio comprado

---

### Opción 4: Vercel (GRATIS + Profesional) 🚀

Similar a Netlify, ideal para proyectos Vite:

1. Ve a: https://vercel.com
2. **Sign Up** con GitHub
3. **Import Project**
4. Selecciona tu repositorio
5. Vercel detecta automáticamente que es Vite
6. Clic en **Deploy**

Tu sitio será: `https://super-carnes-garcia.vercel.app`

---

## 🔍 Para Aparecer en Google

### 1. **Compra un dominio** (obligatorio)
Sin dominio propio, es muy difícil aparecer en Google.

### 2. **Agrega meta tags SEO**

En tu `index.html`:

```html
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  
  <!-- SEO Básico -->
  <title>Super Carnes García - Los Mejores Cortes de Carne</title>
  <meta name="description" content="Super Carnes García ofrece los mejores cortes de carne premium, pollo, cerdo y más. Calidad garantizada y precios increíbles.">
  <meta name="keywords" content="carnes, cortes de carne, carnicería, Super Carnes García, carne premium, pollo, cerdo">
  
  <!-- Open Graph (para redes sociales) -->
  <meta property="og:title" content="Super Carnes García">
  <meta property="og:description" content="Los mejores cortes de carne premium">
  <meta property="og:image" content="https://tu-dominio.com/images/logo.png">
  <meta property="og:url" content="https://tu-dominio.com">
  
  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="Super Carnes García">
  <meta name="twitter:description" content="Los mejores cortes de carne premium">
  
  <!-- Datos de la empresa -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Super Carnes García",
    "description": "Carnicería con los mejores cortes de carne",
    "url": "https://tu-dominio.com",
    "telephone": "+52-XXX-XXX-XXXX",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Tu dirección",
      "addressLocality": "Tu ciudad",
      "addressRegion": "Tu estado",
      "postalCode": "XXXXX",
      "addressCountry": "MX"
    }
  }
  </script>
</head>
```

### 3. **Registra tu sitio en Google**

#### Google Search Console:
1. Ve a: https://search.google.com/search-console
2. Clic en **Agregar propiedad**
3. Ingresa tu dominio: `https://supercarnesgarcia.com`
4. Verifica la propiedad (sigue las instrucciones)
5. Envía tu sitemap: `https://supercarnesgarcia.com/sitemap.xml`

#### Google My Business (IMPORTANTE):
1. Ve a: https://www.google.com/intl/es-419_mx/business/
2. Clic en **Administra ahora**
3. Agrega tu negocio:
   - Nombre: Super Carnes García
   - Categoría: Carnicería
   - Dirección física de tu tienda
   - Teléfono
   - Sitio web: tu dominio
4. Verifica tu negocio (Google te enviará una postal o código)

**Esto es CLAVE** para aparecer en Google Maps y búsquedas locales.

### 4. **Crear un archivo sitemap.xml**

Crea `public/sitemap.xml`:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://supercarnesgarcia.com/</loc>
    <lastmod>2025-12-02</lastmod>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://supercarnesgarcia.com/#/productos</loc>
    <lastmod>2025-12-02</lastmod>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://supercarnesgarcia.com/#/ofertas</loc>
    <lastmod>2025-12-02</lastmod>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://supercarnesgarcia.com/#/carnes</loc>
    <lastmod>2025-12-02</lastmod>
    <priority>0.8</priority>
  </url>
</urlset>
```

---

## 📊 Tiempo Estimado para Aparecer en Google

| Acción | Tiempo |
|--------|--------|
| Publicar sitio en Netlify/Vercel | 5 minutos |
| Comprar dominio | 10 minutos |
| Conectar dominio | 24-48 horas |
| Aparecer en Google | 1-4 semanas |
| Aparecer en primeros resultados | 2-6 meses |

---

## 💰 Costos Estimados

### Opción GRATIS (para empezar):
- ✅ GitHub Pages: $0
- ✅ Netlify: $0
- ✅ Vercel: $0
- ✅ Supabase: $0
- ⚠️ **Limitación:** Tu URL será larga y no aparecerás fácil en Google

### Opción Básica (Recomendada):
- 💵 Dominio (.com): ~$300 MXN/año
- ✅ Hosting: $0 (Netlify/Vercel)
- ✅ Base de datos: $0 (Supabase)
- **Total: ~$300 MXN/año** (~$25 MXN/mes)

### Opción Profesional:
- 💵 Dominio (.com): ~$300 MXN/año
- 💵 Hosting premium: ~$100-200 MXN/mes
- 💵 Google Ads (opcional): ~$1,000+ MXN/mes
- **Total: ~$1,500-3,000 MXN/mes**

---

## 🎯 Plan Recomendado para Ti

### FASE 1: Publicar Ahora (GRATIS)
```bash
# 1. Compilar
npm run build

# 2. Crear cuenta en Netlify
# Ve a https://www.netlify.com

# 3. Conectar con GitHub
# Sigue los pasos de la Opción 3

# 4. Tu sitio estará en:
# https://supercarnesgarcia.netlify.app
```

### FASE 2: Dominio Propio (1 semana después)
1. Comprar dominio: `supercarnesgarcia.com`
2. Conectarlo con Netlify
3. Agregar meta tags SEO
4. Crear Google My Business

### FASE 3: Optimización SEO (1 mes después)
1. Registrar en Google Search Console
2. Crear contenido (blog, recetas, etc.)
3. Obtener reseñas en Google
4. Compartir en redes sociales

---

## ✅ Checklist de Despliegue

### Antes de publicar:
- [ ] `npm run build` funciona sin errores
- [ ] Todas las imágenes cargan correctamente
- [ ] Login/logout funciona
- [ ] Admin puede agregar productos
- [ ] Supabase RLS activado
- [ ] No hay console.logs innecesarios

### Al publicar:
- [ ] Subir código a GitHub
- [ ] Configurar Netlify/Vercel
- [ ] Verificar que el sitio carga
- [ ] Probar en móvil
- [ ] Probar todas las funciones

### Después de publicar:
- [ ] Comprar dominio
- [ ] Conectar dominio
- [ ] Agregar meta tags SEO
- [ ] Crear Google My Business
- [ ] Registrar en Search Console
- [ ] Compartir en redes sociales

---

## 🆘 Problemas Comunes

### "Mi sitio no carga"
- Verifica que `base: '/Super-Carnes-Garc-a/'` esté en `vite.config.ts`
- Revisa la consola del navegador (F12)
- Verifica que el build se completó

### "No aparezco en Google"
- Es normal, toma 1-4 semanas
- Asegúrate de tener Google My Business
- Verifica que tu sitemap esté registrado

### "Las imágenes no cargan"
- Verifica las URLs en Supabase Storage
- Asegúrate que el bucket sea público
- Revisa las políticas de Storage

---

## 📱 Próximos Pasos para Crecer

1. **Redes Sociales**
   - Crea página de Facebook
   - Crea cuenta de Instagram
   - Comparte tus productos

2. **Google Ads** (opcional, $$$)
   - Aparece en los primeros resultados pagando
   - Costo: desde $500 MXN/mes

3. **WhatsApp Business**
   - Agrega botón de WhatsApp al sitio
   - Facilita pedidos

4. **Marketplace**
   - Publica en Facebook Marketplace
   - Considera Rappi/Uber Eats

---

## 🎉 ¡Listo!

Tu plan de acción:

1. **HOY:** Publica en Netlify (15 minutos)
2. **ESTA SEMANA:** Compra dominio ($300 MXN)
3. **PRÓXIMO MES:** Configura Google My Business
4. **EN 3 MESES:** Aparecerás en Google al buscar "Super Carnes García"

**¡Tu negocio está a punto de estar en internet!** 🚀

---

## 📞 Recursos Útiles

- **Netlify:** https://www.netlify.com
- **Vercel:** https://vercel.com
- **Dominios (México):** https://www.godaddy.com/es-mx
- **Google My Business:** https://www.google.com/intl/es-419_mx/business/
- **Google Search Console:** https://search.google.com/search-console

¿Preguntas? Revisa `DESPLIEGUE-A-PRODUCCION.md` para detalles técnicos.

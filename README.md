# 🌿 HuertoHogar - Plataforma Web E-Commerce & Gestión Agrícola

[![HTML5](https://img.shields.io/badge/HTML5-Sem%C3%A1ntico-E34F26?logo=html5&logoColor=white)](https://developer.mozilla.org/es/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-Modular%20%26%20Responsive-1572B6?logo=css3&logoColor=white)](https://developer.mozilla.org/es/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES6%2B-F7DF1E?logo=javascript&logoColor=black)](https://developer.mozilla.org/es/docs/Web/JavaScript)
[![Duoc UC](https://img.shields.io/badge/Duoc%20UC-DSY1104%20Desarrollo%20Fullstack%20II-002B49)](https://www.duoc.cl/)

> **Proyecto Académico para Evaluación Parcial N° 1**  
> **Asignatura:** DSY1104 - Desarrollo Fullstack II  
> **Institución:** Duoc UC - Escuela de Informática y Telecomunicaciones  

---

## 📌 Descripción del Proyecto

**HuertoHogar** es una plataforma web integral de comercio electrónico y gestión comunitaria diseñada para conectar directamente a pequeños y medianos agricultores ecológicos de Chile con los hogares del país. 

El sistema promueve la agroecología, el comercio justo y una alimentación consciente libre de intermediarios convencionales. Cuenta con una arquitectura dual compuesta por:
1. **Tienda Online (Portal Público):** Catálogo dinámico de frutas, verduras, lácteos y productos orgánicos, detalle de productos con selector de stock interactivo, carrito de compras con persistencia local y cálculo de impuestos, sección institucional *Quiénes Somos* con mapa geográfico interactivo de sucursales en Chile, módulo dinámico de Blog agroecológico, preguntas frecuentes con acordeón y formularios con validación en tiempo real.
2. **Sistema Administrativo (Panel de Gestión):** Gestión completa de inventario y bodegas, mantenedor de productos con control de stock crítico, administración de usuarios con perfiles (Administrador, Vendedor, Cliente) y métricas comerciales.

---

## 👥 Equipo de Desarrollo & Distribución de Tareas

| Integrante | Rol Principal | Módulos & Responsabilidades en el Repositorio |
| :--- | :--- | :--- |
| **Ignacio** | Arquitectura Frontend & E-Commerce | Catálogo dinámico, detalle de producto con control de stock en tiempo real, carrito de compra con `LocalStorage`, integración general y refactorización modular. |
| **Daniel** | Autenticación, Seguridad & Registro | Formularios de Registro de usuario, Inicio de sesión, página de Contacto, validaciones JS y persistencia de credenciales. |
| **Nacho** | Panel Administrativo & Gestión | Módulos de administración de productos (`products-admin`), nuevo producto, bodega (`where-house`) y control de inventario. |

---

## 🚀 Funcionalidades Principales

### 🛒 1. Portal Tienda (Público)
* **Página de Inicio (`home.html`):** Banner principal hero, categorías destacadas, productos en oferta y accesos rápidos de navegación.
* **Catálogo de Productos (`pages/product/products.html`):**
  * Renderizado dinámico de productos desde colección JavaScript y `localStorage`.
  * Filtro interactivo por categorías (Frutas, Verduras, Orgánicos, Lácteos, Promociones).
  * Buscador en tiempo real por nombre de producto.
  * Botón de adición directa al carrito con descuento automático de stock visible en tarjeta ("Agotado" o unidades restantes).
* **Detalle de Producto (`pages/product/product-detail.html`):**
  * Carga dinámica mediante parámetros de URL (`?codigo=...` o `?id=...`).
  * Galería de producto, información nutricional, sellos agroecológicos y procedencia.
  * Selector interactivo de cantidad limitado estrictamente al stock disponible.
  * Recomendaciones automáticas de productos relacionados.
* **Carrito de Compras (`pages/carrito.html`):**
  * Persistencia íntegra de ítems en `localStorage.getItem("carrito")`.
  * Botones de incremento (`+`), decremento (`−`) y eliminación individual.
  * Cálculo dinámico y automático de Subtotal, IVA (19%) y Total general en pesos chilenos (`CLP`).
  * Sincronización bidireccional con el contador de productos del navbar (`🛒 X ítems`).
* **Quiénes Somos (`pages/about-us.html`):**
  * Historia institucional, misión, visión y manifiesto de calidad agroecológica.
  * **Mapa Interactivo de Sucursales:** Representación geográfica sobre mapa de Chile con 7 puntos clave (Santiago, Viña del Mar, Valparaíso, Nacimiento, Concepción, Villarrica, Puerto Montt) y fichas de detalle en tiempo real.
  * Directorio completo de tiendas físicas y bodegas de acopio.
* **Módulo de Blog (`pages/blog.html` & `pages/blog-detail.html`):**
  * Catálogo de noticias y artículos sobre huertos urbanos, agricultura limpia y conservación de verduras.
  * Vista de detalle de artículo dinámico con lectura de parámetros URL.
* **Preguntas Frecuentes (`pages/FAQ.html`):**
  * 13 preguntas clave organizadas por tópicos (Envíos, Calidad, Medios de Pago, Políticas).
  * Acordeón interactivo con botón global de *Expandir / Contraer todas* y buscador en vivo.
* **Formularios con Validación Estricta:**
  * **Registro (`pages/register.html`):** RUN chileno verificado con algoritmo Módulo 11, nombres, apellidos, correo institucional, select dinámico de 16 regiones y comunas de Chile, dirección y contraseñas coincidentes.
  * **Inicio de Sesión (`pages/log-in.html`):** Validación de correos admitidos y longitud de contraseña con avisos contextuales.
  * **Contacto (`pages/contact.html`):** Validación de campos obligatorios, límite de caracteres y confirmación interactiva.

### ⚙️ 2. Portal Administrativo
* **Home Admin (`pages/admin/home-admin.html`):** Dashboard central con menú de navegación vertical.
* **Gestión de Productos (`pages/admin/products-admin.html`):** Tabla de catálogo con visualización de código, nombre, categoría, precio, stock actual y acciones de edición/eliminación.
* **Nuevo Producto & Edición (`pages/admin/new-product.html` / `edit-product.html`):**
  * Formulario con validación de código único (mínimo 3 caracteres), precio, stock e indicador de stock crítico.
* **Control de Bodega e Inventario (`pages/admin/where-house.html`):** Supervisión de existencias y alertas visuales cuando el producto alcanza nivel crítico.
* **Gestión de Usuarios (`pages/admin/users.html`, `new-user.html`, `edit-user.html`):**
  * Asignación de roles de usuario: **Administrador**, **Vendedor** y **Cliente**.
  * Carga dinámica de regiones y comunas de Chile.

---

## 🛠️ Tecnologías y Estándares Utilizados

* **HTML5 Semántico:** Uso riguroso de etiquetas estructurales (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>`, `<footer>`) para optimizar accesibilidad, semántica y SEO técnico.
* **CSS3 Moderno & Modular:** 
  * Hojas de estilo externas por vista para facilitar mantenimiento e independencia de componentes.
  * CSS Grid y Flexbox para maquetación fluida y adaptable a dispositivos móviles.
  * Variables CSS (`:root`) para paleta de colores coherente (tonos verdes agrícolas, acentos tierra y tipografía legible).
* **JavaScript Puro (Vanilla JS - ES6+):**
  * Manipulación reactiva del DOM sin librerías externas.
  * Manejo de eventos (`input`, `change`, `submit`, `click`).
  * Validación en tiempo real con mensajes contextuales accesibles (`<small class="mensaje-error">`).
* **Almacenamiento Local (Web Storage API):**
  * `localStorage` para almacenamiento persistente del carrito de compras y del catálogo de productos.
* **Control de Versiones (Git & GitHub Flow):**
  * Trabajo en equipo mediante ramas temáticas (`Daniel-Branch`, `nacho-branch`, `main`).
  * Integración mediante Pull Requests y resolución sistemática de conflictos.

---

## 📐 Reglas de Negocio & Validaciones de Formularios

En estricto cumplimiento con los requisitos de la evaluación:

| Campo / Módulo | Reglas de Validación Implementadas | Mensaje / Comportamiento |
| :--- | :--- | :--- |
| **RUN (RUT Chileno)** | Longitud entre 7 y 9 caracteres, sin puntos ni guion. Validación matemática mediante **Algoritmo Módulo 11** para comprobar el dígito verificador. | Error contextual si el formato o el dígito verificador no concuerdan matemáticamente. |
| **Correo Electrónico** | Máximo 100 caracteres. Restricción de dominio obligatoria: únicamente `@duoc.cl`, `@profesor.duoc.cl` o `@gmail.com`. | Mensaje dinámico indicando los dominios autorizados. |
| **Contraseña** | Longitud estricta entre 4 y 10 caracteres. En registro se valida coincidencia obligatoria de ambos campos. | Alerta inmediata al perder foco o enviar el formulario. |
| **Regiones y Comunas** | Carga dinámica desde biblioteca centralizada [`js/chile-data.js`](file:///c:/Users/properolol/OneDrive/Escritorio/uni/personal%20coding/proyectos/huertoHogar-fullstack-2/js/chile-data.js). Al seleccionar cualquiera de las 16 regiones de Chile, el dropdown de comunas se filtra al instante con las comunas oficiales correspondientes. | Evita inconsistencias de datos geográficos. |
| **Stock en Carrito** | El usuario no puede añadir al carrito más unidades que el stock disponible en inventario. Al agregar productos, el stock disponible disminuye inmediatamente. | Notificación de alerta y bloqueo de adición al llegar al límite. |
| **Stock Crítico (Admin)** | Alerta visual automática cuando las existencias son iguales o inferiores al umbral definido. | Badge y aviso de reposición en tabla de inventario. |

---

## 📂 Estructura del Repositorio

```text
huertoHogar-fullstack-2/
├── README.md                           # Documentación técnica del proyecto
├── css/                                # Hojas de estilos modulares
│   ├── main.css                        # Estilos globales y base
│   ├── about-us.css                    # Estilos específicos de Quiénes Somos y Mapa
│   ├── blog.css                        # Estilos del módulo de noticias y artículos
│   └── product-detail.css              # Estilos del detalle de producto interactivo
├── img/                                # Activos gráficos optimizados
│   ├── logo.ico                        # Ícono institucional
│   ├── logo.png.ico                    # Favicon alternativo
│   ├── mapa-chile-verde.png            # Mapa base geográfico de Chile
│   └── productos/                      # Fotografías de productos agroecológicos
├── js/                                 # Lógica centralizada compartida
│   ├── chile-data.js                   # 16 regiones y comunas oficiales de Chile
│   ├── validaciones.js                 # Algoritmo Módulo 11 y validación de correo
│   ├── common.js                       # Contador reactivo de carrito y formateador CLP
│   ├── products.js                     # Catálogo público interactivo
│   ├── product-detail.js               # Vista de detalle con cálculo de stock
│   ├── carrito.js                      # Lógica de compra, cálculo de IVA y totales
│   ├── about-us.js                     # Mapa interactivo y filtro de sucursales
│   ├── blog.js                         # Listado de artículos y buscador
│   ├── blog-detail.js                  # Lector de artículos dinámicos
│   ├── faq.js                          # Acordeón de preguntas y respuestas
│   ├── productos-admin.js              # Panel administrativo de productos
│   └── new-product.js                  # Formulario administrativo de nuevos ítems
└── pages/                              # Vistas HTML del sistema
    ├── home.html                       # Página principal (Tienda)
    ├── about-us.html                   # Quiénes Somos y Mapa
    ├── blog.html                       # Listado de artículos
    ├── blog-detail.html                # Detalle de artículo dinámico
    ├── FAQ.html                        # Preguntas frecuentes con acordeón
    ├── contact.html                    # Formulario de contacto
    ├── log-in.html                     # Inicio de sesión
    ├── register.html                   # Registro de usuarios
    ├── carrito.html                    # Carrito de compras
    ├── admin/                          # Módulos del Administrador
    │   ├── home-admin.html             # Dashboard de administración
    │   ├── products-admin.html         # Mantenedor de productos
    │   ├── new-product.html            # Alta de nuevo producto
    │   ├── edit-product.html           # Edición de producto existente
    │   ├── users.html                  # Listado de usuarios del sistema
    │   ├── new-user.html               # Alta de nuevo usuario
    │   ├── edit-user.html              # Edición de usuario y roles
    │   └── where-house.html            # Gestión de inventario y bodega
    ├── product/                        # Vistas de productos
    │   ├── products.html               # Catálogo público
    │   └── product-detail.html         # Ficha técnica y compra
    └── js/                             # Scripts específicos por vista
        ├── contact.js                  # Validación de contacto
        ├── log-in.js                   # Validación de inicio de sesión
        ├── register.js                 # Validación de registro con RUN Módulo 11
        ├── new-user.js                 # Formulario admin nuevo usuario
        ├── edit-user.js                # Formulario admin edición usuario
        └── users.js                    # Eliminación y control de tabla usuarios
```

---

## 🔐 Credenciales y Datos de Prueba por Defecto

Para facilitar la evaluación y prueba de las funcionalidades de autenticación, validación y roles de usuario, se proporcionan las siguientes credenciales y datos de prueba preconfigurados:

### 1. Cuentas de Acceso (Inicio de Sesión - `pages/log-in.html`)

> **Nota de Validación:** El sistema valida que el correo pertenezca a los dominios permitidos (`@duoc.cl`, `@profesor.duoc.cl` o `@gmail.com`) y que la contraseña tenga entre 4 y 10 caracteres.

| Perfil / Rol | Correo Electrónico | Contraseña | Vistas y Permisos Asociados |
| :--- | :--- | :---: | :--- |
| **Administrador** | `carlos.munoz@duoc.cl` | `admin123` | Acceso completo al Panel de Control (`pages/admin/home-admin.html`), mantenedor de productos, bodegas y usuarios. |
| **Vendedor** | `diego.soto@profesor.duoc.cl` | `vend123` | Visualización y gestión de catálogo de productos, existencias y órdenes de compra. |
| **Cliente** | `camila.rojas@gmail.com` | `pass123` | Navegación de tienda, catálogo, detalle de productos y compra en el carrito (`pages/carrito.html`). |

---

### 2. Datos de Prueba para Formulario de Registro (`pages/register.html`)

Al probar el formulario de registro de nuevos clientes, el sistema ejecuta validaciones estrictas en tiempo real:

* **RUN Chileno (con Algoritmo Módulo 11):**
  * `19011022K` *(Válido - ejemplo oficial pauta Duoc UC)*
  * `123456785` *(Válido)*
  * `111111111` *(Válido)*
  * `123456789` *(Inválido - activará mensaje de error por dígito verificador erróneo)*
* **Formatos de Correo Permitidos:**
  * `estudiante@duoc.cl`
  * `docente@profesor.duoc.cl`
  * `cliente@gmail.com`
* **Geografía Dinámica:**
  * Seleccionar **"Región Metropolitana de Santiago"** → Se cargarán automáticamente comunas como *Santiago*, *Providencia*, *Las Condes*, *Ñuñoa*, etc.
  * Seleccionar **"Región de Valparaíso"** → Se cargarán automáticamente comunas como *Valparaíso*, *Viña del Mar*, *Quilpué*, etc.
* **Contraseña:** Mínimo 4 y máximo 10 caracteres (ej: `clave123`). Ambas casillas deben coincidir.

---

## 💻 Instrucciones de Instalación y Ejecución Local

Para visualizar y probar la aplicación web localmente:

1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/TU-USUARIO/huertoHogar-fullstack-2.git
   cd huertoHogar-fullstack-2
   ```

2. **Ejecutar el proyecto:**
   * **Opción A (Recomendada):** Abrir la carpeta en Visual Studio Code e iniciar mediante la extensión **Live Server** abriendo el archivo `pages/home.html`.
   * **Opción B:** Abrir directamente con doble clic el archivo `pages/home.html` en cualquier navegador moderno (Google Chrome, Firefox, Edge, Safari).

---
*Desarrollado con dedicación y compromiso agroecológico por el equipo de HuertoHogar.*
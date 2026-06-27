# Notas de diseño

## Backend (BFF)

### Decisiones

- **MVC sobre arquitectura hexagonal**: el BFF no tiene lógica de dominio, solo transforma y reenvía datos. MVC es suficiente y más simple.
- **Upstream 404 para lista vacía**: cuando la API externa no encuentra personajes por nombre, se devuelve `{ results: [] }` en lugar de propagar el 404. "Sin resultados" no es un error.
- **Validación en middleware**: separada del controller para que cada capa tenga una sola responsabilidad.
- **Mappers como funciones puras**: extraídos del servicio para facilitar pruebas unitarias sin dependencias.
- **`app.js` separado de `index.js`**: permite importar la app en tests sin levantar el puerto.
- **`info.next` / `info.prev` como booleanos**: el BFF no expone las URLs de la API externa; el frontend solo necesita saber si hay página siguiente o anterior.

### Supuestos

- El frontend consume este BFF directamente.
- La paginación la controla la API externa; el BFF solo reenvía el parámetro `page`.

### Con más tiempo

- Cachear respuestas frecuentes (ej. primera página de personajes) con Redis para no estar llamando a la API externa a cada momento.
- Agregar ESLint y Prettier para estandarizar el estilo de código y detectar errores estáticos.
- Documentar la API con Swagger para facilitar la integración con el frontend y otros consumidores.

---

## Frontend

### Decisiones

- **CSR**: sin SSR ni SSG; la app es un explorador interactivo sin requisitos de SEO.
- **URL como estado**: búsqueda y página se sincronizan con `useSearchParams` (`?name=rick&page=2`), permitiendo compartir y navegar con el historial del browser.
- **Debounce 300 ms**: implementado sin dependencias externas en `useDebounce`.
- **BFF como única fuente**: el frontend no conoce la URL de la API externa; toda la lógica de transformación vive en el BFF.
- **Back navigation con `location.state`**: `CharacterCard` guarda `location.search` en el state de React Router para que el botón volver restaure búsqueda y página exactas.
- **Sin StrictMode**: removido para evitar double-fetch en desarrollo que generaba errores 429 por rate limiting de Cloudflare.
- **Componente presentacional `CharacterDetail`**: separado de `CharacterDetailPage` para cumplir con el principio de responsabilidad única.

### Supuestos

- El BFF corre en `http://localhost:3000` durante desarrollo (configurable via `VITE_BFF_URL`).
- La paginación viene de la API externa; el frontend solo controla qué página pedir.

### Con más tiempo

- Agregar tests para `CharacterCard`, `CharacterGrid` y `CharacterDetailPage`.
- Implementar manejo de errores global con un ErrorBoundary.
- Agregar ESLint y Prettier.

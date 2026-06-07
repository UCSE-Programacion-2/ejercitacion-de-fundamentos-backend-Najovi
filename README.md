[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/DMAXfk1S)
# Ejercitación: Fundamentos de Backend

Bienvenido a la ejercitación práctica sobre **Servidores, FileSystem y Entornos en Node.js**.

## Objetivo
Implementar un servidor web usando **Express JS** que exponga una API REST para leer y (opcionalmente) escribir datos desde un archivo JSON estático (`data/frutas.json`), emulando una base de datos mediante la API nativa de Node.js **FileSystem (`fs`)**. Además, deberás configurar el puerto del servidor utilizando variables de entorno.

## Requisitos previos
- Node.js versión `>= 20.6.0` instalada en tu equipo (para poder usar `--env-file`).

## Instalación y Configuración

1. Instala las dependencias del proyecto:
   ```bash
   npm install
   ```

2. Crea tu archivo de variables de entorno:
   - Duplica el archivo `.env.example` y renómbralo a `.env`.
   - Modifica (si deseas) el valor del puerto en tu `.env`.

3. Levanta el servidor en modo desarrollo:
   ```bash
   npm run dev
   ```

## Tareas a realizar

Abre el archivo `server.js`. Allí encontrarás la estructura inicial de la aplicación y comentarios `TODO` que indican dónde debes codificar:

1. **Variables de entorno**: Carga y lee la variable de entorno `PORT`. Si no existe, utiliza el puerto `3000` por defecto.
2. **Endpoint `GET /frutas`**: Lee el archivo `data/frutas.json` de manera asíncrona o sincrónica con `fs`, convierte su contenido de JSON a un objeto JavaScript, y devuélvelo al cliente con status `200`.
3. **Endpoint `GET /frutas/buscar`**: Lee el parámetro de consulta `nombre` de la URL (`req.query.nombre`). Filtra la lista de frutas para devolver solo aquellas cuyo nombre incluya la cadena buscada (insensible a mayúsculas). Retorna el arreglo con status `200`. (Asegúrate de definir esta ruta ANTES que `GET /frutas/:id`).
4. **Endpoint `GET /frutas/:id`**: Busca una fruta por su `id` en el archivo JSON. Si la encuentra, la devuelve (status `200`); si no, responde con un código de estado `404` y un mensaje de error `{ error: "Fruta no encontrada" }`.
5. **Endpoint `POST /frutas`**: Crea una nueva fruta, asígnale un ID (mayor al último ID existente) y guarda los cambios escribiendo el nuevo listado de frutas devuelta al archivo JSON empleando el módulo `fs`. Devuelve la fruta creada con status `201`.

## Validación manual

Tienes dos opciones para probar visualmente que tu código funciona:

**Opción A: Interfaz Web (Recomendada)**
Al levantar el servidor, Express estará sirviendo un sitio web estilado con Tailwind en la ruta raíz. Simplemente abre tu navegador en [http://localhost:3000](http://localhost:3000) (o el puerto que hayas configurado) y podrás interactuar de forma gráfica con los endpoints que vayas construyendo. ¡La web se conectará automáticamente a tu backend!

**Opción B: API HTTP (Extensión REST Client)**
Puedes verificar el funcionamiento a nivel de código crudo utilizando el archivo `api.http` provisto. 
- Instala la extensión **REST Client** en VS Code.
- Abre `api.http` y haz click en `Send Request` sobre cada bloque para probar las respuestas en formato JSON.

## Autoevaluación

El proyecto incluye tests automáticos. Una vez que hayas completado los puntos en `server.js`, puedes ejecutar los tests localmente para saber si el ejercicio cumple con todos los criterios evaluados:

```bash
npm test
```

Asegúrate de que todos los tests pasen exitosamente antes de realizar el `commit` y `push` final, ya que estos mismos tests serán los que evalúen tu entrega en GitHub Classroom.

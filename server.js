const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();

app.use(express.json());
app.use(express.static('public'));

try {
  process.loadEnvFile();
} catch (error) {
  // Ignorar error si el archivo .env no existe
}

// Lee PORT del .env, si no existe usa 3000 por defecto
const PORT = process.env.PORT || 3000;

const dataFilePath = path.join(__dirname, 'data', 'frutas.json');

// ─── GET /frutas ────────────────────────────────────────────────────────────
// Lee el archivo JSON y devuelve todas las frutas
app.get('/frutas', (req, res) => {
  const contenido = fs.readFileSync(dataFilePath, 'utf-8'); // Lee el archivo como texto
  const frutas = JSON.parse(contenido);                     // Convierte el texto JSON a objeto JS
  res.status(200).json(frutas);                             // Responde con el arreglo
});

// ─── GET /frutas/buscar?nombre=xxx ──────────────────────────────────────────
// IMPORTANTE: va ANTES de /frutas/:id para que Express no confunda "buscar" con un id
app.get('/frutas/buscar', (req, res) => {
  const nombre = req.query.nombre || '';                    // Toma el parámetro ?nombre= de la URL
  const contenido = fs.readFileSync(dataFilePath, 'utf-8');
  const frutas = JSON.parse(contenido);

  // Filtra frutas cuyo nombre contenga el texto buscado, sin importar mayúsculas
  const resultado = frutas.filter(fruta =>
    fruta.nombre.toLowerCase().includes(nombre.toLowerCase())
  );

  res.status(200).json(resultado);                          // Puede devolver arreglo vacío si no hay coincidencias
});

// ─── GET /frutas/:id ────────────────────────────────────────────────────────
// Busca una fruta por su id numérico
app.get('/frutas/:id', (req, res) => {
  const id = Number(req.params.id);                         // Convierte el string del parámetro a número
  const contenido = fs.readFileSync(dataFilePath, 'utf-8');
  const frutas = JSON.parse(contenido);

  const fruta = frutas.find(f => f.id === id);              // Busca la fruta con ese id

  if (fruta) {
    res.status(200).json(fruta);                            // La encontró → devuelve la fruta
  } else {
    res.status(404).json({ error: 'Fruta no encontrada' }); // No existe → error 404
  }
});

// ─── POST /frutas ───────────────────────────────────────────────────────────
// Crea una nueva fruta y la guarda en el archivo JSON
app.post('/frutas', (req, res) => {
  const contenido = fs.readFileSync(dataFilePath, 'utf-8');
  const frutas = JSON.parse(contenido);

  // Calcula el nuevo id: toma el mayor id existente y le suma 1
  const nuevoId = Math.max(...frutas.map(f => f.id)) + 1;

  // Arma el objeto nueva fruta combinando el id generado con los datos del body
  const nuevaFruta = { id: nuevoId, ...req.body };

  frutas.push(nuevaFruta);                                  // Agrega la fruta al arreglo

  // Escribe el arreglo actualizado de vuelta al archivo (null, 2 → formato legible con indentación)
  fs.writeFileSync(dataFilePath, JSON.stringify(frutas, null, 2), 'utf-8');

  res.status(201).json(nuevaFruta);                         // Responde con la fruta creada y status 201
});

// Iniciar el servidor
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
    console.log(`Abre tu navegador en http://localhost:${PORT} para ver la interfaz web.`);
  });
}

module.exports = app;
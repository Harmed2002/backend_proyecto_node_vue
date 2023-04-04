"use strict";

var _express = _interopRequireDefault(require("express"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
// Importar modulos
// const express = require("express");

// Arrancar modulos
const app = (0, _express.default)();

// Crear variables auxiliares
const PORT = process.env.PORT || 3000;

// Configurar rutas

// Levantar el servidor
app.listen(PORT, () => {
  console.log(`Servidor Online en http://127.0.0.1:${PORT}`);
});
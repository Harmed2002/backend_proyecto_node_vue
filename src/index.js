// Importar modulos
// const express = require("express");
import express from "express";
import { Route } from "./routes";
import cors from "cors";

// Arrancar modulos
const app = express();

// Carga de archivos estáticos (VUE)
app.use(express.static('public'));

// CORS
app.use(cors());

// Crear variables auxiliares
const PORT = process.env.PORT || 3000;

// Para req.body (json)
app.use(express.json()) // For parsing application/json
app.use(express.urlencoded({ extended: true })) // For parsing applications

// Configurar rutas
app.use('/api', Route)

// Levantar el servidor
app.listen(PORT, () => {
    console.log(`Servidor Online en http://127.0.0.1:${PORT}`);
})
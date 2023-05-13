import { Router } from "express";
//import * as authMiddleware from '../middleware/auth.Middleware'
export const Route = Router();

import authController from "../controllers/auth.controller"
import usuarioController from "./../controllers/usuario.controller"
import categoriaController from "./../controllers/categoria.controller"
import productoController from "./../controllers/producto.controller"
import clienteController from "../controllers/cliente.controller";
import pedidoController from "../controllers/pedido.controller";

// Para carga de imágenes o archivos
import multer from "multer";

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, './public/imagenes')		// Directorio donde se suben los archivos
	},
	filename: function (req, file, cb) {	// Cómo se forma el nombre del archivo
		const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
		cb(null, uniqueSuffix + '-' + file.originalname)
	}
})

const upload = multer({ storage: storage })

Route.post('/auth/registro', authController.registro);
Route.post('/auth/login', authController.login);
//Route.get('/auth/perfil', authMiddleware.auth, authController.perfil);
Route.get('/auth/perfil', authController.perfil);

// Usuarios
Route.get('/usuario', usuarioController.listar);
Route.post('/usuario', usuarioController.guardar);
Route.get('/usuario/:id', usuarioController.mostrar);
Route.put('/usuario/:id', usuarioController.modificar);
Route.delete('/usuario/:id', usuarioController.eliminar);

// Categorías
Route.get('/categoria', categoriaController.listar);
Route.post('/categoria', categoriaController.guardar);
Route.get('/categoria/:id', categoriaController.mostrar);
Route.put('/categoria/:id', categoriaController.modificar);
Route.delete('/categoria/:id', categoriaController.eliminar);

// Productos
Route.get('/producto', productoController.listar);
Route.post('/producto', productoController.guardar);
Route.get('/producto/:id', productoController.mostrar);
Route.put('/producto/:id', productoController.modificar);
Route.delete('/producto/:id', productoController.eliminar);
// Subir imagen de producto
Route.post('/producto/:id/actualizar-imagen', upload.single("imagen"), productoController.actualizarImagen);

// Clientes
Route.get('/cliente', clienteController.listar);
Route.post('/cliente', clienteController.guardar);
Route.get('/cliente/:id', clienteController.mostrar);
Route.put('/cliente/:id', clienteController.modificar);
Route.delete('/cliente/:id', clienteController.eliminar);

// Pedidos
Route.get('/pedido', pedidoController.listar);
Route.post('/pedido', pedidoController.guardar);
Route.get('/pedido/:id', pedidoController.mostrar);
Route.put('/pedido/:id', pedidoController.modificar);
Route.delete('/pedido/:id', pedidoController.eliminar);


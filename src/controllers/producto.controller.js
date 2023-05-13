import models from "./../models"

// Lo hacemos diferente con funciones => flecha
export default {
	listar: async (req, res) => {
		try {
			// Paginacion? page = 1 & limit = 2
			let page = parseInt(req.query.page);
			let limit = parseInt(req.query.limit);
			let offset = 0 + (page - 1) * limit;

			let productos = await models.Producto.findAndCountAll({
				offset: offset,
				limit: limit,
				include: [
					{model: models.Categoria}
				]
			});

			res.status(200).json(productos);

		} catch (error) {
			res.status(500).json({ mensaje: "Error al recuperar los datos de productos", error: error })
		}
	},

	guardar: async (req, res) => {
		try {
			const { nombre, stock, precio, descripcion, categoriaId } = req.body
			// Validar

			const producto = await models.Producto.create({ nombre, stock, precio, descripcion, categoriaId })
			return res.status(201).json({ mensaje: "Producto registrado", data: producto })

		} catch (error) {
			res.status(500).json({ mensaje: "Error al guardar producto", error: error })
		}




	},

	mostrar: async (req, res) => {
		try {
			let product_id = req.params.id
			const producto = await models.Producto.findOne({ where: { id: product_id } });

			if (producto === null) {
				res.status(404).json({ mensaje: "El producto no existe"});

			}
			return res.status(200).json(producto);

		} catch (error) {
			res.status(500).json({ mensaje: "Error al recuperar el producto", error: error })
		}
	},

	modificar: async (req, res) => {
		try {
			let id = req.params.id;
			let datos = req.body;

			const producto = await models.Producto.update(datos, { where: { id: id } });

			return res.status(200).json({ mensaje: "Producto actualizado" });

		} catch (error) {
			res.status(500).json({ mensaje: "Error al actualizar el producto", error: error })
		}
	},

	eliminar: async (req, res) => {
		try {
			let id = req.params.id;

			await models.Producto.destroy({ where: { id: id } })
			return res.status(200).json({ mensaje: "Producto eliminado" });

		} catch (error) {
			res.status(500).json({ mensaje: "Error al eliminar el producto", error: error })
		}
	},

	actualizarImagen: async (req, res) => {
		try {
			let id = req.params.id;
			let datos = req.body;

			if (req.file) {
				datos.imagen = req.file.filename;
			}
			console.log(datos);

			models.Producto.update(datos, {where: {id}});
			return res.status(200).json({ mensaje: "Imagen del producto actualizada" });

		} catch (error) {
			res.status(500).json({ mensaje: "Error al actualizar imagen del producto", error: error })
			
		}
	}
}
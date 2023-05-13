import models from "./../models"

// Lo hacemos diferente con funciones => flecha
export default {
	listar: async (req, res) => {
		try {
			// Paginacion? page = 1 & limit = 2
			let page = parseInt(req.query.page);
			let limit = parseInt(req.query.limit);
			let offset = 0 + (page - 1) * limit;

			let pedidos = await models.Pedido.findAndCountAll({
				offset: offset,
				limit: limit,
				include: [models.Cliente, models.Producto]	// Referencia los datos que queremos ver de la tabla relacionada
			});

			res.status(200).json(pedidos);

		} catch (error) {
			res.status(500).json({ mensaje: "Error al recuperar los datos de pedidos", error: error })
		}
	},

	guardar: async (req, res) => {
		// Así viene la info. en el body. Los datos del carrito se agregan a la BD con addProducto
		/*
			{
				nro_fact: 123,
				clienteId: 45,
				carrito: [
					{producto_id: 4, cantidad: 2},
					{producto_id: 6, cantidad: 1},
					{producto_id: 9, cantidad: 3}
				]
			}
		*/

		const date = new Date();

		try {
			const { nro_fact, clienteId, carrito } = req.body	// Se quitan fecha, estado ya que son automáticos en la BD
			// Validar
			const pedido = await models.Pedido.create({ fecha: date, nro_fact, clienteId, estado: 1 })

			// Asignar detalle de productos
			carrito.forEach(async prod => {
				// Primero, verifico que el producto exista en la tabla Productos
				const producto = await models.Producto.findByPk(prod.producto_id);

				// Luego, grabo el detalle del carrito
				await pedido.addProducto(producto, { through: { cantidad: prod.cantidad } });
			});

			return res.status(201).json({ mensaje: "Pedido registrado", data: pedido })

		} catch (error) {
			res.status(500).json({ mensaje: "Error al guardar pedido", error: error })
		}

	},

	mostrar: async (req, res) => {
		try {
			let product_id = req.params.id
			const pedido = await models.Pedido.findOne({ where: { id: product_id } });

			if (pedido === null) {
				res.status(404).json({ mensaje: "El pedido no existe"});

			}
			return res.status(200).json(pedido);

		} catch (error) {
			res.status(500).json({ mensaje: "Error al recuperar el pedido", error: error })
		}
	},

	modificar: async (req, res) => {
		try {
			let id = req.params.id;
			let datos = req.body;

			const pedido = await models.Pedido.update(datos, { where: { id: id } });

			return res.status(200).json({ mensaje: "Pedido actualizado" });

		} catch (error) {
			res.status(500).json({ mensaje: "Error al actualizar el pedido", error: error })
		}
	},

	eliminar: async (req, res) => {
		try {
			let id = req.params.id;

			await models.Pedido.destroy({ where: { id: id } })
			return res.status(200).json({ mensaje: "Pedido eliminado" });

		} catch (error) {
			res.status(500).json({ mensaje: "Error al eliminar el pedido", error: error })
		}
	},

}
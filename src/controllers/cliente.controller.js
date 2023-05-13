import models from "../models";
import { Op } from "sequelize";

// Lo hacemos diferente con funciones anonima
export default {
	listar: async function(req, res) {
		let q = req.query.q;	// query es para poder capturar valores de búsqueda. q es el parámetro de búsqueda
		console.log(q);
		const { count, rows } = await models.Cliente.findAndCountAll({
			where: {
				nombre_completo: {[Op.like]: `%${q}%`}
			}
		});

		console.log(rows);
		res.json(rows);
		
		
		//let clientes = await models.Cliente.findAll();

		//res.status(200).send(clientes);
	},

	guardar: async function(req, res) {
		/*let datos = req.body;

		await models.Cliente.create(datos)
		return res.status(201).send({mensaje: "Cliente registrado"})*/

		try {
			const { nombre_completo, telefono, correo } = req.body

			const cliente = await models.Cliente.create({ nombre_completo, telefono, correo })
			return res.status(201).json({ mensaje: "Cliente registrado", data: cliente })

		} catch (error) {
			res.status(500).json({ mensaje: "Error al guardar cliente", error: error })
		}

	},

	mostrar: async function(req, res) {
		let id = req.params.id;
	},

	modificar: async function(req, res) {
		let id = req.params.id;
		let datos = req.body;

		await models.Cliente.update(datos, {where: {id: id}});

		return res.status(201).send({mensaje: "Cliente actualizado"})
	},

	eliminar: async function(req, res) {
		let id = req.params.id;

		await models.Cliente.destroy({where: {id: id}})

		return res.status(201).send({mensaje: "Cliente eliminado"})
	}
}
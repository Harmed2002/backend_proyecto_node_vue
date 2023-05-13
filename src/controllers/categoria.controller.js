import models from "./../models"

// Se hace con funciones normales
export default {
	async listar(req, res){
		let categorias = await models.Categoria.findAll();

		res.status(200).send(categorias);
	},

	async guardar(req, res){
		let datos = req.body;

		await models.Categoria.create(datos)
		return res.status(201).send({mensaje: "Categoría registrada"})

	},

	mostrar(req, res){
		let id = req.params.id;
	},

	async modificar(req, res){
		let id = req.params.id;
		let datos = req.body;

		await models.Categoria.update(datos, {where: {id: id}});

		return res.status(201).send({mensaje: "Categoría actualizada"})
	},

	async eliminar(req, res){
		let id = req.params.id;

		await models.Categoria.destroy({where: {id: id}})

		return res.status(201).send({mensaje: "Categoría eliminada"})
	}
}
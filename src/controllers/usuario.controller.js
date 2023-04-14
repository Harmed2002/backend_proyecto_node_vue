export default {
	listar: (req, res) => {

	},

	guardar: (req, res) => {
		let datos = req.body;
	},

	mostrar: (req, res) => {
		let id = req.params.id;
	},

	modificar: (req, res) => {
		let id = req.params.id;
		let datos = req.body;
	},

	eliminar: (req, res) => {
		let id = req.params.id;
	},
}
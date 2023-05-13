'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
	class Producto extends Model {
		static associate(models) {
			// define association here
			// N:1 (Muchos a 1. belongsTo: pertenece a un...)
			models.Producto.belongsTo(models.Categoria, {
				foreignKey: "categoriaId"
			});

			// N:M (Muchos a muchos. belongsToMany: pertenece a muchos...)
			models.Producto.belongsToMany(models.Pedido, {
				through: {
					model: 'PedidoProductos'	// Nombre de la tabla relación
					/*scope: {cantidad: 1}*/
				},
				foreignKey: "productoId"
			})
		}
	}

	Producto.init({
		nombre: DataTypes.STRING,
		stock: DataTypes.INTEGER,
		precio: DataTypes.INTEGER,
		descripcion: DataTypes.STRING,
		categoriaId: DataTypes.INTEGER,
		imagen: DataTypes.STRING,
	}, {
		sequelize,
		modelName: 'Producto',
	});

	return Producto;
};
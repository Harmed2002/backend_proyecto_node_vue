'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
	class PedidoProducto extends Model {
		static associate(models) {
			// define association here
			// N:1 (Muchos a 1. belongsTo: pertenece a un...)
			models.PedidoProducto.belongsTo(models.Pedido, {
				foreignKey: "pedidoId"
			});

			// N:M (Muchos a muchos. belongsToMany: pertenece a muchos...)
			/*models.PedidoProducto.belongsToMany(models.Producto, {
				through: {
					model: 'Producto',
					scope: {cantidad: 1}
				},
				foreignKey: "productoId"
			})*/
		}
	}

	PedidoProducto.init({
		pedidoId: DataTypes.INTEGER,
		productoId: DataTypes.INTEGER,
		cantidad: DataTypes.INTEGER
	}, {
		sequelize,
		modelName: 'PedidoProducto',
	});

	return PedidoProducto;
};
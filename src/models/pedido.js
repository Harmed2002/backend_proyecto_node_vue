'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
	class Pedido extends Model {
		static associate(models) {
			// N:M (Muchos a muchos. belongsToMany: pertenece a muchos...)
			models.Pedido.belongsToMany(models.Producto, {
				through: {
					model: 'PedidoProductos'
					/*scope: {cantidad: 1}*/
				},
				foreignKey: "pedidoId"
			});

			// N:1 (Muchos a 1. belongsTo: pertenece a un...)
			models.Pedido.belongsTo(models.Cliente, {
				foreignKey: "clienteId"
			})
		}
	}

	Pedido.init({
		fecha: DataTypes.DATE,
		estado: DataTypes.INTEGER,
		nro_fact: DataTypes.STRING,
		clienteId: DataTypes.INTEGER
	}, {
		sequelize,
		modelName: 'Pedido',
	});

	return Pedido;
};
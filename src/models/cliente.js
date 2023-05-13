'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
	class Cliente extends Model {
		static associate(models) {
			// define association here
		}
	}

	Cliente.init({
		nombre_completo: DataTypes.STRING,
		telefono: DataTypes.STRING,
		correo: DataTypes.STRING
	}, {
		sequelize,
		modelName: 'Cliente',
	});

	return Cliente;
};
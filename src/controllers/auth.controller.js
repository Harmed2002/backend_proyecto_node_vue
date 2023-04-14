import models, { sequelize } from "../models"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { tiempo_expiracion, codigo_secreto } from './../config/config'

export default {
	async registro(req, res) {
		const { nombre, apellidos, email, password } = req.body;

		if (email) {
			let user = await models.User.findOne({
				where: {
					email: email
				}
			})

			// Verifico que el usuario ya esté registrado
			if (!user) {
				// Cifrar el password
				const hash = await bcrypt.hash(password, 12);

				await models.User.create({ nombre, apellidos, email, password: hash })
				return res.status(200).send({
					mensaje: "Usuario registrado correctamente"
				})
			} else {
				res.status(200).send({ mensaje: "El correo ya existe" })
			}
		} else {
			res.status(200).send({ mensaje: "El correo es obligatorio" })
		}
	},

	async login(req, res) {
		const { email, password } = req.body;

		if (email) {
			// Cifra el password
			//const hash = await bcrypt.hash(password, 12);

			let user = await models.User.findOne({
				where: {
					email: email,
					//password: hash
				}
			}).then((user) => {
				//console.log(user);

				// Verifico que el usuario exista
				if (user) {
					//valid = bcrypt.compare(password, user.password);
					bcrypt.compare(password, user.password).then(function (result) {
						if (result) {
							//res.json({ mensaje: "Bienvenido", data: user, error: false })
							//res.status(200).send({mensaje: "Usuario logueado correctamente"})

							// generar el token (jwt)
							const payload = {
								correo: user.email,
								id: user.id,
								time: new Date(),
								tiempo_expiracion: tiempo_expiracion
							}

							let token = jwt.sign(payload, codigo_secreto, {
								expiresIn: tiempo_expiracion
							});

							res.json({ usuario: payload, access_token: token, error: false })

						} else {
							//res.json({ mensaje: "Usuario o Clave incorrectos", error: true })
							res.status(200).send({mensaje: "Usuario o Clave incorrectos"})
						}
					});

				} else {
					//res.json({ mensaje: "Usuario o Clave incorrectos", error: true })
					res.status(200).send({mensaje: "Usuario o Clave incorrectos"})
				}
			}).catch(error => {
				console.log(error);
				res.json({ mensaje: "Error al autenticar", error: true })
			})

		} else {
			res.status(200).send({ mensaje: "El correo es obligatorio" })
		}
	},

	perfil(req, res) {
		res.status(200).json({
			message: "Congrats! You can now accesss the super secret resource",
		});
	},

	logout(req, res) {

	}
}
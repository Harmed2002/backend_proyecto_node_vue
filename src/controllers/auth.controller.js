import models from "../models"
import bcrypt from "bcrypt"

export default {
    async registro(req, res){
        const { nombre, apellidos, email, password } = req.body;

        if(email){
            let user = await models.User.findOne({
                where: {
                    email: email
                }
            })

            // Verifico que el usuario ya esté registrado
            if(!user){
                // Cifrar el password
                const hash = await bcrypt.hash(password, 12);

                await models.User.create({nombre, apellidos, email, password: hash})
                return res.status(200).send({
                    mensaje: "Usuario registrado correctamente"
                })
            }else{
                res.status(200).send({mensaje: "El correo ya existe"})
            }
        }else{
            res.status(200).send({mensaje: "El correo es obligatorio"})
        }
    },

    login(req, res){
        
    },
    perfil(req, res){
        
    },
    logout(req, res){
        
    }
}
const express = require('express')
const bcrypt = require('bcryptjs')
const Usuario = require('../models/Usuario')
const { generarJWT } = require('../helpers/jwt')

const crearUsuario = async (req, res = express.response) => {
    const { name, email, password } = req.body
    try {

        let usuarioExiste = await Usuario.findOne({ email })
        if (usuarioExiste) {
            return res.status(400).json({
                ok: false,
                msg: 'Un usuario existe con ese correo'
            })
        }
        const usuario = new Usuario(req.body)
        //encryptar contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt)
        await usuario.save();

        //Generar JWT   
        const token = await generarJWT(usuario.id, usuario.name)

        res.status(201).json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            token
        })
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador',
        })
    }

}

const loginUsuario = async (req, res = express.response) => {
    const { email, password } = req.body
    try {

        let usuarioExiste = await Usuario.findOne({ email })
        if (!usuarioExiste) {
            return res.status(400).json({
                ok: false,
                msg: 'No existe un usuario con ese correo'
            })
        }
        //Confirmar los password
        validPassword = bcrypt.compareSync(password, usuarioExiste.password)
        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'El Password es incorrecto'
            })
        }
        //Generar JWT   
        const token = await generarJWT(usuarioExiste.id, usuarioExiste.name)

        res.json({
            ok: true,
            msg: 'Inicio de Sesion Exitoso',
            uid: usuarioExiste.id,
            name: usuarioExiste.name,
            token
        })
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador',
        })
    }

}


const revalidarToken = async (req, res = express.response) => {
    const { name, uid } = req

    //generar un nuevo JWT y retornarlo en esta peticion
    const token = await generarJWT(uid, name)

    res.json({
        ok: true,
        msg: 'renew',
        uid,
        name,
        token
    })
}

module.exports = {
    crearUsuario,
    loginUsuario,
    revalidarToken
}
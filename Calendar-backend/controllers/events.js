const express = require('express')
const Evento = require('../models/Evento')



const getEventos = async (req, res = express.response) => {

    try {
        const eventos = await Evento.find({ user: req.uid })
            .populate('user', 'name')

        return res.json({
            ok: true,
            eventos
        })

    } catch (error) {
        console.log(error)
        return res.status(404).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }

}

const crearEventos = async (req, res = express.response) => {
    //verificar que tenga el evento
    const evento = new Evento(req.body)

    try {
        evento.user = req.uid
        const eventoGuardado = await evento.save()
        return res.json({
            ok: true,
            evento: eventoGuardado
        })
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }

}

const actualizarEventos = async (req, res = express.response) => {
    const eventId = req.params.id
    const uid= req.uid

    try {
        const evento = await Evento.findById(eventId)

        if(!evento){
            return res.json({
                ok: false,
                msg: 'Evento no existe'
            })
        }

        if(evento.user.toString() !== uid){
            return res.status(401).json({
                ok: false,
                msg: 'No tiene privilegio de editar este evento'
            })
        }

        const nuevoEvento = {
            ...req.body,
            user: uid
        }

        const eventoActualizado = await Evento.findByIdAndUpdate(eventId, nuevoEvento, {new: true})

        res.json({
            ok:true,
            evento: eventoActualizado
        })


    

    } catch (error) {
        console.log(error)
        return res.status(404).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }

}

const eliminarEventos = async (req, res = express.response) => {
    const eventId = req.params.id
    const uid= req.uid

    try {
        const evento = await Evento.findById(eventId)

        if(!evento){
            return res.json({
                ok: false,
                msg: 'Evento no existe'
            })
        }

        if(evento.user.toString() !== uid){
            return res.status(401).json({
                ok: false,
                msg: 'No tiene privilegio de Eliminar este evento'
            })
        }


        const eventoEliminado = await Evento.findByIdAndDelete(eventId)

        res.json({
            ok:true,
            evento: eventoEliminado
        })


    

    } catch (error) {
        console.log(error)
        return res.status(404).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }


}

module.exports = {
    getEventos,
    crearEventos,
    actualizarEventos,
    eliminarEventos
}

const { Router } = require('express')
const { getEventos, crearEventos, actualizarEventos, eliminarEventos } = require('../controllers/events')
const {validarJWT} = require('../middlewares/validar-jwt')
const {check} = require('express-validator')
const { validarCampos } = require('../middlewares/validar-campos')
const { isDate } = require('../helpers/isDate')


const router = Router()

//Todas tienen que pasar por la validacion del JWT

router.use(validarJWT);

//Obtener Eventos
router.get('/', getEventos)

//Crear Evento
router.post('/crear',[check('title', 'El Titulo es Obligatorio').not().isEmpty(),check('start', 'Fecha de inicio es Obligatoria').custom(isDate),check('end', 'Fecha de finalizacion es Obligatoria').custom(isDate),validarCampos] ,crearEventos)


//Actualizar Evento
router.put('/actualizar/:id', [check('title', 'El Titulo es Obligatorio').not().isEmpty(),validarCampos],actualizarEventos)

//Eliminar Eventos
router.delete('/eliminar/:id', eliminarEventos)

 
module.exports = router
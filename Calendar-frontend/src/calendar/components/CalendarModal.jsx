import { addHours } from 'date-fns/esm';
import { useState } from 'react';
import Modal from 'react-modal'
import DatePicker, { registerLocale } from "react-datepicker";
import es from 'date-fns/locale/es';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css'

import "react-datepicker/dist/react-datepicker.css";
import { differenceInSeconds } from 'date-fns';
import Alerta from './Alerta';
import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from '../../store/ui/thunks';
import { useEffect } from 'react';
import { newEvent } from '../../store/calendar/thunks';
import FabDelete from './FabDelete';


const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

registerLocale('es', es)


Modal.setAppElement('#root');



const CalendarModal = () => {

    const dispatch = useDispatch()
    const { isDateModalOpen } = useSelector(state => state.ui)

    const { activeEvent } = useSelector(state => state.calendar)

    const { user } = useSelector(state => state.auth)



    const [formSubmitted, setFormSubmitted] = useState(false)
    const [alerta, setAlerta] = useState({
        show: false,
        hasError: false,
        msg: ''
    })
    const [formState, setFormState] = useState({
        title: '',
        notes: '',
        start: new Date(),
        end: addHours(new Date(), 2)
    })

    useEffect(() => {
        if(activeEvent !==null){
            setFormState({...activeEvent})
        }
    }, [activeEvent])

    const titleClass = useMemo(() => {
        if (!formSubmitted) return ''
        return (formState.title.length > 0)
            ? 'is-valid' : 'is-invalid'
    }, [formState.title, formSubmitted])

    const onInputChange = ({ target }) => {
        setFormState({
            ...formState,
            [target.name]: target.value
        })
    }

    console.log(formState)

    const onCloseModal = () => {
        dispatch(closeModal())
    }

    const onDateChanged = (event, changing) => {
        setFormState({
            ...formState,
            [changing]: event
        })
    }

    const onSubmit = async (e) => {
        e.preventDefault()
        setFormSubmitted(true)
        const difference = differenceInSeconds(formState.end, formState.start)

        if (isNaN(difference) || difference <= 0) {
            setAlerta({
                show: true,
                hasError: true,
                msg: 'Error en las Fechas'
            })
            return
        }
        if (formState.title.length <= 0) {
            setAlerta({
                show: true,
                hasError: true,
                msg: 'El Titulo es Obligatorio'
            })
            return
        }
        console.log(formState)
        dispatch(await newEvent(formState,user))
        dispatch(closeModal())
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Cambios Realizados Exitosamente',
            showConfirmButton: false,
            timer: 1500
        })
        setFormSubmitted(false)
        



    }

    return (
        <Modal className='modal' overlayClassName='modal-fondo' closeTimeoutMS={200} isOpen={isDateModalOpen}
            onRequestClose={onCloseModal}
            style={customStyles}
        ><h1> Nuevo evento </h1>
            <hr />
            <form onSubmit={onSubmit} className="container">

                <div className="form-group mb-2">
                    <label>Fecha y hora inicio</label>
                    <DatePicker timeCaption='Hora' locale="es" selected={formState.start} className='form-control' onChange={(event) => onDateChanged(event, 'start')} dateFormat='Pp' showTimeSelect />
                </div>

                <div className="form-group mb-2">
                    <label>Fecha y hora fin</label>
                    <DatePicker timeCaption='Hora' locale="es" minDate={formState.start} selected={formState.end} className='form-control' onChange={(event) => onDateChanged(event, 'end')} dateFormat='Pp' showTimeSelect />
                </div>

                <hr />
                <div className="form-group mb-2">
                    <label>Titulo y notas</label>
                    <input
                        value={formState.title}
                        onChange={onInputChange}
                        type="text"
                        className={`form-control ${titleClass}`}
                        placeholder="Título del evento"
                        name="title"
                        autoComplete="off"
                    />
                    <small id="emailHelp" className="form-text text-muted">Una descripción corta</small>
                </div>

                <div className="form-group mb-2">
                    <textarea
                        value={formState.notes}
                        onChange={onInputChange}
                        type="text"
                        className="form-control"
                        placeholder="Notas"
                        rows="5"
                        name="notes"
                    ></textarea>
                    <small id="emailHelp" className="form-text text-muted">Información adicional</small>
                </div>

                {alerta.show && <Alerta className='mt-4' error={alerta.hasError} msg={alerta.msg}></Alerta>}

                <button
                    type="submit"
                    className="btn btn-outline-primary btn-block"
                >
                    <i className="far fa-save"></i>
                    <span> Guardar</span>
                </button>


            </form>
            <FabDelete></FabDelete>

        </Modal>

    )
}

export default CalendarModal
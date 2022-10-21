import { useSelector } from "react-redux"
import Swal from "sweetalert2"
import calendarApi from "../../api/calendarApi"
import { convertDate } from "../../helpers/convertEventsToDate"
import { onAddNewEvent, onDeleteEvent, onLoadEvents, onUpdateEvent, setActiveEvent } from "./calendarSlice"


export const newActiveEvent = (event) => {
    return (dispatch) => {
        dispatch(setActiveEvent(event))
    }
}

export const newEvent = async (event, user) => {
    return async (dispatch) => {

        try {
            if (event.id) {
                //actualizar
                await calendarApi.put(`/events/actualizar/${event.id}`, event)
                dispatch(onUpdateEvent({ ...event, user }))
            } else {
                //creando
                const { data } = await calendarApi.post('/events/crear', event)
                console.log(data)
                dispatch(onAddNewEvent({ ...event, id: data.evento.id, user }))

            }
        } catch (error) {
            console.log(error)
            Swal.fire('Error al guardar', error.response.data.msg, 'error')
        }


    }
}


export const deleteEvent = async (id) => {

    return async (dispatch) => {
        try {
            await calendarApi.delete(`/events/eliminar/${id}`)
            dispatch(onDeleteEvent())
        } catch (error) {
            console.log(error)
            Swal.fire('Error al Eliminar', undefined, 'error')
        }


    }
}

export const loadingEvents = async () => {
    return async (dispatch) => {
        try {
            const { data } = await calendarApi.get('/events')
            const events = convertDate(data.eventos)
            dispatch(onLoadEvents(events))
        } catch (error) {
            console.log(error)
        }
    }
}
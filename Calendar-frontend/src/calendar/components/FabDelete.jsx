import { addHours } from 'date-fns'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteEvent, newActiveEvent } from '../../store/calendar/thunks'
import { closeModal, openModal } from '../../store/ui/thunks'

const FabDelete = () => {

    const dispatch = useDispatch()
    const {activeEvent} = useSelector(state => state.calendar)

    const handleClickDelete = async () => {
        dispatch(await deleteEvent(activeEvent.id))
        dispatch(closeModal())
       
    }

  return (
        <button onClick={handleClickDelete} className='btn btn-danger fab-danger'><i className='fas fa-trash-alt'></i></button>
    )
}

export default FabDelete;
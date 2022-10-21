import { addHours } from 'date-fns'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { newActiveEvent } from '../../store/calendar/thunks'
import { openModal } from '../../store/ui/thunks'

const FabAddNew = () => {

    const dispatch = useDispatch()
    const {activeEvent} = useSelector(state => state.ui)

    const handleClickNew = () => {
        dispatch(newActiveEvent({ title: '', notes: '',
        start: new Date(), end: addHours(new Date(), 2), bgColor: '#fafafa',
        user: {
            _id: '123',
            name: 'Santiago'
        }}))
        dispatch(openModal())
    }

  return (
        <button onClick={handleClickNew} className='btn btn-primary fab'><i className='fas fa-plus'></i></button>
    )
}

export default FabAddNew
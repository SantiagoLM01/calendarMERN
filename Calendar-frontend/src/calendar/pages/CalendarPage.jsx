import { Calendar } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import NavBar from '../components/NavBar'
import { localizer } from '../../helpers/calendarLocalizer'
import { getMessagesES } from '../../helpers/getMessages'
import CalendarEventBox from './CalendarEventBox'
import { useEffect, useState } from 'react'
import CalendarModal from '../components/CalendarModal'
import { useDispatch, useSelector } from 'react-redux'
import { openModal } from '../../store/ui/thunks'
import { loadingEvents, newActiveEvent } from '../../store/calendar/thunks'
import FabAddNew from '../components/FabAddNew'




const eventStyleGetter = (event, start, end, isSelected) => {
    const style = {
        backgroundColor: '#347CF7',
        borderRadius: '0px',
        opacity: 0.8,
        color: 'white'
    }
    return {
        style
    }
}

const CalendarPage = () => {

    const dispatch = useDispatch()
    const { isDateModalOpen } = useSelector(state => state.ui)

    const { events, activeEvent } = useSelector(state => state.calendar)

    const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'week')

    useEffect(() => {
        const loadAsyncEvents = async () => {
            dispatch(await loadingEvents());
        }
        loadAsyncEvents()
    }, [])

    const onDoubleClick = (event) => {
        dispatch(openModal())

    }

    const onSelect = (event) => {
        console.log({ click: event })
        dispatch(newActiveEvent(event))
    }
    const onViewChanged = (event) => {
        localStorage.setItem('lastView', event)
    }


    return (
        <>
            <NavBar></NavBar>
            <Calendar
                defaultView={lastView}
                culture='es'
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 'calc(100vh - 112px' }}
                messages={getMessagesES()}
                eventPropGetter={eventStyleGetter}
                components={{
                    event: CalendarEventBox
                }}
                onDoubleClickEvent={onDoubleClick}
                onSelectEvent={onSelect}
                onView={onViewChanged}
            />

            <CalendarModal></CalendarModal>
            <FabAddNew></FabAddNew>


        </>
    )
}

export default CalendarPage
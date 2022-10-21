import { createSlice } from '@reduxjs/toolkit'
/* import { addHours } from 'date-fns'
 */


/* const tempEvent = {
    _id: new Date().getTime(), title: 'Partido de futbol', notes: 'Ganar 3-0',
    start: new Date(), end: addHours(new Date(), 2), bgColor: '#fafafa',
    user: {
        _id: '123',
        name: 'Santiago'
    }
} */
const initialState = {
    isLoadingEvents: true,
    events: [],
    activeEvent: null
}

export const calendarSlice = createSlice({
    name: 'calendar',
    initialState,
    reducers: {
        setActiveEvent: (state, { payload }) => {
            state.activeEvent = payload
        },
        onAddNewEvent: (state, { payload }) => {
            state.events.push(payload)
            state.activeEvent = null
        },
        onUpdateEvent: (state, { payload }) => {
            state.events = state.events.map(event => {
                if (event.id === payload.id) {
                    return payload
                }

                return event
            })
        },
        onDeleteEvent: (state) => {
            state.events = state.events.filter(event => event.id !== state.activeEvent.id)
            state.activeEvent = null
        },
        onLoadEvents: (state, { payload = [] }) => {
            payload.forEach(evento => {
                const existeEvento = state.events.some(dbEvent => dbEvent.id === evento.id)
                if (!existeEvento) {
                    state.events.push(evento)
                }
            });
            state.isLoadingEvents = false
        },
        onClearAllInformation: (state) => {
            state.isLoadingEvents = false,
            state.events = [],
            state.activeEvent = null
        }

    },
})

// Action creators are generated for each case reducer function
export const { setActiveEvent, onAddNewEvent, onUpdateEvent, onDeleteEvent,
    onLoadEvents,onClearAllInformation } = calendarSlice.actions


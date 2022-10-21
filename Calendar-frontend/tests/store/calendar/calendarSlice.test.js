import { calendarSlice, onAddNewEvent, onClearAllInformation, onDeleteEvent, onLoadEvents, setActiveEvent } from "../../../src/store/calendar/calendarSlice"
import { calendarWithActiveEventState, calendarWithEventsState, events, initialState, newEvent } from "../../fixtures/calendarStates"

describe('Pruebas en calendarSlice', () => { 
    
    test('debe de regresar el estado por defecto', () => { 
        
        const state = calendarSlice.getInitialState()

        expect(state).toEqual(initialState)



     })

     test('setActiveEvent debe de actiavr el evento', () => { 
        
        const state = calendarSlice.reducer(calendarWithEventsState, setActiveEvent(events[0]));


        expect(state.activeEvent).toEqual(events[0])

      })

      test('debe de agregar el newEvent a los events', () => { 
        
        const state = calendarSlice.reducer(calendarWithEventsState, onAddNewEvent(newEvent))
        
        expect(state.events.length).toEqual(3)


       })
       test('onDeleteEvent debe de borrar el evento activo', () => { 
        
        const state = calendarSlice.reducer(calendarWithActiveEventState, onDeleteEvent(calendarWithActiveEventState))

       
        expect(state.activeEvent).toEqual(null)
        
        


       })
       test('onLoadEvents debe de establecer los eventos', () => { 

        const state = calendarSlice.reducer(calendarWithEventsState, onLoadEvents(events))

        expect(state.events).toEqual(events)
      

       })
       test('onLogoutCalendar debe de limpiar el estado',  () => { 
        
       
        const state = calendarSlice.reducer(calendarWithActiveEventState, onClearAllInformation())

        expect(state).toEqual({ isLoadingEvents: false, events: [], activeEvent: null })

       })


 })
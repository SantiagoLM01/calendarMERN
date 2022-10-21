

export const events = [

    {
        id: 1,
        title: 'Partido de futbol',
        notes: 'Ganar 3-0',
        start: new Date('2022-10-21 13:00:00'),
        end: new Date('2022-10-21 15:00:00'),


    },
    {
        id: 2,
        title: 'Cumpleanos de melissa',
        notes: 'melissa',
        start: new Date('2022-11-09 13:00:00'),
        end: new Date('2022-11-09 15:00:00'),


    }


]

export const initialState = {
    isLoadingEvents: true,
    events: [],
    activeEvent: null
}


export const calendarWithEventsState = {
    isLoadingEvents: false,
    events: [...events],
    activeEvent: null
}

export const calendarWithActiveEventState = {
    isLoadingEvents: false,
    events: [...events],
    activeEvent: { ...events[0] }
}

export const newEvent = {
    id: 3,
    title: 'Hooligans Ale',
    notes: 'Cumple',
    start: new Date('2022-10-21 13:00:00'),
    end: new Date('2022-10-21 15:00:00'),


}
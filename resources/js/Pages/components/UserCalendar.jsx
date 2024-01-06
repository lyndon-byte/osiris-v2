import { Calendar, globalizeLocalizer } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import 'react-big-calendar/lib/sass/styles.scss';
import globalize from 'globalize'
import { useState, useCallback ,useRef,useEffect } from 'react';

const localizer = globalizeLocalizer(globalize)
const eventsList = [

    {
        title: 'Workday',
        start: new Date(2024,0,7),
        end: new Date(2024,0,7),
        allDay: true,
        
    }
    
];

function UserCalendar(){

    const clickRef = useRef(null)

    const eventPropGetter = useCallback(
        (event) => ({
          ...(event.title.includes('Workday') && {
              style: {

                    backgroundColor: '#ffcc00',
                    color: 'black',
                    height: "100px",
                    borderRadius: "0",
                    fontSize: "14px"
              },
          }),
        }),
        []
    )
    

     useEffect(() => {
    
    return () => {
      window.clearTimeout(clickRef?.current)
    }
    }, [])

    const handleSelectSlot = useCallback((slotInfo) => {
        
        

        window.clearTimeout(clickRef?.current)
        clickRef.current = window.setTimeout(() => {
            console.log(slotInfo)
        }, 250)
    }, [])

    return (
        <>
            <div className='mt-4 mb-5' >
                <Calendar
                localizer={localizer}
                events={eventsList}
                startAccessor="start"
                endAccessor="end"
                timeslots={4}
                eventPropGetter={eventPropGetter}
                style={{ height: 500 }}
                onSelectSlot={handleSelectSlot}
                onSelectEvent={(eventdetails) => {

                    console.log(eventdetails)
                }}
                selectable
                />
            </div>

        </>
    );
    

}





export default UserCalendar
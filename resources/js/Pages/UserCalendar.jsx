import { Calendar, globalizeLocalizer } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import 'react-big-calendar/lib/sass/styles.scss';
import globalize from 'globalize'
import { useState, useCallback ,useRef,useEffect } from 'react';
import { usePage } from '@inertiajs/react';

const localizer = globalizeLocalizer(globalize)


function UserCalendar(){


    
        
    const restday1 = usePage().props.jobscheduledata

    const restday2 = usePage().props.jobscheduledata
        
    console.log(restday1)
   

    const [restDaysThisYear,setRestDaysThisYear] = useState([])

    const clickRef = useRef(null)



    useEffect(() => {
       
      
            if(restday1){

                const getAllRestDays = (year) => {
        
                    const result = [];
                    const currentDate = new Date(year, 0, 1);
                
                    while (currentDate.getFullYear() === year) {
                    if (currentDate.getDay() == restday1.restday1 || currentDate.getDay() == restday2.restday2) {
                        
                        result.push(currentDate.toISOString().split('T')[0]);
                    }
                    currentDate.setDate(currentDate.getDate() + 1);
                    }
                
                    return result;
                }
                
                const currentYear = new Date().getFullYear();
                const specificRestDays = getAllRestDays(currentYear);
                
                setRestDaysThisYear(specificRestDays);

            }

       
          
         

    },[])

    const eventPropGetter = useCallback(
        (event) => ({
          ...(event.title.includes('Rest Day') && {
              style: {

                    backgroundColor: '#ffcc00',
                    color: 'black',
                    height: "60px",
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
                events={
                    restDaysThisYear.map(event => ({
                        title: 'Rest Day',
                        start: event,
                        end: event,
                        allDay: true,
                    }))
                }
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
                view='month' views={['month']}
                />
            </div>

        </>
    );
    

}





export default UserCalendar
import { Calendar, globalizeLocalizer } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import 'react-big-calendar/lib/sass/styles.scss';
import globalize from 'globalize'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

import { useState, useCallback ,useRef,useEffect } from 'react';
import { usePage } from '@inertiajs/react';

const localizer = globalizeLocalizer(globalize)


function EmployeeCalendar(){


    const clickRef = useRef(null)
    
    const [slotInformation,setSlotInformation] = useState('')

    const [year,setYear] = useState(0);
    const [month,setMonth] = useState(0);
    const [day,setDay] = useState(0);

    const [showModalAddTimeOffRequest,setShowModalAddTimeOffRequest] = useState(false)
    
    useEffect(() => {
       
        
            
                
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
          ...(event.title.includes('Work Day') && {
            style: {

                  backgroundColor: '#FF5733',
                  color: 'white',
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

    const handleSelectSlot = (slot) => {

        setYear(slot.start.getFullYear())
        setMonth(slot.start.getMonth())
        setDay(slot.start.getUTCDay())

        console.log(year)
        console.log(month)
        console.log(slot.start.getUTCDay())

        console.log(slot)
    }        
      



    const events = [
        
        {

            title: 'Work Day',
            start: setSlotInformation,
            end:   slotInformation,

        },

          
        {

            title: 'Rest Day',
            start: new Date(2024,0,5),
            end: new Date(2024,0,5),

        }


    ]
    
    useEffect(() =>{

        

    },[])

    const handleCloseShowModalAddTimeOffRequest = () => {

        setShowModalAddTimeOffRequest(false)

    }

    return (

        <> 
                 <Modal
                    show={showModalAddTimeOffRequest}
                    onHide={handleCloseShowModalAddTimeOffRequest}
                    backdrop="static"
                    keyboard={false}
                    >
                    <Modal.Header closeButton>
                   
                    </Modal.Header>
                    <Modal.Body style={{fontSize: "14px"}} className="text-center">
                            
                         
                         
                            {

                               slotInformation

                            }
                    
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="dark rounded-1" style={{fontSize: "14px"}} onClick={handleCloseShowModalAddTimeOffRequest}>
                            Understood
                        </Button>
                   
                    </Modal.Footer>
                </Modal>
            <div className='mt-4 mb-5' >
                <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                timeslots={4}
                eventPropGetter={eventPropGetter}
                style={{ height: 500 }}
                onSelectSlot={handleSelectSlot}
                onSelectEvent={(eventdetails) => {

                    console.log(eventdetails.start.getDate())
                }}
                selectable
                view='month' views={['month']}
                />
            </div>

        </>
    );
    

}





export default EmployeeCalendar
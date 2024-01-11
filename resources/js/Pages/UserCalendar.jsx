import { Calendar, globalizeLocalizer } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import 'react-big-calendar/lib/sass/styles.scss';
import globalize from 'globalize'
import { useState, useCallback ,useRef,useEffect } from 'react';
import { usePage } from '@inertiajs/react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios'

const localizer = globalizeLocalizer(globalize)


function UserCalendar(){


    const [eventSlotDetails,setEventSlotDetails] = useState([])

    const [eventSlotTitle,setEventSlotTitle] = useState('')

    const [eventSlotDate,setEventSlotDate] = useState('')
    
    const [eventStatus,setEventStatus] = useState('');
    
    const employeebasicinfo = usePage().props.userbasicinfo

    const [primaryid,setprimaryid] = useState('')
    
    const startdate = usePage().props.companydetails

    const workdays = usePage().props.employeecalendar

    const [seconds,setSeconds] = useState(0)

    
    const clickRef = useRef(null)

    const [showModalAddTimeOffRequest,setShowModalAddTimeOffRequest] = useState(false)

    const eventPropGetter = useCallback(
            (event) => ({
            ...(event.title.includes('Rest Day') && {
                style: {

                        backgroundColor: '#ffcc00',
                        color: 'black',
                        height: "50px",
                        borderRadius: "0",
                        fontSize: "14px"
                },
            }),
                ...(event.title.includes('Work Day') && {
                    style: {

                        backgroundColor: '#FF5733',
                        color: 'white',
                        height: "50px",
                        borderRadius: "0",
                        fontSize: "14px"
                    },
                }),
                ...(event.title.includes('Sick Leave') && {
                    style: {

                        backgroundColor: '#0d6efd',
                        color: 'white',
                        height: "50px",
                        borderRadius: "0",
                        fontSize: "14px"
                    },
                }),
                ...(event.title.includes('Late') && {
                    style: {

                        backgroundColor: '#17a2b8', 
                        color: 'white',
                        height: "50px",
                        borderRadius: "0",
                        fontSize: "14px"
                    },
                }),
                ...(event.title.includes('Absent') && {
                    style: {

                        backgroundColor: '#dc3545', 
                        color: 'white',
                        height: "50px",
                        borderRadius: "0",
                        fontSize: "14px"  
                    },
                }),
                ...(event.title.includes('Vacation') && {
                    style: {

                        backgroundColor: '#343a40', 
                        color: 'white',
                        height: "50px",
                        borderRadius: "0",
                        fontSize: "14px"  
                    },
                }),
                ...(event.title.includes('Present') && {
                    style: {

                        backgroundColor: '#28a745', 
                        color: 'white',
                        height: "50px",
                        borderRadius: "0",
                        fontSize: "14px" 

                    },
                }),
        }),
        []
    )

    
    useEffect(() =>{

        if(employeebasicinfo){

            setprimaryid(employeebasicinfo[0].id)
            
        }
        

    },[])

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

    const handleCloseShowModalAddTimeOffRequest = () => {

        setShowModalAddTimeOffRequest(false)

    }
    
   const handleModifyEvent = async () => {

      try{

        await axios.post('/changevent',{primaryid,eventStatus,eventSlotTitle,eventSlotDate})
            .then(() =>{

                showToastMessage();
                       
                setInterval(() => {
                       
                    setSeconds(seconds => seconds + 1);
                    
                }, 1000);

            })

      }catch(error){

        console.log(error)

      }


   }

    useEffect(() =>{

        console.log(seconds)
        if(seconds == 2){

            window.location.reload()

        }
    },[seconds])

   const showToastMessage = () => {

        toast.info("Saving changes", {
            position: toast.POSITION.TOP_RIGHT,
        })

   };

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
                    <Modal.Body style={{fontSize: "14px"}} className="p-5">
                        <h6 className="mb-3">Current Status: {eventSlotDetails.title}</h6>
                        <select onChange={(e) => {setEventStatus(e.target.value)}} className="form-select rounded-1" aria-label="Default select example">
                            <option selected>Open this select menu</option>
                            <option value="Present">Present</option>
                            <option value="Absent">Absent</option>
                            <option value="Sick Leave">Sick Leave</option>
                            <option value="Late">Late</option>
                            <option value="Work Day">Work Day</option>
                            <option value="Vacation">Vacation</option>
                            <option value="Rest Day OT">Rest Day OT</option>
                        </select>
                            
                         
                    
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="dark rounded-1" style={{fontSize: "14px"}} onClick={handleModifyEvent} >
                            Push Changes
                        </Button>
                   
                    </Modal.Footer>
            </Modal>

            <div className='mt-4 mb-5' >
                <Calendar
                localizer={localizer}
                events={
                    workdays.map(event => ({
                        title: event.title,
                        start: event.event_date,
                        end: event.event_date,
                        allDay: true,
                    }))
                }
                defaultDate={ startdate ? startdate.startdate : ''}
                startAccessor="start"
                endAccessor="end"
                timeslots={4}
                eventPropGetter={eventPropGetter}
                style={{ height: 500 }}
                onSelectSlot={handleSelectSlot}
                onSelectEvent={(eventdetails) => {

                    setShowModalAddTimeOffRequest(true)
                    setEventSlotTitle(eventdetails.title)
                    setEventSlotDate(eventdetails.start)
                }}
                selectable
                view='month' views={['month']}
                />
            </div>

        </>
    );
    

}





export default UserCalendar
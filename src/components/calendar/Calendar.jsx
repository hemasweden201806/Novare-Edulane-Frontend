const calendarURL = 'https://calendar.google.com/calendar/u/0/r'

function Calendar(){
    return (
        window.open(calendarURL,"_blank")       
    )
}

export default Calendar;
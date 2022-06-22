import React, { useEffect, useState } from "react"
import { useHistory } from 'react-router-dom'
import { getEvents, deleteEvent, leaveEvent, joinEvent } from "./EventManager.js"
import { EventCard } from "./EventCard.js"
import "./Event.css"

export const EventList = (props) => {
    const [ events, setEvents ] = useState([]);
    const history = useHistory()

    useEffect(() => {
        getEvents().then(data => setEvents(data))
    }, [])

    const delEvent = (eventId) => {
        deleteEvent(eventId)
            .then(() => getEvents().then(setEvents));
    }

    const leaveAnEvent = (eventId) => {
        leaveEvent(eventId).then(getEvents().then(data => setEvents(data)))
    }

    const joinAnEvent = (eventId) => {
        joinEvent(eventId).then(getEvents().then(data => setEvents(data)))
    }


    return (
        <article className="events">
            <h2>List of Events</h2>
            <button className="btn" id="createEventBtn"
                onClick={() => {
                    history.push({ pathname: "/events/new" })
                }}
            >Register New Event</button>
            {events.map(event => 
                
                <EventCard
                key={event.id}
                event={event}
                delEvent={delEvent}
                leaveAnEvent={leaveAnEvent}
                joinAnEvent={joinAnEvent} 
                />
            )}
        </article>
    )
}
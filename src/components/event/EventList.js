import React, { useEffect, useState } from "react"
import { useHistory } from 'react-router-dom'
import { getEvents } from "./EventManager.js"
import "./Event.css"

export const EventList = (props) => {
    const [ events, setEvents ] = useState([])
    const history = useHistory()

    useEffect(() => {
        getEvents().then(data => setEvents(data))
    }, [])


    return (
        <article className="events">
            <h2> Upcoming events</h2>
            {
                events.map(event => {
                    return <section key={`event--${event.id}`} className="event">
                        <div className="event__title"><strong>{event.game.title}</strong></div>
                        <div className="event__description"><em>{event.description}</em></div>


                        <div className="event__host"><strong>Hosted by:</strong> {event.organizer.user.username}</div>
                        <div className="event__players"><strong>Date:</strong> {event.date} </div>
                        <div className="event__skillLevel"><strong>Time:</strong> {event.time}</div>
                    </section>
                })
            }

            <button className="btn" id="createBtn"
                onClick={() => {
                    history.push({ pathname: "/events/new" })
                }}
            >Register New Event</button>
        </article>
    )
}
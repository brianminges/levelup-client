import React from "react";
import { Link } from "react-router-dom"


export const EventCard = ({event}) => {

    console.log(event)

    return (
    <section key={`event--${event.id}`} className="event">
    <div className="event__title">{event.game.title} by {event.organizer.user.username} </div>
    <div className="event__players"><em>{event.desciption}</em></div>
    <div className="event__skillLevel">Date: {event.date}</div>
    <div className="event__skillLevel">Time: {event.time}</div>
    <div className="buttons">
        <Link to={`events/${event.id}/update`}><button className="cardBtn">Edit</button> </Link>
        <Link to={`events/${event.id}`} ><button className="cardBtn">Details</button> </Link>
    </div>
    </section>
    
    )
}
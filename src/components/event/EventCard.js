import React from "react";
import { Link } from "react-router-dom"
import { leaveEvent, joinEvent, getEvents } from "./EventManager.js"
import "./Event.css"


export const EventCard = ({ event, delEvent, leaveAnEvent, joinAnEvent }) => {

    // const leaveAnEvent = (event) => {
    //     leaveEvent(event.id).then(getEvents).then(setEvents)
    // }

    // const joinAnEvent = (event) => {
    //     joinEvent(event.id).then(getEvents)
    // }


    console.log('this is event from event card', event)

    return (
        <>
    <section key={`event--${event.id}`} className="event">
        <div className="event__title">{event.game.title} by {event.organizer.user.username} </div>
        <div className="event__players"><em>{event.description}</em></div>
        <div className="event__skillLevel">Date: {event.date}</div>
        <div className="event__skillLevel">Time: {event.time}</div>
        <div className="buttons">
            <Link to={`events/${event.id}/update`}><button className="cardBtn">Edit</button> </Link>
            <Link to={`events/${event.id}`} ><button className="cardBtn">Details</button> </Link>
            <button 
                className="cardBtn"
                onClick={() => {
                    delEvent(event.id)

                }}>
            Delete
            </button>
            {
                event.joined ?
                    <button
                        className="cardBtn"
                        id="leaveBtn"
                        onClick={() => leaveAnEvent(event.id)}>Leave</button> 
                :
                    <button
                        className="cardBtn"
                        id="joinBtn"
                        onClick={() => joinAnEvent(event.id)}>Join</button>


            }
        </div>
    </section>
    </>
    )
}
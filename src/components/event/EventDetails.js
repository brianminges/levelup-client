import react, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getEventById } from "./EventManager"

export const EventDetails = () => {
    const {eventId} = useParams();

    const [ event, setEvent ] = useState({
        description: "",
        date: "",
        time: "",
        game: 0,
        organizer: 0 
    })

    const loadEvent = () => {
        return getEventById(eventId)
            .then(data => {
                setEvent(data)
            })
    }

    useEffect(() => {
        loadEvent()
        console.log(event)
    }, [])

    return (
        <>
        <section>
        <h2>{event.game.title}</h2>
        <p>Description: {event.description}</p>
        <p>Date: {event.date}</p>
        <p>Time: {event.time}</p> 
        </section>
        </> 
    )
}
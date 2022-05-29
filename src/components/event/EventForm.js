import React, { useState, useEffect } from "react"
import { useHistory, NavLink } from 'react-router-dom'
import { getEvents, createEvent } from "./EventManager"
import { getGames } from "./../game/GameManager"
import "./EventForm.css"

export const EventForm = () => {
    const history = useHistory()
    const [events, setEvents] = useState([])
    const [games, setGames ] = useState([])
    const [currentEvent, setCurrentEvent] = useState({
        game: 0,
        description: "",
        date: "",
        time: "",
        organizer: ""
    })

    const loadEvents = () => {
        return getEvents().then(data => {
            setEvents(data)
        })
    }
    
    useEffect(() => {
        loadEvents()
    }, [])

    const loadGames = () => {
        return getGames().then(data => {
            setGames(data)
        })
    }

    useEffect(() => {
        loadGames()
    }, [])

    const changeEventState = (domEvent) => {
        // TODO: Complete the onChange function
        const newEvent = {...currentEvent}
        let selectedVal = domEvent.target.value
        newEvent[domEvent.target.id] = selectedVal
        setCurrentEvent(newEvent)
        console.log('newEvent', currentEvent)
    }

    return (
        <form className="eventForm">
            <h2 className="eventForm__event">Register New Event</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="game">Select a game <span>or <NavLink to="/games/new"> click to create a new one </NavLink></span> </label>
                    <select 
                        className="form-control"
                        name="game" 
                        id="game"
                        required 
                        value={currentEvent.game}
                        onChange={changeEventState} >
                        <option value="0"></option>
                            {games.map(
                                game => (<option key={game.id} value={game.id}>{game.title}</option>)
                            )}
                    </select>
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Description: </label>
                    <input type="text" name="description" required className="form-control"
                        value={currentEvent.description}
                        onChange={changeEventState}
                        id="description"
                    />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="date">Date: </label>
                    <input type="date" name="date" required className="form-control"
                        value={currentEvent.date}
                        onChange={changeEventState}
                        id="date"
                    />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="time">Time: </label>
                    <input type="time" name="time" required className="form-control"
                        value={currentEvent.time}
                        onChange={changeEventState}
                        id="time"
                    />
                </div>
            </fieldset>

            <button type="submit"
                onClick={evt => {
                    // Prevent form from being submitted
                    evt.preventDefault()

                    const event = {
                        game: currentEvent.game,
                        description: currentEvent.description,
                        date: currentEvent.date,
                        time: currentEvent.time,
                        organizer: currentEvent.organizer
                    }

                    // Send POST request to your API
                    createEvent(event)
                        .then(() => history.push("/events"))
                }}
                className="btn btn-primary" 
                id="createBtn">Create</button>

        </form>
    )


}

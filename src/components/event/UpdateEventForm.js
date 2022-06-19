import react, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { getEventById, updateEvent } from './EventManager'

export const UpdateEventForm = () => {
    const history = useHistory();
    const {eventId} = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [ event, setEvent ] = useState({
        description: "",
        date: "",
        time: "",
        game: 0,
        organizer: 0 
    })

    const loadEvent = () => {
        getEventById(eventId)
            .then(data => {
                setEvent(data)
                setIsLoading(false);
                console.log(data)
            })
    }

    useEffect(() => {
        loadEvent()
    }, [])


    const handleFieldChange = (domEvent) => {
        const updatedEvent = {...event}
        let selectedVal = domEvent.target.value
        updatedEvent[domEvent.target.name] = selectedVal
        setEvent(updatedEvent)
        console.log(updatedEvent)
    }

    return (
        
        <>
        <form className="gameForm">
            <h2 className="gameForm__title">Update {event.game.title} event</h2>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Description: </label>
                    <input type="text" 
                        name="description" 
                        required autoFocus 
                        className="form-control"
                        value={event.description}
                        onChange={handleFieldChange}
                        id="description"
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="date">Date: </label>
                    <input type="date" 
                        name="date" required
                        className="form-control"
                        value={event.date}
                        onChange={handleFieldChange}
                        id="date"
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="time">Time: </label>
                    <input type="time" 
                        name="time" required  
                        className="form-control"
                        value={event.time}
                        onChange={handleFieldChange}
                        id="time"
                    />
                </div>
            </fieldset>

            <button type="submit"
                onClick={evt => {
                    // Prevent form from being submitted
                    evt.preventDefault()

                    // Changing to snake case to match back end
                    const editedEvent = {
                        id: event.id,
                        description: event.description,
                        date: event.date,
                        time: event.time,
                        game: parseInt(event.game.id),
                        organizer: parseInt(event.organizer)
                        
                    }

                    // Send POST request to your API
                    updateEvent(editedEvent)
                        .then(() => history.push('/events'))
                }}
                className="btn btn-primary" 
                id="createBtn">Update</button>
        </form>
        </>
    )
}
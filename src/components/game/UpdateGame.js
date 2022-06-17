import React, { useState, useEffect } from "react"
import { useHistory, useParams } from 'react-router-dom'
import { updateGame, getGameTypes, getGameById } from './GameManager.js'
import "./GameForm.css"

export const UpdateGameForm = () => {
    const history = useHistory();
    const [isLoading, setIsLoading] = useState(true);
    const {gameId} = useParams();

    //Sets game type dropdown on page load
    const [gameTypes, setGameTypes] = useState([]);

    const loadTypes = () => {
        return getGameTypes().then(data => {
            setGameTypes(data)
            console.log('gameTypes set', data)
        })
    }

    useEffect(() => {
        loadTypes()
    }, [])

    //Sets game to be edited on page load
    const [currentGame, setCurrentGame] = useState({
        game_type: "",
        title: "",
        maker: "",
        number_of_players: "",
        skill_level: ""
    })

    const loadGame = () => {
        getGameById(gameId)
            .then(data => {
                setCurrentGame(data)
                setIsLoading(false);
                console.log(data)
            })
    }
    
    useEffect(() => {
        loadGame()
    }, [])





    const handleFieldChange = (domEvent) => {
        const updatedGame = {...currentGame}
        let selectedVal = domEvent.target.value
        updatedGame[domEvent.target.name] = selectedVal
        setCurrentGame(updatedGame)
    }

    return (
        <form className="gameForm">
            <h2 className="gameForm__title">Update {currentGame.title}</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">Title: </label>
                    <input type="text" name="title" required autoFocus className="form-control"
                        value={currentGame.title}
                        onChange={handleFieldChange}
                        id="title"
                    />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="maker">Maker: </label>
                    <input type="text" name="maker" required className="form-control"
                        value={currentGame.maker}
                        onChange={handleFieldChange}
                        id="maker"
                    />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="numberOfPlayers">Number of Players: </label>
                    <input type="number" name="number_of_players" required className="form-control"
                        value={currentGame.number_of_players}
                        onChange={handleFieldChange}
                        id="numberOfPlayers"
                    />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="skillLevel">Skill Level: </label>
                    <input type="number" name="skill_level" required className="form-control"
                        value={currentGame.skill_level}
                        onChange={handleFieldChange}
                        id="skillLevel"
                    />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="game_type">Game Type: </label>
                    <select 
                        className="form-control"
                        name="game_type" 
                        id="game_type"
                        required 
                        value={currentGame.game_type.id}
                        onChange={handleFieldChange} >
                        <option defaultValue={currentGame.game_type}></option>
                            {gameTypes.map(
                                gameType => (<option key={gameType.id} value={gameType.id}>{gameType.label}</option>)
                            )}
                    </select>

                </div>
            </fieldset>

            <button type="submit"
                onClick={evt => {
                    // Prevent form from being submitted
                    evt.preventDefault()

                    // Changing to snake case to match back end
                    const editedGame = {
                        id: currentGame.id,
                        game_type: parseInt(currentGame.game_type),
                        title: currentGame.title,
                        maker: currentGame.maker,
                        number_of_players: parseInt(currentGame.number_of_players),
                        skill_level: parseInt(currentGame.skill_level)
                        
                    }

                    // Send POST request to your API
                    updateGame(editedGame)
                        .then(() => history.push('/games'))
                }}
                className="btn btn-primary" 
                id="createBtn">Update</button>
        </form>
    )
}
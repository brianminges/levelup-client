import React, { useState, useEffect } from "react"
import { useHistory, useParams } from 'react-router-dom'
import { updateGame, getGameTypes, 
    getGameById 
} from './GameManager.js'
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
        })
    }

    useEffect(() => {
        loadTypes()
    }, [])

    //Sets game to be edited on page load
    const [currentGame, setCurrentGame] = useState({
        gameTypeId: 0,
        title: "",
        maker: "",
        numberOfPlayers: 0,
        skillLevel: 1
    })

    const loadGame = () => {
        if (gameId) {
            getGameById(gameId)
                .then(data => {
                    setCurrentGame({
                        id: gameId,
                        gameTypeId: data.game_type.id,
                        title: data.title,
                        maker: data.maker,
                        numberOfPlayers: data.number_of_players,
                        skillLevel: data.skill_level
                    })
                })
        }
    }
    
    useEffect(() => {
        loadGame()
    }, [])

    useEffect(() => {
        console.log('currentGame', currentGame)
    }, [currentGame])




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
                    <input 
                        type="text" 
                        name="title" 
                        id="title"
                        required autoFocus 
                        className="form-control"
                        value={currentGame.title}
                        onChange={handleFieldChange}
                        
                    />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="maker">Maker: </label>
                    <input 
                        type="text" 
                        name="maker"
                        id="maker" 
                        required 
                        className="form-control"
                        value={currentGame.maker}
                        onChange={handleFieldChange}
                    />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="numberOfPlayers">Number of Players: </label>
                    <input 
                        type="number" 
                        name="number_of_players"
                        id="numberOfPlayers" 
                        required 
                        className="form-control"
                        value={currentGame.numberOfPlayers}
                        onChange={handleFieldChange}
                    />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="skillLevel">Skill Level: </label>
                    <input 
                        type="number" 
                        name="skill_level" 
                        id="skillLevel"
                        required 
                        className="form-control"
                        value={currentGame.skillLevel}
                        onChange={handleFieldChange}
                    />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="gameTypeId">Game Type: </label>
                    <select 
                        className="form-control"
                        name="gameTypeId"
                        id="game_type"
                        required 
                        value={currentGame.gameTypeId}
                        onChange={handleFieldChange} >
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
                        // id: gameId,
                        game_type: parseInt(currentGame.gameTypeId),
                        title: currentGame.title,
                        maker: currentGame.maker,
                        number_of_players: parseInt(currentGame.numberOfPlayers),
                        skill_level: parseInt(currentGame.skillLevel)
                    }
                    
                    // Send POST request to your API
                    updateGame(editedGame, gameId)
                        .then(() => history.push('/games'))
                }}
                className="btn btn-primary" 
                id="createBtn">Update</button>
        </form>
    )
}
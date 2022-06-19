import React, { useState, useEffect } from "react"
import { useHistory } from 'react-router-dom'
import { createGame, getGameTypes } from './GameManager.js'
import "./GameForm.css"

export const GameForm = () => {
    const history = useHistory()
    const [gameTypes, setGameTypes] = useState([])

    /*
        Since the input fields are bound to the values of
        the properties of this state variable, you need to
        provide some default values.
    */
    const [currentGame, setCurrentGame] = useState({
        skillLevel: 1,
        numberOfPlayers: 0,
        title: "",
        maker: "",
        gameTypeId: 0
    })

    // Added this
    const getTypes = () => {
        return getGameTypes().then(data => {
            setGameTypes(data)
        })
    }

    useEffect(() => {
        // TODO: Get the game types, then set the state
        getTypes()
    }, [])



    const changeGameState = (domEvent) => {
        // TODO: Complete the onChange function
        const newGame = {...currentGame}
        let selectedVal = domEvent.target.value
        newGame[domEvent.target.id] = selectedVal
        setCurrentGame(newGame)
    }

    return (
        <form className="gameForm">
            <h2 className="gameForm__title">Register New Game</h2>
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
                        onChange={changeGameState}
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
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="numberOfPlayers">Number of Players: </label>
                    <input 
                        type="text" 
                        name="numberOfPlayers" 
                        id="numberOfPlayers"
                        required 
                        className="form-control"
                        value={currentGame.numberOfPlayers}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="skillLevel">Skill Level: </label>
                    <input 
                        type="number" 
                        name="skillLevel" 
                        id="skillLevel"
                        required 
                        className="form-control"
                        value={currentGame.skillLevel}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="gameTypeId">Game Type: </label>
                    <select 
                        className="form-control"
                        name="gameTypeId" 
                        id="gameTypeId"
                        required 
                        value={currentGame.gameTypeId}
                        onChange={changeGameState} >
                        <option value="0">Please select ...</option>
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
                    const newGame = {
                        id: currentGame.id,
                        maker: currentGame.maker,
                        title: currentGame.title,
                        number_of_players: parseInt(currentGame.numberOfPlayers),
                        skill_level: parseInt(currentGame.skillLevel),
                        game_type: parseInt(currentGame.gameTypeId)
                    }

                    // Send POST request to your API
                    createGame(newGame)
                        .then(() => history.push("/games"))
                }}
                className="btn btn-primary" 
                id="createBtn">Create</button>
        </form>
    )
}
import React, { useEffect, useState } from "react"
import { useHistory, useParams, Link } from 'react-router-dom'
import { getGames, deleteGame } from "./GameManager.js"
import { GameCard } from "./GameCard.js"
import "./Game.css"

export const GameList = (props) => {
    const [ games, setGames ] = useState([])
    const history = useHistory();
    const {gameId} = useParams();

    useEffect(() => {
        getGames().then(data => setGames(data))
    }, [])

    const delGame = (gameId) => {
        deleteGame(gameId)
            .then(() => getGames().then(setGames));
    }

    return (
        <article className="games">
            <h2>List of games</h2>
            <button className="btn" id="createBtn"
                onClick={() => {
                    history.push({ pathname: "/games/new" })
                }}
            >Register New Game
            </button>
            {games.map(game => 
                <GameCard
                key={game.id}
                game={game}
                delGame={delGame} />
            )}

            
        </article>
    )
}
import React, { useEffect, useState } from "react"
import { useHistory } from 'react-router-dom'
import { getGames } from "./GameManager.js"
import "./Game.css"

export const GameList = (props) => {
    const [ games, setGames ] = useState([])
    const history = useHistory()

    useEffect(() => {
        getGames().then(data => setGames(data))
    }, [])

    return (
        <article className="games">
            

            <h2>List of games</h2>
            {
                games.map(game => {
                    return <section key={`game--${game.id}`} className="game">
                        <div className="game__title">{game.title} by {game.maker}</div>
                        <div className="game__players">{game.number_of_players} players needed</div>
                        <div className="game__skillLevel">Skill level is {game.skill_level}</div>
                    </section>
                })
            }

            <button className="btn" id="createBtn"
                onClick={() => {
                    history.push({ pathname: "/games/new" })
                }}
            >Register New Game</button>
        </article>
    )
}
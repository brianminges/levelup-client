import React, { useEffect, useState } from "react"
import { useHistory, useParams, Link } from 'react-router-dom'
import { getGames } from "./GameManager.js"
import { GameCard } from "./GameCard.js"
import "./Game.css"

export const GameList = (props) => {
    const [ games, setGames ] = useState([])
    const history = useHistory();
    const {gameId} = useParams();

    useEffect(() => {
        getGames().then(data => setGames(data))
    }, [])

    // return (
    //     <article className="games">
            

    //         <h2>List of games</h2>
    //         {
    //             games.map(game => {
    //                 return <section key={`game--${game.id}`} className="game">
    //                     <div className="game__title">{game.title} by {game.maker}</div>
    //                     <div className="game__players">{game.number_of_players} players needed</div>
    //                     <div className="game__skillLevel">Skill level is {game.skill_level}</div>
    //                     <button onClick={() => {
    //                         history.push({ pathname: `/games/${gameId}/update` })
    //                     }}>Edit</button>
    //                 </section>
    //             })
    //         }

    //         <button className="btn" id="createBtn"
    //             onClick={() => {
    //                 history.push({ pathname: "/games/new" })
    //             }}
    //         >Register New Game</button>
    //     </article>
    // )

    return (
        <article className="games">
            <h2>List of games</h2>
            <button className="btn" id="createBtn"
                onClick={() => {
                    history.push({ pathname: "/games/new" })
                }}
            >Register New Game</button>
            {games.map(game => 
                <GameCard
                key={game.id}
                game={game} />
            )}

            
        </article>
    )
}
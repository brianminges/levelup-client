import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import { getGameById } from "./GameManager"
import "./GameCard.css"

export const GameDetails = () => {
    const {gameId} = useParams();

    const [ game, setGame ] = useState({
        game_type: "",
        title: "",
        maker: "",
        number_of_players: "",
        skill_level: ""
    })

    const loadGame = () => {
        return getGameById(gameId)
            .then(data => {
                setGame(data)
            })
    }

    useEffect(() => {
        loadGame()
    }, [])

    return (
        <>
        <section>
        <h2>{game.title}</h2>
        <p>Maker: {game.maker}</p>
        <p>Players: {game.number_of_players}</p>
        <p>Skill level: {game.skill_level}</p> 
        </section>
        </> 
    )
}
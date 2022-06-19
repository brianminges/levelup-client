import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import { getGameById } from "./GameManager"
import "./GameCard.css"

export const GameDetails = () => {
    const {gameId} = useParams();

    const [ gameDetail, setGameDetail ] = useState({
        game_type: "",
        title: "",
        maker: "",
        number_of_players: "",
        skill_level: ""
    })

    const loadGame = () => {
        return getGameById(gameId)
            .then(data => {
                setGameDetail(data)
            })
    }

    useEffect(() => {
        loadGame()
        console.log(gameDetail)
    }, [])

    return (
        <>
        <section>
        <h2>{gameDetail.title}</h2>
        <p>Maker: {gameDetail.maker}</p>
        <p>Players: {gameDetail.number_of_players}</p>
        <p>Skill level: {gameDetail.skill_level}</p> 
        </section>
        </> 
    )
}
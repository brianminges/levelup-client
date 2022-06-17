import React from "react";
import { Link } from "react-router-dom"
import "./GameCard.css"

export const GameCard = ({game}) => {

    return (
    <section key={`game--${game.id}`} className="game">
    <div className="game__title">{game.title} by {game.maker}</div>
    <div className="game__players">{game.number_of_players} players needed</div>
    <div className="game__skillLevel">Skill level is {game.skill_level}</div>
    <div className="buttons">
        <Link to={`games/${game.id}/update`}><button className="cardBtn">Edit</button> </Link>
        <Link to={`games/${game.id}`} ><button className="cardBtn">Details</button> </Link>
    </div>
    </section>
    
    )
}
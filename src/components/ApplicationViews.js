import React from "react"
import { Route } from "react-router-dom"
import { GameList } from "./game/GameList"
import { EventList } from "./game/EventList"

export const ApplicationViews = () => {
    return <>
        <main style={{
            margin: "5rem 2rem",
            lineHeight: "1.75rem"
        }}>
            <Route exact path="/">
                <GameList />
            </Route>
            <Route exact path="/events">
                <EventList />
            </Route>
        </main>
    </>
}
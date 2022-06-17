import React from "react"
import { Route } from "react-router-dom"
import { GameList } from "./game/GameList"
import { GameForm } from "./game/GameForm"
import { UpdateGameForm } from "./game/UpdateGame"
import { EventList } from "./event/EventList"
import { EventForm } from "./event/EventForm"
import { GameDetails } from "./game/GameDetails"
import { UpdateEventForm } from "./event/UpdateEvent"
import { EventDetails } from "./event/EventDetails"

export const ApplicationViews = () => {
    return <>
        <main style={{
            margin: "5rem 2rem",
            lineHeight: "1.75rem"
        }}>
            <Route exact path={["/", "/games"]}>
                <GameList />
            </Route>
            <Route exact path="/games/new">
                <GameForm />
            </Route>
            <Route exact path="/games/:gameId/update">
                <UpdateGameForm />
            </Route>
            <Route exact path="/games/:gameId">
                <GameDetails />
            </Route>
            <Route exact path="/events">
                <EventList />
            </Route>
            <Route exact path="/events/new">
                <EventForm />
            </Route>
            <Route exact path="/events/:eventId/update">
                <UpdateEventForm />
            </Route>
            <Route exact path="/events/:eventId">
                <EventDetails />
            </Route>
        </main>
    </>
}
module Home exposing (view)

import Accessibility exposing (..)
import Html as H
import Html.Attributes as HA


view : Html msg
view =
    H.node "html"
        [ HA.lang "EN" ]
        [ H.node "head"
            []
            [ H.node "title" [] [ text "Elmsinki - the Helsinki Elm Meetup" ]
            , H.node "link" [ HA.rel "stylesheet", HA.href "style.css" ] []
            ]
        , H.node "body"
            []
            [ main_ []
                [ h1 [] [ text "Elmsinki" ]
                , p [] [ text "Hello, this is website." ]
                ]
            ]
        ]

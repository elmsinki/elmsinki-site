module Home exposing (main, view)

import Accessibility exposing (..)
import Html as H
import Html.Attributes exposing (..)
import Markdown


main =
    view


ingress : Markdown
ingress =
    Markdown """

Elmsinki is the Helsinki Elm Meetup.
[Elm](https://elm-lang.org) is a delightful language for building reliable webapps.

We welcome everyone in the meetups. There is no need to know Elm, we only expect you to be willing to learn!

"""


missionStatement : Markdown
missionStatement =
    Markdown """

## Mission statement

We want to foster a welcoming and inclusive community of people who like to learn Elm, work with Elm or help others learn Elm.

"""


view : Html msg
view =
    document
        { title = "Elmsinki - the Helsinki Elm Meetup"
        , content =
            h1 [ class "headline" ] [ text "Elmsinki" ]
                :: List.map sectionFromMarkdown [ ingress, missionStatement ]
        }


type Markdown
    = Markdown String


sectionFromMarkdown : Markdown -> Html msg
sectionFromMarkdown (Markdown mdString) =
    section [] (Markdown.toHtml Nothing mdString)


document : { title : String, content : List (Html msg) } -> Html msg
document { title, content } =
    H.node "html"
        [ lang "EN" ]
        [ H.node "head"
            []
            [ H.node "title" [] [ text title ]
            , H.node "link" [ rel "stylesheet", href "style.css" ] []
            ]
        , H.node "body" [] [ main_ [] content ]
        ]

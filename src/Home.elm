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

## Where we want to be

We want to foster a welcoming and inclusive community of people who like to learn Elm, work with Elm or help others learn Elm.

- **Collaboration** We would like for the meetups to become a nice way to work on your own Elm-related projects in the company of other likeminded people.
A space of collaboration, communication, and community. We will still have talks, but those shouldn't be the main focus of the events.
- **Anyone is a speaker** You don't need to present if you don't feel like it. But if you have a hobby project you've been working on,
or a solution to a specific problem, just bring it up with the organizers and we'll figure out a nice format for you!
- **Not just traditional talks** It takes a considerable amount of time to prepare and rehearse a traditional talk. We want to keep
the barrier of entry as low as possible, and as such, welcome presentations that could be for example:
    - Show an article/blog post/idea you've come across (e.g. 5 minutes)
    - Show your code: quickly explain what you've built by showing the end result and a little bit of code
    - Inverted talk: pull up a chair and have the "panel" in front of you answer tricky questions
    - Tell what you are working on — in your own words, no slides or preparation necessary
    - Slide-deck talk — these are welcome too!


In a nutshell collaboration, coding, and feeling part of a group is the main focus of these events.

"""


codeOfConduct : Markdown
codeOfConduct =
    Markdown """

## Code of Conduct

All attendees, speakers, sponsors, and volunteers at Elmsinki events are required to agree with and follow the code of conduct.

Elmsinki is dedicated to providing harassment-free community events for everyone, regardless of gender identity,
sexual orientation, disability, physical appearance, body size, race, or religion. We do not tolerate harassment of
event participants in any form. Sexual language and imagery is not appropriate for any meetup venue.

Harassment includes offensive verbal comments, sexual images in public spaces, deliberate intimidation, stalking,
following, harassing photography or recording, sustained disruption of talks or other events, inappropriate physical contact,
and unwelcome sexual attention. Participants asked to stop any harassing behavior are expected to comply immediately.

If a participant engages in harassing behavior, the meetup organizers may take any action they deem appropriate,
including warning the offender or immediate expulsion from the event. If you are being harassed, notice that someone
else is being harassed, or have any other concerns, please contact an organizer immediately.
The organizers will help participants contact security or local law enforcement, provide escorts, or otherwise assist those
experiencing harassment to feel safe for the duration of the event. We value your attendance.

We expect participants to follow these rules at all meetup venues and other Elmsinki-related social events.

If an incident occurs please use the following contact information.

**Ossi Hanhinen:** [ossi.hanhinen@gmail.com](mailto:ossi.hanhinen@gmail.com)

**Fotis Papadogeorgopoulos:** [fgpapado@gmail.com](mailto:fgpapado@gmail.com)



_Adapted from [the Strange Loop Code of Conduct](https://www.thestrangeloop.com/policies.html)._

"""


organizers =
    [ { name = "Ossi Hanhinen"
      , twitter = "ohanhi"
      , github = "ohanhi"
      , elmSlack = "ohanhi"
      , image = "ossi.jpg"
      }
    , { name = "Fotis Papadogeorgopoulos"
      , twitter = "isfotis"
      , github = "fpapado"
      , elmSlack = "fpapado"
      , image = "fotis.jpg"
      }
    ]


view : Html msg
view =
    document
        { title = "Elmsinki - the Helsinki Elm Meetup"
        , content =
            [ h1 [] [ text "Elmsinki" ] ]
                ++ List.map sectionFromMarkdown [ ingress, missionStatement, codeOfConduct ]
                ++ [ sectionFromOrganizers ]
        }


sectionFromOrganizers =
    section [ class "organizers" ]
        [ h2 [] [ text "Organizers" ]
        , div [ class "organizers-list" ] (List.map organizerView organizers)
        ]


organizerView organizer =
    article [ class "organizer" ]
        [ decorativeImg [ src ("asset/" ++ organizer.image), class "organizer-image" ]
        , h4 [] [ text organizer.name ]
        , table [ class "organizer-table" ]
            [ tbody []
                [ tr []
                    [ th [] [ text "Twitter" ]
                    , td [] [ a [ href ("https://twitter.com/" ++ organizer.twitter) ] [ text organizer.twitter ] ]
                    ]
                , tr []
                    [ th [] [ text "GitHub" ]
                    , td [] [ a [ href ("https://github.com/" ++ organizer.github) ] [ text organizer.github ] ]
                    ]
                , tr [] [ th [] [ text "Slack" ], td [] [ text organizer.elmSlack ] ]
                ]
            ]
        ]


type Markdown
    = Markdown String


sectionFromMarkdown : Markdown -> Html msg
sectionFromMarkdown (Markdown mdString) =
    section [] (Markdown.toHtml Nothing mdString)


document : { title : String, content : List (Html msg) } -> Html msg
document { title, content } =
    let
        attr =
            Html.Attributes.attribute

        meta pairs =
            H.node "meta" (List.map (\( key, value ) -> Html.Attributes.attribute key value) pairs) []
    in
    H.node "html"
        [ lang "EN" ]
        [ H.node "head"
            []
            [ meta [ ( "charset", "utf-8" ) ]
            , meta [ ( "name", "viewport" ), ( "content", "width=device-width, initial-scale=1.0" ) ]
            , H.node "title" [] [ text title ]
            , H.node "link" [ rel "stylesheet", href "style.css" ] []
            ]
        , H.node "body" [] [ main_ [] content ]
        ]

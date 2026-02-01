# Play Framework + Knockout.js

A minimal web app using [Play Framework](https://www.playframework.com/) (Scala) and [Knockout.js](https://knockoutjs.com/) for reactive UI.

## Prerequisites

- [Java 11+](https://adoptium.net/)
- [sbt](https://www.scala-sbt.org/download.html) (e.g. via [sbt-extras](https://github.com/paulp/sbt-extras) or SDKMAN)

## Run

```bash
cd play-knockout
sbt run
```

Open [http://localhost:9000](http://localhost:9000).

## What’s in it

- **Play**: Serves the page and static assets; one route for the home page.
- **Knockout.js**: Binds a simple view model so that:
  - Typing in “Your name” updates the greeting.
  - You can add/remove items in a list.

## Project layout

- `app/controllers/` — Play controller
- `app/views/` — Twirl HTML templates
- `conf/routes` — URL routing
- `public/javascripts/app.js` — Knockout view model and bindings
- `public/stylesheets/main.css` — Styles

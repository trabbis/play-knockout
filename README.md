# Play Framework + Knockout.js

A minimal web app using [Play Framework](https://www.playframework.com/) (Java) and [Knockout.js](https://knockoutjs.com/) for reactive UI.

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

## Debugging

### Backend (Java / Play)

The build is set up so **`sbt run`** always starts the JVM with a debug port (9999). No special command needed.

1. **Start the app** (as usual):
   ```bash
   sbt run
   ```
   Wait until the server is ready.

2. **Attach from Cursor/VS Code**
   - Install the **Debugger for Java** extension if you don’t have it.
   - Set breakpoints in Java files (e.g. `app/controllers/HomeController.java`).
   - Run → **Start Debugging** (or F5), choose **“Attach to Play”**.
   - Trigger the code (e.g. open http://localhost:9000). Execution should stop at your breakpoints.

### Frontend (JavaScript / Knockout)

- **Browser DevTools**
  - Open http://localhost:9000, then **F12** (or right‑click → Inspect).
  - **Sources** tab: open `localhost:9000` → `assets` → `javascripts` → `app.js`, then click a line number to set a breakpoint.
  - **Console**: run `ko.dataFor(document.body)` to inspect the Knockout root view model.
- Reload or interact with the page; breakpoints in `app.js` will hit when that code runs.

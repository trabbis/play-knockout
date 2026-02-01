# Step-by-step: Debug the Java app in Cursor

Follow these steps in order. Do not skip steps.

---

## Step 1: Open the project folder

- In Cursor, use **File → Open Folder**.
- Open the **`play-knockout`** folder (the one that contains `build.sbt`).
- The Explorer should show `app`, `conf`, `public`, `build.sbt`, etc.

If you open the parent folder (`cursor-projects`) instead, the debugger may not find the right project.

---

## Step 2: Install the Java debugger (one time only)

1. Press **Ctrl+Shift+X** to open Extensions.
2. In the search box, type: **Debugger for Java**.
3. Install the extension by **Microsoft** (“Debugger for Java”).
4. If Cursor asks to install “Extension Pack for Java”, you can install it too (it includes the debugger).

---

## Step 3: Start the app with the debug port

You must start the app so it listens for a debugger on port **9999**.

**Option A – From the menu (no typing)**

1. **Terminal → Run Task…**
2. Choose **“Start Play (debug)”**.
3. A terminal will open and run `sbt -jvm-debug 9999 run`.
4. Wait until you see something like **“Listening for HTTP”** or **“Started server”** (can take a minute the first time).
5. Leave this terminal open; do not stop the process.

**Option B – From the terminal**

1. **Terminal → New Terminal**.
2. Run:
   ```bash
   cd play-knockout
   sbt -jvm-debug 9999 run
   ```
3. Wait for “Started server” / “Listening for HTTP”.
4. Leave the terminal running.

---

## Step 4: Set a breakpoint in Java

1. In the Explorer, open **`app/controllers/HomeController.java`**.
2. Find the line: `return ok(index.render());` (around line 18).
3. Click in the **gutter** (left of the line numbers) on that line. A **red dot** should appear = breakpoint.

---

## Step 5: Attach the debugger

1. Press **F5** (or **Run → Start Debugging**).
2. If you see “Select Environment”, choose **“Java”**.
3. In the list of configurations, choose **“Attach to Play”**.
4. Press Enter or click it.

The debugger should connect. The bottom status bar may show “Debug Console” and the call stack. If you see “Could not connect” or “Connection refused”, the app is not listening on 9999 yet — go back to Step 3 and wait for the server to fully start, then try F5 again.

---

## Step 6: Hit the breakpoint

1. Open a browser and go to: **http://localhost:9000**
2. Or, if the page is already open, **refresh** it (F5 or Ctrl+R).

The request will hit your controller. Cursor should **switch to the editor** and **pause on the red-dot line** in `HomeController.java`. You can:

- **F10** = Step Over (run one line).
- **F11** = Step Into (go into a method).
- **Shift+F11** = Step Out.
- **F5** = Continue (run until the next breakpoint).
- In the **Variables** panel (left), expand `this` and other items to inspect values.

---

## Checklist

- [ ] Opened the **`play-knockout`** folder (not the parent).
- [ ] Installed **Debugger for Java** (and optionally Extension Pack for Java).
- [ ] Started the app with **“Start Play (debug)”** or `sbt -jvm-debug 9999 run` and waited until the server was ready.
- [ ] Set a red-dot breakpoint in `HomeController.java` on `return ok(index.render());`.
- [ ] Pressed **F5** and chose **“Attach to Play”**.
- [ ] Opened or refreshed **http://localhost:9000** in the browser.

---

## If it still doesn’t stop at the breakpoint

1. **Confirm the app was started with debug:** You must use **“Start Play (debug)”** or `sbt -jvm-debug 9999 run`. Plain `sbt run` is not enough unless your build is set up to open the debug port (see README).
2. **Confirm you attached after the server was ready:** Wait for “Listening for HTTP” / “Started server”, then press F5.
3. **Confirm you’re in the right folder:** The folder that’s open in Cursor must be `play-knockout` (the one with `build.sbt` inside it).
4. **Try a different port:** If 9999 is in use, in `build.sbt` change `9999` to e.g. `5005`, and in `.vscode/launch.json` change `"port": 9999` to `"port": 5005`. Then use `sbt -jvm-debug 5005 run` (or a task with 5005).

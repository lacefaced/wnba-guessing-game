# Shared leaderboard setup

The shared leaderboard connects the games to a Google Sheet so every visitor sees
the same Top 10. One Google Sheet + one script serves **every game** — each game's
scores are kept separate by a `game` name (`legends`, `naming`, ...).

There is **no server, no database, and nothing that costs money.** Google runs the
small script for you and the Sheet is where the scores live.

If the leaderboard is already running and you're here to add a new game, skip to
**"Updating the script"** at the bottom.

---

## Part 1 - things only you can do (in a web browser)

### Step 1. Make the spreadsheet

1. Go to <https://sheets.google.com> and click the big **+ Blank spreadsheet**.
2. At the very top, where it says "Untitled spreadsheet", click and rename it to
   **WNBA Leaderboard**.
3. Look at the bottom-left corner. There is one tab called **Sheet1**.
   Double-click that tab name and change it to exactly:

   ```
   Scores
   ```

   (Capital S, no spaces. This must match or the script won't find it.)

4. You can leave the cells empty. The script fills in the header row itself the
   first time a score is saved.

### Step 2. Add the script

1. In that same spreadsheet, click the **Extensions** menu at the top, then
   **Apps Script**. A new tab opens with a code editor.
2. It shows a file called `Code.gs` with a few lines like
   `function myFunction() {}`. Click anywhere in that code area, select
   everything (Ctrl+A on Windows, Cmd+A on Mac), and delete it.
3. Open the file **`leaderboard.gs`** from this project, copy **everything** in
   it, and paste it into the empty Apps Script editor.
4. Click the **disk / Save** icon near the top (or Ctrl+S / Cmd+S).
5. Rename the Apps Script project if you like (click "Untitled project" at the
   top) - name doesn't matter.

### Step 3. Publish it as a Web App

1. In the Apps Script editor, click the blue **Deploy** button (top-right), then
   **New deployment**.
2. Click the gear icon next to "Select type" and choose **Web app**.
3. Fill in the box:
   - **Description:** `leaderboard` (anything is fine)
   - **Execute as:** **Me** (your email)
   - **Who has access:** **Anyone**  <- important, and it does say "Anyone",
     not "Anyone with Google account"
4. Click **Deploy**.
5. Google asks you to authorize. Click **Authorize access**, pick your Google
   account, and if you see a "Google hasn't verified this app" screen, click
   **Advanced** -> **Go to (your project name)** -> **Allow**. This is normal for
   your own scripts.
6. You'll get a **Web app URL** that ends in `/exec`. It looks like:

   ```
   https://script.google.com/macros/s/AKfy............../exec
   ```

7. Click **Copy** on that URL.

### Step 4. Send me the URL

Paste that `/exec` URL back to me in the chat and I'll drop it into the game.

If you'd rather do that last part yourself: open
[`guess-the-legend.html`](guess-the-legend.html), find the line near the bottom
that reads:

```js
const LEADERBOARD_URL = '';
```

and put the URL between the quotes:

```js
const LEADERBOARD_URL = 'https://script.google.com/macros/s/AKfy.../exec';
```

Save the file. That's the only change.

---

## Part 2 - what I do

- The game already has all the leaderboard code. With the URL filled in it
  switches from "save on this device" to "read and write the shared Top 10".
- Names are shown as plain text (no way for a submitted name to run code on the
  page), and the script also strips brackets and control characters and checks
  the score is a sane whole number before saving.

---

## Good to know

- **It's a public list with no logins.** Anyone determined can submit a silly
  name or a fake high score. If that happens: open the Sheet and delete the bad
  rows, or redo Step 3 to get a fresh URL and send me the new one.
- **Keep the Sheet to just this.** The script runs as your Google account, so
  don't reuse this deployment for anything else, and turn on 2-step verification
  for the Google account if it isn't already.
- **The Sheet is the backup.** Every score ever submitted is a row there (the
  script keeps the most recent 2000 across all games), so you can always see the
  full history even though each game only shows its Top 10. The `game` column
  says which game each row belongs to; older rows with a blank `game` count as
  `legends`.
- **"Call the Finals" is different.** That game's picks go to a separate tab
  called **Predictions** (`name | teamA | teamB | champion | timestamp`), which
  the script creates on its own. There is **one row per name** - if the same
  name submits again it overwrites their earlier pick, so the tally stays honest.
  To reset the whole poll, delete every row under the header on that tab.

---

## Updating the script (e.g. adding a new game)

When `leaderboard.gs` in the project changes, push the new version to your
existing Web App - the URL does **not** change:

1. Open your **WNBA Leaderboard** spreadsheet -> **Extensions** -> **Apps Script**.
2. Select all the code, delete it, and paste in the new contents of
   `leaderboard.gs`. Save (disk icon).
3. Click **Deploy** -> **Manage deployments**.
4. Click the **pencil / edit** icon on the existing deployment.
5. Set **Version** to **New version**, then click **Deploy**.
6. Done. Same URL, new behavior. If anything looks wrong, come back to **Manage
   deployments**, edit again, and pick an earlier version from the Version list
   to roll back.

The list of games the script will accept lives near the top of `leaderboard.gs`:

```js
var GAMES = ['legends', 'naming', 'finals'];
```

Add a new game's name there before pointing a new page at it.

> **You need to do this re-deploy now** for the Naming Challenge board and the
> new **Call the Finals** poll to work. Until you do, the Naming Challenge board
> shows the Legends scores and Call the Finals can't save picks.

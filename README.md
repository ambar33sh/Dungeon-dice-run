# Dungeon Dice Run: The Cursed Catacombs

A small browser-based dice adventure game inspired by a Coursera Game Design course.

## Concept

You explore the cursed Catacombs of Vorthan.  
On each turn you roll two dice, choose to move by the **lower** (safer) or **higher** (riskier) die, and deal with whatever you land on:

- 💰 Treasure: gain 1 treasure
- ☠ Trap: lose 1 heart
- 👹 Monster: roll a die → 1–3 lose 1 heart, 4–6 gain 1 treasure
- 🧪 Potion: regain 1 heart (up to 5)

Reach space 30 (EXIT) before your hearts reach zero.

## Tech

- HTML, CSS, vanilla JavaScript
- No external libraries
- Fully client-side, runs in any modern browser

## How to Play

1. Open `index.html` in a browser, or visit the GitHub Pages link if enabled.
2. Click **Roll Dice**, then choose **Move Lower** or **Move Higher**.
3. Watch your hearts, collect treasure, and try to escape!

## Running locally

Just open `index.html` in your browser.

## GitHub Pages (optional)

1. Push this project to a GitHub repository.
2. In the repo Settings → Pages, select the `main` branch and `/root` folder.
3. Your game will be available at `https://<your-username>.github.io/<repo-name>/`.

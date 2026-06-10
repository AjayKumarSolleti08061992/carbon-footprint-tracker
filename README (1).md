# 🌿 Carbon Footprint Tracker

A clean, interactive web app that helps individuals understand, track, and reduce their personal carbon emissions — no backend, no login, no data sent anywhere.

## Features

- **Overview** — snapshot of your total emissions vs global and India averages, with a 12-month trend chart
- **Track** — sliders to input your lifestyle (driving, flights, energy, diet, shopping) with real-time CO₂ calculation
- **Actions** — a checklist of weekly habits with estimated CO₂ savings per action
- **Insights** — personalised tips based on the highest-impact areas of your footprint

## Getting started

### Option 1 — Open directly in your browser
Download `index.html` and open it. No server needed.

### Option 2 — Serve locally
```bash
npx serve .
# or
python3 -m http.server 8080
```
Then open `http://localhost:8080`.

### Option 3 — Deploy via GitHub Pages
See the [GitHub Pages deployment guide](#deploying-to-github-pages) below.

## Deploying to GitHub Pages

1. Push this repo to GitHub (see instructions below if you haven't yet).
2. Go to your repo → **Settings** → **Pages**.
3. Under **Source**, choose `Deploy from a branch` → `main` → `/ (root)`.
4. Click **Save**. Your site will be live at `https://<your-username>.github.io/<repo-name>/` within a minute.

## Tech stack

- Pure HTML, CSS, JavaScript — zero build tools, zero dependencies to install
- [Chart.js 4.4](https://www.chartjs.org/) for the trend chart (loaded from CDN)
- [Tabler Icons](https://tabler.io/icons) icon font (loaded from CDN)
- Fully responsive, dark-mode aware

## Customisation

All emissions factors are in the `updateCalc()` function in `index.html`. Adjust them to match your local grid intensity or transport mix.

## License

MIT — use freely.

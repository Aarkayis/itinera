# ThreeTierTrips

A dependency-free static travel planner designed for GitHub Pages.

## Features
- India destination discovery with a curated starter dataset spanning North, South, East, West, Central and North-East.
- Budget slider from ₹1,500 to ₹1,00,000.
- 1–7 day itinerary generator.
- Monthly seasonal recommendation logic.
- Tier filtering: Budget / Smart / Premium.
- Region, vibe, search and sorting filters.
- Saved trips with browser localStorage.
- Copy / print itinerary actions.
- Free-media links to Wikimedia Commons, Unsplash and Pexels search pages.
- No build step, no API key, no backend required.

## Deploy on GitHub Pages
1. Create a GitHub repository, for example `ThreeTierTrips`.
2. Upload `index.html`, `styles.css`, `app.js`, `README.md`, and `.nojekyll`.
3. GitHub → Settings → Pages → Deploy from a branch → choose `main` and `/root`.
4. Save. Your site will be available at the GitHub Pages URL.

## Important data note
The destination data and budgets are planning estimates, not live travel quotes. Weather, permits, transport, accommodation, attraction fees and seasonal availability can change. Expand `PLACES` in `app.js` to grow the destination library.

## Media note
The site intentionally links to source platforms instead of copying random social media footage. Wikimedia Commons files have per-file licensing requirements; Unsplash also notes that some depictions may require additional rights/release considerations. Verify the license before publishing commercial content.

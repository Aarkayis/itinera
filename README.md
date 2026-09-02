# ITINERA 🇮🇳

## India, your way.

ITINERA is a premium, season-aware India travel discovery and trip-planning website.

It helps travelers discover destinations by **month, budget, travel style and trip length**, then open a destination to see a starter budget, stay idea, food cue, travel window and a destination-specific YouTube search.

> **Created by RAHUL MAHTO**

---

## ✨ Features

### 🇮🇳 India Atlas
The current starter dataset covers:

- **36 states and union territories**
- **144 destination entries**
- Cities
- Villages
- Hill stations
- Beaches
- Heritage sites
- Wildlife areas
- Nature escapes
- Offbeat destinations

Every destination can be searched by:

```text
Place
City
Village
State / UT
```

### 🌦️ 12-Month Seasonal Experience

ITINERA adapts the interface to the selected month:

| Months | Season | Atmosphere |
|---|---|---|
| Jan–Feb | ❄️ Winter | Snow / cool mood |
| Mar–May | ☀️ Summer | Warm / bright mood |
| Jun–Sep | 🌧️ Monsoon | Rain / greenery |
| Oct–Nov | 🍂 Autumn | Clear / post-monsoon |
| Dec | ❄️ Winter | Cool / festive |

September is the featured monsoon experience.

The **Atmosphere ON/OFF** control changes the animated layer across the page.

### 💰 Budget-first discovery

Budget currently ranges from:

**₹1,500 → ₹2,50,000**

The budget filter affects the destination shortlist.

The architecture is ready to expand into a full trip-cost engine covering:

- Transport
- Stay
- Food
- Activities
- Entry fees
- Local travel
- Daily spending

### 🗓️ 1–7 Day Trip Planner

The planner creates a simple visual route:

```text
⌖ Arrival
↓
◒ Explore
↓
🍛 Taste
↓
✦ Culture
↓
☕ Relax
↓
⌂ Local Life
↓
→ Departure
```

Users can choose between **1 and 7 days**.

### ▶️ Destination video discovery

Each destination opens a YouTube search built around that specific place.

Examples:

```text
Meghalaya + travel
Kashmir + travel
Kerala + travel
Hampi + travel
```

This makes the site useful for researching:

- Real roads
- Weather
- Hotels
- Food
- Local experiences
- Trek conditions
- Traveler experiences

### 🏨 Stay + 🍛 Food cues

Each destination contains starter fields for:

- Stay type
- Food cue
- Budget
- Best travel window

These can later be connected to real hotel, restaurant and travel APIs.

### 🌙 Dark / ☀️ Light mode

ITINERA has separate theme variables for the dark theme so text and controls remain readable instead of simply applying a dark overlay.

The selected theme is stored locally in the browser.

### ❤️ Save trips

Saved destinations use browser `localStorage` in this prototype.

A future version can move saved trips to user accounts and cloud storage.

---

# 🧩 Project Structure

```text
ITINERA/
├── index.html
├── style.css
├── script.js
├── data.js
└── README.md
```

### `index.html`

Main page structure:

- Navigation
- Hero
- Discovery filters
- India atlas
- Destination cards
- Destination modal
- Trip planner
- Travel videos
- Image-source information
- Footer

### `style.css`

Contains:

- Premium editorial design
- Responsive layout
- Light theme
- Dark theme
- Seasonal visual styling
- Full-page atmosphere effects
- Destination cards
- Planner
- Modal
- Mobile styles

### `script.js`

Contains:

- Search
- State / UT filtering
- Budget filtering
- Vibe filtering
- Month switching
- Seasonal engine
- Destination modal
- YouTube destination searches
- 1–7 day roadmap
- Save trip
- Copy trip
- Dark / light mode
- Atmosphere ON/OFF

### `data.js`

Contains the travel dataset.

Current size:

**36 regions × 4 destinations = 144 starter destinations**

---

# 🚀 Run Locally

No Node.js or npm is required.

Open:

```text
index.html
```

in a modern browser.

For development, VS Code + Live Server is recommended.

---

# 🌐 Deploy with GitHub Pages

Upload these files to the root of your repository:

```text
index.html
style.css
script.js
data.js
README.md
```

Then open:

```text
Repository
→ Settings
→ Pages
→ Deploy from a branch
→ main
→ / (root)
→ Save
```

---

# 📸 Image Licensing

The starter uses remote demo imagery.

Before public or commercial use, replace demo assets with photographs whose licenses you have verified.

Useful sources to research:

- [Wikimedia Commons](https://commons.wikimedia.org/)
- [Unsplash](https://unsplash.com/)
- [Pexels](https://www.pexels.com/)

Do not scrape or reuse Instagram, Facebook, Reddit or YouTube images/thumbnails without checking the applicable rights.

---

# 🧠 Future Roadmap

## Phase 1 — Current

- ✅ Premium responsive UI
- ✅ 12-month seasonal system
- ✅ Monsoon rain effect
- ✅ Atmosphere ON/OFF
- ✅ Dark / light mode
- ✅ Search
- ✅ Budget slider
- ✅ State / UT atlas
- ✅ 144 destination entries
- ✅ 1–7 day roadmap
- ✅ Destination modal
- ✅ YouTube destination search
- ✅ Browser saved trips

## Phase 2 — Travel Data

Expand toward:

- 700+ destinations
- More villages
- Hidden gems
- Verified hotel/stay data
- Restaurants
- Regional food guides
- Transport estimates
- Festivals
- Weather information
- Better trip-cost calculations

## Phase 3 — Smart Itinerary Engine

The planner can eventually calculate:

```text
Destination
      ↓
Travel month
      ↓
Budget
      ↓
Trip length
      ↓
Travel style
      ↓
Transport
      ↓
Stay
      ↓
Food
      ↓
Activities
      ↓
Daily itinerary
```

Example:

```text
₹8,000
+
Meghalaya
+
5 days
+
September
+
Solo
=
Season-aware trip plan
```

## Phase 4 — Real APIs

Potential integrations:

- Maps
- Places
- Weather
- Hotels
- Flights
- Trains
- Buses
- YouTube Data API
- Reviews
- Currency

---

# 🎨 Design Philosophy

ITINERA intentionally uses a **premium editorial travel-magazine style** instead of a generic tourism template.

The visual language uses:

- Large serif typography
- Spacious composition
- Ivory paper tones
- Deep heritage green
- Warm gold accents
- Large destination photography
- Subtle borders
- Minimal controls
- Editorial cards
- Seasonal motion

The goal is:

> **Magazine feel + travel utility + practical planning**

---

# 🔐 Production Checklist

Before launching commercially, add:

- API key protection
- Server-side API requests
- Input validation
- Rate limiting
- Loading states
- Error states
- Optimized images
- Accessibility testing
- SEO
- Privacy policy
- Terms of use
- Analytics
- Verified image licensing

Never expose private API keys inside `script.js`.

---

# 🗺️ Recommended Next Build

The biggest upgrade for ITINERA is a structured travel database:

```text
State / UT
└── Destination
    ├── Best months
    ├── Budget
    ├── Stay
    ├── Food
    ├── Transport
    ├── Attractions
    ├── Hidden places
    ├── Safety notes
    ├── Weather
    ├── Videos
    └── 1–7 day itineraries
```

That turns the current front-end prototype into the foundation of a real India travel-planning product.

---

## 🇮🇳 ITINERA

### India, your way.

**CREATED BY RAHUL MAHTO**

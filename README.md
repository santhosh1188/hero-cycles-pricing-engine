# Hero Cycles Pricing Engine

A pricing engine for configurable bicycle products that supports historical pricing based on date ranges.

The project includes:

- Command-line pricing engine
- Web-based cycle configurator UI
- Component-wise price breakdown
- Historical price support
- Unit tests

---

## Tech Stack

Frontend:
- HTML
- CSS
- JavaScript

Backend:
- Node.js

Testing:
- Jest

---

## Project Structure

```text
hero-cycles-pricing-engine/

src/
 ├── cli/
 │    └── main.js
 │
 ├── data/
 │    └── parts.js
 │
 └── models/
      └── PricingEngine.js

tests/
 └── pricing.test.js

ui/
 ├── index.html
 ├── style.css
 └── app.js

README.md
THINKING.md
UI_NOTES.md
input.json
```

---

## Installation

Requirements:

- Node.js v18+

Clone repository:

```bash
git clone https://github.com/santhosh1188/hero-cycles-pricing-engine.git

cd hero-cycles-pricing-engine
```

Install dependencies:

```bash
npm install
```

---

## Run CLI Pricing Engine

Run:

```bash
npm start
```

or:

```bash
node src/cli/main.js input.json
```

Example input:

```json
{
  "date":"2016-12-15",
  "parts":[
    "steel_frame",
    "standard_handlebar",
    "v_brakes",
    "basic_saddle",
    "tubeless_tyre",
    "standard_rim",
    "spokes",
    "4_gear_assembly"
  ]
}
```

Example output:

```text
Cycle Price Breakdown

Frame                  ₹1400
Handle Bar / Brakes    ₹880
Seating                ₹450
Wheels                 ₹1340
Chain Assembly         ₹1100

--------------------------------
Total                  ₹5170
```

---

## Run Unit Tests

```bash
npm test
```

---

## UI Configurator

Open:

```text
start ui/index.html
```

Features:

- Real-time price updates
- Component-wise breakdown
- Historical pricing support
- Invalid combination handling
- Responsive layout

---

## Future Improvements

- Save quote as PDF
- Database integration
- User authentication
- Admin panel for price updates
# Thinking — Hero Cycles Pricing Engine

## Part 1 — Problem Breakdown

### Who is using this?
A salesperson at a Hero Cycles showroom. She is not a developer.
She needs to quickly quote a customer a price. She uses this tool
20+ times a day.

What she needs:
- Select parts in a few clicks — no typing part IDs by hand
- See the price update immediately — no submit button to forget
- Understand the breakdown clearly — so she can explain it to a customer

What would frustrate her:
- Typing a wrong part ID and getting a blank result with no explanation
- Prices silently showing the wrong date's value
- Having to remember which parts are compatible with which

---

### What makes this problem tricky — 3 edge cases

**1. Boundary date — what happens exactly on Dec 1, 2016?**
The price changes "from Dec 2016 onwards". Does Dec 1 use old price or
new? I defined validUntil as inclusive and validFrom as inclusive, so
Dec 1, 2016 uses the new price. This boundary needs to be documented
and tested explicitly.

**2. A part queried before it existed**
If someone enters a date of 2010-01-01 but parts only have prices from
2016, no price entry matches. The engine must handle this gracefully —
throw a clear error, not crash silently or return 0.

**3. Tubeless tyre + tube conflict**
A tubeless tyre doesn't use an inner tube. If both are selected, the
total would be wrong and the salesperson might quote a higher price than
needed. The UI must detect this and warn or auto-correct.

---

### My plan before coding

**How I represent parts and prices:**
Each part is an object with an id, name, component group, and a
priceHistory array. Each entry in priceHistory has a validFrom date,
a validUntil date (null if still current), and a price. I chose this
model because it keeps the full history and makes it easy to query
"what was the price on date X?" without modifying any data.

**How I handle price changes over time:**
When calculating a price for a given date, I scan the part's
priceHistory and find the entry whose validFrom ≤ date ≤ validUntil.
If validUntil is null, I treat it as "no end date — still valid."

**How I structure the output:**
The engine groups parts by their component (FRAME, WHEELS, etc.) and
sums each group. It returns a breakdown object plus a total. The CLI
prints this as a formatted table. The UI renders it live on every change.

---

## Part 2 — Data Model

### Core entities

**Component**
- id    : string  (e.g. "FRAME", "WHEELS")
- label : string  (e.g. "Frame", "Wheels")

**Part**
- id           : string  (e.g. "steel_frame")
- name         : string  (e.g. "Steel Frame")
- component    : string  (one of the 5 component types)
- priceHistory : array of PriceEntry

**PriceEntry**
- validFrom  : string (ISO date "YYYY-MM-DD")
- validUntil : string | null  (null = still current)
- price      : number (in ₹)

**CycleConfiguration**
- date  : string       (the pricing date the user wants to query)
- parts : List<string> (part IDs the user selected)

This is exactly what input.json represents:
  { "date": "2016-12-15", "parts": ["steel_frame", "v_brakes", ...] }

### Relationships
A Part belongs to one Component group.
A Part has many PriceEntries (one per pricing period).

### Design decision: why a price history array?
Alternative: store a single `currentPrice` field and update it when
prices change. Problem: you lose history. You can't go back and ask
"what did this cost in June 2016?"

I chose the price history array because:
1. The problem explicitly requires date-sensitive queries
2. It's easy to add new price entries without changing old ones
3. It's easy to test — you can verify any historical date
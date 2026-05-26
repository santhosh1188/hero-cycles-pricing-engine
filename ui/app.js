// All prices are hardcoded here — same data as the backend parts.js

const PARTS_DATA = {
    steel_frame: { name: "Steel Frame", component: "Frame", prices: [{ from: "2016-01-01", until: "2016-11-30", price: 1200 }, { from: "2016-12-01", until: null, price: 1400 }] },
    aluminium_frame: { name: "Aluminium Frame", component: "Frame", prices: [{ from: "2016-01-01", until: "2016-11-30", price: 2200 }, { from: "2016-12-01", until: null, price: 2500 }] },
    standard_handlebar: { name: "Standard Handlebar", component: "Handle Bar / Brakes", prices: [{ from: "2016-01-01", until: "2016-11-30", price: 450 }, { from: "2016-12-01", until: null, price: 500 }] },
    v_brakes: { name: "V-Brakes", component: "Handle Bar / Brakes", prices: [{ from: "2016-01-01", until: "2016-11-30", price: 350 }, { from: "2016-12-01", until: null, price: 380 }] },
    disc_brakes: { name: "Disc Brakes", component: "Handle Bar / Brakes", prices: [{ from: "2016-01-01", until: "2016-11-30", price: 800 }, { from: "2016-12-01", until: null, price: 900 }] },
    basic_saddle: { name: "Basic Saddle", component: "Seating", prices: [{ from: "2016-01-01", until: "2016-11-30", price: 400 }, { from: "2016-12-01", until: null, price: 450 }] },
    ergonomic_saddle: { name: "Ergonomic Saddle", component: "Seating", prices: [{ from: "2016-01-01", until: "2016-11-30", price: 900 }, { from: "2016-12-01", until: null, price: 1000 }] },
    standard_rim: { name: "Standard Rim", component: "Wheels", prices: [{ from: "2016-01-01", until: "2016-11-30", price: 600 }, { from: "2016-12-01", until: null, price: 650 }] },
    tube: { name: "Tube", component: "Wheels", prices: [{ from: "2016-01-01", until: "2016-11-30", price: 80 }, { from: "2016-12-01", until: null, price: 90 }] },
    standard_tyre: { name: "Standard Tyre", component: "Wheels", prices: [{ from: "2016-01-01", until: "2016-11-30", price: 200 }, { from: "2016-12-01", until: null, price: 230 }] },
    tubeless_tyre: { name: "Tubeless Tyre", component: "Wheels", prices: [{ from: "2016-01-01", until: "2016-11-30", price: 450 }, { from: "2016-12-01", until: null, price: 520 }] },
    spokes: { name: "Spokes (set)", component: "Wheels", prices: [{ from: "2016-01-01", until: "2016-11-30", price: 150 }, { from: "2016-12-01", until: null, price: 170 }] },
    single_speed_chain: { name: "Single-Speed Chain", component: "Chain Assembly", prices: [{ from: "2016-01-01", until: "2016-11-30", price: 300 }, { from: "2016-12-01", until: null, price: 330 }] },
    "4_gear_assembly": { name: "4-Gear Assembly", component: "Chain Assembly", prices: [{ from: "2016-01-01", until: "2016-11-30", price: 950 }, { from: "2016-12-01", until: null, price: 1100 }] },
    "7_gear_assembly": { name: "7-Gear Assembly", component: "Chain Assembly", prices: [{ from: "2016-01-01", until: "2016-11-30", price: 1800 }, { from: "2016-12-01", until: null, price: 2000 }] }
};

// Get price for a single part on a given date string "YYYY-MM-DD"
function getPriceForDate(partId, dateStr) {
    const part = PARTS_DATA[partId];
    if (!part) return 0;

    const query = new Date(dateStr);
    const entry = part.prices.find(e => {
        const from = new Date(e.from);
        const until = e.until ? new Date(e.until) : null;
        return query >= from && (until === null || query <= until);
    });

    return entry ? entry.price : 0;
}

// Collect all selected part IDs from the form
function getSelectedParts() {
    const parts = [
        document.getElementById("frame").value,
        document.getElementById("handlebar").value,
        document.getElementById("brakes").value,
        document.getElementById("seating").value,
        document.getElementById("rim").value,
        document.getElementById("tyre").value,
        document.getElementById("chain").value
    ];

    const isTubeless = document.getElementById("tyre").value === "tubeless_tyre";

    // Only add tube if user checked it AND tyre is not tubeless
    if (document.getElementById("include-tube").checked && !isTubeless) {
        parts.push("tube");
    }
    if (document.getElementById("include-spokes").checked) {
        parts.push("spokes");
    }

    return parts;
}

// Recalculate and update the UI
function updateBreakdown() {
    const date = document.getElementById("pricing-date").value;
    const parts = getSelectedParts();

    // Group parts by component and sum prices
    const grouped = {};
    for (const partId of parts) {
        const part = PARTS_DATA[partId];
        if (!part) continue;
        const price = getPriceForDate(partId, date);
        grouped[part.component] = (grouped[part.component] || 0) + price;
    }

    // Render rows
    const tbody = document.getElementById("breakdown-body");
    tbody.innerHTML = "";
    let total = 0;

    for (const [component, subtotal] of Object.entries(grouped)) {
        const tr = document.createElement("tr");
        tr.innerHTML = `<td>${component}</td><td>₹${subtotal.toLocaleString("en-IN")}</td>`;
        tbody.appendChild(tr);
        total += subtotal;
    }

    document.getElementById("total-cell").textContent = `₹${total.toLocaleString("en-IN")}`;

    // Update date label
    const formatted = new Date(date).toLocaleDateString("en-IN", {
        day: "numeric", month: "short", year: "numeric"
    });
    document.getElementById("result-date-label").textContent = formatted;
}

// Show warning when tubeless tyre is selected
function handleTyreChange() {
    const isTubeless = document.getElementById("tyre").value === "tubeless_tyre";
    document.getElementById("tyre-warning").classList.toggle("hidden", !isTubeless);
    // Auto-uncheck tube when tubeless selected
    document.getElementById("include-tube").checked = !isTubeless;
    updateBreakdown();
}

// Attach event listeners to all inputs
document.getElementById("pricing-date").addEventListener("change", updateBreakdown);
document.getElementById("frame").addEventListener("change", updateBreakdown);
document.getElementById("handlebar").addEventListener("change", updateBreakdown);
document.getElementById("brakes").addEventListener("change", updateBreakdown);
document.getElementById("seating").addEventListener("change", updateBreakdown);
document.getElementById("rim").addEventListener("change", updateBreakdown);
document.getElementById("tyre").addEventListener("change", handleTyreChange);
document.getElementById("include-tube").addEventListener("change", updateBreakdown);
document.getElementById("include-spokes").addEventListener("change", updateBreakdown);
document.getElementById("chain").addEventListener("change", updateBreakdown);

// Run once on load so the table is populated immediately
updateBreakdown();
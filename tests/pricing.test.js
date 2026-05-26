const PricingEngine = require("../src/models/PricingEngine");

const engine = new PricingEngine();

// getPartById

test("finds a part by its ID", () => {
    const part = engine.getPartById("steel_frame");
    expect(part).toBeDefined();
    expect(part.name).toBe("Steel Frame");
});

test("returns undefined for an unknown part ID", () => {
    const part = engine.getPartById("flying_carpet");
    expect(part).toBeUndefined();
});

// getPriceForDate

test("returns old price before Dec 2016", () => {
    const part = engine.getPartById("standard_tyre");
    const price = engine.getPriceForDate(part, "2016-06-15");
    expect(price).toBe(200);
});

test("returns new price from Dec 2016 onwards", () => {
    const part = engine.getPartById("standard_tyre");
    const price = engine.getPriceForDate(part, "2016-12-01");
    expect(price).toBe(230);
});

test("returns new price well after price change", () => {
    const part = engine.getPartById("steel_frame");
    const price = engine.getPriceForDate(part, "2024-01-01");
    expect(price).toBe(1400); // validUntil is null = still current
});

test("throws error when no price entry covers the date", () => {
    const part = engine.getPartById("steel_frame");
    // Date before any price entry exists
    expect(() => engine.getPriceForDate(part, "2010-01-01")).toThrow();
});

// calculate

test("calculates correct total for a simple configuration", () => {
    const result = engine.calculate(["steel_frame", "basic_saddle"], "2016-06-01");
    expect(result.total).toBe(1200 + 400);
    expect(result.errors).toHaveLength(0);
});

test("puts parts in the correct component groups", () => {
    const result = engine.calculate(["steel_frame", "aluminium_frame"], "2016-06-01");
    expect(result.breakdown["FRAME"]).toBe(1200 + 2200);
});

test("records an error for unknown part IDs without crashing", () => {
    const result = engine.calculate(["steel_frame", "unknown_part_xyz"], "2016-06-01");
    expect(result.errors).toHaveLength(1);
    expect(result.errors[0]).toContain("unknown_part_xyz");
});

test("total in Dec 2016 is higher than same config in Jan 2016", () => {
    const parts = ["steel_frame", "basic_saddle", "standard_tyre"];
    const before = engine.calculate(parts, "2016-01-01").total;
    const after = engine.calculate(parts, "2016-12-01").total;
    expect(after).toBeGreaterThan(before);
});
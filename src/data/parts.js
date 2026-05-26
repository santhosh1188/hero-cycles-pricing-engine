
const PARTS = [
    // FRAME
    {
        id: "steel_frame",
        name: "Steel Frame",
        component: "FRAME",
        priceHistory: [
            { validFrom: "2016-01-01", validUntil: "2016-11-30", price: 1200 },
            { validFrom: "2016-12-01", validUntil: null, price: 1400 }
        ]
    },
    {
        id: "aluminium_frame",
        name: "Aluminium Frame",
        component: "FRAME",
        priceHistory: [
            { validFrom: "2016-01-01", validUntil: "2016-11-30", price: 2200 },
            { validFrom: "2016-12-01", validUntil: null, price: 2500 }
        ]
    },

    // HANDLEBAR & BRAKES
    {
        id: "standard_handlebar",
        name: "Standard Handlebar",
        component: "HANDLEBAR_BRAKES",
        priceHistory: [
            { validFrom: "2016-01-01", validUntil: "2016-11-30", price: 450 },
            { validFrom: "2016-12-01", validUntil: null, price: 500 }
        ]
    },
    {
        id: "v_brakes",
        name: "V-Brakes",
        component: "HANDLEBAR_BRAKES",
        priceHistory: [
            { validFrom: "2016-01-01", validUntil: "2016-11-30", price: 350 },
            { validFrom: "2016-12-01", validUntil: null, price: 380 }
        ]
    },
    {
        id: "disc_brakes",
        name: "Disc Brakes",
        component: "HANDLEBAR_BRAKES",
        priceHistory: [
            { validFrom: "2016-01-01", validUntil: "2016-11-30", price: 800 },
            { validFrom: "2016-12-01", validUntil: null, price: 900 }
        ]
    },

    // SEATING
    {
        id: "basic_saddle",
        name: "Basic Saddle",
        component: "SEATING",
        priceHistory: [
            { validFrom: "2016-01-01", validUntil: "2016-11-30", price: 400 },
            { validFrom: "2016-12-01", validUntil: null, price: 450 }
        ]
    },
    {
        id: "ergonomic_saddle",
        name: "Ergonomic Saddle",
        component: "SEATING",
        priceHistory: [
            { validFrom: "2016-01-01", validUntil: "2016-11-30", price: 900 },
            { validFrom: "2016-12-01", validUntil: null, price: 1000 }
        ]
    },

    // WHEELS
    {
        id: "standard_rim",
        name: "Standard Rim",
        component: "WHEELS",
        priceHistory: [
            { validFrom: "2016-01-01", validUntil: "2016-11-30", price: 600 },
            { validFrom: "2016-12-01", validUntil: null, price: 650 }
        ]
    },
    {
        id: "tube",
        name: "Tube",
        component: "WHEELS",
        priceHistory: [
            { validFrom: "2016-01-01", validUntil: "2016-11-30", price: 80 },
            { validFrom: "2016-12-01", validUntil: null, price: 90 }
        ]
    },
    {
        id: "standard_tyre",
        name: "Standard Tyre",
        component: "WHEELS",
        priceHistory: [
            { validFrom: "2016-01-01", validUntil: "2016-11-30", price: 200 },
            { validFrom: "2016-12-01", validUntil: null, price: 230 }
        ]
    },
    {
        id: "tubeless_tyre",
        name: "Tubeless Tyre",
        component: "WHEELS",
        priceHistory: [
            { validFrom: "2016-01-01", validUntil: "2016-11-30", price: 450 },
            { validFrom: "2016-12-01", validUntil: null, price: 520 }
        ]
    },
    {
        id: "spokes",
        name: "Spokes (set)",
        component: "WHEELS",
        priceHistory: [
            { validFrom: "2016-01-01", validUntil: "2016-11-30", price: 150 },
            { validFrom: "2016-12-01", validUntil: null, price: 170 }
        ]
    },

    // CHAIN ASSEMBLY
    {
        id: "single_speed_chain",
        name: "Single-Speed Chain",
        component: "CHAIN_ASSEMBLY",
        priceHistory: [
            { validFrom: "2016-01-01", validUntil: "2016-11-30", price: 300 },
            { validFrom: "2016-12-01", validUntil: null, price: 330 }
        ]
    },
    {
        id: "4_gear_assembly",
        name: "4-Gear Assembly",
        component: "CHAIN_ASSEMBLY",
        priceHistory: [
            { validFrom: "2016-01-01", validUntil: "2016-11-30", price: 950 },
            { validFrom: "2016-12-01", validUntil: null, price: 1100 }
        ]
    },
    {
        id: "7_gear_assembly",
        name: "7-Gear Assembly",
        component: "CHAIN_ASSEMBLY",
        priceHistory: [
            { validFrom: "2016-01-01", validUntil: "2016-11-30", price: 1800 },
            { validFrom: "2016-12-01", validUntil: null, price: 2000 }
        ]
    }
];

const COMPONENT_LABELS = {
    FRAME: "Frame",
    HANDLEBAR_BRAKES: "Handle Bar / Brakes",
    SEATING: "Seating",
    WHEELS: "Wheels",
    CHAIN_ASSEMBLY: "Chain Assembly"
};

module.exports = { PARTS, COMPONENT_LABELS };
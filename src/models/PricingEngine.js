const { PARTS, COMPONENT_LABELS } = require("../data/parts");

class PricingEngine {

    // Find a part object by its ID.
    getPartById(partId) {
        return PARTS.find(part => part.id === partId);
    }

    // Find the correct price for a part on a specific date.

    getPriceForDate(part, date) {
        const queryDate = new Date(date);

        const matchingEntry = part.priceHistory.find(entry => {
            const from = new Date(entry.validFrom);
            const until = entry.validUntil ? new Date(entry.validUntil) : null;

            const afterStart = queryDate >= from;
            const beforeEnd = until === null || queryDate <= until;

            return afterStart && beforeEnd;
        });

        if (!matchingEntry) {
            throw new Error(
                `No price found for "${part.name}" on date ${date}. ` +
                `Check that the date is within a valid price range.`
            );
        }

        return matchingEntry.price;
    }

    //Calculate the full price breakdown for a list of part IDs on a given date.


    calculate(partIds, date) {
        const breakdown = {};
        const errors = [];
        let total = 0;

        for (const partId of partIds) {
            //  Does this part exist?
            const part = this.getPartById(partId);
            if (!part) {
                errors.push(`Unknown part ID: "${partId}"`);
                continue;
            }

            //  Get the price for this date
            let price;
            try {
                price = this.getPriceForDate(part, date);
            } catch (err) {
                errors.push(err.message);
                continue;
            }

            //  Add to the component group total
            if (!breakdown[part.component]) {
                breakdown[part.component] = 0;
            }
            breakdown[part.component] += price;
            total += price;
        }

        return { breakdown, total, errors };
    }
}

module.exports = PricingEngine;
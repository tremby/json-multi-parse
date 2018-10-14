const {splitByIndex} = require('./split');

const ERROR_REGEX = /^Unexpected token { in JSON at position (\d+)$/;

/**
 * Parse a string of multiple JSON objects
 *
 * @param {string} input String with zero or more JSON objects in series,
 *                       possibly separated by whitespace
 * @param {string[]} [acc] Accumulator for internal use
 * @returns {Object[]} Array of objects
 */
function jsonMultiParse(input, acc = []) {
	if (input.trim().length === 0) {
		return acc;
	}

	try {
		acc.push(JSON.parse(input));
		return acc;
	} catch (error) {
		const match = error.message.match(ERROR_REGEX);
		if (!match) {
			throw error;
		}

		const chunks = splitByIndex(input, parseInt(match[1], 10))

		acc.push(JSON.parse(chunks[0]));
		return jsonMultiParse(chunks[1], acc);
	}
}

module.exports = jsonMultiParse;

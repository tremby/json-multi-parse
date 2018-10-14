const {splitByIndex, splitByLineAndChar} = require('./split');

/**
 * List of regexes matching errors for unexpected characters after JSON data
 *
 * First placeholder: line number, 1-indexed
 * Second placeholder: character number, 1-indexed
 * Third placeholder: overall character index, 0-indexed
 */
const ERROR_REGEXES = [
	/^()()Unexpected token { in JSON at position (\d+)$/, // Node 8, Chrome 69
	/^JSON.parse: unexpected non-whitespace character after JSON data at line (\d+) column (\d+) of the JSON data()$/, // Firefox 62
];

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
		let match = null;
		for (const regex of ERROR_REGEXES) {
			if (match = error.message.match(regex)) {
				break;
			}
		}
		if (!match) {
			throw error;
		}

		const chunks = match[3]
			? splitByIndex(input, parseInt(match[3], 10))
			: splitByLineAndChar(input, parseInt(match[1], 10) - 1, parseInt(match[2], 10) - 1);

		acc.push(JSON.parse(chunks[0]));
		return jsonMultiParse(chunks[1], acc);
	}
}

module.exports = jsonMultiParse;

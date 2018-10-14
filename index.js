const ERROR_REGEX = /^Unexpected token { in JSON at position (\d+)$/;

function jsonMultiParse(input, acc = []) {
	try {
		acc.push(JSON.parse(input));
		return acc;
	} catch (error) {
		const match = error.message.match(ERROR_REGEX);
		if (!match) {
			throw error;
		}
		const index = parseInt(match[1], 10);
		acc.push(JSON.parse(input.substr(0, index)));
		return jsonMultiParse(input.substr(index), acc);
	}
}

module.exports = jsonMultiParse;

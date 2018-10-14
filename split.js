/**
 * Split a string by character index
 *
 * @param {string} input
 * @param {number} index Character index, 0-indexed
 * @returns {string[]} The two output chunks
 */
function splitByIndex(input, index) {
	if (index < 0 || index >= input.length) {
		throw new Error(`Character index ${index} out of range`);
	}
	return [input.substr(0, index), input.substr(index)];
}

module.exports = {
	splitByIndex,
};

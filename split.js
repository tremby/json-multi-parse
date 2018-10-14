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

/**
 * Split a string by line index and character index
 *
 * @param {string} input
 * @param {number} lineIndex Line index, 0-indexed
 * @param {number} charIndex Character index, 0-indexed
 * @returns {string[]} The two output chunks
 */
function splitByLineAndChar(input, lineIndex, charIndex) {
	if (lineIndex < 0) {
		throw new Error(`Line index ${lineIndex} out of range`);
	}
	if (charIndex < 0) {
		throw new Error(`Character index ${charIndex} out of range`);
	}

	// Find the start of the line we are interested in
	let lineStartIndex = 0;
	for (let l = lineIndex; l > 0; l--) {
		lineStartIndex = input.indexOf('\n', lineStartIndex);
		if (lineStartIndex === -1) {
			throw new Error(`Line index ${lineIndex} out of range`);
		}
		lineStartIndex++;
	}

	// Check the character number we want is within this line
	const nextNl = input.indexOf('\n', lineStartIndex);
	if (lineStartIndex + charIndex >= input.length || nextNl !== -1 && nextNl <= lineStartIndex + charIndex) {
		throw new Error(`Character index ${charIndex} out of range for line ${lineIndex}`);
	}

	return splitByIndex(input, lineStartIndex + charIndex);
}

module.exports = {
	splitByIndex,
	splitByLineAndChar,
};

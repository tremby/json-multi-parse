const jmp = require('.');
const {splitByIndex, splitByLineAndChar} = require('./split');

const singleLineInput = 'abc123';
const multiLineInput = 'abc\n123\nwxyz\n';
const multiLineInputNoTrail = 'abc\n123\nwxyz';

describe('Utility functions', () => {
	describe('splitByIndex function', () => {
		describe('with a single-line input', () => {
			test('can split at the start', () => {
				expect(splitByIndex(singleLineInput, 0)).toEqual(['', 'abc123']);
			});
			test('can split in the middle', () => {
				expect(splitByIndex(singleLineInput, 3)).toEqual(['abc', '123']);
			});
			test('can split just before the end', () => {
				expect(splitByIndex(singleLineInput, 5)).toEqual(['abc12', '3']);
			});
			test('errors if at the end of range', () => {
				expect(() => splitByIndex(singleLineInput, 6)).toThrowError();
			});
			test('errors if index is too high', () => {
				expect(() => splitByIndex(singleLineInput, 7)).toThrowError();
			});
			test('errors if index is too low', () => {
				expect(() => splitByIndex(singleLineInput, -1)).toThrowError();
			});
		});
		describe('with a multi-line input', () => {
			test('can split at the start', () => {
				expect(splitByIndex(multiLineInputNoTrail, 0)).toEqual(['', 'abc\n123\nwxyz']);
			});
			test('can split at a newline', () => {
				expect(splitByIndex(multiLineInputNoTrail, 3)).toEqual(['abc', '\n123\nwxyz']);
			});
			test('can split after a newline', () => {
				expect(splitByIndex(multiLineInputNoTrail, 4)).toEqual(['abc\n', '123\nwxyz']);
			});
			test('can split just before the end', () => {
				expect(splitByIndex(multiLineInputNoTrail, 11)).toEqual(['abc\n123\nwxy', 'z']);
			});
			test('errors if at the end of range', () => {
				expect(() => splitByIndex(multiLineInputNoTrail, 12)).toThrowError();
			});
			test('errors if index is too high', () => {
				expect(() => splitByIndex(multiLineInputNoTrail, 13)).toThrowError();
			});
			test('errors if index is too low', () => {
				expect(() => splitByIndex(multiLineInputNoTrail, -1)).toThrowError();
			});
		});
	});
	describe('splitByLineAndChar function', () => {
		describe('with a single-line input', () => {
			test('can split at the start', () => {
				expect(splitByLineAndChar(singleLineInput, 0, 0)).toEqual(['', 'abc123']);
			});
			test('can split in the middle', () => {
				expect(splitByLineAndChar(singleLineInput, 0, 3)).toEqual(['abc', '123']);
			});
			test('can split just before the end', () => {
				expect(splitByLineAndChar(singleLineInput, 0, 5)).toEqual(['abc12', '3']);
			});
			test('errors if at the end of range', () => {
				expect(() => splitByLineAndChar(singleLineInput, 0, 6)).toThrowError();
			});
			test('errors if char index is too high', () => {
				expect(() => splitByLineAndChar(singleLineInput, 0, 7)).toThrowError();
			});
			test('errors if char index is too low', () => {
				expect(() => splitByLineAndChar(singleLineInput, 0, -1)).toThrowError();
			});
			test('errors if line index is too high', () => {
				expect(() => splitByLineAndChar(singleLineInput, 1, 0)).toThrowError();
			});
			test('errors if line index is too low', () => {
				expect(() => splitByLineAndChar(singleLineInput, -1, 0)).toThrowError();
			});
		});
		describe('with a multi-line input', () => {
			test('can split at the start of the first line', () => {
				expect(splitByLineAndChar(multiLineInputNoTrail, 0, 0)).toEqual(['', 'abc\n123\nwxyz']);
			});
			test('can split in the middle of the first line', () => {
				expect(splitByLineAndChar(multiLineInputNoTrail, 0, 1)).toEqual(['a', 'bc\n123\nwxyz']);
			});
			test('can split before the end of the first line', () => {
				expect(splitByLineAndChar(multiLineInputNoTrail, 0, 2)).toEqual(['ab', 'c\n123\nwxyz']);
			});
			test('errors if attempting to split at the end of the first line', () => {
				expect(() => splitByLineAndChar(multiLineInputNoTrail, 0, 3)).toThrowError();
			});
			test('errors if attempting to split out of range of the first line', () => {
				expect(() => splitByLineAndChar(multiLineInputNoTrail, 0, 4)).toThrowError();
			});
			test('can split at the start of the second line', () => {
				expect(splitByLineAndChar(multiLineInputNoTrail, 1, 0)).toEqual(['abc\n', '123\nwxyz']);
			});
			test('can split in the middle of the second line', () => {
				expect(splitByLineAndChar(multiLineInputNoTrail, 1, 1)).toEqual(['abc\n1', '23\nwxyz']);
			});
			test('can split before the end of the second line', () => {
				expect(splitByLineAndChar(multiLineInputNoTrail, 1, 2)).toEqual(['abc\n12', '3\nwxyz']);
			});
			test('errors if attempting to split out of range of the second line', () => {
				expect(() => splitByLineAndChar(multiLineInputNoTrail, 1, 4)).toThrowError();
			});
			test('errors if attempting to split at the end of the second line', () => {
				expect(() => splitByLineAndChar(multiLineInputNoTrail, 1, 3)).toThrowError();
			});
			test('can split at the start of the final line', () => {
				expect(splitByLineAndChar(multiLineInputNoTrail, 2, 0)).toEqual(['abc\n123\n', 'wxyz']);
			});
			test('can split in the middle of the final line', () => {
				expect(splitByLineAndChar(multiLineInputNoTrail, 2, 1)).toEqual(['abc\n123\nw', 'xyz']);
			});
			test('can split before the end of the final line', () => {
				expect(splitByLineAndChar(multiLineInputNoTrail, 2, 3)).toEqual(['abc\n123\nwxy', 'z']);
			});
			test('errors if attempting to split at the end of the final line', () => {
				expect(() => splitByLineAndChar(multiLineInputNoTrail, 2, 4)).toThrowError();
			});
			test('errors if attempting to split out of range of the final line', () => {
				expect(() => splitByLineAndChar(multiLineInputNoTrail, 2, 5)).toThrowError();
			});
			test('errors if line number is too high', () => {
				expect(() => splitByLineAndChar(multiLineInputNoTrail, 3, 0)).toThrowError();
			});
			test('errors if line number is too low', () => {
				expect(() => splitByLineAndChar(multiLineInputNoTrail, -1, 0)).toThrowError();
			});
			test('errors if character number is too low on the first line', () => {
				expect(() => splitByLineAndChar(multiLineInputNoTrail, 0, -1)).toThrowError();
			});
			test('errors if character number is too low on a successive line', () => {
				expect(() => splitByLineAndChar(multiLineInputNoTrail, 1, -1)).toThrowError();
			});
			test('errors if trying to split before final trailing newline', () => {
				expect(() => splitByLineAndChar(multiLineInput, 2, 4)).toThrowError();
			});
			test('errors if trying to split after final trailing newline', () => {
				expect(() => splitByLineAndChar(multiLineInput, 2, 5)).toThrowError();
			});
			test('errors if trying to split between successive newline characters', () => {
				expect(() => splitByLineAndChar('abc\n\n123', 1, 0)).toThrowError();
			});
			test('handles line numbers correctly when dealing with multiple successive newline characters', () => {
				expect(splitByLineAndChar('abc\n\n123', 2, 0)).toEqual(['abc\n\n', '123']);
			});
		});
	});
});

describe('Main function', () => {
	test('returns an empty array given empty input', () => {
		expect(jmp('')).toEqual([]);
	});
	test('handles a single object', () => {
		expect(jmp('{}')).toEqual([{}]);
	});
	test('handles two objects', () => {
		expect(jmp('{}{}')).toEqual([{}, {}]);
	});
	test('handles three objects', () => {
		expect(jmp('{}{}{}')).toEqual([{}, {}, {}]);
	});
	test('handles objects with braces in strings', () => {
		expect(jmp('{"obj1":"test}{test"}{}{}')).toEqual([{obj1: 'test}{test'}, {}, {}]);
	});
	test('handles whitespace between objects', () => {
		expect(jmp('{} \n\t{}')).toEqual([{}, {}]);
	});
	test('handles leading whitespace', () => {
		expect(jmp(' \n\t{}{}')).toEqual([{}, {}]);
	});
	test('handles trailing whitespace', () => {
		expect(jmp('{}{} \n\t')).toEqual([{}, {}]);
	});
	test('throws an error on partial JSON', () => {
		expect(() => {
			jmp('{');
		}).toThrow();
	});
	test('throws an error on partial JSON after complete JSON', () => {
		expect(() => {
			jmp('{}{');
		}).toThrow();
	});
});

describe('Main function in "partial" mode', () => {
	test('returns an empty array given empty input', () => {
		const expected = [];
		expected.remainder = '';
		expect(jmp('', {partial: true})).toEqual(expected);
	});
	test('handles a single object', () => {
		const expected = [{}];
		expected.remainder = '';
		expect(jmp('{}', {partial: true})).toEqual(expected);
	});
	test('handles two objects', () => {
		const expected = [{}, {}];
		expected.remainder = '';
		expect(jmp('{}{}', {partial: true})).toEqual(expected);
	});
	test('handles three objects', () => {
		const expected = [{}, {}, {}];
		expected.remainder = '';
		expect(jmp('{}{}{}', {partial: true})).toEqual(expected);
	});
	test('handles objects with braces in strings', () => {
		const expected = [{obj1: 'test}{test'}, {}, {}];
		expected.remainder = '';
		expect(jmp('{"obj1":"test}{test"}{}{}', {partial: true})).toEqual(expected);
	});
	test('handles whitespace between objects', () => {
		const expected = [{}, {}];
		expected.remainder = '';
		expect(jmp('{} \n\t{}', {partial: true})).toEqual(expected);
	});
	test('handles leading whitespace', () => {
		const expected = [{}, {}];
		expected.remainder = '';
		expect(jmp(' \n\t{}{}', {partial: true})).toEqual(expected);
	});
	test('handles trailing whitespace', () => {
		const expected = [{}, {}];
		expected.remainder = '';
		expect(jmp('{}{} \n\t', {partial: true})).toEqual(expected);
	});
	test('handles partial JSON', () => {
		const expected = [];
		expected.remainder = '{';
		expect(jmp('{', {partial: true})).toEqual(expected);
	});
	test('handles partial JSON after complete JSON', () => {
		const expected = [{}];
		expected.remainder = '{';
		expect(jmp('{}{', {partial: true})).toEqual(expected);
	});
});

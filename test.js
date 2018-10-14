const jmp = require('.');
const {splitByIndex} = require('./split');

const singleLineInput = 'abc123';
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
});

describe('Main function', () => {
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
});

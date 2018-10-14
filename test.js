const jmp = require('.');

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

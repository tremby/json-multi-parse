/**
 * Parse a string of multiple JSON objects
 *
 * @param input String with zero or more JSON objects/values in series,
 *              possibly separated by whitespace
 * @returns Array of objects
 */
export default function jsonMultiParse<T = ReturnType<JSON["parse"]>>(input: string, options?: { partial?: false }): T[];

/**
 * Parse a string of multiple JSON objects/values
 *
 * @param input String with zero or more JSON objects/values in series,
 *              possibly separated by whitespace
 * @param options Options:
 * @param options.partial Don't throw an error if the input ends partway
 *                        through an object/value. Instead add a property
 *                        `remainder` to the returned array with the
 *                        remaining partial JSON string. Default: false
 * @returns Array of results
 */
export default function jsonMultiParse<T = ReturnType<JSON["parse"]>>(input: string, options: { partial: true }): T[] & { remainder: string };

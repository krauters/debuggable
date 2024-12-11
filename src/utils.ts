import type { PostLogProps, PreLogProps } from './index'

/**
 * Constructs the log message to display after method execution.
 *
 * @param props Details about the method result to be logged.
 * @returns The formatted post-run log message.
 */
export function getPostRunLog({ className, method, result, suffix }: PostLogProps) {
	return `Called [${className}.${method}] which returned [${JSON.stringify(result)}]${suffix}`
}

/**
 * Constructs the log message to display before method execution.
 *
 * @param props Details about the method call to be logged.
 * @returns The formatted pre-run log message.
 */
export function getPreRunLog({ args, className, method }: PreLogProps) {
	return `Calling [${className}.${method}] with args [${args.map((a) => JSON.stringify(a)).join(', ')}]`
}

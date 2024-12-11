import type { Logger } from './structures'

import { DurationTracker } from './duration-tracker'
import { getPostRunLog, getPreRunLog } from './utils'

/**
 * A decorator that adds debug logging to all methods of a class, measuring method execution time.
 *
 * @param log The logger instance to be used for all logging.
 * @returns The decorated class with debug logging.
 */
export function debuggable(log?: Logger) {
	const tracker = new DurationTracker(log)
	log ??= console

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	return function (target: any, context?: any) {
		const className = String(context?.name ?? target.name)

		// Apply the decorator to both instance and static methods
		logMethods(log, className, tracker)(target)
		logMethods(log, className, tracker)(target.prototype)
	}
}

/**
 * A helper function that decorates all instance or static methods of a class to add debug logs.
 *
 * @param log The logger instance to be used for logging messages.
 * @param className The name of the class being decorated.
 * @param tracker The duration tracker to measure method execution time.
 * @returns A function that decorates the target class or object.
 */
function logMethods(log: Logger, className: string, tracker: DurationTracker) {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	return function (target: any) {
		if (typeof target !== 'object' && typeof target !== 'function') {
			log.debug(`Target [${target}] is not an object or function, skipping decoration`)

			return
		}

		// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
		const keys = Reflect.ownKeys(target)

		log.debug(`Decorating the following [${className}] methods with debuggable: [${keys.join(', ')}]`)
		keys.forEach((key) => {
			const method = String(key)
			const descriptor = Object.getOwnPropertyDescriptor(target, key)
			if (descriptor && typeof descriptor.value === 'function') {
				const originalMethod = descriptor.value

				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				descriptor.value = function (...args: any[]) {
					log.debug(getPreRunLog({ args, className, method }))

					const trackerKey = tracker.start(method)
					const result = originalMethod.apply(this, args)
					const duration = tracker.end(String(trackerKey))
					const suffix = duration !== undefined ? ` and took [${duration}] ms` : ``

					log.debug(getPostRunLog({ className, method, result, suffix }))

					// eslint-disable-next-line @typescript-eslint/no-unsafe-return
					return result
				}
				Object.defineProperty(target, key, descriptor)
			}
		})
	}
}

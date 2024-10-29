import type { Logger } from './structures'

export const prefix = '[DurationTracker] '

export class DurationTracker {
	private startTimes: Record<string, number>

	/**
	 * The DurationTracker class allows tracking the time duration for various operations.
	 *
	 * @param log The logger to use for logging messages. (default: Console)
	 */
	constructor(log?: Logger) {
		log ??= console
		log.debug(`${prefix}Initializing [${this.constructor.name}]`)

		this.startTimes = {}
	}

	/**
	 * Stops the duration tracking for a given key and returns the elapsed time in milliseconds.
	 *
	 * @param key The identifier used to stop tracking.
	 * @returns The duration in milliseconds or undefined if the key was not tracked.
	 */
	end(key: string): number | undefined {
		const startTime = this.startTimes[key]
		if (startTime !== undefined) {
			const duration = Date.now() - startTime

			// eslint-disable-next-line @typescript-eslint/no-dynamic-delete
			delete this.startTimes[key]

			return duration
		}
	}

	/**
	 * Begins tracking the duration for a given key.
	 *
	 * @param key The identifier for tracking the duration.
	 * @param [withSeed=true] If true, appends a random seed to the key.
	 * @returns The final key being tracked (with optional seed appended).
	 */
	start(key: string, withSeed = true): string {
		if (withSeed) {
			const seed = (Math.random() + 1).toString(36).substring(7)
			key += `-${seed}`
		}

		this.startTimes[key] = Date.now()

		return key
	}
}

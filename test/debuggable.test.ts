/* eslint-disable max-classes-per-file */
import { beforeEach, describe, expect, jest, test } from '@jest/globals'

import { prefix } from '../src/defaults'
import { DurationTracker } from '../src/duration-tracker'
import { debuggable } from '../src/index'

describe('debuggable', () => {
	let mockLog: Console
	let tracker: DurationTracker

	beforeEach(() => {
		mockLog = { ...console, debug: jest.fn() }
		tracker = new DurationTracker(mockLog)
	})

	test('should log and measure instance method execution', () => {
		@debuggable(mockLog)
		class TestClass {
			testMethod(arg: string) {
				return `Hello ${arg}`
			}
		}

		const instance = new TestClass()
		const result = instance.testMethod('World')

		expect(mockLog.debug).toHaveBeenNthCalledWith(5, expect.stringContaining('Calling [TestClass.testMethod]'))
		expect(mockLog.debug).toHaveBeenNthCalledWith(6, expect.stringContaining('Called [TestClass.testMethod]'))
		expect(result).toBe('Hello World')
	})

	test('should track method duration for instance methods', () => {
		jest.spyOn(tracker, 'start').mockReturnValueOnce('testMethod-xyz')
		jest.spyOn(tracker, 'end').mockReturnValueOnce(100)

		@debuggable(mockLog)
		class TestClass {
			testMethod() {
				return 'result'
			}
		}

		const instance = new TestClass()
		instance.testMethod()

		expect(mockLog.debug).toHaveBeenNthCalledWith(5, expect.stringContaining('Calling [TestClass.testMethod]'))
		expect(mockLog.debug).toHaveBeenNthCalledWith(
			6,
			expect.stringMatching(
				/\[Debuggable\] Called \[TestClass\.testMethod\] which returned \[.*\] and took \[\d+\] ms/,
			),
		)
	})

	test('should decorate static methods', () => {
		@debuggable(mockLog)
		class TestClass {
			static testStaticMethod() {
				return 'staticResult'
			}
		}

		const result = TestClass.testStaticMethod()

		expect(mockLog.debug).toHaveBeenNthCalledWith(
			5,
			expect.stringContaining('Calling [TestClass.testStaticMethod]'),
		)
		expect(mockLog.debug).toHaveBeenNthCalledWith(6, expect.stringContaining('Called [TestClass.testStaticMethod]'))
		expect(result).toBe('staticResult')
	})

	test('should log method decoration process', () => {
		class TestClass {
			@debuggable(mockLog)
			static testMethod() {
				return 'result'
			}
		}

		TestClass.testMethod()

		expect(mockLog.debug).toHaveBeenNthCalledWith(
			3,
			expect.stringContaining(`${prefix}Decorating the following [TestClass] methods with debuggable`),
		)
	})

	test('should skip decorating if target is not an object or function', () => {
		const invalidTarget = 42

		const logSpy = jest.spyOn(mockLog, 'debug')

		// Call logMethods with invalid target
		const logMethodsWrapper = debuggable(mockLog)
		logMethodsWrapper(invalidTarget)

		expect(logSpy).toHaveBeenCalledWith(
			expect.stringContaining('Target [42] is not an object or function, skipping decoration'),
		)
	})
})

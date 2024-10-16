import { beforeEach, describe, expect, jest, test } from '@jest/globals'
import { DurationTracker } from '../src/duration-tracker'

describe('DurationTracker', () => {
    let tracker: DurationTracker
    let mockLog: Console

    beforeEach(() => {
        mockLog = { ...console, debug: jest.fn() }
        tracker = new DurationTracker(mockLog)
    })

    test('should start tracking with a key and return the key', () => {
        const key = 'testMethod'
        const result = tracker.start(key, false)
        
        expect(result).toBe(key)
        expect(tracker['startTimes'][key]).toBeDefined()
    })

    test('should start tracking with a key and seed', () => {
        const key = 'testMethod'
        const result = tracker.start(key)

        expect(result).toMatch(/^testMethod-[a-z0-9]+$/)
        expect(tracker['startTimes'][result]).toBeDefined()
    })

    test('should end tracking and return the duration', async () => {
      const key = 'testMethod'
      tracker.start(key, false)
  
      await new Promise((resolve) => setTimeout(resolve, 500))
  
      const duration = tracker.end(key)
  
      expect(duration).toBeDefined()
      expect(duration).toBeGreaterThan(0)
      expect(duration).toBeGreaterThanOrEqual(500)
      expect(tracker['startTimes'][key]).toBeUndefined()
  })

    test('should return undefined if the key was not being tracked', () => {
        const duration = tracker.end('nonExistentKey')

        expect(duration).toBeUndefined()
    })
})

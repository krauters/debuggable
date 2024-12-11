import { log } from '@krauters/logger'

import { debuggable } from '../src'

@debuggable(log)
export class MyService {
	constructor() {
		console.info('Service initialized')
	}

	public anotherMethod() {
		return 'Another result'
	}

	public processRequest(data: string): string {
		// Simulate processing
		return `Processed: ${data}`
	}
}

const service = new MyService()
service.processRequest('testData')
service.anotherMethod()

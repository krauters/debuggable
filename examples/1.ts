import { debuggable } from '../src'

@debuggable()
export class MyService {
	constructor() {
		console.info('Service initialized')
	}

	public processRequest(data: string): string {
		// Simulate processing
		return `Processed: ${data}`
	}

	public anotherMethod() {
		return 'Another result'
	}
}

const service = new MyService()
service.processRequest('testData')
service.anotherMethod()

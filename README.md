<div align="center">

<a href="https://www.linkedin.com/in/coltenkrauter/" target="_blank"><img src="https://img.shields.io/badge/LinkedIn-%230077B5.svg?&style=flat-square&logo=linkedin&logoColor=white" alt="LinkedIn"></a>
![License](https://img.shields.io/github/license/krauters/debuggable)
![visitors](https://visitor-badge.laobi.icu/badge?page_id=krauters.debuggable)

![Version](https://img.shields.io/github/v/release/krauters/debuggable)
[![npm version](https://img.shields.io/npm/v/@krauters/debuggable.svg?style=flat-square)](https://www.npmjs.org/package/@krauters/debuggable)
![GitHub Stars](https://img.shields.io/github/stars/krauters/debuggable)
![Forks](https://img.shields.io/github/forks/krauters/debuggable)

![GitHub Issues](https://img.shields.io/github/issues/krauters/debuggable)
![Open PRs](https://img.shields.io/github/issues-pr/krauters/debuggable)
![Commits per Month](https://img.shields.io/github/commit-activity/m/krauters/debuggable)
![Contributors](https://img.shields.io/github/contributors/krauters/debuggable)
![Last Commit](https://img.shields.io/github/last-commit/krauters/debuggable)

[![install size](https://img.shields.io/badge/dynamic/json?url=https://packagephobia.com/v2/api.json?p=@krauters/debuggable&query=$.install.pretty&label=install%20size&style=flat-square)](https://packagephobia.now.sh/result?p=@krauters/debuggable)
![Code Size](https://img.shields.io/github/languages/code-size/krauters/debuggable)
![Repo Size](https://img.shields.io/github/repo-size/krauters/debuggable)

</div>

# Debuggable

TypeScript base class for adding method-level debug logs and tracking execution time. The `debuggable` decorator can be applied at the class level to automatically log all method calls, inputs, return values, and execution duration.

## Usage

The `debuggable` decorator can be used to automatically wrap all methods of a class to log execution details and time taken.

```ts
import { debuggable } from '@krauters/debuggable'

@debuggable()
export class MyService {
  constructor() {
    console.info('Service initialized')
  }

  public processRequest(data: string): string {
    return `Processed: ${data}`
  }

  public anotherMethod() {
    return 'Another result'
  }
}

const service = new MyService()
service.processRequest('testData')
service.anotherMethod()

// Expected Output in Console:
//
// [DurationTracker] Initializing [DurationTracker]
// [Debuggable] Decorating the following [MyService] methods with debuggable: [length, name, prototype]
// [Debuggable] Decorating the following [MyService] methods with debuggable: [constructor, processRequest, anotherMethod]
// Service initialized
// [Debuggable] Calling [MyService.processRequest] with args ["testData"]
// [Debuggable] Called [MyService.processRequest] which returned ["Processed: testData"] and took [0] ms
// [Debuggable] Calling [MyService.anotherMethod] with args []
// [Debuggable] Called [MyService.anotherMethod] which returned ["Another result"] and took [0] ms
```

## Installation

```zsh
npm install @krauters/debuggable@latest
```


## Husky

Husky helps manage Git hooks easily, automating things like running tests or linting before a commit is made. This ensures your code is in good shape.

Pre-commit hooks run scripts before a commit is finalized to catch issues or enforce standards. With Husky, setting up these hooks across your team becomes easy, keeping your codebase clean and consistent.

### Our Custom Pre-Commit Hook

This project uses a custom pre-commit hook to run `npm run bundle`. This ensures that our bundled assets are always up to date before any commit (which is especially important for TypeScript GitHub Actions). Husky automates this, so no commits will go through without a fresh bundle, keeping everything streamlined.

## Contributing

The goal of this project is to continually evolve and improve its core features, making it more efficient and easier to use. Development happens openly here on GitHub, and we’re thankful to the community for contributing bug fixes, enhancements, and fresh ideas. Whether you're fixing a small bug or suggesting a major improvement, your input is invaluable.

## License

This project is licensed under the ISC License. Please see the [LICENSE](./LICENSE) file for more details.

## 🥂 Thanks Contributors

Thanks for spending time on this project.

<a href="https://github.com/krauters/debuggable/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=krauters/debuggable" />
</a>

<br />
<br />
<a href="https://www.buymeacoffee.com/coltenkrauter"><img src="https://img.buymeacoffee.com/button-api/?text=Buy me a coffee&emoji=&slug=coltenkrauter&button_colour=FFDD00&font_colour=000000&font_family=Cookie&outline_colour=000000&coffee_colour=ffffff" /></a>

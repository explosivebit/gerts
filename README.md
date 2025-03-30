# Gerts

Gerts is a TypeScript framework for building scalable microservices. It provides a robust foundation for developing maintainable and type-safe microservices with features like validation, metrics tracking, and enhanced logging.

## Features

- **Strong TypeScript Support**: Built from the ground up with TypeScript, providing excellent type safety and developer experience
- **Validation**: Built-in validation using Typia for runtime type checking
- **Metrics Tracking**: Optional metrics collection and monitoring
- **Enhanced Logging**: Configurable logging system for better debugging and monitoring
- **Instance Tracking**: Track and manage multiple service instances

## Installation

```bash
npm install gerts
```

## Quick Start

```typescript
import { CustomBroker } from 'gerts';

// Create a broker instance
const broker = new CustomBroker({
  metrics: { enabled: true },
  enhancedLogging: { enabled: true },
  instanceTracking: { enabled: true }
});

// Define a service
broker.createService({
  name: "math",
  actions: {
    add: {
      params: {
        a: "number",
        b: "number"
      },
      handler(ctx) {
        return ctx.params.a + ctx.params.b;
      }
    }
  }
});

// Start the broker
broker.start();
```

## Project Structure

The project uses a monorepo structure with the following packages:

- `core`: The main framework package
- Additional packages (coming soon)

## Development

1. Clone the repository:
```bash
git clone https://github.com/explosivebit/gerts.git
cd gerts
```

2. Install dependencies:
```bash
npm install
```

3. Build the project:
```bash
npm run build
```

4. Run tests:
```bash
npm test
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT

## Author

[explosivebit](https://github.com/explosivebit)
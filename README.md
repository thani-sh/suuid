# shortid

A TypeScript library to generate string identifiers with temporal ordering and optional short prefixes.

## Features

- 🚀 **ESM Module** - Built as an ES module with TypeScript type definitions
- ⏰ **Temporal Ordering** - IDs include timestamp-based segments for chronological sorting
- 🔀 **Random Component** - Ensures uniqueness with configurable random segments
- 🌐 **URL-Friendly** - Uses base64 encoding with URL-safe characters
- 📝 **TypeScript** - Full TypeScript support with type definitions
- 🎯 **Customizable** - Optional prefix, custom timestamps, and configurable length

## Installation

```bash
npm install shortid
```

## Usage

```typescript
import { sid } from 'shortid';

// Generate ID without prefix
const id1 = sid();
// Example: bWo1b29pZXgGlavhuNl

// Generate ID with prefix
const id2 = sid('usr');
// Example: usr:bWo1b29pZXkhKIG5BmV

// Generate ID with custom options
const id3 = sid('msg', { 
  timestamp: Date.now(), 
  length: 16 
});
// Example: msg:bWo1b29pZXkeX-7n7m5baxQtIcD
```

## Format

Generated IDs follow this format:

```
<prefix>:<temporal-segment><random-segment>
```

- **prefix** (optional): String prefix (1-4 characters recommended for brevity)
- **temporal-segment**: URL-friendly base64 encoded timestamp
- **random-segment**: URL-friendly base64 encoded random string

## API

### `sid(prefix?, options?)`

Generates a short ID.

#### Parameters

- `prefix` (optional): A string prefix
  - 1-4 characters recommended for brevity
  - Any length accepted

- `options` (optional): Configuration object
  - `timestamp` (number): Custom timestamp (default: `Date.now()`)
  - `length` (number): Length of random segment (default: 8)

#### Returns

`string` - The generated ID

#### Examples

```typescript
// Basic usage
sid()                                    // No prefix
sid('usr')                              // With prefix

// Custom timestamp (useful for testing)
sid('usr', { timestamp: 1234567890 })

// Custom random segment length
sid('usr', { length: 16 })

// Combined options
sid('msg', { timestamp: Date.now(), length: 12 })
```

## TypeScript Support

This library is written in TypeScript and includes type definitions:

```typescript
import { sid, SidOptions } from 'shortid';

interface SidOptions {
  timestamp?: number;
  length?: number;
}

const options: SidOptions = {
  timestamp: Date.now(),
  length: 10
};

const id: string = sid('usr', options);
```

## License

ISC


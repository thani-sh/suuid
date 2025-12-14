# @thani-sh/shortid

A TypeScript library to generate string identifiers with temporal ordering and optional short prefixes.

## Features

This library generates unique short IDs with temporal ordering using URL-friendly base64 encoding, combining a timestamp-based segment with a random component. Built as an ESM module with full TypeScript support, it allows customizable prefixes and configurable random segment lengths.

## Installation

```bash
npm install @thani-sh/shortid
```

## Usage

```typescript
import { sid } from '@thani-sh/shortid';

const id1 = sid();
const id2 = sid('usr');
const id3 = sid('msg', { timestamp: Date.now(), length: 16 });
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
sid()
sid('usr')
sid('usr', { timestamp: 1234567890 })
sid('usr', { length: 16 })
sid('msg', { timestamp: Date.now(), length: 12 })
```

## TypeScript Support

This library is written in TypeScript and includes type definitions:

```typescript
import { sid, Options } from '@thani-sh/shortid';

const options: Options = {
  timestamp: Date.now(),
  length: 10
};

const id: string = sid('usr', options);
```

## License

MIT


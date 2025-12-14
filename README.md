# @thani-sh/suuid

A TypeScript library that wraps the UUID library to generate short UUIDs using base62 encoding.

## Features

This library generates short, URL-safe unique identifiers by encoding standard UUIDs (UUID v4 and v7) as base62 strings. This results in significantly shorter strings compared to the standard 36-character UUID format while maintaining the same uniqueness guarantees.

- **UUID v4 Support**: Random UUIDs for general-purpose unique identifiers
- **UUID v7 Support**: Timestamp-based UUIDs for sortable identifiers (exposed as `v8()`)
- **Base62 Encoding**: Compact representation using alphanumeric characters (0-9, A-Z, a-z)
- **Bidirectional Conversion**: Encode standard UUIDs to short format and decode back to standard format
- **TypeScript Support**: Full type definitions included
- **ESM Module**: Built as an ES module with full TypeScript support

## Installation

```bash
npm install @thani-sh/suuid
```

## Usage

```typescript
import { v4, v8, encode, decode } from '@thani-sh/suuid';

// Generate a new SUUID based on UUID v8 (timestamp-based)
const id = v8();
// Example output: "2QY9COoAhfTGKcfPqHXCUV"

// Generate a new SUUID based on UUID v4 (random)
const id2 = v4();
// Example output: "5wbwf6yUxVBcr48AMbz9cb"

// Parse a SUUID back to UUID (8-4-4-4-12 format)
const uuid = decode(id);
// Example output: "550e8400-e29b-41d4-a716-446655440000"

// Encode a UUID to SUUID
const suuid = encode(uuid);
// Example output: "2QY9COoAhfTGKcfPqHXCUV"
```

## API

### `v4()`

Generates a new SUUID based on UUID v4 (random).

**Returns:** `string` - A base62-encoded short UUID

**Example:**
```typescript
const id = v4();
console.log(id); // "5wbwf6yUxVBcr48AMbz9cb"
```

### `v8()`

Generates a new SUUID based on UUID v7 (timestamp-based). Note that UUID v8 is custom/vendor-specific, so this function uses UUID v7 which provides timestamp-based ordering.

**Returns:** `string` - A base62-encoded short UUID

**Example:**
```typescript
const id = v8();
console.log(id); // "2QY9COoAhfTGKcfPqHXCUV"
```

### `encode(uuid)`

Encodes a standard UUID (8-4-4-4-12 format) to a SUUID (base62 encoded).

**Parameters:**
- `uuid` (string): A UUID string in the format `xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx`

**Returns:** `string` - A base62-encoded short UUID

**Example:**
```typescript
const uuid = '550e8400-e29b-41d4-a716-446655440000';
const suuid = encode(uuid);
console.log(suuid); // "2QY9COoAhfTGKcfPqHXCUV"
```

### `decode(suuid)`

Decodes a SUUID (base62 encoded) back to standard UUID format (8-4-4-4-12).

**Parameters:**
- `suuid` (string): A base62-encoded short UUID

**Returns:** `string` - A UUID string in the format `xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx`

**Example:**
```typescript
const suuid = '2QY9COoAhfTGKcfPqHXCUV';
const uuid = decode(suuid);
console.log(uuid); // "550e8400-e29b-41d4-a716-446655440000"
```

**Throws:** Error if the input contains invalid base62 characters

## Why SUUIDs?

Standard UUIDs are 36 characters long (including dashes), which can be unwieldy in URLs, databases, and other space-constrained contexts. SUUIDs solve this by encoding UUIDs as base62 strings, typically resulting in 22-character identifiers while maintaining:

- **Same uniqueness guarantees** as standard UUIDs
- **URL-safe characters** (no special encoding needed)
- **Reversible encoding** (can convert back to standard UUID format)
- **Compact representation** (approximately 39% shorter)

## TypeScript Support

This library is written in TypeScript and includes full type definitions:

```typescript
import { v4, v8, encode, decode } from '@thani-sh/suuid';

const suuid: string = v4();
const uuid: string = decode(suuid);
```

## License

MIT


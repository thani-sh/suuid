# @thani-sh/suuid

A TypeScript library that wraps the UUID library to generate short UUIDs using base62 encoding.

## Features

This library generates short, URL-safe unique identifiers by encoding standard UUIDs as base62 strings. This results in significantly shorter strings compared to the standard 36-character UUID format while maintaining the same uniqueness guarantees.

- **All UUID Versions**: Support for UUID v1, v3, v4, v5, v6, and v7
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
import { v1, v3, v4, v5, v6, v7, encode, decode } from '@thani-sh/suuid';

// Generate a new SUUID based on UUID v7 (timestamp-based)
const id = v7();
// Example output: "31xXF9ob9Zc8lajMtUTlo"

// Generate a new SUUID based on UUID v4 (random)
const id2 = v4();
// Example output: "H5eY5NytpCS0GoagAAOxS"

// Generate a new SUUID based on UUID v1 (timestamp and MAC address)
const id3 = v1();
// Example output: "4XmAmngtVQTR25oClDMdlH"

// Parse a SUUID back to UUID (8-4-4-4-12 format)
const uuid = decode(id);
// Example output: "019b4a5a-fa57-778a-a1e0-cc25c5765935"

// Encode a UUID to SUUID
const suuid = encode(uuid);
// Example output: "31xXF9ob9Zc8lajMtUTlo"
```

## API

### `v1()`

Generates a new SUUID based on UUID v1 (timestamp and MAC address).

**Returns:** `string` - A base62-encoded short UUID

**Example:**
```typescript
const id = v1();
console.log(id); // "4XmAmngtVQTR25oClDMdlH"
```

### `v3(name, namespace)`

Generates a new SUUID based on UUID v3 (namespace and name, MD5).

**Parameters:**
- `name` (string): The name to hash
- `namespace` (string): The namespace UUID

**Returns:** `string` - A base62-encoded short UUID

**Example:**
```typescript
const id = v3('hello', '6ba7b810-9dad-11d1-80b4-00c04fd430c8');
console.log(id); // "M1wYckVjHtf9kNJADE0zD"
```

### `v4()`

Generates a new SUUID based on UUID v4 (random).

**Returns:** `string` - A base62-encoded short UUID

**Example:**
```typescript
const id = v4();
console.log(id); // "H5eY5NytpCS0GoagAAOxS"
```

### `v5(name, namespace)`

Generates a new SUUID based on UUID v5 (namespace and name, SHA-1).

**Parameters:**
- `name` (string): The name to hash
- `namespace` (string): The namespace UUID

**Returns:** `string` - A base62-encoded short UUID

**Example:**
```typescript
const id = v5('hello', '6ba7b810-9dad-11d1-80b4-00c04fd430c8');
console.log(id); // "4TsPdKNpquz4a4J5Fr9yHB"
```

### `v6()`

Generates a new SUUID based on UUID v6 (timestamp and MAC address, sortable).

**Returns:** `string` - A base62-encoded short UUID

**Example:**
```typescript
const id = v6();
console.log(id); // "wb9faLpPVDIKkfak244qP"
```

### `v7()`

Generates a new SUUID based on UUID v7 (timestamp-based, sortable).

**Returns:** `string` - A base62-encoded short UUID

**Example:**
```typescript
const id = v7();
console.log(id); // "31xXF9ob9Zc8lajMtUTlo"
```

### `encode(uuid)`

Encodes a standard UUID (8-4-4-4-12 format) to a SUUID (base62 encoded).

**Parameters:**
- `uuid` (string): A UUID string in the format `xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx`

**Returns:** `string` - A base62-encoded short UUID

**Example:**
```typescript
const uuid = '019b4a5a-fa57-778a-a1e0-cc25c5765935';
const suuid = encode(uuid);
console.log(suuid); // "31xXF9ob9Zc8lajMtUTlo"
```

### `decode(suuid)`

Decodes a SUUID (base62 encoded) back to standard UUID format (8-4-4-4-12).

**Parameters:**
- `suuid` (string): A base62-encoded short UUID

**Returns:** `string` - A UUID string in the format `xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx`

**Example:**
```typescript
const suuid = '31xXF9ob9Zc8lajMtUTlo';
const uuid = decode(suuid);
console.log(uuid); // "019b4a5a-fa57-778a-a1e0-cc25c5765935"
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
import { v1, v3, v4, v5, v6, v7, encode, decode } from '@thani-sh/suuid';

const suuid: string = v4();
const uuid: string = decode(suuid);
```

## License

MIT


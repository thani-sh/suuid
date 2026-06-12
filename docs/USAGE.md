# Advanced Usage Guide

This document covers advanced usage, deep-dives into the library's capabilities, and serves as a comprehensive reference guide for `@thani-sh/suuid`.

## Overview

`@thani-sh/suuid` wraps the standard `uuid` library to generate short, URL-safe unique identifiers using base62 encoding. This results in significantly shorter strings (typically 22 characters) compared to the standard 36-character UUID format while maintaining the same uniqueness guarantees.

---

## Capabilities & Feature Walkthrough

### 1. Generating Short UUIDs (All Versions)

You can generate short UUIDs for UUID versions v1, v3, v4, v5, v6, and v7.

#### Random UUID (v4)

Generates a random short UUID.

```typescript
import { v4 } from "@thani-sh/suuid";
const id = v4(); // "H5eY5NytpCS0GoagAAOxS"
```

#### Timestamp-based UUID (v7 - Recommended)

Generates a time-ordered short UUID.

```typescript
import { v7 } from "@thani-sh/suuid";
const id = v7(); // "31xXF9ob9Zc8lajMtUTlo"
```

#### Time & MAC address UUID (v1 & v6)

Generates a short UUID based on timestamp and MAC address.

- `v1()`: Standard layout.
- `v6()`: Field-compatible layout for sequential sorting.

```typescript
import { v1, v6 } from "@thani-sh/suuid";
const id1 = v1(); // "4XmAmngtVQTR25oClDMdlH"
const id6 = v6(); // "wb9faLpPVDIKkfak244qP"
```

#### Name-based UUIDs (v3 & v5)

Generates deterministic short UUIDs based on a namespace and a name.

- `v3()`: Uses MD5 hashing.
- `v5()`: Uses SHA-1 hashing.

```typescript
import { v3, v5 } from "@thani-sh/suuid";

const NAMESPACE = "6ba7b810-9dad-11d1-80b4-00c04fd430c8";

const id3 = v3("hello", NAMESPACE); // "M1wYckVjHtf9kNJADE0zD"
const id5 = v5("hello", NAMESPACE); // "4TsPdKNpquz4a4J5Fr9yHB"
```

---

### 2. Bidirectional Conversion

You can encode existing standard UUIDs into base62 short UUIDs and decode them back.

#### Encoding UUIDs

Convert a standard 36-character UUID to a compact base62 string:

```typescript
import { encode } from "@thani-sh/suuid";
const suuid = encode("019b4a5a-fa57-778a-a1e0-cc25c5765935"); // "31xXF9ob9Zc8lajMtUTlo"
```

#### Decoding SUUIDs

Convert a base62 short UUID back to the standard 36-character UUID format:

```typescript
import { decode } from "@thani-sh/suuid";
const uuid = decode("31xXF9ob9Zc8lajMtUTlo"); // "019b4a5a-fa57-778a-a1e0-cc25c5765935"
```

_Note: `decode()` will throw an Error if the input contains invalid base62 characters._

---

### 3. TypeScript Support

The library provides first-class TypeScript support with full type definitions.

```typescript
import { v4, decode } from "@thani-sh/suuid";

const suuid: string = v4();
const uuid: string = decode(suuid);
```

---

## API Reference

### `v1()`

Generates a new SUUID based on UUID v1 (timestamp and MAC address).

- **Returns:** `string` (A base62-encoded short UUID)

### `v3(name, namespace)`

Generates a new SUUID based on UUID v3 (namespace and name, MD5).

- **Parameters:**
  - `name: string` - The name to hash
  - `namespace: string` - The namespace UUID
- **Returns:** `string` (A base62-encoded short UUID)

### `v4()`

Generates a new SUUID based on UUID v4 (random).

- **Returns:** `string` (A base62-encoded short UUID)

### `v5(name, namespace)`

Generates a new SUUID based on UUID v5 (namespace and name, SHA-1).

- **Parameters:**
  - `name: string` - The name to hash
  - `namespace: string` - The namespace UUID
- **Returns:** `string` (A base62-encoded short UUID)

### `v6()`

Generates a new SUUID based on UUID v6 (timestamp and MAC address, sortable).

- **Returns:** `string` (A base62-encoded short UUID)

### `v7()`

Generates a new SUUID based on UUID v7 (timestamp-based, sortable).

- **Returns:** `string` (A base62-encoded short UUID)

### `encode(uuid)`

Encodes a standard UUID (8-4-4-4-12 format) to a SUUID (base62 encoded).

- **Parameters:**
  - `uuid: string` - A UUID string in standard format
- **Returns:** `string` (A base62-encoded short UUID)

### `decode(suuid)`

Decodes a SUUID (base62 encoded) back to standard UUID format (8-4-4-4-12).

- **Parameters:**
  - `suuid: string` - A base62-encoded short UUID
- **Returns:** `string` (A standard UUID string)
- **Throws:** `Error` if the input contains invalid base62 characters.

---

## Why SUUIDs?

Standard UUIDs are 36 characters long (including dashes), which can be unwieldy in URLs, databases, and space-constrained contexts. SUUIDs solve this by encoding UUIDs as base62 strings, resulting in 22-character identifiers while maintaining:

- **Same uniqueness guarantees** as standard UUIDs.
- **URL-safe characters** (no special encoding needed).
- **Reversible encoding** (can convert back to standard UUID format).
- **Compact representation** (approximately 39% shorter).

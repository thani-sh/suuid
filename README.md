# suuid

Generate short, URL-safe UUIDs using base62 encoding.

## Getting Started

```bash
npm install @thani-sh/suuid
```

```typescript
import { v4, decode } from "@thani-sh/suuid";

// Generate a compact base62-encoded UUID
const id = v4();
console.log(id);
// "H5eY5NytpCS0GoagAAOxS"

// Convert the short UUID back to a standard UUID
const uuid = decode(id);
console.log(uuid);
// "019b4a5a-fa57-778a-a1e0-cc25c5765935"
```

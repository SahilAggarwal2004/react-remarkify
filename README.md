# react-remarkify

A lightweight React.js utility to transform Markdown into React.js components seamlessly.

## Features

- Effortlessly converts Markdown into React.js components.
- Simple and user-friendly API.
- Fully customizable.
- Supports plugins for enhanced functionality.

## Installation

Install `react-remarkify` using your preferred package manager:

```bash
# Using npm:
npm install react-remarkify --save

# Using Yarn:
yarn add react-remarkify

# Using pnpm:
pnpm add react-remarkify

# Using Bun:
bun add react-remarkify
```

## Usage

**react-remarkify** provides two primary methods to incorporate Markdown into your React.js applications: the `useRemark` hook and the `<Remark>` component.

### `useRemark` Hook

Use the `useRemark` hook to transform Markdown content into React.js components dynamically:

```tsx
import React from "react";
import { useRemark } from "react-remarkify";

export default function App() {
  const reactContent = useRemark({ markdown: "# Hello World\nThis is **useRemark** hook" });

  return reactContent;
}
```

### `<Remark>` Component

Use the `<Remark>` component for a declarative approach:

```tsx
import React from "react";
import Remark from "react-remarkify";

export default function App() {
  const markdown = `# Hello World\nThis is a **Remark** component`;

  return <Remark>{markdown}</Remark>;
}
```

## API Reference

### `useRemark` Hook

The `useRemark` hook accepts the following parameters:

| Parameter               | Type                                          | Required | Default | Description                                                                |
| ----------------------- | --------------------------------------------- | -------- | ------- | -------------------------------------------------------------------------- |
| `markdown`              | `string`                                      | Yes      | -       | The Markdown content to be converted into React.js components.             |
| `rehypePlugins`         | [`PluggableList`](#pluggablelist)             | No       | []      | Plugins for `rehype` to extend functionality.                              |
| `rehypeReactOptions`    | [`RehypeReactOptions`](#rehypereactoptions)   | No       | -       | Options for customizing the generated React.js components.                 |
| `remarkParseOptions`    | [`RemarkParseOptions`](#remarkparseoptions)   | No       | -       | Parsing options for `remark`.                                              |
| `remarkPlugins`         | [`PluggableList`](#pluggablelist)             | No       | []      | Plugins for `remark` to enhance Markdown processing.                       |
| `remarkToRehypeOptions` | [`RemarkRehypeOptions`](#remarkrehypeoptions) | No       | -       | Options for the `remark` to `rehype` transformation.                       |
| `onError`               | `Function`                                    | No       | -       | Callback to handle errors during the Markdown-to-React conversion process. |

### `<Remark>` Component

The `<Remark>` component accepts the same options as `useRemark`, but you pass the `markdown` content as its children:

```tsx
<Remark>{markdown}</Remark>
```

## Types

### `PluggableList`

```typescript
import { PluggableList } from "unified";
```

### `RehypeReactOptions`

```typescript
import { Components } from "hast-util-to-jsx-runtime";
type RehypeReactOptions = { components?: Partial<Components> };
```

### `RemarkParseOptions`

```typescript
import { Options } from "remark-parse";
type RemarkParseOptions = Options;
```

### `RemarkRehypeOptions`

```typescript
import { Options } from "remark-rehype";
type RemarkRehypeOptions = Options;
```

## License

This project is licensed under the [MIT License](LICENSE).

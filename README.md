# react-remarkify

A lightweight React.js utility to transform Markdown into React.js components seamlessly.

## Features

- Effortlessly converts Markdown into React.js components.
- Simple and user-friendly API.
- Fully customizable.
- Supports plugins for enhanced functionality.
- Accepts flexible content via `ReactNode`, including Markdown strings or JSX.

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
  const heading = "# Welcome to the App";
  const description = "This is a **React-powered** Markdown block.";

  const reactContent = useRemark({
    markdown: (
      <section>
        <div>{heading}</div>
        <div>{description}</div>
        <div>_This content is rendered from JSX and Markdown combined._</div>
      </section>
    ),
    components: {
      h1: "h2",
      strong: (props) => <strong style={{ color: "#e67e22" }} {...props} />,
      em: (props) => <em style={{ fontStyle: "italic", opacity: 0.8 }} {...props} />,
    },
  });

  return reactContent;
}
```

### `<Remark>` Component

Use the `<Remark>` component for a declarative approach:

```tsx
import React from "react";
import Remark from "react-remarkify";

export default function App() {
  const heading = "# Welcome to the App";
  const description = "This is a **React-powered** Markdown block.";

  return (
    <Remark
      components={{
        h1: "h2",
        strong: (props) => <strong style={{ color: "#e67e22" }} {...props} />,
        em: (props) => <em style={{ fontStyle: "italic", opacity: 0.8 }} {...props} />,
      }}
    >
      <section>
        <div>{heading}</div>
        <div>{description}</div>
        <div>_This content is rendered from JSX and Markdown combined._</div>
      </section>
    </Remark>
  );
}
```

## API Reference

### `useRemark` Hook

The `useRemark` hook accepts the following parameters:

| Parameter               | Type                                          | Required | Default         | Description                                                                                                                                                                                                                                                                                          |
| ----------------------- | --------------------------------------------- | -------- | --------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `markdown`              | `React.ReactNode`                             | Yes      | -               | The markdown content to be converted into React.js components.                                                                                                                                                                                                                                       |
| `rehypePlugins`         | [`PluggableList`](#pluggablelist)             | No       | -               | Plugins for `rehype` to extend functionality.                                                                                                                                                                                                                                                        |
| `rehypeReactOptions`    | [`RehypeReactOptions`](#rehypereactoptions)   | No       | -               | Options for customizing the generated React.js components.                                                                                                                                                                                                                                           |
| `remarkParseOptions`    | [`RemarkParseOptions`](#remarkparseoptions)   | No       | -               | Parsing options for `remark`.                                                                                                                                                                                                                                                                        |
| `remarkPlugins`         | [`PluggableList`](#pluggablelist)             | No       | -               | Plugins for `remark` to enhance Markdown processing.                                                                                                                                                                                                                                                 |
| `remarkToRehypeOptions` | [`RemarkRehypeOptions`](#remarkrehypeoptions) | No       | -               | Options for the `remark` to `rehype` transformation.                                                                                                                                                                                                                                                 |
| `components`            | [`Components`](#components)                   | No       | -               | A mapping of HTML elements to custom React components, allowing customization of rendered Markdown elements.                                                                                                                                                                                         |
| `debounceDelay`         | `number (ms)`                                 | No       | 0               | Debounces changes to the `text` input to avoid unnecessary processing during rapid updates (e.g., from user input). This helps improve performance by reducing redundant text parsing. **Note:** setting this may delay normal updates and can cause `starvation` if the input changes never settle. |
| `onError`               | `Function`                                    | No       | `console.error` | Callback to handle errors during the Markdown-to-React conversion process.                                                                                                                                                                                                                           |

**Note:** All options except `markdown` and `debounceDelay` are now immutable once set. This decision was made for performance optimization.

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

### `Components`

```typescript
import { ComponentType, JSX } from "react";
type Components = { [Key in keyof JSX.IntrinsicElements]?: ComponentType<JSX.IntrinsicElements[Key] & { node?: Element }> | keyof JSX.IntrinsicElements };
```

## License

This project is licensed under the [MIT License](LICENSE).

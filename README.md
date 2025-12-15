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

| Parameter               | Type                                          | Required | Default         | Description                                                                                                                                                                                                                                                                 |
| ----------------------- | --------------------------------------------- | -------- | --------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `markdown`              | `React.ReactNode`                             | Yes      | -               | The markdown content to be converted into React.js components.                                                                                                                                                                                                              |
| `stableMarkdown`        | `boolean`                                     | No       | `false`         | Skips expensive internal content analysis and relies on the referential identity of `markdown`. Enable this only if the provided `markdown` value is stable across renders, for example memoized with `useMemo`. If the reference changes, the content will be reprocessed. |
| `rehypePlugins`         | [`PluggableList`](#pluggablelist)             | No       | -               | Plugins for `rehype` to extend functionality.                                                                                                                                                                                                                               |
| `rehypeReactOptions`    | [`RehypeReactOptions`](#rehypereactoptions)   | No       | -               | Options for customizing the generated React.js components.                                                                                                                                                                                                                  |
| `remarkParseOptions`    | [`RemarkParseOptions`](#remarkparseoptions)   | No       | -               | Parsing options for `remark`.                                                                                                                                                                                                                                               |
| `remarkPlugins`         | [`PluggableList`](#pluggablelist)             | No       | -               | Plugins for `remark` to enhance Markdown processing.                                                                                                                                                                                                                        |
| `remarkToRehypeOptions` | [`RemarkRehypeOptions`](#remarkrehypeoptions) | No       | -               | Options for the `remark` to `rehype` transformation.                                                                                                                                                                                                                        |
| `components`            | [`Components`](#components)                   | No       | -               | A mapping of HTML elements to custom React components, allowing customization of rendered Markdown elements.                                                                                                                                                                |
| `updateMode`            | [`UpdateMode`](#updatemode)                   | No       | `immediate`     | Controls how text changes are processed: `immediate` (updates instantly), `throttle` (updates at most every `updateDelay` ms, ideal for AI streaming), or `debounce` (waits `updateDelay` ms after changes stop, ideal for user typing).                                    |
| `updateDelay`           | `number (ms)`                                 | No       | 0               | Delay for `updateMode` = `throttle` or `debounce`. Has no effect when `updateMode` is `immediate`.                                                                                                                                                                          |
| `onError`               | `Function`                                    | No       | `console.error` | Callback to handle errors during the Markdown-to-React conversion process.                                                                                                                                                                                                  |

**Note:** For performance reasons, the following options are treated as immutable after initialization: `rehypePlugins`, `rehypeReactOptions`, `remarkParseOptions`, `remarkPlugins`, `remarkToRehypeOptions`, `components`, and `onError`. Changing them dynamically will have no effect during the component's lifecycle.

### `<Remark>` Component

The `<Remark>` component accepts the same options as `useRemark`, but you pass the `markdown` content as its children:

```tsx
<Remark>{markdown}</Remark>
```

## Types

### `Components`

```typescript
import { ComponentType, JSX } from "react";
type Components = { [Key in keyof JSX.IntrinsicElements]?: ComponentType<JSX.IntrinsicElements[Key] & { node?: Element }> | keyof JSX.IntrinsicElements };
```

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

### UpdateMode

```typescript
type UpdateMode = "immediate" | "throttle" | "debounce";
```

## License

This project is licensed under the [MIT License](LICENSE).

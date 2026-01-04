import type { Options as RemarkRehypeOptions } from "mdast-util-to-hast";
import type { ComponentType, JSX, ReactNode } from "react";
import type { Options as RemarkParseOptions } from "remark-parse";
import type { PluggableList } from "unified";

// hooks.tsx
export type CommonProps = {
  stableMarkdown?: boolean;
  rehypePlugins?: PluggableList;
  rehypeReactOptions?: RehypeReactOptions;
  remarkParseOptions?: RemarkParseOptions;
  remarkPlugins?: PluggableList;
  remarkToRehypeOptions?: RemarkRehypeOptions;
  components?: Components;
  updateMode?: UpdateMode;
  updateDelay?: number;
  onError?: (err: Error) => void;
};

export type Components = { [Key in keyof JSX.IntrinsicElements]?: ComponentType<JSX.IntrinsicElements[Key] & { node?: Element }> | keyof JSX.IntrinsicElements };

export type UpdateMode = "immediate" | "throttle" | "debounce";

export type UseRemarkOptions = CommonProps & {
  markdown: ReactNode;
};

export type RehypeReactOptions = { components?: Partial<Components> };

// index.tsx
export type RemarkProps = CommonProps & {
  children: ReactNode;
};

// utils.ts
export type Success<T> = { success: true; data: T; error: null };

export type Failure<E> = { success: false; data: null; error: E };

export type Result<T, E = Error> = Success<T> | Failure<E>;

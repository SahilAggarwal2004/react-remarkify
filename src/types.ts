import { Options as RemarkRehypeOptions } from "mdast-util-to-hast";
import { ComponentType, JSX, ReactNode } from "react";
import { Options as RemarkParseOptions } from "remark-parse";
import { PluggableList } from "unified";

// hooks.tsx
export type CommonProps = {
  rehypePlugins?: PluggableList;
  rehypeReactOptions?: RehypeReactOptions;
  remarkParseOptions?: RemarkParseOptions;
  remarkPlugins?: PluggableList;
  remarkToRehypeOptions?: RemarkRehypeOptions;
  components?: Components;
  debounceDelay?: number;
  onError?: (err: Error) => void;
};

export type Components = { [Key in keyof JSX.IntrinsicElements]?: ComponentType<JSX.IntrinsicElements[Key] & { node?: Element }> | keyof JSX.IntrinsicElements };

export type UseRemarkOptions = CommonProps & {
  markdown: ReactNode;
};

export type RehypeReactOptions = { components?: Partial<Components> };

// index.tsx
export type RemarkProps = CommonProps & {
  children: ReactNode;
};

// utils.ts
type Success<T> = { success: true; data: T; error: null };

type Failure<E> = { success: false; data: null; error: E };

export type Result<T, E = Error> = Success<T> | Failure<E>;

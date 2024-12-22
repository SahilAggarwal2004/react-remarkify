import { Components } from "hast-util-to-jsx-runtime";
import { Options as RemarkRehypeOptions } from "mdast-util-to-hast";
import { Options as RemarkParseOptions } from "remark-parse";
import { PluggableList } from "unified";

// hooks.tsx
export type CommonProps = {
  rehypePlugins?: PluggableList;
  rehypeReactOptions?: RehypeReactOptions;
  remarkParseOptions?: RemarkParseOptions;
  remarkPlugins?: PluggableList;
  remarkToRehypeOptions?: RemarkRehypeOptions;
  onError?: (err: Error) => void;
};

export type UseRemarkOptions = CommonProps & {
  markdown: string;
};

export type RehypeReactOptions = { components?: Partial<Components> };

// index.tsx
export type RemarkProps = CommonProps & {
  children: string;
};

import { toJsxRuntime } from "hast-util-to-jsx-runtime";
import { JSX, useMemo } from "react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import rehypeReact from "rehype-react";
import remarkParse from "remark-parse";
import remarkToRehype from "remark-rehype";
import { Processor, unified } from "unified";

import { UseRemarkOptions } from "./types.js";
import { tryCatch } from "./utils.js";

export function useRemark({ markdown, rehypePlugins = [], rehypeReactOptions, remarkParseOptions, remarkPlugins = [], remarkToRehypeOptions, components, onError = console.error }: UseRemarkOptions): JSX.Element | null {
  const processor = useMemo<Processor>(
    () =>
      unified()
        .use(remarkParse, remarkParseOptions)
        .use(remarkPlugins)
        .use(remarkToRehype, remarkToRehypeOptions)
        .use(rehypePlugins)
        .use(rehypeReact, { ...rehypeReactOptions, Fragment, jsx, jsxs }),
    []
  );
  const reactContent = useMemo(() => {
    const { success, data, error } = tryCatch(() => {
      const file = processor.processSync(markdown);
      return (components ? processor.runSync(processor.parse(file), file) : file.result) as any;
    });
    if (success) return components ? toJsxRuntime(data, { Fragment, components, ignoreInvalidStyle: true, jsx, jsxs, passKeys: true, passNode: true }) : data;
    onError(error);
    return null;
  }, [markdown]);

  return reactContent;
}

import { toJsxRuntime } from "hast-util-to-jsx-runtime";
import { ReactNode, useMemo, isValidElement, cloneElement, PropsWithChildren, useCallback } from "react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import rehypeReact from "rehype-react";
import remarkParse from "remark-parse";
import remarkToRehype from "remark-rehype";
import { Processor, unified } from "unified";

import { UseRemarkOptions } from "./types.js";
import { NodeToKey, tryCatch } from "./utils.js";

export function useRemark({
  markdown,
  rehypePlugins = [],
  rehypeReactOptions,
  remarkParseOptions,
  remarkPlugins = [],
  remarkToRehypeOptions,
  components,
  onError = console.error,
}: UseRemarkOptions): ReactNode {
  const processor = useMemo<Processor>(
    () =>
      unified()
        .use(remarkParse, remarkParseOptions)
        .use(remarkPlugins)
        .use(remarkToRehype, remarkToRehypeOptions)
        .use(rehypePlugins)
        .use(rehypeReact, { ...rehypeReactOptions, Fragment, jsx, jsxs }),
    [JSON.stringify(rehypePlugins), JSON.stringify(rehypeReactOptions), JSON.stringify(remarkParseOptions), JSON.stringify(remarkPlugins), JSON.stringify(remarkToRehypeOptions)]
  );
  const processReactNode = useCallback(
    (node: ReactNode): ReactNode => {
      if (typeof node === "string") {
        const { success, data, error } = tryCatch(() => {
          const file = processor.processSync(node);
          return (components ? processor.runSync(processor.parse(file), file) : file.result) as any;
        });
        if (success) return components ? toJsxRuntime(data, { Fragment, components, ignoreInvalidStyle: true, jsx, jsxs, passKeys: true, passNode: true }) : data;
        onError(error);
        return node;
      }
      if (Array.isArray(node)) return node.map(processReactNode);
      if (isValidElement<PropsWithChildren>(node)) return cloneElement(node, { key: node.key ?? Math.random(), children: processReactNode(node.props.children) });
      return null;
    },
    [processor, JSON.stringify(components)]
  );
  const reactContent = useMemo(() => processReactNode(markdown), [NodeToKey(markdown), processReactNode]);

  return reactContent;
}

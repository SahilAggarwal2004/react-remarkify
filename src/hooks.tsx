import { toJsxRuntime } from "hast-util-to-jsx-runtime";
import { ReactNode, useMemo, isValidElement, cloneElement, PropsWithChildren, useCallback, useState, useEffect, useRef } from "react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import rehypeReact from "rehype-react";
import remarkParse from "remark-parse";
import remarkToRehype from "remark-rehype";
import { Processor, unified } from "unified";

import { nodeToKey, tryCatch } from "./lib/utils.js";
import { UpdateMode, UseRemarkOptions } from "./types.js";

function useStableValue<T>(value: T, mode: UpdateMode, delay: number) {
  const [stableValue, setStableValue] = useState(value);
  const lastUpdated = useRef(0);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout> | null = null;
    if (mode === "immediate" || delay <= 0) timeout = setTimeout(() => setStableValue(value), 0);
    else if (mode === "debounce") timeout = setTimeout(() => setStableValue(value), delay);
    else if (mode === "throttle") {
      const now = Date.now();
      const elapsed = now - lastUpdated.current;
      timeout = setTimeout(() => {
        setStableValue(value);
        lastUpdated.current = Date.now();
      }, Math.max(0, delay - elapsed));
    }

    return () => {
      if (timeout) clearTimeout(timeout);
    };
  }, [value, mode, delay]);

  return stableValue;
}

export function useRemark({
  markdown,
  stableMarkdown = false,
  rehypePlugins = [],
  rehypeReactOptions,
  remarkParseOptions,
  remarkPlugins = [],
  remarkToRehypeOptions,
  components,
  updateMode = "immediate",
  updateDelay = 0,
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
    []
  );

  const processReactNode = useCallback((node: ReactNode, index = 0): ReactNode => {
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
    if (isValidElement<PropsWithChildren>(node)) return cloneElement(node, { key: node.key ?? index, children: processReactNode(node.props.children) });
    return null;
  }, []);

  const key = useMemo(() => (stableMarkdown ? markdown : nodeToKey(markdown)), [markdown, stableMarkdown]);
  const stableKey = useStableValue(key, updateMode, updateDelay);
  const reactContent = useMemo(() => processReactNode(markdown), [stableKey]);

  return reactContent;
}

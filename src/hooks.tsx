import { toJsxRuntime } from "hast-util-to-jsx-runtime";
import { ReactNode, useMemo, isValidElement, cloneElement, PropsWithChildren, useCallback, useState, useEffect, useRef } from "react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import rehypeReact from "rehype-react";
import remarkParse from "remark-parse";
import remarkToRehype from "remark-rehype";
import { Processor, unified } from "unified";

import { UpdateMode, UseRemarkOptions } from "./types.js";
import { NodeToKey, tryCatch } from "./utils.js";

function useStableValue<T>(value: T, mode: UpdateMode, delay: number) {
  const [stableValue, setStableValue] = useState(value);
  const lastUpdated = useRef(0);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isImmediate = mode === "immediate" || delay <= 0;

  useEffect(() => {
    if (isImmediate) {
      setStableValue(value);
      return;
    }

    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    if (mode === "throttle") {
      const now = Date.now();
      const elapsed = now - lastUpdated.current;
      if (elapsed >= delay) {
        setStableValue(value);
        lastUpdated.current = now;
        timeoutRef.current = null;
      } else
        timeoutRef.current = setTimeout(() => {
          setStableValue(value);
          lastUpdated.current = Date.now();
          timeoutRef.current = null;
        }, delay - elapsed);
    } else if (mode === "debounce") timeoutRef.current = setTimeout(() => setStableValue(value), delay);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [value, mode, delay]);

  return isImmediate ? value : stableValue;
}

export function useRemark({
  markdown,
  rehypePlugins = [],
  rehypeReactOptions,
  remarkParseOptions,
  remarkPlugins = [],
  remarkToRehypeOptions,
  components,
  udpateMode = "immediate",
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

  const key = useMemo(() => NodeToKey(markdown), [markdown]);
  const debouncedKey = useStableValue(key, udpateMode, updateDelay);
  const reactContent = useMemo(() => processReactNode(markdown), [debouncedKey]);

  return reactContent;
}

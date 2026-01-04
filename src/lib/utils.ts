import { isValidElement, PropsWithChildren, ReactNode } from "react";

import type { Result } from "../types.js";

export function nodeToKey(node: ReactNode): string {
  if (typeof node === "string") return node;
  if (typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(nodeToKey).join("");
  if (isValidElement<PropsWithChildren>(node)) {
    const nodeType = typeof node.type === "string" ? node.type : "Component";
    const { children, ...props } = node.props;
    const propsKey = JSON.stringify(props);
    const childrenKey = nodeToKey(children);
    return `${nodeType}(${propsKey})[${childrenKey}]`;
  }
  return "";
}

export function tryCatch<T, E = Error>(callback: () => T): Result<T, E> {
  try {
    const data = callback();
    return { success: true, data, error: null };
  } catch (error) {
    return { success: false, data: null, error: error as E };
  }
}

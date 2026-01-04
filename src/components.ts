import type { ReactNode } from "react";

import { useRemark } from "./hooks.js";
import type { RemarkProps } from "./types.js";

export default function Remark({ children, ...props }: RemarkProps): ReactNode {
  const reactContent = useRemark({ markdown: children, ...props });

  return reactContent;
}

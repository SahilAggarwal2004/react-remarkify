import { useRemark } from "@/hooks";
import type { RemarkProps } from "@/types";
import type { ReactNode } from "react";

export default function Remark({ children, ...props }: RemarkProps): ReactNode {
  const reactContent = useRemark({ markdown: children, ...props });

  return reactContent;
}

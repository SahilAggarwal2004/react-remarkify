import { useRemark } from "./hooks.js";
import { RemarkProps } from "./types.js";

export default function Remark({ children, ...props }: RemarkProps) {
  const reactContent = useRemark({ markdown: children, ...props });

  return reactContent;
}

export { useRemark };

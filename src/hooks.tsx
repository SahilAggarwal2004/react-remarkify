import { ReactElement, useMemo } from "react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import rehypeReact from "rehype-react";
import remarkParse from "remark-parse";
import remarkToRehype from "remark-rehype";
import { unified } from "unified";
import { UseRemarkOptions } from "./types.js";
import { assertIsError } from "./utils.js";

export function useRemark({ markdown, rehypePlugins = [], rehypeReactOptions, remarkParseOptions, remarkPlugins = [], remarkToRehypeOptions, onError = console.error }: UseRemarkOptions): ReactElement | null {
  const processor = useMemo(
    () =>
      unified()
        .use(remarkParse, remarkParseOptions)
        .use(remarkPlugins)
        .use(remarkToRehype, remarkToRehypeOptions)
        .use(rehypePlugins)
        .use(rehypeReact, { ...rehypeReactOptions, Fragment, jsx, jsxs }),
    [rehypePlugins, rehypeReactOptions, remarkPlugins, remarkParseOptions, remarkToRehypeOptions]
  );
  const reactContent = useMemo(() => {
    try {
      const { result } = processor.processSync(markdown) as { result: ReactElement };
      return result;
    } catch (error) {
      assertIsError(error);
      onError(error);
      return null;
    }
  }, [markdown, processor, onError]);

  return reactContent;
}
